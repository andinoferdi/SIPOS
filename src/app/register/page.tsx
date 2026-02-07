import type { Metadata } from "next";
import { RegisterPage } from "@/blocks/register";

export const metadata: Metadata = {
  title: "Register | PropertyPOS",
  description: "Create your PropertyPOS account.",
};

const RegisterRoute = () => {
  return <RegisterPage />;
};

export default RegisterRoute;
