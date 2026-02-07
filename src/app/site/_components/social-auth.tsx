"use client";

import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { GithubIcon, GoogleIcon } from "@/icons/icons";

export const SignInWithGoogle = () => {
  return (
    <button
      className="bg-gray-100 text-left w-full justify-center dark:hover:bg-white/10 dark:hover:text-white/90 dark:bg-white/5 transition dark:text-gray-400 font-normal text-sm hover:bg-gray-200 rounded-full text-gray-700 hover:text-gray-800 flex items-center gap-3 px-4 sm:px-8 py-2.5 min-h-12"
      onClick={() => toast.info("Google provider is not configured yet")}
      type="button"
    >
      <GoogleIcon className="shrink-0" />
      <span>Sign in with Google</span>
    </button>
  );
};

export const SignInWithGithub = () => {
  return (
    <button
      className="bg-gray-100 w-full justify-center dark:hover:bg-white/10 dark:hover:text-white/90 dark:bg-white/5 transition dark:text-gray-400 font-normal text-sm hover:bg-gray-200 rounded-full text-gray-700 hover:text-gray-800 flex items-center gap-3 px-4 sm:px-8 py-2.5 text-left min-h-12"
      onClick={() => signIn("github")}
      type="button"
    >
      <GithubIcon className="size-6 shrink-0" />
      <span>Sign in with Github</span>
    </button>
  );
};
