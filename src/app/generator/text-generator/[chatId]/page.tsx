import type { Metadata } from "next";
import { TextGeneratorBlock } from "@/blocks/text-generator";

export const metadata: Metadata = {
  title: "Text Generator Chat",
  description: "Continue your AI text conversation",
};

const TextGeneratorChatPage = () => {
  return <TextGeneratorBlock />;
};

export default TextGeneratorChatPage;
