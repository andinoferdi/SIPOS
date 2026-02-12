# Next.js Prisma Auth Starter

Starter project full-stack berbasis Next.js App Router dan TypeScript strict. Repo ini menyiapkan fondasi untuk dashboard UI, autentikasi GitHub dengan Auth.js, dan endpoint chat AI berbasis OpenAI. README ini fokus ke langkah cepat agar Anda bisa langsung menjalankan project setelah clone.

## Pratinjau

![Pratinjau aplikasi Next.js Prisma Auth Starter](./ai-starter-kit.png)

### Cuplikan fitur

<table>
  <tr>
    <td><img src="./public/images/chat/chat.jpg" alt="Preview fitur chat" width="100%" /></td>
    <td><img src="./public/images/video-thumb/thumb-16.png" alt="Preview fitur video UI" width="100%" /></td>
    <td><img src="./public/images/cards/card-01.jpg" alt="Preview komponen dashboard" width="100%" /></td>
  </tr>
  <tr>
    <td align="center">Chat</td>
    <td align="center">Video UI</td>
    <td align="center">Dashboard Card</td>
  </tr>
</table>

## Fitur yang sudah aktif

- Next.js App Router dengan struktur route group.
- Dashboard UI dan halaman marketing.
- Auth.js dengan provider GitHub.
- Endpoint AI chat di `POST /api/chat`.
- Endpoint health check di `GET /api/health`.

## Prasyarat

- Node.js `>= 20.9.0`
- npm

## Quickstart

1. Clone repo.

```bash
git clone <URL_REPO_ANDA>
cd nextjs-prisma-auth-starter
```

2. Install dependency.

```bash
npm install
```

3. Buat file environment.

```bash
cp .env.example .env
```

Jika Anda memakai Windows Command Prompt, jalankan:

```bash
copy .env.example .env
```

4. Isi nilai minimal di `.env`.

```env
OPENAI_API_KEY=
AUTH_SECRET=
AUTH_URL=http://localhost:3000
AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=
```

5. Jalankan development server.

```bash
npm run dev
```

Buka `http://localhost:3000`.

## Environment Variables

### Wajib untuk fitur inti

| Variable | Kegunaan |
| --- | --- |
| `OPENAI_API_KEY` | Dipakai endpoint `POST /api/chat` untuk generate respons AI. |
| `AUTH_SECRET` | Secret untuk session dan token Auth.js. |
| `AUTH_URL` | Base URL aplikasi untuk Auth.js, contoh `http://localhost:3000`. |
| `AUTH_GITHUB_ID` | Client ID OAuth GitHub. |
| `AUTH_GITHUB_SECRET` | Client Secret OAuth GitHub. |

### Opsional atau fitur tertentu

| Variable | Kegunaan |
| --- | --- |
| `DATABASE_URL` | Dibutuhkan saat Anda menjalankan command Prisma seperti `npm run db:push`. |
| `NEXT_PUBLIC_PLUS_MONTHLY_PRICE_ID` | Dipakai oleh data pricing plan Plus bulanan. |
| `NEXT_PUBLIC_PLUS_YEARLY_PRICE_ID` | Dipakai oleh data pricing plan Plus tahunan. |
| `NEXT_PUBLIC_PRO_MONTHLY_PRICE_ID` | Dipakai oleh data pricing plan Pro bulanan. |
| `NEXT_PUBLIC_PRO_YEARLY_PRICE_ID` | Dipakai oleh data pricing plan Pro tahunan. |

## Scripts

| Command | Fungsi |
| --- | --- |
| `npm run dev` | Menjalankan server development Next.js. |
| `npm run build` | Build aplikasi untuk production. |
| `npm run start` | Menjalankan hasil build production. |
| `npm run lint` | Menjalankan ESLint. |
| `npm run test:unit` | Menjalankan unit test dengan Vitest. |
| `npm run test:unit:watch` | Menjalankan Vitest mode watch. |
| `npm run db:generate` | Generate Prisma Client. |
| `npm run db:push` | Push schema Prisma ke database. |
| `npm run db:migrate` | Membuat dan menjalankan migration Prisma. |
| `npm run stripe:listen` | Listen webhook Stripe ke `/api/webhooks/stripe`. |

## Route penting

| Route | Keterangan |
| --- | --- |
| `/` | Halaman marketing utama. |
| `/pricing` | Halaman pricing. |
| `/contact` | Halaman kontak. |
| `/privacy` | Halaman kebijakan privasi. |
| `/login` | Halaman login, termasuk tombol login GitHub. |
| `/register` | Halaman registrasi. |
| `/reset-password` | Halaman reset password. |
| `/dashboard` | Halaman dashboard utama. |
| `/dashboard/text-generator` | Halaman text generator AI. |
| `/api/health` | Endpoint health check. |
| `/api/chat` | Endpoint chat AI streaming. |
| `/api/auth/[...nextauth]` | Endpoint internal Auth.js. |

## Known limitations

- Form email dan password di halaman login masih simulasi, bukan autentikasi backend nyata.
- Endpoint `/api/webhooks/stripe` belum tersedia, jadi `npm run stripe:listen` belum bisa dipakai end-to-end.
- Route root `/text-generator` belum ada. Route yang tersedia adalah `/dashboard/text-generator`.

## Lisensi

Project ini menggunakan lisensi MIT. Detail lisensi ada di file `LICENSE`.
