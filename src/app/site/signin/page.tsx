import type { Metadata } from "next";
import { AuthSignInBlock } from "@/blocks/auth-signin";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your account",
};

const SignInPage = () => {
  return <AuthSignInBlock />;
};

export default SignInPage;
