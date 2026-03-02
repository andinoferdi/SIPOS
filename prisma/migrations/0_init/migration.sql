-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "public"."charge_mode" AS ENUM ('INCLUDE', 'EXCLUDE');

-- CreateEnum
CREATE TYPE "public"."permission_action" AS ENUM ('create', 'read', 'update', 'delete', 'approve', 'print', 'export');

-- CreateEnum
CREATE TYPE "public"."pos_instance_type" AS ENUM ('TABLE_SERVICE', 'TAB_SERVICE');

-- CreateEnum
CREATE TYPE "public"."role_code" AS ENUM ('admin', 'fnb', 'fnb_manager', 'host');

-- CreateEnum
CREATE TYPE "public"."stock_movement_type" AS ENUM ('PURCHASE_IN', 'SALE_OUT', 'ADJUSTMENT_IN', 'ADJUSTMENT_OUT', 'RETURN_IN', 'VOID_OUT');

-- CreateEnum
CREATE TYPE "public"."stock_reference_type" AS ENUM ('PURCHASE', 'SALE', 'ADJUSTMENT', 'MANUAL');

-- CreateTable
CREATE TABLE "public"."workspaces" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "code" VARCHAR(40) NOT NULL,
    "name" VARCHAR(120) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "workspaces_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."users" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "role_id" UUID NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."roles" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "code" "public"."role_code" NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."permissions" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "module" TEXT NOT NULL,
    "action" "public"."permission_action" NOT NULL,
    "permission_key" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."role_permissions" (
    "role_id" UUID NOT NULL,
    "permission_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "role_permissions_pkey" PRIMARY KEY ("role_id","permission_id")
);

-- CreateTable
CREATE TABLE "public"."pos_instances" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "workspace_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "type" "public"."pos_instance_type" NOT NULL,
    "total_table" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "pos_instances_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."table_labels" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "pos_instance_id" UUID NOT NULL,
    "position" INTEGER NOT NULL,
    "label" VARCHAR(10) NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "table_labels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."inventory_categories" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(160) NOT NULL,
    "description" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "inventory_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."inventory_items" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "category_id" UUID NOT NULL,
    "sku" VARCHAR(80),
    "name" VARCHAR(160) NOT NULL,
    "unit" VARCHAR(40) NOT NULL,
    "initial_price" DECIMAL(14,2) NOT NULL,
    "price" DECIMAL(14,2) NOT NULL,
    "service_charge_percent" DECIMAL(5,2) NOT NULL DEFAULT 10,
    "service_charge_mode" "public"."charge_mode" NOT NULL DEFAULT 'EXCLUDE',
    "tax_percent" DECIMAL(5,2) NOT NULL DEFAULT 11,
    "tax_mode" "public"."charge_mode" NOT NULL DEFAULT 'EXCLUDE',
    "stock" INTEGER NOT NULL DEFAULT 0,
    "unlimited_stock" BOOLEAN NOT NULL DEFAULT false,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "inventory_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."stock_movements" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "inventory_item_id" UUID NOT NULL,
    "movement_type" "public"."stock_movement_type" NOT NULL,
    "requested_qty" INTEGER NOT NULL,
    "delta_qty" INTEGER NOT NULL,
    "before_stock" INTEGER NOT NULL,
    "after_stock" INTEGER NOT NULL,
    "user_id" UUID NOT NULL,
    "pos_instance_id" UUID,
    "reference_type" "public"."stock_reference_type",
    "reference_id" VARCHAR(120),
    "notes" VARCHAR(500),
    "moved_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "stock_movements_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "workspaces_is_active_idx" ON "public"."workspaces"("is_active");

-- CreateIndex
CREATE UNIQUE INDEX "workspaces_code_key" ON "public"."workspaces"("code");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "roles_code_key" ON "public"."roles"("code");

-- CreateIndex
CREATE UNIQUE INDEX "permissions_permission_key_key" ON "public"."permissions"("permission_key");

-- CreateIndex
CREATE UNIQUE INDEX "permissions_module_action_key" ON "public"."permissions"("module", "action");

-- CreateIndex
CREATE UNIQUE INDEX "pos_instances_workspace_id_name_key" ON "public"."pos_instances"("workspace_id", "name");

-- CreateIndex
CREATE INDEX "pos_instances_workspace_id_is_active_idx" ON "public"."pos_instances"("workspace_id", "is_active");

-- CreateIndex
CREATE UNIQUE INDEX "table_labels_pos_instance_id_position_key" ON "public"."table_labels"("pos_instance_id", "position");

-- CreateIndex
CREATE UNIQUE INDEX "table_labels_pos_instance_id_label_key" ON "public"."table_labels"("pos_instance_id", "label");

-- CreateIndex
CREATE UNIQUE INDEX "inventory_categories_name_key" ON "public"."inventory_categories"("name");

-- CreateIndex
CREATE INDEX "inventory_categories_is_active_idx" ON "public"."inventory_categories"("is_active");

-- CreateIndex
CREATE UNIQUE INDEX "inventory_items_sku_key" ON "public"."inventory_items"("sku");

-- CreateIndex
CREATE INDEX "inventory_items_category_id_is_active_idx" ON "public"."inventory_items"("category_id", "is_active");

-- CreateIndex
CREATE INDEX "inventory_items_name_idx" ON "public"."inventory_items"("name");

-- CreateIndex
CREATE INDEX "inventory_items_unlimited_stock_idx" ON "public"."inventory_items"("unlimited_stock");

-- CreateIndex
CREATE INDEX "stock_movements_inventory_item_id_moved_at_idx" ON "public"."stock_movements"("inventory_item_id", "moved_at");

-- CreateIndex
CREATE INDEX "stock_movements_moved_at_idx" ON "public"."stock_movements"("moved_at");

-- CreateIndex
CREATE INDEX "stock_movements_user_id_moved_at_idx" ON "public"."stock_movements"("user_id", "moved_at");

-- CreateIndex
CREATE INDEX "stock_movements_pos_instance_id_moved_at_idx" ON "public"."stock_movements"("pos_instance_id", "moved_at");

-- CreateIndex
CREATE INDEX "stock_movements_reference_type_reference_id_idx" ON "public"."stock_movements"("reference_type", "reference_id");

-- AddForeignKey
ALTER TABLE "public"."users" ADD CONSTRAINT "users_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."role_permissions" ADD CONSTRAINT "role_permissions_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."role_permissions" ADD CONSTRAINT "role_permissions_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "public"."permissions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."pos_instances" ADD CONSTRAINT "pos_instances_workspace_id_fkey" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspaces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."table_labels" ADD CONSTRAINT "table_labels_pos_instance_id_fkey" FOREIGN KEY ("pos_instance_id") REFERENCES "public"."pos_instances"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."inventory_items" ADD CONSTRAINT "inventory_items_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."inventory_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."stock_movements" ADD CONSTRAINT "stock_movements_inventory_item_id_fkey" FOREIGN KEY ("inventory_item_id") REFERENCES "public"."inventory_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."stock_movements" ADD CONSTRAINT "stock_movements_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."stock_movements" ADD CONSTRAINT "stock_movements_pos_instance_id_fkey" FOREIGN KEY ("pos_instance_id") REFERENCES "public"."pos_instances"("id") ON DELETE SET NULL ON UPDATE CASCADE;
