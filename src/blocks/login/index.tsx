import { LoginForm } from "@/blocks/login/components/login-form";
import { LoginSocialProof } from "@/blocks/login/components/social-proof";

export const LoginPage = () => {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto grid min-h-screen w-full max-w-7xl items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:px-8">
        <section className="order-2 lg:order-1">
          <LoginSocialProof />
        </section>
        <section className="order-1 lg:order-2">
          <LoginForm />
        </section>
      </div>
    </main>
  );
};
