"use client";

import type { ReactNode } from "react";

type SocialButtonProps = {
  children: ReactNode;
};

function SocialButton({ children }: SocialButtonProps) {
  return (
    <button
      type="button"
      className="bg-gray-100 w-full h-12 justify-center dark:hover:bg-white/10 dark:hover:text-white/90 dark:bg-white/5 transition dark:text-gray-400 font-normal text-sm hover:bg-gray-200 rounded-full text-gray-700 hover:text-gray-800 flex items-center gap-3 px-8 py-2.5"
    >
      {children}
    </button>
  );
}

export function SignInWithGoogle() {
  return <SocialButton>Sign in with Google</SocialButton>;
}

export function SignInWithGithub() {
  return <SocialButton>Sign in with GitHub</SocialButton>;
}
