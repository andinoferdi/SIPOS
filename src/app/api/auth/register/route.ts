import { authValidation } from "@/features/auth/schemas/auth.schema";
import { hashPassword } from "@/lib/auth/password";
import { prisma } from "@/lib/db/prisma";
import type { RoleCode } from "@/types/rbac";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsedBody = authValidation.register.safeParse(body);

    if (!parsedBody.success) {
      return NextResponse.json(
        { message: parsedBody.error.issues[0]?.message ?? "Invalid input" },
        { status: 400 }
      );
    }

    const firstName = parsedBody.data.firstName.trim();
    const lastName = parsedBody.data.lastName.trim();
    const fullName = `${firstName} ${lastName}`.trim();
    const email = parsedBody.data.email.trim().toLowerCase();
    const passwordHash = hashPassword(parsedBody.data.password);

    const existingUser = await prisma.staffUser.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { message: "Email sudah terdaftar" },
        { status: 409 }
      );
    }

    const workspace = await prisma.workspace.findUnique({
      where: { code: "main" },
    });

    if (!workspace) {
      return NextResponse.json(
        {
          message:
            "Workspace utama belum tersedia. Jalankan schema dan seeding RBAC terlebih dahulu.",
        },
        { status: 400 }
      );
    }

    const [adminRole, hostRole] = await Promise.all([
      prisma.rbacRole.findUnique({ where: { code: "admin" } }),
      prisma.rbacRole.findUnique({ where: { code: "host" } }),
    ]);

    if (!adminRole || !hostRole) {
      return NextResponse.json(
        { message: "Role RBAC belum tersedia. Jalankan seeding role terlebih dahulu." },
        { status: 400 }
      );
    }

    const roleToAssign = await prisma.$transaction(async (tx) => {
      const workspaceAssignments = await tx.userRole.count({
        where: { workspaceId: workspace.id },
      });

      return workspaceAssignments === 0 ? adminRole : hostRole;
    });

    const createdUser = await prisma.staffUser.create({
      data: {
        email,
        fullName,
        passwordHash,
        userRoles: {
          create: {
            workspaceId: workspace.id,
            roleId: roleToAssign.id,
          },
        },
      },
      select: {
        id: true,
        email: true,
        fullName: true,
      },
    });

    return NextResponse.json(
      {
        user: createdUser,
        assignedRole: roleToAssign.code as RoleCode,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Unexpected server error" }, { status: 500 });
  }
}
