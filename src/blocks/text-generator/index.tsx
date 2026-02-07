"use client";

import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import { createIdGenerator } from "ai";
import GeneratorInput from "@/components/generator/generator-input";
import { RenderMessage } from "@/components/generator/render-message";
import { GradientBlob } from "@/components/gradient-blob";
import { useSocketConnection } from "@/hooks/use-socket-connection";

export const TextGeneratorBlock = () => {
  const [isThinking, setIsThinking] = useState(false);
  const [input, setInput] = useState("");
  const { isConnected, error } = useSocketConnection();
  const chatHandler = useChat({
    generateId: createIdGenerator({ prefix: "msgc" }),
    onFinish: () => setIsThinking(false),
    onError: () => setIsThinking(false),
  });

  return (
    <div className="contents">
      <div className="px-5 pt-3 text-right text-xs text-gray-500 md:px-12 dark:text-gray-300">
        {error
          ? `Realtime unavailable: ${error}`
          : isConnected
            ? "Realtime connected"
            : "Realtime disconnected"}
      </div>
      <RenderMessage useChat={chatHandler} isThinking={isThinking} />
      <div className="px-5 md:px-12">
        <form
          onSubmit={(event) => {
            event.preventDefault();

            if (!input.trim()) {
              return;
            }

            setIsThinking(true);
            chatHandler.sendMessage({ text: input });
            setInput("");
          }}
        >
          <GeneratorInput
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
        </form>
        <GradientBlob />
      </div>
    </div>
  );
};
