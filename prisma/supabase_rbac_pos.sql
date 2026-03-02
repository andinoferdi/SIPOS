-- ============================================================
-- SIPOS POS-Only Bootstrap SQL
-- Purpose:
-- 1) Build RBAC + workspace + POS instance + inventory schema (DDL)
-- 2) Seed baseline data (workspace, roles, permissions, role map, default instances)
-- Notes:
-- - This script is idempotent.
-- - User credential seeding tetap dilakukan oleh `npx tsx prisma/seed.ts`.
-- ============================================================

create extension if not exists pgcrypto;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'role_code') then
    create type public.role_code as enum ('admin','fnb','fnb_manager','host');
  end if;

  if not exists (select 1 from pg_type where typname = 'permission_action') then
    create type public.permission_action as enum ('create','read','update','delete','approve','print','export');
  end if;

  if not exists (select 1 from pg_type where typname = 'pos_instance_type') then
    create type public.pos_instance_type as enum ('TABLE_SERVICE','TAB_SERVICE');
  end if;

  if not exists (select 1 from pg_type where typname = 'charge_mode') then
    create type public.charge_mode as enum ('INCLUDE','EXCLUDE');
  end if;

  if not exists (select 1 from pg_type where typname = 'stock_movement_type') then
    create type public.stock_movement_type as enum ('PURCHASE_IN','SALE_OUT','ADJUSTMENT_IN','ADJUSTMENT_OUT','RETURN_IN','VOID_OUT');
  end if;

  if not exists (select 1 from pg_type where typname = 'stock_reference_type') then
    create type public.stock_reference_type as enum ('PURCHASE','SALE','ADJUSTMENT','MANUAL');
  end if;
end $$;

create table if not exists public.roles (
  id uuid primary key default gen_random_uuid(),
  code public.role_code not null unique,
  name text not null,
  description text,
  created_at timestamptz not null default now()
);

create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  full_name text not null,
  password_hash text not null,
  role_id uuid not null references public.roles(id) on delete cascade,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.permissions (
  id uuid primary key default gen_random_uuid(),
  module text not null,
  action public.permission_action not null,
  permission_key text not null,
  description text,
  created_at timestamptz not null default now(),
  unique(module, action),
  unique(permission_key)
);

