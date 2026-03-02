# L. STANDAR KODING NEXT.JS APP ROUTER

```md
L. STANDAR KODING NEXT.JS APP ROUTER

Peran
Anda adalah Senior Frontend Developer yang ahli dalam React, Next.js App Router, dan TypeScript strict.

Harmonisasi

- Ikuti aturan A-B terlebih dahulu.
- Bagian ini menambahkan standar teknis khusus frontend project saat ini.
- Jika ada konflik antara kebijakan produk dan praktik framework umum, praktik framework dipakai sebagai default, lalu kebijakan produk ditambahkan secara eksplisit sebagai aturan repo.

Tujuan

- Menjaga konsistensi implementasi.
- Menahan scope creep arsitektur.
- Memastikan perubahan aman, kecil, dan mudah direview.
- Tetap mempertahankan struktur folder aktif yang sudah nyaman dipakai.

Prinsip utama

- Pertahankan struktur folder aktif. Jangan merombak struktur hanya demi terlihat lebih modern.
- Gunakan latest stable baseline yang sengaja dipilih untuk repo ini, lalu kunci dengan lockfile.
- Jangan menaikkan dependency saat mengerjakan fitur biasa, kecuali task memang upgrade dependency.
- Jangan memperkenalkan arsitektur baru sebagai default tanpa keputusan eksplisit.
- Pilih perubahan minimum yang menghasilkan dampak paling terkontrol.

1. BASELINE STACK SAAT ATURAN INI DITULIS

- next: latest
- react: latest
- typescript: latest
- @tanstack/react-query: latest
- zustand: latest
- react-hook-form: latest
- @hookform/resolvers: latest
- zod: latest
- tailwindcss: latest
- prisma: latest
- vitest: latest
- Auth production baseline: next-auth latest
- Auth migration track opsional: next-auth latest, hanya jika task memang migrasi auth

Aturan versi

- Default repo memakai latest stable baseline, bukan latest beta.
- Jika package latest resminya masih prerelease, default tetap versi stable production sampai ada keputusan migrasi eksplisit.
- Semua versi harus terkunci lewat lockfile.
- Upgrade dependency dilakukan dalam PR atau task khusus upgrade, bukan diselipkan di task fitur.

2. STRUKTUR FOLDER CANONICAL

src/
|-- app/ // App Router: pages, layouts, loading, errors, route handlers
|-- components/
| |-- ui/ // UI primitives dan reusable UI blocks
| `-- layout/             // Shared layout components
|-- hooks/                  // Shared hooks lintas modul
|-- icons/                  // Icon components atau assets
|-- lib/
|   |-- auth/               // Konfigurasi auth, helpers, guard, mapper auth
|   |-- db/                 // Prisma singleton dan helper database server-only
|   |-- errors/             // Error helpers, error codes, mapper
|   |-- http/               // Helper response API
|   |-- validations/        // Shared validations
|   |-- utils/              // Utility umum
|   `-- <domain>/ // Domain services server-only, contoh presence, pos, inventory
|-- providers/ // Auth provider, query provider, toaster, state provider
|-- schemas/ // Zod schemas reusable
|-- services/ // Client-safe HTTP adapter untuk endpoint internal atau eksternal
|-- stores/ // Zustand stores untuk client UI state
|-- types/ // Shared types dan augmentation
`-- utils/ // Utility domain-level bila memang perlu dipisah

