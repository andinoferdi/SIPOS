import type { Metadata } from "next";
import { GradientBlob2 } from "@/components/gradient-blob";
import ForgotPasswordForm from "@/app/site/reset-password/_components/forgot-password";
import ResetPasswordForm from "@/app/site/reset-password/_components/reset-password";

interface PageProps {
  searchParams: Promise<{ token: string | undefined }>;
}

export const metadata: Metadata = {
  title: "Reset Password",
};

const ResetPasswordPage = async ({ searchParams }: PageProps) => {
  const { token } = await searchParams;
  const tokenVerified = Boolean(token);
  const resetToken = token ?? "";

  return (
    <section className="relative overflow-hidden py-28">
      <div className="wrapper">
        <div className="relative mx-auto max-w-[592px]">
          <div className="contact-wrapper relative z-30 border border-gray-100 bg-white p-14 dark:border-dark-primary dark:bg-dark-primary">
            {tokenVerified ? (
              <ResetPasswordForm resetToken={resetToken} />
            ) : (
              <ForgotPasswordForm invalidToken={Boolean(token && !tokenVerified)} />
            )}
          </div>
        </div>
      </div>

      <GradientBlob2 className="absolute -bottom-32 left-1/2 -translate-x-1/2 z-0" />
    </section>
  );
};

export default ResetPasswordPage;
