"use client";

import { signIn } from "next-auth/react";
import type { MouseEventHandler, ReactNode } from "react";

type SocialButtonProps = {
  children: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

function SocialButton({ children, onClick }: SocialButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-[var(--token-gray-100)] w-full h-12 justify-center dark:hover:bg-[var(--token-white-10)] dark:hover:text-[var(--token-white-90)] dark:bg-[var(--token-white-5)] transition dark:text-[var(--token-gray-400)] font-normal text-sm hover:bg-[var(--token-gray-200)] rounded-full text-[var(--token-gray-700)] hover:text-[var(--token-gray-800)] flex items-center gap-3 px-8 py-2.5"
    >
      {children}
    </button>
  );
}

export function SignInWithGithub() {
  const handleSignInWithGithub = () => {
    void signIn("github", { callbackUrl: "/dashboard" });
  };

  return (
    <SocialButton onClick={handleSignInWithGithub}>
      Continue with GitHub
    </SocialButton>
  );
}
