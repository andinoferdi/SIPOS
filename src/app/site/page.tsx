import type { Metadata } from "next";
import { HomeBlock } from "@/blocks/home";

export const metadata: Metadata = {
  title: "Home",
  description: "AI starter home page",
};

const HomePage = () => {
  return <HomeBlock />;
};

export default HomePage;
