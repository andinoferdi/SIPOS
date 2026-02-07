import { RegisterForm } from "@/blocks/register/components/register-form";
import { RegisterSocialProof } from "@/blocks/register/components/social-proof";

export const RegisterPage = () => {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto grid min-h-screen w-full max-w-7xl items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:px-8">
        <section>
          <RegisterForm />
        </section>
        <section>
          <RegisterSocialProof />
        </section>
      </div>
    </main>
  );
};
