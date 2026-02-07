"use client";

import { useEffect } from "react";
import type { UIMessage, UseChatHelpers } from "@ai-sdk/react";
import { toast } from "sonner";
import { useStickToBottom } from "use-stick-to-bottom";
import AiResponse from "@/components/generator/text/ai-response";
import UserMessage from "@/components/generator/text/user-message";

interface RenderMessageProps {
  useChat: UseChatHelpers<UIMessage>;
  isThinking: boolean;
}

export const RenderMessage = ({ useChat, isThinking }: RenderMessageProps) => {
  const { messages, setMessages, regenerate, error } = useChat;
  const { contentRef, scrollRef } = useStickToBottom();

  useEffect(() => {
    if (error?.message.includes("Incorrect API")) {
      toast.error("Incorrect API key provided", {
        description: "Please check your API key and try again.",
      });
    }
  }, [error]);

  return (
    <div
      className="custom-scrollbar flex-[1_1_0] overflow-y-auto px-5 pb-6 pt-12 md:px-12"
      ref={scrollRef}
    >
      <div
        className="prose max-w-none space-y-6 text-gray-800 dark:prose-invert dark:text-white/90"
        ref={contentRef}
      >
        {messages.map((message, messageIndex) => (
          <div key={message.id}>
            {message.parts.map((part, index) => {
              if (part.type !== "text") {
                return null;
              }

              if (message.role === "user") {
                return (
                  <UserMessage
                    key={`${message.id}-${index}`}
                    message={part.text}
                    onEdit={async (newMessage) => {
                      setMessages((prevMessages) =>
                        prevMessages.map((prevMessage) => {
                          if (prevMessage.id !== message.id) {
                            return prevMessage;
                          }

                          return {
                            ...prevMessage,
                            parts: prevMessage.parts?.map((prevPart) => ({
                              ...prevPart,
                              text: newMessage,
                            })),
                          };
                        }),
                      );

                      regenerate();
                    }}
                    showActions={
                      messages.length - 1 === messageIndex ||
                      messages.length - 2 === messageIndex
                    }
                  />
                );
              }

              return (
                <AiResponse key={`${message.id}-${index}`} response={part.text} />
              );
            })}
          </div>
        ))}

        {isThinking && <div className="font-medium text-gray-500">Model is thinking...</div>}
      </div>
    </div>
  );
};
