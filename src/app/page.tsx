import type { Metadata } from "next";
import { LandingPage } from "@/blocks/landing";

export const metadata: Metadata = {
  title: "PropertyPOS, Modern Hospitality Software",
  description:
    "Effortless POS for modern hospitality with smart table management, inventory, and staff scheduling.",
};

const HomeRoute = () => {
  return <LandingPage />;
};

export default HomeRoute;
