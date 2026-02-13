# Next.js Prisma Auth Starter - Setup Guide

Panduan langkah demi langkah untuk menjalankan project ini dari nol.

## Prasyarat

- [Node.js](https://nodejs.org/) (versi 20 atau lebih baru)
- [Git](https://git-scm.com/)
- Akun [Supabase](https://supabase.com/) (untuk database)
- Akun [GitHub](https://github.com/) (opsional, untuk login provider)

---

## 1. Clone Project

Buka terminal atau command prompt, lalu jalankan:

```bash
git clone <URL_REPO_ANDA>
cd SIPOS
```

## 2. Install Dependencies

Install semua library yang dibutuhkan project:

```bash
npm install
```

## 3. Setup Supabase (Database)

Project ini membutuhkan database PostgreSQL. Kita akan menggunakan **Supabase**.

1. Buka [database.new](https://database.new) dan buat project baru.
2. Isi formulir **Create a new project**:
   - **Name**: `SIPOS` (atau nama lain)
   - **Database Password**: Buat password yang kuat (simpan ini, Anda akan butuh nanti)
   - **Region**: Pilih yang terdekat dengan Anda (misal: Singapore)
   - Klik **Create new project**.
3. Tunggu beberapa saat hingga project selesai dibuat (status berubah menjadi hijau/aktif).

### Mendapatkan URL Koneksi

1. Di dashboard Supabase project Anda, klik icon **Settings** (roda gigi) di menu kiri bawah.
2. Pilih menu **Database** di sidebar bagian "Project Settings".
3. Scroll ke bagian **Connection parameters**.
4. Anda akan melihat data host, tetapi kita butuh **Connection String** lengkap.
5. Lihat bagian **Connection string** > **URI**.
6. Pilih tab **Transaction** (untuk `DATABASE_URL`) dan **Session** (untuk `DIRECT_URL`).
   - Salin URL **Transaction**, kita sebut ini `DATABASE_URL`.
   - Salin URL **Session**, kita sebut ini `DIRECT_URL`.
   - **PENTING**: Ganti `[YOUR-PASSWORD]` di dalam URL dengan password database yang Anda buat di langkah awal.

### Mendapatkan API Keys (Opsional tapi Direkomendasikan)

1. Klik icon **Settings** (roda gigi) lagi.
2. Pilih menu **API** di sidebar bagian "Project Settings".
3. Di bagian **Project URL**, salin URL-nya. Ini adalah `NEXT_PUBLIC_SUPABASE_URL`.
4. Di bagian **Project API keys**, salin key yang bernama `anon` `public`. Ini adalah `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

---

## 4. Konfigurasi Environment Variables

Duplikasi file contoh `.env` menjadi `.env.local`:

```bash
cp .env.example .env.local
```

_(Jika di Windows CMD: `copy .env.example .env.local`)_

Buka file `.env.local` di text editor (VS Code) dan isi nilai-nilainya:

```env
# RAHASIA: Kunci untuk enkripsi session dan token
# Generate string acak di terminal: openssl rand -base64 32
AUTH_SECRET="ganti_dengan_string_acak_panjang"

# BASE URL: Lokasi aplikasi berjalan
AUTH_URL="http://localhost:3000"

# DATABASE (DARI SUPABASE LANGKAH 3)
# Gunakan URL Mode Transaction (Port 6543)
DATABASE_URL="postgres://postgres.xxxx:password@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true"

# DIRECT URL (DARI SUPABASE LANGKAH 3)
# Gunakan URL Mode Session (Port 5432)
DIRECT_URL="postgres://postgres.xxxx:password@aws-0-ap-southeast-1.supabase.co:5432/postgres"

# (OPSIONAL) Open AI Key untuk fitur Chat
OPENAI_API_KEY=""

# (OPSIONAL) Supabase Client Key
NEXT_PUBLIC_SUPABASE_URL=""
NEXT_PUBLIC_SUPABASE_ANON_KEY=""

# (OPSIONAL) GitHub OAuth
AUTH_GITHUB_ID=""
AUTH_GITHUB_SECRET=""
```

---

## 5. Setup Database Schema (Prisma)

Sekarang kita akan mengirim struktur tabel (schema) project ke database Supabase Anda.

Jalankan perintah ini:

```bash
npx prisma db push
```

_Jika ditanya "Do you want to ignore data loss warnings?", ketik `y` lalu Enter._

Selanjutnya, isi database dengan data awal (Seeding):

```bash
npm run db:seed
```

Terminal akan menampilkan **User Default** yang bisa digunakan untuk login:

| Role        | Email                      | Password   |
| :---------- | :------------------------- | :--------- |
| **Admin**   | `admin@sipos.local`        | `admin123` |
| **Manager** | `manager@demo.sipos.local` | `demo123`  |
| **Staff**   | `fnb@demo.sipos.local`     | `demo123`  |

---

## 6. Menjalankan Aplikasi

### Mode Development (Saat Coding)

```bash
npm run dev
```

Buka browser dan akses [http://localhost:3000](http://localhost:3000).

### Mode Production (Cara "Real" Menjalankan App)

Untuk mencoba performa asli aplikasi (lebih cepat):

1. Build project:
   ```bash
   npm run build
   ```
2. Jalankan:
   ```bash
   npm start
   ```

Akses di [http://localhost:3000](http://localhost:3000).

---

## Tips Tambahan

- **Login**: Masuk ke `/login` dan gunakan email/password dari tabel seed di atas.
- **Mengubah Schema Database**: Jika Anda mengedit `prisma/schema.prisma`, jalankan `npx prisma db push` lagi untuk update database.
- **Lihat Data**: Gunakan **Prisma Studio** untuk melihat dan edit data database lewat browser:
  ```bash
  npx prisma studio
  ```