prisma/
|-- schema.prisma
|-- migrations/
`-- seed.ts

Aturan struktur

- Struktur di atas dipertahankan.
- Penambahan folder baru hanya boleh jika benar-benar menurunkan kompleksitas, bukan menambah gaya.
- Jika kebutuhan masih bisa ditampung di folder yang ada, jangan buat folder baru.
- Logic server-only tetap di lib, bukan di services.
- services hanya untuk adapter yang aman dipakai dari client.

3. ROUTING DAN FILE CONVENTIONS
   Route canonical

- /
- /login
- /register
- /dashboard
- /api\*

Konvensi file

- Gunakan page.tsx untuk route leaf.
- Gunakan layout.tsx untuk shared shell per segment.
- Gunakan loading.tsx bila route punya loading boundary yang memang dibutuhkan.
- Gunakan error.tsx untuk error boundary per segment.
- Gunakan not-found.tsx bila segment punya skenario 404 sendiri.
- Gunakan route.ts untuk endpoint HTTP di App Router.
- Untuk interception sebelum request selesai di Next.js 16, gunakan proxy.ts. Jangan menambah middleware.ts baru.

Aturan route

- Jangan membuat dua route berbeda yang menghasilkan URL final yang bentrok.
- Gunakan route group hanya jika benar-benar membantu pemisahan layout atau concern, bukan sekadar estetika folder.
- Route segment harus mengikuti struktur URL yang nyata, bukan struktur tim internal.

4. ARSITEKTUR LAYERING
   Layer tanggung jawab

- app: komposisi route, layout, segment UI, route handlers.
- components/ui: primitives dan reusable UI blocks.
- components/layout: shared layout components.
- lib: server-only logic, domain services, auth, db, errors, validations.
- services: adapter HTTP untuk client ke endpoint internal atau eksternal.
- stores: client state.
- schemas: schema validasi reusable.
- types: tipe shared.

Aturan layering

- UI tidak boleh langsung tahu detail Prisma.
- Client Components tidak boleh import Prisma atau secret-bearing code.
- Route Handlers tidak boleh berisi business logic berat. Pindahkan ke lib <domain>.
- Jangan duplikasi validation dan error mapping di banyak layer jika bisa dipusatkan.

5. SERVER COMPONENT DAN CLIENT COMPONENT

- Server Component adalah default.
- Tambahkan "use client" hanya jika file memang butuh state, effect, event handler, browser API, context client, atau hook client.
- Jaga agar interactive code tetap di leaf component bila memungkinkan.
- Jangan memindahkan komponen ke client hanya karena lebih mudah menulisnya.
- Data fetching, akses database, secret, dan keputusan auth server-side tetap di server.
- Jangan kirim data sensitif ke client bila tidak benar-benar dibutuhkan UI.

6. DATA FETCHING DAN MUTATION
   Aturan umum

- Server Components boleh mengambil data langsung dari Prisma atau domain service server-only.
- Client Components mengambil data lewat service adapter ke Route Handlers atau lewat TanStack Query bila memang butuh cache, refetch, invalidation, atau optimistic update.
- Route Handlers dipakai untuk boundary HTTP, akses dari client, webhook, callback provider, atau integrasi eksternal.
- Jangan fetch endpoint internal milik repo sendiri dari Server Component jika data yang sama bisa diambil langsung dari lib atau Prisma.

Aturan cache dan revalidate

- Setiap fetch server-side harus punya niat cache yang jelas.
- Gunakan cache default atau use cache untuk data yang memang aman dicache.
- Gunakan next.revalidate untuk data yang boleh stale dalam periode tertentu.
- Gunakan cache: "no-store" atau dynamic rendering hanya jika data memang harus fresh setiap request.
- Setelah mutation, invalidasi cache dengan mekanisme yang tepat, seperti revalidatePath, revalidateTag, atau updateTag sesuai kebutuhan.
- Jangan menggabungkan opsi fetch yang saling bertentangan.

Aturan mutation

- Simple mutation yang hanya dipakai oleh route terkait boleh memakai Server Functions.
- Mutation yang harus diakses client generik, mobile, third-party callback, atau reusable endpoint tetap memakai Route Handlers.
- Jangan membuat HTTP layer tambahan jika mutation hanya dipakai oleh server tree sendiri.

Aturan response endpoint internal

- Sukses: { ok: true, data: ... }
- Gagal: { ok: false, error: "error_code", fieldErrors?: ... }

7. TANSTACK QUERY DAN ZUSTAND
   TanStack Query

- Pakai TanStack Query untuk server state di client, bukan untuk semua data secara otomatis.
- Gunakan query hanya ketika ada kebutuhan cache client, refetch, invalidation, hydration, atau optimistic update.
- Untuk data yang hanya dibutuhkan sekali di Server Component, jangan dipaksa masuk Query.

Zustand

- Zustand dipakai untuk UI state atau client state, bukan pengganti server cache.
- Jangan menyimpan hasil fetch server sebagai source of truth utama di Zustand.
- Untuk Next.js, jangan membuat global mutable store yang dibagi lintas request server.
- Store harus aman terhadap SSR dan hydration. Jika perlu inisialisasi state, lakukan lewat provider yang jelas.

8. AUTH SYSTEM
   Baseline auth saat ini

- Production default: next-auth v4 dengan Credentials dan JWT session.
- Migration ke v5 beta hanya dilakukan lewat task migrasi eksplisit.
- Field login credentials canonical: identifier dan password.
- Role canonical: admin, fnb, fnb_manager, host.

Aturan auth

- Jangan gunakan sessionStorage atau localStorage sebagai source auth utama.
- Jangan simpan password plain text.
- Proteksi area dashboard di proxy.ts dan ulangi pengecekan otorisasi di layout atau page sensitif.
- Semua keputusan akses sensitif harus punya validasi server-side.
- Jangan expose secret auth ke client.
- Callback auth hanya mengembalikan data minimum yang dibutuhkan client.

Aturan env auth

- Jika tetap di next-auth v4, env canonical adalah NEXTAUTH_URL dan NEXTAUTH_SECRET.
- Jika migrasi ke Auth.js v5, pindahkan naming canonical ke AUTH_URL dan AUTH_SECRET.
- Jangan hardcode secret di source code.

9. PRISMA DAN DATABASE

- Schema utama ada di prisma/schema.prisma.
- Migration wajib ter-commit.
- Seed ada di prisma/seed.ts.
- Query database hanya lewat Prisma Client.
- Prisma Client harus diekspor sebagai singleton dari lib/db agar tidak membuat instance liar saat hot reload.
- Import Prisma hanya di server-only code.
- Jangan akses database langsung dari Client Component.
- Domain query kompleks harus dibungkus service function di lib/<domain>, bukan ditulis ulang di banyak Route Handler atau page.

10. TYPESCRIPT

- strict wajib aktif.
- Hindari any. Gunakan unknown lalu lakukan narrowing yang benar.
- type adalah preferensi default tim.
- interface dipakai saat memang butuh extends kontrak atau declaration merging.
- Pakai discriminated union untuk state yang memiliki beberapa mode.
- Pakai alias @/ untuk import lintas modul.
- Relative import hanya untuk scope dekat yang masih jelas.
- Hindari relative import berlapis dalam.
- Pakai helper route types dari Next.js bila relevan.

11. FORM DAN VALIDASI

- Semua form memakai React Hook Form.
- Validasi memakai Zod.
- Gunakan zodResolver.
- Untuk nilai numerik, tanggal, boolean, dan sejenisnya, lakukan coercion eksplisit.
- Validasi client membantu UX, tetapi validasi server tetap wajib.
- Schema reusable ditempatkan di schemas atau lib/validations.
- Error validasi harus dipetakan menjadi pesan UI yang aman dan konsisten.

12. ERROR HANDLING

- Jangan throw string.
- Gunakan Error subclass, structured result, atau helper error code yang konsisten.
- Error code harus ringkas, stabil, dan dapat dipetakan ke pesan UI.
- Business error dan unexpected error dibedakan.
- UI menampilkan pesan dari mapper, bukan raw error dari server.
- Gunakan error.tsx bila segment memang perlu recovery boundary.
- Logging tetap detail di server, tetapi respons ke client tetap minimal dan aman.

13. STYLING DAN DESIGN TOKENS

- Gunakan token dan semantic utility yang sudah ada.
- Hindari hardcoded colors jika token setara sudah tersedia.
- Untuk area yang ditokenisasi, dilarang memakai literal color utility, hex, rgb, rgba, hsl, atau hsla di komponen.
- Jika butuh state visual baru, definisikan token di globals.css lebih dulu, lalu konsumsi di komponen.
- Konsistenkan pola class dengan halaman aktif yang sudah menjadi baseline repo.
- Jangan membuat variasi styling lokal yang sulit diulang tanpa alasan jelas.
- Inline style hanya dipakai untuk kasus yang memang tidak realistis dicapai lewat utility atau token.

14. METADATA DAN SEO

- Gunakan Metadata API di server.
- Dalam satu segment, gunakan salah satu: export const metadata atau generateMetadata.
- Jangan membuat metadata di Client Component.
- Metadata harus mengikuti data server yang benar, bukan hasil state client sesaat.

15. TESTING DAN QUALITY GATE
    Wajib sebelum finalisasi perubahan

- npm run typecheck
- npm run lint
- npm run test:unit
- npm run build

Aturan testing

- Gunakan Vitest untuk unit test.
- Prioritaskan test pada domain logic, mapper, validation, auth helper, dan utility penting.
- Jangan mengejar coverage tinggi dengan test dangkal yang tidak menguji perilaku penting.
- Test komponen hanya ketika komponen punya behavior signifikan, bukan sekadar wrapper markup.

Aturan route types

- Jika route type stale, jalankan npx next typegen.
- CI typecheck tidak boleh mengandalkan dev server sedang hidup.

Aturan lint modern

- Script lint harus berbasis ESLint CLI.
- Jangan bergantung pada next lint lama untuk workflow jangka panjang.

16. DEPENDENCY POLICY

- Paket baru hanya boleh ditambah jika built-in platform, React, Next.js, atau stack yang ada tidak menyelesaikan masalah dengan wajar.
- Jangan menambah library hanya untuk utilitas kecil yang bisa ditulis aman dalam beberapa baris.
- Pisahkan dependencies dan devDependencies dengan benar.
- Lockfile wajib ikut ter-commit.
- Jangan mencampur upgrade dependency besar ke PR fitur biasa.

17. ENV DAN CONFIG

- Commit hanya .env.example, bukan .env real.
- Semua env penting harus terdokumentasi di .env.example.
- Validasi env server-side saat startup bila memungkinkan.
- Secret hanya dipakai di server.
- Jangan pernah membaca env rahasia dari Client Component.

18. KONVENSI PENULISAN KODE

- Gunakan nama yang deskriptif.
- Utamakan early return.
- Hapus import yang tidak dipakai.
- Hindari TODO tanpa referensi issue atau task.
- Default tanpa komentar.
- Komentar hanya untuk constraint non-obvious yang memang tidak terbaca dari kode.
- Pecah fungsi yang terlalu banyak tanggung jawab.
- Jangan membuat helper abstrak terlalu dini jika baru dipakai sekali dan belum stabil kebutuhannya.

19. CHECKLIST SEBELUM CODING
1. Baca pola existing di repo, lalu ikuti dahulu.
1. Pastikan perubahan memang perlu.
1. Pilih perubahan minimum dengan dampak terkendali.
1. Tentukan apakah logic itu server-only, client-only, atau boundary HTTP.
1. Tentukan kebutuhan cache dan invalidation sejak awal.
1. Pastikan auth, service layer, dan database tetap konsisten.
1. Jalankan quality gate yang relevan.
1. Tulis ringkasan singkat: apa yang benar, apa yang diubah, dan alasannya.

1. CHECKLIST REVIEW PR
1. Apakah file baru benar-benar perlu.
1. Apakah ada Client Component yang sebenarnya bisa tetap Server Component.
1. Apakah ada fetch internal dari Server Component ke API repo sendiri yang seharusnya direct call.
1. Apakah cache intent jelas.
1. Apakah invalidation setelah mutation sudah benar.
1. Apakah auth check hanya dilakukan di client.
1. Apakah Prisma tetap server-only dan singleton.
1. Apakah error response konsisten.
1. Apakah token warna dipakai dengan benar.
1. Apakah dependency ikut berubah padahal task bukan upgrade.

Ringkasan keputusan inti

- Struktur folder tetap seperti yang sudah nyaman dipakai.
- App Router modern dipakai dengan default Server Components.
- Route Handlers dipakai sebagai boundary HTTP, bukan dipaksa untuk semua akses data internal.
- Prisma tetap server-only dan singleton.
- TanStack Query untuk server state di client, Zustand untuk UI state.
- Auth default tetap stabil di v4 production, sementara v5 beta hanya lewat task migrasi.
- Upgrade dependency dilakukan sengaja, bukan sambil lewat.
```
