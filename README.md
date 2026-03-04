# SIPOS - Setup Guide

Panduan langkah demi langkah untuk menjalankan project ini dari nol.

## Prasyarat

- [Node.js](https://nodejs.org/) versi 20 atau lebih baru
- [Git](https://git-scm.com/)
- Akun [Supabase](https://supabase.com/) untuk database
- Akun [GitHub](https://github.com/) opsional untuk login provider

---

## 1. Clone Project

```bash
git clone https://github.com/andinoferdi/SIPOS.git
cd SIPOS
```

## 2. Install Dependencies

```bash
npm install
```

## 3. Konfigurasi Environment Variables

Gunakan file `.env` untuk runtime lokal.`r`n`r`nCommit hanya `.env.example`, jangan commit `.env`.

Isi `.env` dengan format berikut dulu:

```env
NEXTAUTH_SECRET="ganti_dengan_string_acak_panjang"
NEXTAUTH_URL="http://localhost:3000"

# Runtime app untuk serverless (transaction pooler)
DATABASE_URL="postgresql://postgres.[project-ref]:[PASSWORD]@aws-1-[region].pooler.supabase.com:6543/postgres?pgbouncer=true"

# Direct/session connection untuk CLI, migration, dan seed
DIRECT_URL="postgresql://postgres.[project-ref]:[PASSWORD]@aws-1-[region].pooler.supabase.com:5432/postgres"

NEXT_PUBLIC_SUPABASE_URL="https://[project-ref].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY=""
```

Catatan penting:

1. Password wajib URL-encoded jika ada karakter khusus seperti `#`, `@`, `!`.
2. Standar tim deploy serverless: `DATABASE_URL` = port `6543`, `DIRECT_URL` = port `5432`.

---

## 4. Setup Supabase

1. Buka [database.new](https://database.new), lalu buat project baru.
2. Simpan password database Anda karena akan dipakai di connection string.
3. Di dashboard project, klik tombol `Connect` di header.
4. Pilih tab `ORMs`, lalu pilih tool `Prisma`.
5. Salin `DATABASE_URL` dan `DIRECT_URL`.
6. Tempel nilainya ke file `.env`:
   1. `DATABASE_URL` pakai transaction pooler `6543` dan `pgbouncer=true`.
   2. `DIRECT_URL` pakai session/direct `5432`.

Jika lupa password database:

1. Buka menu `Database` di sidebar kiri.
2. Masuk ke `Settings`.
3. Klik `Reset database password`.
4. Update password baru di `DATABASE_URL` dan `DIRECT_URL`.

Untuk key Supabase client:

1. Buka `Project Settings`.
2. Pilih `API Keys`.
3. Di tab `Publishable and secret API keys`, ambil URL project dan publishable key.
4. Jika tetap butuh anon key legacy, ambil dari tab `Legacy anon, service_role API keys`.

Referensi:

1. https://supastarter.dev/docs/nextjs/recipes/supabase-setup
2. https://supabase.com/docs/guides/troubleshooting/how-do-i-reset-my-supabase-database-password-oTs5sB
3. https://supabase.com/docs/guides/database/prisma
4. https://supabase.com/docs/reference/postgres/connection-strings

---

## 5. Setup Database

Generate Prisma Client:

```bash
npm run prisma:generate
```

Jalankan migration untuk membuat tabel:

```bash
npx prisma migrate deploy
```

Seed data awal:

```bash
npm run prisma:seed
```

Command ala Laravel untuk reset lokal:

```bash
npm run migrate:fresh -- --confirm
```

Command ala Laravel untuk reset + seed:

```bash
npm run migrate:fresh:seed -- --confirm
```

Catatan command fresh:

1. Command ini destruktif dan menghapus seluruh data database target.
2. Command fresh wajib flag `--confirm`.
3. Command fresh wajib memakai `DIRECT_URL`.
4. Untuk alur deploy normal non-destruktif, tetap gunakan `npx prisma migrate deploy`.

Catatan koneksi:

1. Migration dan seed berjalan lewat `DIRECT_URL` (port `5432`).
2. Runtime app di Vercel/serverless memakai `DATABASE_URL` (port `6543`).
3. Seed memakai Prisma Client, bukan raw SQL.

Default credentials hasil seed:

| Role    | Email                      | Password   |
| :------ | :------------------------- | :--------- |
| Admin   | `admin@sipos.local`        | `admin123` |
| Manager | `manager@demo.sipos.local` | `demo123`  |
| FnB     | `fnb@demo.sipos.local`     | `demo123`  |
| Host    | `host@demo.sipos.local`    | `demo123`  |

---

## 6. Menjalankan Aplikasi

Development:

```bash
npm run dev
```

Production:

```bash
npm run build
npm start
```

Buka di `http://localhost:3000`.

---

## Troubleshooting

Jika koneksi database bermasalah:

1. Pastikan password di URL sudah URL-encoded jika ada karakter khusus.
2. Pastikan project Supabase tidak dalam keadaan paused.
3. Tes koneksi direct:

```powershell
Test-NetConnection aws-1-ap-southeast-2.pooler.supabase.com -Port 5432
```

4. Jika migration gagal dengan "drift detected", reset database lalu deploy ulang:

```bash
npm run migrate:fresh:seed -- --confirm
npm run prisma:generate
```

---

## Tips Tambahan

- Jika mengubah `prisma/schema.prisma`, buat migration baru:

```bash
npm run prisma:migrate -- --name nama_perubahan
```

- Untuk lihat data DB di browser:

```bash
npx prisma studio
```

## Validasi

```bash
npm run typecheck
npm run lint
npm run test:unit
npm run build
```

## Audit Keamanan Dependency

Jalankan audit lengkap:

```bash
npm run audit
```

Jalankan gate audit untuk runtime aplikasi:

```bash
npm run audit:prod
```

Catatan:

1. Moderate vulnerability saat ini berasal dari dependency tooling internal Prisma.
2. Jangan pakai `npm audit fix --force` karena akan menurunkan Prisma ke `6.19.2` dan melanggar baseline `7.4.2`.

## Catatan Kepatuhan API

1. Endpoint domain internal di `src/app/api/portal/*` memakai format respons `{ ok: true, data }` dan `{ ok: false, error }`.
2. Endpoint `src/app/api/auth/[...nextauth]/route.ts` adalah integrasi framework NextAuth dan diperlakukan non-applicable untuk format respons internal.

