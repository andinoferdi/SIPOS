import type { Metadata } from "next";
import Link from "next/link";
import SignupForm from "@/app/site/signup/signup-form";
import { SignInWithGithub, SignInWithGoogle } from "@/app/site/_components/social-auth";

export const metadata: Metadata = {
  title: "Sign Up",
};

const SignUpPage = () => {
  return (
    <section className="relative overflow-hidden py-28">
      <div className="wrapper">
        <div className="relative mx-auto max-w-[600px]">
          <div className="contact-wrapper relative z-30 border border-gray-100 bg-white p-14 dark:border-dark-primary dark:bg-dark-primary">
            <div className="mb-8 text-center">
              <h3 className="mb-2 text-3xl font-bold text-gray-800 dark:text-white/90">
                Sign Up
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Enter your details to create an account
              </p>
            </div>
            <div className="flex flex-col justify-center gap-5 sm:flex-row">
              <SignInWithGoogle />
              <SignInWithGithub />
            </div>
            <div className="relative py-3 sm:py-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-800" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white p-2 text-gray-400 dark:bg-dark-primary sm:px-5 sm:py-2">
                  Or
                </span>
              </div>
            </div>
            <SignupForm />
            <div className="mt-5">
              <p className="text-sm font-normal text-gray-700 dark:text-gray-400">
                Already have an account{" "}
                <Link href="/signin" className="text-sm font-semibold text-primary-500">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUpPage;
