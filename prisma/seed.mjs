import { randomBytes, scryptSync } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const loadEnvFile = (filePath) => {
  const fullPath = resolve(process.cwd(), filePath);
  if (!existsSync(fullPath)) return;

  const lines = readFileSync(fullPath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const eqIdx = trimmed.indexOf("=");
    if (eqIdx <= 0) continue;

    const key = trimmed.slice(0, eqIdx).trim();
    let value = trimmed.slice(eqIdx + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
};

loadEnvFile(".env");
loadEnvFile(".env.local");

import { PrismaClient } from "@prisma/client";

const KEY_LENGTH = 64;
const PASSWORD_HASH_PREFIX = "scrypt";

const DEFAULTS = {
  adminEmail: "admin@sipos.local",
  adminPassword: "admin123",
  adminFullName: "Admin SIPOS",
  demoPassword: "demo123",
};

const hashPassword = (password) => {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, KEY_LENGTH).toString("hex");
  return `${PASSWORD_HASH_PREFIX}$${salt}$${hash}`;
};

const normalizeEmail = (email) => email.trim().toLowerCase();

// ─── Permission Catalog ───
const permissionCatalog = [
  { module: "dashboard_pos", action: "read", description: "Akses dashboard operasional POS" },
  { module: "sales", action: "create", description: "Buat transaksi sale" },
  { module: "sales", action: "read", description: "Lihat transaksi sale" },
  { module: "sales", action: "update", description: "Ubah transaksi sale" },
  { module: "sales", action: "delete", description: "Hapus transaksi sale" },
  { module: "sales", action: "print", description: "Print struk sale" },
  { module: "sales", action: "export", description: "Export data sale" },
  { module: "sales_approval", action: "read", description: "Lihat antrian approval sale" },
  { module: "sales_approval", action: "approve", description: "Approve sale" },
  { module: "purchase", action: "create", description: "Buat purchase" },
  { module: "purchase", action: "read", description: "Lihat purchase" },
  { module: "purchase", action: "update", description: "Ubah purchase" },
  { module: "purchase", action: "delete", description: "Hapus purchase" },
  { module: "purchase", action: "approve", description: "Approve purchase" },
  { module: "purchase", action: "print", description: "Print dokumen purchase" },
  { module: "purchase", action: "export", description: "Export data purchase" },
  { module: "stock_management", action: "create", description: "Buat stock movement" },
  { module: "stock_management", action: "read", description: "Lihat stock movement" },
  { module: "stock_management", action: "update", description: "Ubah stock movement" },
  { module: "stock_management", action: "delete", description: "Hapus stock movement" },
  { module: "stock_management", action: "export", description: "Export stock movement" },
  { module: "inventory", action: "create", description: "Buat item inventory" },
  { module: "inventory", action: "read", description: "Lihat inventory" },
  { module: "inventory", action: "update", description: "Ubah inventory" },
  { module: "inventory", action: "delete", description: "Hapus inventory" },
  { module: "inventory", action: "export", description: "Export inventory" },
  { module: "category", action: "create", description: "Buat kategori" },
  { module: "category", action: "read", description: "Lihat kategori" },
  { module: "category", action: "update", description: "Ubah kategori" },
  { module: "category", action: "delete", description: "Hapus kategori" },
  { module: "category", action: "export", description: "Export kategori" },
  { module: "reports", action: "read", description: "Lihat laporan POS" },
  { module: "reports", action: "print", description: "Print laporan POS" },
  { module: "reports", action: "export", description: "Export laporan POS" },
  { module: "user_role", action: "create", description: "Buat user/role" },
  { module: "user_role", action: "read", description: "Lihat user/role" },
  { module: "user_role", action: "update", description: "Ubah user/role" },
  { module: "user_role", action: "delete", description: "Hapus user/role" },
  { module: "settings", action: "create", description: "Buat setting POS" },
  { module: "settings", action: "read", description: "Lihat setting POS" },
  { module: "settings", action: "update", description: "Ubah setting POS" },
  { module: "settings", action: "delete", description: "Hapus setting POS" },
  { module: "settings", action: "export", description: "Export setting POS" },
];

// ─── Role Seed ───
const roleSeed = [
  { code: "admin", name: "Admin", description: "Akses penuh" },
  { code: "fnb", name: "FnB", description: "Operasional sales tanpa approval" },
  {
    code: "fnb_manager",
    name: "FnB Manager",
    description: "Sales, approval, purchase, stock management",
  },
  { code: "host", name: "Host", description: "Operasional dashboard dan create sales" },
];

// ─── Role → Permission Map ───
const rolePermissionMap = {
  admin: [
    "dashboard_pos:read",
    "sales:create", "sales:read", "sales:update", "sales:delete", "sales:print", "sales:export",
    "sales_approval:read", "sales_approval:approve",
    "purchase:create", "purchase:read", "purchase:update", "purchase:delete",
    "purchase:approve", "purchase:print", "purchase:export",
    "stock_management:create", "stock_management:read", "stock_management:update",
    "stock_management:delete", "stock_management:export",
    "inventory:create", "inventory:read", "inventory:update", "inventory:delete", "inventory:export",
    "category:create", "category:read", "category:update", "category:delete", "category:export",
    "reports:read", "reports:print", "reports:export",
    "user_role:create", "user_role:read", "user_role:update", "user_role:delete",
    "settings:create", "settings:read", "settings:update", "settings:delete", "settings:export",
  ],
  fnb: ["dashboard_pos:read", "sales:create", "sales:read", "sales:print"],
  fnb_manager: [
    "dashboard_pos:read",
    "sales:create", "sales:read", "sales:update", "sales:delete", "sales:print", "sales:export",
    "sales_approval:read", "sales_approval:approve",
    "purchase:create", "purchase:read", "purchase:update", "purchase:delete",
    "purchase:approve", "purchase:print", "purchase:export",
    "stock_management:create", "stock_management:read", "stock_management:update",
    "stock_management:delete", "stock_management:export",
    "inventory:read", "category:read",
    "reports:read", "reports:print", "reports:export",
  ],
  host: ["dashboard_pos:read", "sales:create", "sales:read", "sales:print"],
};

// ─── Seed Users ───
const seedUsers = [
  {
    email: DEFAULTS.adminEmail,
    fullName: DEFAULTS.adminFullName,
    password: DEFAULTS.adminPassword,
    roleCode: "admin",
  },
  {
    email: "manager@demo.sipos.local",
    fullName: "FnB Manager Demo",
    password: DEFAULTS.demoPassword,
    roleCode: "fnb_manager",
  },
  {
    email: "fnb@demo.sipos.local",
    fullName: "FnB Demo",
    password: DEFAULTS.demoPassword,
    roleCode: "fnb",
  },
  {
    email: "host@demo.sipos.local",
    fullName: "Host Demo",
    password: DEFAULTS.demoPassword,
    roleCode: "host",
  },
];

// ─── DDL ───
const createTables = async (prisma) => {
  console.log("Creating tables (if not exist)...");

  await prisma.$executeRawUnsafe(`CREATE EXTENSION IF NOT EXISTS pgcrypto`);

  await prisma.$executeRawUnsafe(`
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'role_code') THEN
        CREATE TYPE public.role_code AS ENUM ('admin','fnb','fnb_manager','host');
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'permission_action') THEN
        CREATE TYPE public.permission_action AS ENUM ('create','read','update','delete','approve','print','export');
      END IF;
    END $$
  `);

  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS public.roles (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      code public.role_code NOT NULL UNIQUE,
      name text NOT NULL,
      description text,
      created_at timestamptz NOT NULL DEFAULT now()
    )
  `);

  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS public.users (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      email text NOT NULL UNIQUE,
      full_name text NOT NULL,
      password_hash text NOT NULL,
      role_id uuid NOT NULL REFERENCES public.roles(id) ON DELETE CASCADE,
      is_active boolean NOT NULL DEFAULT true,
      created_at timestamptz NOT NULL DEFAULT now(),
      updated_at timestamptz NOT NULL DEFAULT now()
    )
  `);

  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS public.permissions (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      module text NOT NULL,
      action public.permission_action NOT NULL,
      permission_key text NOT NULL DEFAULT '',
      description text,
      created_at timestamptz NOT NULL DEFAULT now(),
      UNIQUE(module, action),
      UNIQUE(permission_key)
    )
  `);

  await prisma.$executeRawUnsafe(`
    CREATE OR REPLACE FUNCTION public.set_permission_key()
    RETURNS TRIGGER AS $fn$
    BEGIN
      NEW.permission_key := NEW.module || ':' || NEW.action::text;
      RETURN NEW;
    END;
    $fn$ LANGUAGE plpgsql
  `);

  await prisma.$executeRawUnsafe(`
    DO $$ BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_trigger WHERE tgname = 'trg_set_permission_key'
      ) THEN
        CREATE TRIGGER trg_set_permission_key
        BEFORE INSERT OR UPDATE ON public.permissions
        FOR EACH ROW EXECUTE FUNCTION public.set_permission_key();
      END IF;
    END $$
  `);

  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS public.role_permissions (
      role_id uuid NOT NULL REFERENCES public.roles(id) ON DELETE CASCADE,
      permission_id uuid NOT NULL REFERENCES public.permissions(id) ON DELETE CASCADE,
      created_at timestamptz NOT NULL DEFAULT now(),
      PRIMARY KEY (role_id, permission_id)
    )
  `);

  console.log("Tables ready.\n");
};

