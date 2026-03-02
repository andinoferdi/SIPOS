import { randomBytes, scryptSync } from "node:crypto";
import { config } from "dotenv";
import { PrismaClient, RoleCode, PermissionAction, POSInstanceType } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

config();

const connectionString = process.env.DIRECT_URL ?? process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DIRECT_URL or DATABASE_URL is required for seeding.");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({
  adapter,
  log: ["warn", "error"],
});

const KEY_LENGTH = 64;
const SCRYPT_PREFIX = "scrypt";

function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, KEY_LENGTH).toString("hex");
  return `${SCRYPT_PREFIX}$${salt}$${hash}`;
}

const DEFAULTS = {
  adminEmail: "admin@sipos.local",
  adminPassword: "admin123",
  adminFullName: "Admin SIPOS",
  demoPassword: "demo123",
};

type PermissionEntry = {
  module: string;
  action: PermissionAction;
  description: string;
};

const permissionCatalog: PermissionEntry[] = [
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
  { module: "pos_instance", action: "create", description: "Buat POS Instance" },
  { module: "pos_instance", action: "read", description: "Lihat POS Instance" },
  { module: "pos_instance", action: "update", description: "Ubah POS Instance" },
  { module: "pos_instance", action: "delete", description: "Hapus POS Instance" },
];

const roleSeed: { code: RoleCode; name: string; description: string }[] = [
  { code: "admin", name: "Admin", description: "Akses penuh" },
  { code: "fnb", name: "FnB", description: "Operasional sales tanpa approval" },
  { code: "fnb_manager", name: "FnB Manager", description: "Sales, approval, purchase, stock management" },
  { code: "host", name: "Host", description: "Operasional dashboard dan create sales" },
];

const rolePermissionMap: Record<RoleCode, string[]> = {
  admin: [
    "dashboard_pos:read",
    "sales:create", "sales:read", "sales:update", "sales:delete", "sales:print", "sales:export",
    "sales_approval:read", "sales_approval:approve",
    "purchase:create", "purchase:read", "purchase:update", "purchase:delete", "purchase:approve", "purchase:print", "purchase:export",
    "stock_management:create", "stock_management:read", "stock_management:update", "stock_management:delete", "stock_management:export",
    "inventory:create", "inventory:read", "inventory:update", "inventory:delete", "inventory:export",
    "category:create", "category:read", "category:update", "category:delete", "category:export",
    "reports:read", "reports:print", "reports:export",
    "user_role:create", "user_role:read", "user_role:update", "user_role:delete",
    "settings:create", "settings:read", "settings:update", "settings:delete", "settings:export",
    "pos_instance:create", "pos_instance:read", "pos_instance:update", "pos_instance:delete",
  ],
  fnb: [
    "dashboard_pos:read", "sales:create", "sales:read", "sales:print", "pos_instance:read",
  ],
  fnb_manager: [
    "dashboard_pos:read",
    "sales:create", "sales:read", "sales:update", "sales:delete", "sales:print", "sales:export",
    "sales_approval:read", "sales_approval:approve",
    "purchase:create", "purchase:read", "purchase:update", "purchase:delete", "purchase:approve", "purchase:print", "purchase:export",
    "stock_management:create", "stock_management:read", "stock_management:update", "stock_management:delete", "stock_management:export",
    "inventory:read", "category:read",
    "reports:read", "reports:print", "reports:export",
    "pos_instance:read",
  ],
  host: [
    "dashboard_pos:read", "sales:create", "sales:read", "sales:print", "pos_instance:read",
  ],
};

const seedUsers = [
  { email: DEFAULTS.adminEmail, fullName: DEFAULTS.adminFullName, password: DEFAULTS.adminPassword, roleCode: "admin" as RoleCode },
  { email: "manager@demo.sipos.local", fullName: "FnB Manager Demo", password: DEFAULTS.demoPassword, roleCode: "fnb_manager" as RoleCode },
  { email: "fnb@demo.sipos.local", fullName: "FnB Demo", password: DEFAULTS.demoPassword, roleCode: "fnb" as RoleCode },
  { email: "host@demo.sipos.local", fullName: "Host Demo", password: DEFAULTS.demoPassword, roleCode: "host" as RoleCode },
];

const inventoryCategorySeed = [
  { name: "Beverages", description: "Minuman untuk operasional POS" },
  { name: "Foods", description: "Makanan untuk operasional POS" },
  { name: "Supplies", description: "Perlengkapan operasional dan bahan pendukung" },
];

const posInstanceSeed: { name: string; type: POSInstanceType; totalTable: number }[] = [
  { name: "Main Floor", type: "TABLE_SERVICE", totalTable: 20 },
  { name: "Tab Counter", type: "TAB_SERVICE", totalTable: 0 },
];

async function seedRoles() {
  const roleMap = new Map<RoleCode, string>();

  for (const role of roleSeed) {
    const result = await prisma.role.upsert({
      where: { code: role.code },
      update: { name: role.name, description: role.description },
      create: { code: role.code, name: role.name, description: role.description },
    });
    roleMap.set(role.code, result.id);
  }

  console.log(`Roles seeded: ${roleMap.size}`);
  return roleMap;
}

