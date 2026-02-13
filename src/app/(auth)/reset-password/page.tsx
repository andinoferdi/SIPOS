import { GradientBlob2 } from '@/features/marketing/components/gradient-blob';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import ForgotPasswordForm from '@/features/auth/components/forgot-password-form';
import ResetPasswordForm from '@/features/auth/components/reset-password-form';

type PageProps = {
  searchParams: Promise<{ token: string | undefined }>;
};

export const metadata: Metadata = {
  title: 'Reset Password',
};

export default async function ResetPasswordPage({ searchParams }: PageProps) {
  const { token } = await searchParams;
  if (!token) {
    return (
      <ResetPasswordSection>
        <ForgotPasswordForm invalidToken={false} />
      </ResetPasswordSection>
    );
  }

  const tokenVerified = true;

  if (!tokenVerified) {
    return (
      <ResetPasswordSection>
        <ForgotPasswordForm invalidToken={true} />
      </ResetPasswordSection>
    );
  }

  return (
    <ResetPasswordSection>
      <ResetPasswordForm resetToken={token} />
    </ResetPasswordSection>
  );
}

type ResetPasswordSectionProps = {
  children: ReactNode;
};

function ResetPasswordSection({ children }: ResetPasswordSectionProps) {
  return (
    <section className="py-28 relative overflow-hidden">
      <div className="wrapper">
        <div className="relative max-w-[592px] mx-auto">
          <div className="contact-wrapper border p-14 relative z-30 bg-(--token-white) dark:bg-dark-primary dark:border-dark-primary border-(--token-gray-100)">{children}</div>
        </div>
      </div>

      <GradientBlob2 className="absolute -bottom-32 left-1/2 -translate-x-1/2 z-0" />
    </section>
  );
}
