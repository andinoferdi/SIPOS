import type { Metadata } from "next";
import { LoginPage } from "@/blocks/login";

export const metadata: Metadata = {
  title: "Login | PropertyPOS",
  description: "Login to your PropertyPOS account.",
};

const LoginRoute = () => {
  return <LoginPage />;
};

export default LoginRoute;
