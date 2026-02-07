import type { Metadata } from "next";
import { TextGeneratorBlock } from "@/blocks/text-generator";

export const metadata: Metadata = {
  title: "Text Generator",
  description: "Generate text with AI",
};

const TextGeneratorPage = () => {
  return <TextGeneratorBlock />;
};

export default TextGeneratorPage;
