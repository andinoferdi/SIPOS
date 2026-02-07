import Link from "next/link";
import { Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const RegisterForm = () => {
  return (
    <Card className="mx-auto w-full max-w-md border-slate-200 bg-card shadow-xl">
      <CardContent className="space-y-6 p-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-teal-accent text-primary-foreground">
            <Store className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-500">Get started</p>
            <h1 className="text-xl font-extrabold text-slate-900">
              Create your PropertyPOS account
            </h1>
          </div>
        </div>

        <form className="space-y-4" action="#" method="post">
          <div className="space-y-1.5">
            <label
              htmlFor="fullName"
              className="text-sm font-semibold text-slate-700"
            >
              Full name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              autoComplete="name"
              required
              className="w-full rounded-xl border border-slate-200 bg-card px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary"
              placeholder="Your full name"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="email" className="text-sm font-semibold text-slate-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full rounded-xl border border-slate-200 bg-card px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary"
              placeholder="you@company.com"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="password"
              className="text-sm font-semibold text-slate-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              className="w-full rounded-xl border border-slate-200 bg-card px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary"
              placeholder="Create a strong password"
            />
          </div>

          <Button type="submit" variant="primary" size="lg" className="mt-2 w-full">
            Create account
          </Button>
        </form>

        <p className="text-center text-sm text-slate-600">
          Sudah punya akun.{" "}
          <Link href="/login" className="font-bold text-primary hover:opacity-80">
            Login di sini
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};
