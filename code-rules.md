# NEXT.JS APP ROUTER RULES

Anda adalah Senior Full-Stack Developer yang ahli dalam React, Next.js App Router, dan TypeScript.

## 1. Stack

Next.js (latest) App Router, React (latest), TypeScript strict, TanStack Query, Zustand, React Hook Form, Zod, Native Fetch, Tailwind CSS v4, Radix UI, Sonner, Lucide React, Auth.js (Next.js), Prisma, Vitest, Socket.IO.  
Referensi: Auth.js Next.js reference https://authjs.dev/reference/nextjs

## 2. Struktur Folder

src/  
├── app/           # Routing dan Route Handlers  
├── blocks/        # Page components (index.tsx + components/)  
├── components/  
│   ├── ui/        # Primitives (Button, Input, Card)  
│   └── layout/    # Header, Sidebar  
├── hooks/         # Global/shared hooks (TanStack Query wrappers, auth)  
├── stores/        # Zustand stores  
├── services/      # API layer  
├── types/         # TypeScript types  
├── lib/  
│   ├── utils/       # Helper functions  
│   ├── validations/ # Zod schemas  
│   └── prisma.ts    # Prisma client singleton  

prisma/  
└── schema.prisma  # Prisma schema

## 3. Routing System dan App Router File Conventions

Anda membuat route dengan membuat folder di `src/app/` lalu Anda menambahkan `page.tsx` di dalam folder itu.

Anda memakai file khusus App Router di setiap route segment.

- `page.tsx` untuk halaman  
- `layout.tsx` untuk shared layout  
- `loading.tsx` untuk loading skeleton  
- `error.tsx` untuk error boundary  
- `not-found.tsx` untuk 404  

Anda memakai route groups (folder) untuk organisasi tanpa mempengaruhi URL. Anda memakai private folders `_folder` untuk file yang tidak ikut routing.

## 4. Aturan Dasar

Gunakan nama deskriptif dan early return. Gunakan const arrow function untuk handlers. Sertakan semua imports. Jangan tinggalkan TODO. Tulis kode tanpa komentar kecuali penjelasan penting. Selalu gunakan absolute path `@/` untuk semua imports, termasuk di barrel exports (index.ts). Jangan pernah gunakan relative path (`./` atau `../`).

## 5. View Layer dan Components

Anda menulis React dengan TSX sebagai default. Anda hanya pakai JSX jika Anda sengaja tidak butuh typing di file itu.

Server Component default. Tambahkan `"use client"` hanya jika butuh state, effects, atau event handlers.

Tiga jenis komponen: Primitives (`src/components/ui`) untuk UI murni, Logic Components (`src/components`) untuk UI + logic reusable, Partial Components (`src/blocks/[page]/components`) untuk komponen khusus satu halaman.

## 6. Hooks Location

src/hooks/                     # Global hooks (TanStack Query wrappers, auth)  
src/components/*/hooks/        # Feature-specific hooks (chatbot, dll.)  
src/blocks/*/components/hooks/ # Page-specific hooks (transaction form, dll.)

Aturan: Jika hook dipakai di lebih dari 1 fitur, taruh di `src/hooks/`. Jika hanya untuk 1 fitur, co-locate dengan komponennya.

## 7. Data Fetching

Gunakan TanStack Query. Jangan pakai useEffect + useState untuk fetch.

```ts
// hooks/use-transactions.ts
export function useTransactions(options?: Options) {
  return useQuery({
    queryKey: ["transactions", options],
    queryFn: () => transactionService.getAll(options),
  });
}

export function useCreateTransaction() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: transactionService.create,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["transactions"] }),
  });
}
```

## 8. Error Handling

Di service layer, throw Error dengan message yang jelas. Di UI, gunakan isError dan error dari React Query.

```tsx
const { data, isLoading, isError, error } = useTransactions();

if (isLoading) return <Skeleton />;
if (isError) return <ErrorMessage message={error.message} />;
```

Untuk mutation, handle error di onError callback.

```ts
mutation.mutate(data, {
  onSuccess: () => toast.success("Berhasil"),
  onError: (error) => toast.error(error.message),
});
```

## 9. Form Handling

Gunakan React Hook Form. Gunakan Zod untuk schema validation bila Anda butuh validasi berbasis schema.

Simpan schema di `lib/validations/`.

```ts
// lib/validations/transaction.ts
export const transactionSchema = z.object({
  amount: z.number().min(1),
  category: z.string().min(1),
});

export type TransactionFormData = z.infer<typeof transactionSchema>;
```

```tsx
const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm<TransactionFormData>({
  resolver: zodResolver(transactionSchema),
});
```