async function seedPermissions() {
  const permMap = new Map<string, string>();

  for (const perm of permissionCatalog) {
    const key = `${perm.module}:${perm.action}`;
    const result = await prisma.permission.upsert({
      where: { module_action: { module: perm.module, action: perm.action } },
      update: { description: perm.description, permissionKey: key },
      create: { module: perm.module, action: perm.action, permissionKey: key, description: perm.description },
    });
    permMap.set(key, result.id);
  }

  console.log(`Permissions seeded: ${permMap.size}`);
  return permMap;
}

async function seedRolePermissions(roleMap: Map<RoleCode, string>, permMap: Map<string, string>) {
  let created = 0;

  for (const [roleCode, permKeys] of Object.entries(rolePermissionMap)) {
    const roleId = roleMap.get(roleCode as RoleCode);
    if (!roleId) continue;

    for (const key of permKeys) {
      const permId = permMap.get(key);
      if (!permId) continue;

      await prisma.rolePermission.upsert({
        where: { roleId_permissionId: { roleId, permissionId: permId } },
        update: {},
        create: { roleId, permissionId: permId },
      });
      created++;
    }

    // Hapus permission lama yang tidak ada di map
    const expectedPermIds = permKeys
      .map((k) => permMap.get(k))
      .filter((id): id is string => id !== undefined);

    await prisma.rolePermission.deleteMany({
      where: {
        roleId,
        permissionId: { notIn: expectedPermIds },
      },
    });
  }

  console.log(`Role-permissions seeded: ${created}`);
}

async function seedAppUsers(roleMap: Map<RoleCode, string>) {
  for (const user of seedUsers) {
    const roleId = roleMap.get(user.roleCode);
    if (!roleId) continue;

    const passwordHash = hashPassword(user.password);

    await prisma.user.upsert({
      where: { email: user.email.trim().toLowerCase() },
      update: {
        fullName: user.fullName,
        passwordHash,
        roleId,
        isActive: true,
      },
      create: {
        email: user.email.trim().toLowerCase(),
        fullName: user.fullName,
        passwordHash,
        roleId,
        isActive: true,
      },
    });
  }

  console.log(`Users seeded: ${seedUsers.length}`);
}

async function seedWorkspaceAndPosInstances() {
  const workspace = await prisma.workspace.upsert({
    where: { code: "main" },
    update: { name: "Main Workspace", isActive: true },
    create: { code: "main", name: "Main Workspace", isActive: true },
  });

  for (const instance of posInstanceSeed) {
    const pos = await prisma.pOSInstance.upsert({
      where: { workspaceId_name: { workspaceId: workspace.id, name: instance.name } },
      update: { type: instance.type, totalTable: instance.totalTable, isActive: true },
      create: {
        workspaceId: workspace.id,
        name: instance.name,
        type: instance.type,
        totalTable: instance.totalTable,
        isActive: true,
      },
    });

    if (pos.type === "TABLE_SERVICE" && pos.totalTable > 0) {
      for (let position = 1; position <= pos.totalTable; position++) {
        await prisma.tableLabel.upsert({
          where: { posInstanceId_position: { posInstanceId: pos.id, position } },
          update: {},
          create: { posInstanceId: pos.id, position, label: `${position}` },
        });
      }

      await prisma.tableLabel.deleteMany({
        where: { posInstanceId: pos.id, position: { gt: pos.totalTable } },
      });
    } else {
      await prisma.tableLabel.deleteMany({
        where: { posInstanceId: pos.id },
      });
    }
  }

  console.log(`Workspace + POS instances seeded.`);
}

async function seedInventoryCategories() {
  for (const category of inventoryCategorySeed) {
    await prisma.inventoryCategory.upsert({
      where: { name: category.name },
      update: { description: category.description, isActive: true },
      create: { name: category.name, description: category.description, isActive: true },
    });
  }

  console.log(`Inventory categories seeded: ${inventoryCategorySeed.length}`);
}

async function main() {
  console.log("Seeding database via Prisma Client...\n");

  const roleMap = await seedRoles();
  const permMap = await seedPermissions();
  await seedRolePermissions(roleMap, permMap);
  await seedAppUsers(roleMap);
  await seedWorkspaceAndPosInstances();
  await seedInventoryCategories();

  const [roleCount, permCount, userCount, wsCount, posCount] = await Promise.all([
    prisma.role.count(),
    prisma.permission.count(),
    prisma.user.count(),
    prisma.workspace.count(),
    prisma.pOSInstance.count(),
  ]);

  console.log("\nSeed finished.");
  console.log(JSON.stringify({ roleCount, permCount, userCount, wsCount, posCount }, null, 2));
  console.log("");
  console.log("Default credentials:");
  console.log(`  Admin  : ${DEFAULTS.adminEmail} / ${DEFAULTS.adminPassword}`);
  console.log(`  Manager: manager@demo.sipos.local / ${DEFAULTS.demoPassword}`);
  console.log(`  FnB    : fnb@demo.sipos.local / ${DEFAULTS.demoPassword}`);
  console.log(`  Host   : host@demo.sipos.local / ${DEFAULTS.demoPassword}`);
}

main()
  .catch((error) => {
    console.error("Seed failed.");
    console.error(JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
    if (error?.cause) {
      console.error("Cause:", JSON.stringify(error.cause, Object.getOwnPropertyNames(error.cause), 2));
    }
    process.exitCode = 1;
  })
  .finally(() => {
    void prisma.$disconnect();
  });
