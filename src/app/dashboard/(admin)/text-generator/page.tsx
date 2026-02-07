import type { Metadata } from "next";
import AiTextGenerator from "@/components/ai-text-generator/AiTextGenerator";

export const metadata: Metadata = {
  title: "Next.js Text Generator | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Text Generator page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const TextGeneratorPage = () => {
  return <AiTextGenerator />;
};

export default TextGeneratorPage;