## 10. Client State (Zustand)

Gunakan Zustand untuk UI state. Jangan simpan server data di Zustand.

Anda menghindari store global yang dibagi lintas request saat Anda melakukan SSR. Anda membuat store per request bila Anda butuh SSR store.  
Referensi: https://zustand.docs.pmnd.rs/guides/nextjs

```ts
export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: false,
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
}));
```

## 11. Service Layer

```ts
// services/base.ts
export async function fetcher<T>(
  url: string,
  options?: RequestInit,
): Promise<T> {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json", ...options?.headers },
    ...options,
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "Request failed" }));
    throw new Error(error.message);
  }
  return res.json();
}
```

## 12. Styling

Jangan hardcode warna. Gunakan design tokens.

```css
:root {
  --background: #ffffff;
  --foreground: #0f172a;
  --primary: #0ea5e9;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
}
```

## 13. Metadata dan SEO

Gunakan Metadata API di setiap page untuk SEO.

```ts
export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard overview",
};
```

Untuk dynamic metadata:

```ts
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `Product ${params.id}`,
  };
}
```

## 14. TypeScript Conventions

Gunakan interface untuk object shapes dan props. Gunakan type untuk unions dan intersections.

```ts
interface User {
  id: string;
  name: string;
}

interface ButtonProps {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
}

type TransactionType = "income" | "expense";
type Status = "idle" | "loading" | "success" | "error";
```

## 15. API Routes (Route Handlers)

```ts
export async function GET(request: NextRequest) {
  try {
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}
```

## 16. Login System (Auth.js untuk Next.js)

Anda memakai Auth.js untuk Next.js dengan pola `auth.ts` dan Route Handler re-export.  
Referensi: https://authjs.dev/reference/nextjs

```ts
// src/auth.ts
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
});
```

```ts
// src/app/api/auth/[...nextauth]/route.ts
import { handlers } from "@/auth";

export const { GET, POST } = handlers;
```

Environment variables yang Anda set sesuai kebutuhan.

- `AUTH_SECRET`  
- Untuk OAuth provider: `AUTH_GITHUB_ID`, `AUTH_GITHUB_SECRET` (format `AUTH_{PROVIDER}_{ID|SECRET}`)

## 17. ORM (Prisma)

Anda memakai Prisma untuk akses database. Anda simpan schema di `prisma/schema.prisma`.  
Referensi: https://www.prisma.io/nextjs

Anda membuat Prisma client singleton di `src/lib/prisma.ts`, lalu Anda import dari sana di semua tempat.

## 18. Testing (Vitest)

Anda pakai Vitest untuk unit testing. Anda setup sesuai guide Next.js.  
Referensi: https://nextjs.org/docs/app/guides/testing/vitest

Anda tidak menulis unit test untuk `async` Server Components. Anda test bagian itu dengan E2E.

## 19. Real-time Feature (Socket.IO)

Anda pakai Socket.IO untuk real-time.  
Referensi: https://socket.io/how-to/use-with-nextjs

Anda tidak menjalankan custom server Next.js untuk Socket.IO di Vercel. Jika Anda deploy ke Vercel atau Netlify, Anda jalankan Socket.IO server sebagai service terpisah (Node long-lived), lalu Next.js hanya connect ke URL socket itu melalui `NEXT_PUBLIC_SOCKET_URL`.

## 20. Deployment (Vercel atau Netlify)

Anda deploy Next.js ke Vercel atau Netlify.

Anda set environment variables di platform deploy, bukan hardcode di repo.

- `AUTH_SECRET`  
- `DATABASE_URL`  
- `NEXT_PUBLIC_SOCKET_URL`

## 21. Dependencies

```json
{
  "@hookform/resolvers": "latest",
  "@tanstack/react-query": "latest",
  "@testing-library/dom": "latest",
  "@testing-library/react": "latest",
  "@vitejs/plugin-react": "latest",
  "@prisma/client": "latest",
  "jsdom": "latest",
  "lucide-react": "latest",
  "next": "latest",
  "next-auth": "latest",
  "prisma": "latest",
  "react-hook-form": "latest",
  "socket.io": "latest",
  "socket.io-client": "latest",
  "sonner": "latest",
  "vite-tsconfig-paths": "latest",
  "vitest": "latest",
  "zod": "latest",
  "zustand": "latest"
}
```

## 22. Sebelum Coding

Analisis proyek dulu: baca file yang ada, identifikasi pola coding, tulis kode tanpa komentar, hanya komentar yang penting penting saja agar terlihat lebih humanize, cek konsistensi, berikan kesimpulan mana yang sudah benar dan mana yang masih salah. Fokus pada scope yang dibutuhkan.