// ─── DML ───
const seedData = async (prisma) => {
  // 1. Roles
  const rolesByCode = {};
  for (const role of roleSeed) {
    rolesByCode[role.code] = await prisma.role.upsert({
      where: { code: role.code },
      update: { name: role.name, description: role.description },
      create: role,
    });
  }

  // 2. Permissions
  const permissionsByKey = {};
  for (const perm of permissionCatalog) {
    const key = `${perm.module}:${perm.action}`;
    const record = await prisma.permission.upsert({
      where: { module_action: { module: perm.module, action: perm.action } },
      update: { description: perm.description },
      create: { ...perm, permissionKey: key },
    });
    permissionsByKey[key] = record;
  }

  // 3. Role ↔ Permission mappings
  const managedPermissionIds = Object.values(permissionsByKey).map((p) => p.id);

  for (const [roleCode, permissionKeys] of Object.entries(rolePermissionMap)) {
    const role = rolesByCode[roleCode];
    const expectedPermissionIds = permissionKeys.map((k) => permissionsByKey[k].id);

    for (const permissionId of expectedPermissionIds) {
      await prisma.rolePermission.upsert({
        where: { roleId_permissionId: { roleId: role.id, permissionId } },
        update: {},
        create: { roleId: role.id, permissionId },
      });
    }

    // Clean up stale mappings
    const staleIds = managedPermissionIds.filter((id) => !expectedPermissionIds.includes(id));
    if (staleIds.length > 0) {
      await prisma.rolePermission.deleteMany({
        where: { roleId: role.id, permissionId: { in: staleIds } },
      });
    }
  }

  // 4. Users (with role_id directly)
  for (const user of seedUsers) {
    const role = rolesByCode[user.roleCode];
    const passwordHash = hashPassword(user.password);

    await prisma.user.upsert({
      where: { email: normalizeEmail(user.email) },
      update: {
        fullName: user.fullName,
        passwordHash,
        roleId: role.id,
        isActive: true,
      },
      create: {
        email: normalizeEmail(user.email),
        fullName: user.fullName,
        passwordHash,
        roleId: role.id,
        isActive: true,
      },
    });
  }

  return {
    roleCount: roleSeed.length,
    permissionCount: permissionCatalog.length,
    userCount: seedUsers.length,
  };
};

// ─── Main ───
const main = async () => {
  const prisma = new PrismaClient();

  try {
    await createTables(prisma);
    const result = await seedData(prisma);

    console.log("Seed finished.");
    console.log(JSON.stringify(result, null, 2));
    console.log("");
    console.log("Default credentials:");
    console.log(`  Admin  : ${DEFAULTS.adminEmail} / ${DEFAULTS.adminPassword}`);
    console.log(`  Manager: manager@demo.sipos.local / ${DEFAULTS.demoPassword}`);
    console.log(`  FnB    : fnb@demo.sipos.local / ${DEFAULTS.demoPassword}`);
    console.log(`  Host   : host@demo.sipos.local / ${DEFAULTS.demoPassword}`);
  } finally {
    await prisma.$disconnect();
  }
};

main().catch((error) => {
  console.error("Seed failed.");
  console.error(error);
  process.exitCode = 1;
});
