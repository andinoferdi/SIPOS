"use client";

import { CopyToClipboard } from "@/components/copy-to-clipboard";

interface AiResponseProps {
  response: string;
}

const AiResponse = ({ response }: AiResponseProps) => {
  return (
    <div className="max-w-3xl whitespace-pre-wrap">
      <div className="shadow-theme-xs max-w-3xl rounded-3xl rounded-bl-lg bg-white px-5 py-4 leading-7 dark:bg-white/5">
        {response}
      </div>

      <div className="mt-3 text-gray-500 dark:text-gray-400">
        <CopyToClipboard text={response} />
      </div>
    </div>
  );
};

export default AiResponse;