create table if not exists public.role_permissions (
  role_id uuid not null references public.roles(id) on delete cascade,
  permission_id uuid not null references public.permissions(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (role_id, permission_id)
);

create table if not exists public.workspaces (
  id uuid primary key default gen_random_uuid(),
  code varchar(40) not null unique,
  name varchar(120) not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.pos_instances (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete restrict,
  name text not null,
  type public.pos_instance_type not null,
  total_table integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(workspace_id, name)
);

create table if not exists public.table_labels (
  id uuid primary key default gen_random_uuid(),
  pos_instance_id uuid not null references public.pos_instances(id) on delete cascade,
  position integer not null,
  label varchar(10) not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(pos_instance_id, position),
  unique(pos_instance_id, label)
);

create table if not exists public.inventory_categories (
  id uuid primary key default gen_random_uuid(),
  name varchar(160) not null unique,
  description text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.inventory_items (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.inventory_categories(id) on delete restrict,
  sku varchar(80) unique,
  name varchar(160) not null,
  unit varchar(40) not null,
  initial_price decimal(14,2) not null,
  price decimal(14,2) not null,
  service_charge_percent decimal(5,2) not null default 10,
  service_charge_mode public.charge_mode not null default 'EXCLUDE',
  tax_percent decimal(5,2) not null default 11,
  tax_mode public.charge_mode not null default 'EXCLUDE',
  stock integer not null default 0,
  unlimited_stock boolean not null default false,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.stock_movements (
  id uuid primary key default gen_random_uuid(),
  inventory_item_id uuid not null references public.inventory_items(id) on delete restrict,
  movement_type public.stock_movement_type not null,
  requested_qty integer not null,
  delta_qty integer not null,
  before_stock integer not null,
  after_stock integer not null,
  user_id uuid not null references public.users(id) on delete restrict,
  pos_instance_id uuid references public.pos_instances(id) on delete set null,
  reference_type public.stock_reference_type,
  reference_id varchar(120),
  notes varchar(500),
  moved_at timestamptz not null default now()
);

-- Indexes
create index if not exists workspaces_is_active_idx on public.workspaces(is_active);
create index if not exists pos_instances_workspace_id_is_active_idx on public.pos_instances(workspace_id, is_active);
create index if not exists inventory_categories_is_active_idx on public.inventory_categories(is_active);
create index if not exists inventory_items_category_id_is_active_idx on public.inventory_items(category_id, is_active);
create index if not exists inventory_items_name_idx on public.inventory_items(name);
create index if not exists inventory_items_unlimited_stock_idx on public.inventory_items(unlimited_stock);
create index if not exists stock_movements_inventory_item_id_moved_at_idx on public.stock_movements(inventory_item_id, moved_at);
create index if not exists stock_movements_moved_at_idx on public.stock_movements(moved_at);
create index if not exists stock_movements_user_id_moved_at_idx on public.stock_movements(user_id, moved_at);
create index if not exists stock_movements_pos_instance_id_moved_at_idx on public.stock_movements(pos_instance_id, moved_at);
create index if not exists stock_movements_reference_type_reference_id_idx on public.stock_movements(reference_type, reference_id);

-- Seed baseline data

insert into public.workspaces (code, name, is_active)
values ('main', 'Main Workspace', true)
on conflict (code)
do update set
  name = excluded.name,
  is_active = true,
  updated_at = now();

insert into public.roles (code, name, description) values
('admin','Admin','Akses penuh'),
('fnb','FnB','Operasional sales tanpa approval'),
('fnb_manager','FnB Manager','Sales, approval, purchase, stock management'),
('host','Host','Operasional dashboard dan create sales')
on conflict (code) do update set
  name = excluded.name,
  description = excluded.description;

with permission_catalog(module, action, description) as (
  values
  ('dashboard_pos','read','Akses dashboard operasional POS'),
  ('sales','create','Buat transaksi sale'),
  ('sales','read','Lihat transaksi sale'),
  ('sales','update','Ubah transaksi sale'),
  ('sales','delete','Hapus transaksi sale'),
  ('sales','print','Print struk sale'),
  ('sales','export','Export data sale'),
  ('sales_approval','read','Lihat antrian approval sale'),
  ('sales_approval','approve','Approve sale'),
  ('purchase','create','Buat purchase'),
  ('purchase','read','Lihat purchase'),
  ('purchase','update','Ubah purchase'),
  ('purchase','delete','Hapus purchase'),
  ('purchase','approve','Approve purchase'),
  ('purchase','print','Print dokumen purchase'),
  ('purchase','export','Export data purchase'),
  ('stock_management','create','Buat stock movement'),
  ('stock_management','read','Lihat stock movement'),
  ('stock_management','update','Ubah stock movement'),
  ('stock_management','delete','Hapus stock movement'),
  ('stock_management','export','Export stock movement'),
  ('inventory','create','Buat item inventory'),
  ('inventory','read','Lihat inventory'),
  ('inventory','update','Ubah inventory'),
  ('inventory','delete','Hapus inventory'),
  ('inventory','export','Export inventory'),
  ('category','create','Buat kategori'),
  ('category','read','Lihat kategori'),
  ('category','update','Ubah kategori'),
  ('category','delete','Hapus kategori'),
  ('category','export','Export kategori'),
  ('reports','read','Lihat laporan POS'),
  ('reports','print','Print laporan POS'),
  ('reports','export','Export laporan POS'),
  ('user_role','create','Buat user/role'),
  ('user_role','read','Lihat user/role'),
  ('user_role','update','Ubah user/role'),
  ('user_role','delete','Hapus user/role'),
  ('settings','create','Buat setting POS'),
  ('settings','read','Lihat setting POS'),
  ('settings','update','Ubah setting POS'),
  ('settings','delete','Hapus setting POS'),
  ('settings','export','Export setting POS'),
  ('pos_instance','create','Buat POS Instance'),
  ('pos_instance','read','Lihat POS Instance'),
  ('pos_instance','update','Ubah POS Instance'),
  ('pos_instance','delete','Hapus POS Instance')
)
insert into public.permissions(module, action, permission_key, description)
select module, action::public.permission_action, module || ':' || action, description
from permission_catalog
on conflict (module, action)
do update set
  description = excluded.description;

with role_permission_map(role_code, module, action) as (
  values
  ('admin','dashboard_pos','read'),
  ('admin','sales','create'),
  ('admin','sales','read'),
  ('admin','sales','update'),
  ('admin','sales','delete'),
  ('admin','sales','print'),
  ('admin','sales','export'),
  ('admin','sales_approval','read'),
  ('admin','sales_approval','approve'),
  ('admin','purchase','create'),
  ('admin','purchase','read'),
  ('admin','purchase','update'),
  ('admin','purchase','delete'),
  ('admin','purchase','approve'),
  ('admin','purchase','print'),
  ('admin','purchase','export'),
  ('admin','stock_management','create'),
  ('admin','stock_management','read'),
  ('admin','stock_management','update'),
  ('admin','stock_management','delete'),
  ('admin','stock_management','export'),
  ('admin','inventory','create'),
  ('admin','inventory','read'),
  ('admin','inventory','update'),
  ('admin','inventory','delete'),
  ('admin','inventory','export'),
  ('admin','category','create'),
  ('admin','category','read'),
  ('admin','category','update'),
  ('admin','category','delete'),
  ('admin','category','export'),
  ('admin','reports','read'),
  ('admin','reports','print'),
  ('admin','reports','export'),
  ('admin','user_role','create'),
  ('admin','user_role','read'),
  ('admin','user_role','update'),
  ('admin','user_role','delete'),
  ('admin','settings','create'),
  ('admin','settings','read'),
  ('admin','settings','update'),
  ('admin','settings','delete'),
  ('admin','settings','export'),
  ('admin','pos_instance','create'),
  ('admin','pos_instance','read'),
  ('admin','pos_instance','update'),
  ('admin','pos_instance','delete'),

  ('fnb','dashboard_pos','read'),
  ('fnb','sales','create'),
  ('fnb','sales','read'),
  ('fnb','sales','print'),
  ('fnb','pos_instance','read'),

  ('fnb_manager','dashboard_pos','read'),
  ('fnb_manager','sales','create'),
  ('fnb_manager','sales','read'),
  ('fnb_manager','sales','update'),
  ('fnb_manager','sales','delete'),
  ('fnb_manager','sales','print'),
  ('fnb_manager','sales','export'),
  ('fnb_manager','sales_approval','read'),
  ('fnb_manager','sales_approval','approve'),
  ('fnb_manager','purchase','create'),
  ('fnb_manager','purchase','read'),
  ('fnb_manager','purchase','update'),
  ('fnb_manager','purchase','delete'),
  ('fnb_manager','purchase','approve'),
  ('fnb_manager','purchase','print'),
  ('fnb_manager','purchase','export'),
  ('fnb_manager','stock_management','create'),
  ('fnb_manager','stock_management','read'),
  ('fnb_manager','stock_management','update'),
  ('fnb_manager','stock_management','delete'),
  ('fnb_manager','stock_management','export'),
  ('fnb_manager','inventory','read'),
  ('fnb_manager','category','read'),
  ('fnb_manager','reports','read'),
  ('fnb_manager','reports','print'),
  ('fnb_manager','reports','export'),
  ('fnb_manager','pos_instance','read'),

  ('host','dashboard_pos','read'),
  ('host','sales','create'),
  ('host','sales','read'),
  ('host','sales','print'),
  ('host','pos_instance','read')
)
insert into public.role_permissions(role_id, permission_id)
select r.id, p.id
from role_permission_map rpm
join public.roles r on r.code = rpm.role_code::public.role_code
join public.permissions p
  on p.module = rpm.module
 and p.action = rpm.action::public.permission_action
on conflict (role_id, permission_id) do nothing;

with workspace as (
  select id from public.workspaces where code = 'main'
), instances(name, type, total_table) as (
  values
  ('Main Floor', 'TABLE_SERVICE'::public.pos_instance_type, 20),
  ('Tab Counter', 'TAB_SERVICE'::public.pos_instance_type, 0)
)
insert into public.pos_instances (workspace_id, name, type, total_table, is_active)
select w.id, i.name, i.type, i.total_table, true
from workspace w
cross join instances i
on conflict (workspace_id, name)
do update set
  type = excluded.type,
  total_table = excluded.total_table,
  is_active = true,
  updated_at = now();
