"use client";

import { useChat } from "@ai-sdk/react";
import { createIdGenerator } from "ai";
import copy from "copy-text-to-clipboard";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import AiTextGeneratorHistorySidebar from "./AiTextGeneratorHistorySidebar";
import { aiHistorySessions, type HistorySession } from "./data";
import { withDashboardBase } from "@/lib/dashboard-routes";

export default function AiTextGenerator() {
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [historySearch, setHistorySearch] = useState("");
  const [showAllHistory, setShowAllHistory] = useState(false);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(
    aiHistorySessions[0]?.id ?? null
  );
  const [isCopiedByMessageId, setIsCopiedByMessageId] = useState<
    Record<string, boolean>
  >({});

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    status,
    setMessages,
    setInput,
    error,
  } = useChat({
    generateId: createIdGenerator({ prefix: "msgd" }),
    sendExtraMessageFields: true,
    initialMessages: aiHistorySessions[0]?.messages ?? [],
  });

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = "0px";
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  }, [input]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, status]);

  const filteredSessions = useMemo(() => {
    const normalizedSearch = historySearch.trim().toLowerCase();
    if (!normalizedSearch) return aiHistorySessions;
    return aiHistorySessions.filter((session) =>
      session.title.toLowerCase().includes(normalizedSearch)
    );
  }, [historySearch]);

  const onNewChat = () => {
    setActiveSessionId(null);
    setMessages([]);
    setInput("");
    setIsHistoryOpen(false);
  };

  const onSelectSession = (session: HistorySession) => {
    setActiveSessionId(session.id);
    setMessages(session.messages);
    setInput("");
    setIsHistoryOpen(false);
  };

  const onPromptSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!input.trim() || status === "streaming" || status === "submitted") {
      return;
    }
    setActiveSessionId(null);
    handleSubmit(event);
  };

  const copyMessage = (messageId: string, text: string) => {
    copy(text);
    setIsCopiedByMessageId((prev) => ({
      ...prev,
      [messageId]: true,
    }));

    window.setTimeout(() => {
      setIsCopiedByMessageId((prev) => ({
        ...prev,
        [messageId]: false,
      }));
    }, 2000);
  };

  return (
    <div>
      <div className="relative flex w-full flex-wrap items-center justify-between gap-3 border-b border-gray-200 bg-white px-3 py-5 dark:border-gray-800 dark:bg-gray-900 lg:px-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">
          Text Generator
        </h2>
        <nav>
          <ol className="flex items-center gap-1.5">
            <li>
              <Link
                className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400"
                href={withDashboardBase("/")}
              >
                Home
                <svg
                  className="stroke-current"
                  width="17"
                  height="16"
                  viewBox="0 0 17 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M6.0765 12.667L10.2432 8.50033L6.0765 4.33366"
                    stroke=""
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </li>
            <li className="text-sm text-gray-800 dark:text-white/90">
              Text Generator
            </li>
          </ol>
        </nav>
      </div>

      <div className="relative h-[calc(100vh-134px)] px-4 xl:flex xl:h-[calc(100vh-146px)] xl:px-0">
        <div className="my-6 flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-3 dark:border-gray-800 dark:bg-gray-900 xl:hidden">
          <h4 className="pl-2 text-lg font-medium text-gray-800 dark:text-white/90">
            Chats History
          </h4>
          <button
            type="button"
            onClick={() => setIsHistoryOpen(true)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-gray-300 text-gray-700 dark:border-gray-700 dark:text-gray-400"
            aria-label="Open chat history"
          >
            <HamburgerIcon />
          </button>
        </div>

        <div className="flex-1 xl:py-10">
          <div className="relative mx-auto flex h-full max-w-[720px] flex-col">
            <div
              className="custom-scrollbar relative z-20 mx-auto max-h-[50vh] w-full flex-1 space-y-7 overflow-y-auto pb-16"
              role="log"
              aria-live="polite"
            >
              {messages.length === 0 && (
                <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-gray-300 p-6 dark:border-gray-700">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Start a new AI conversation.
                  </p>
                </div>
              )}

              {messages.map((message) => {
                if (message.role !== "user" && message.role !== "assistant") {
                  return null;
                }

                const textContent = extractMessageText(message);
                if (!textContent.trim()) return null;

                if (message.role === "user") {
                  return (
                    <div key={message.id} className="flex justify-end">
                      <div className="shadow-theme-xs max-w-[480px] rounded-xl rounded-tr-xs bg-brand-100 px-4 py-3 dark:bg-brand-500/20">
                        <p className="text-left text-sm font-normal text-gray-800 dark:text-white/90">
                          {textContent}
                        </p>
                      </div>
                    </div>
                  );
                }

                const paragraphs = textContent
                  .split(/\n{2,}/)
                  .map((paragraph) => paragraph.trim())
                  .filter(Boolean);

                return (
                  <div key={message.id} className="flex justify-start">
                    <div>
                      <div className="shadow-theme-xs max-w-[480px] rounded-xl rounded-tl-xs bg-gray-100 px-4 py-3 dark:bg-white/5">
                        {paragraphs.map((paragraph, paragraphIndex) => (
                          <p
                            key={`${message.id}-${paragraphIndex}`}
                            className={`text-sm leading-5 text-gray-800 dark:text-white/90 ${
                              paragraphIndex < paragraphs.length - 1 ? "mb-5" : ""
                            }`}
                          >
                            {paragraph}
                          </p>
                        ))}
                      </div>
                      <div className="mt-3">
                        <button
                          type="button"
                          onClick={() => copyMessage(message.id, textContent)}
                          className="flex h-8 items-center gap-1 rounded-full border border-gray-100 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-500 dark:border-white/5 dark:bg-gray-900 dark:text-gray-400 dark:hover:text-white/90"
                        >
                          <CopyIcon />
                          <span>
                            {isCopiedByMessageId[message.id] ? "Copied" : "Copy"}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}

              {(status === "submitted" || status === "streaming") && (
                <div className="flex justify-start">
                  <div className="shadow-theme-xs max-w-[480px] rounded-xl rounded-tl-xs bg-gray-100 px-4 py-3 text-sm text-gray-800 dark:bg-white/5 dark:text-white/90">
                    Model is generating...
                  </div>
                </div>
              )}

              {error && (
                <div className="flex justify-start">
                  <div className="shadow-theme-xs max-w-[480px] rounded-xl rounded-tl-xs border border-error-200 bg-error-50 px-4 py-3 text-sm text-error-600 dark:border-error-500/30 dark:bg-error-500/10 dark:text-error-400">
                    Failed to generate response. Please try again.
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="sticky bottom-5 z-20 w-full pt-6">
              <div className="mx-auto w-full max-w-[720px] rounded-2xl border border-gray-200 bg-white p-5 shadow-xs dark:border-gray-800 dark:bg-gray-800">
                <form onSubmit={onPromptSubmit}>
                  <textarea
                    ref={textareaRef}
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Type your prompt here..."
                    className="h-20 max-h-48 w-full resize-none border-none bg-transparent p-0 font-normal text-gray-800 outline-none placeholder:text-gray-400 focus:ring-0 dark:text-white"
                    onKeyDown={(event) => {
                      if (event.key === "Enter" && !event.shiftKey) {
                        event.preventDefault();
                        onPromptSubmit(
                          event as unknown as React.FormEvent<HTMLFormElement>
                        );
                      }
                    }}
                  />
                  <div className="flex items-center justify-between pt-2">
                    <label
                      htmlFor="ai-chat-attach"
                      className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    >
                      <input
                        id="ai-chat-attach"
                        type="file"
                        className="sr-only"
                        multiple
                      />
                      <AttachIcon />
                      Attach
                    </label>

                    <button
                      type="submit"
                      disabled={
                        !input.trim() ||
                        status === "submitted" ||
                        status === "streaming"
                      }
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gray-900 text-white transition hover:bg-gray-800 disabled:opacity-50 dark:bg-white/90 dark:text-gray-800 dark:hover:bg-gray-900 dark:hover:text-white/90"
                      aria-label="Send prompt"
                    >
                      <SendIcon />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="relative hidden xl:block">
          <AiTextGeneratorHistorySidebar
            sessions={filteredSessions}
            activeSessionId={activeSessionId}
            searchTerm={historySearch}
            showAllHistory={showAllHistory}
            onSearchTermChange={setHistorySearch}
            onNewChat={onNewChat}
            onSelectSession={onSelectSession}
            onToggleShowMore={() => setShowAllHistory((prev) => !prev)}
          />
        </div>
      </div>

      <div
        className={`fixed inset-0 z-[70] xl:hidden ${
          isHistoryOpen ? "" : "pointer-events-none"
        }`}
        aria-hidden={!isHistoryOpen}
      >
        <button
          type="button"
          onClick={() => setIsHistoryOpen(false)}
          className={`absolute inset-0 bg-gray-900/50 transition-opacity ${
            isHistoryOpen ? "opacity-100" : "opacity-0"
          }`}
          aria-label="Close history panel"
        />
        <div
          className={`absolute inset-y-0 right-0 transition-transform duration-300 ${
            isHistoryOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <AiTextGeneratorHistorySidebar
            sessions={filteredSessions}
            activeSessionId={activeSessionId}
            searchTerm={historySearch}
            showAllHistory={showAllHistory}
            onSearchTermChange={setHistorySearch}
            onNewChat={onNewChat}
            onSelectSession={onSelectSession}
            onToggleShowMore={() => setShowAllHistory((prev) => !prev)}
          />
        </div>
      </div>
    </div>
  );
}

function extractMessageText(message: { content: string; parts?: unknown[] }) {
  if (!message.parts || message.parts.length === 0) return message.content ?? "";

  const textParts = message.parts
    .map((part) => {
      if (
        typeof part === "object" &&
        part &&
        "type" in part &&
        "text" in part &&
        (part as { type: string }).type === "text"
      ) {
        return (part as { text: string }).text;
      }
      return "";
    })
    .join("");

  return textParts || message.content || "";
}

function CopyIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M14.1567 14.1628H7.08803C6.39768 14.1628 5.83803 13.6031 5.83803 12.9128V5.8441M14.1567 14.1628L14.1567 15.416C14.1567 16.1064 13.5971 16.666 12.9067 16.666H4.58478C3.89442 16.666 3.33478 16.1064 3.33478 15.416V7.0941C3.33478 6.40374 3.89442 5.8441 4.58478 5.8441H5.83803M14.1567 14.1628H15.4152C16.1056 14.1628 16.6652 13.6031 16.6652 12.9128L16.6652 4.58392C16.6652 3.89357 16.1056 3.33392 15.4152 3.33392H7.08803C6.39768 3.33392 5.83803 3.89357 5.83803 4.58392V5.8441"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AttachIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M14.4194 11.7679L15.4506 10.7367C17.1591 9.02811 17.1591 6.25802 15.4506 4.54947C13.742 2.84093 10.9719 2.84093 9.2634 4.54947L8.2322 5.58067M11.77 14.4172L10.7365 15.4507C9.02799 17.1592 6.2579 17.1592 4.54935 15.4507C2.84081 13.7422 2.84081 10.9721 4.54935 9.26352L5.58285 8.23002M11.7677 8.23232L8.2322 11.7679"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M9.99674 3.33252L9.99675 16.667M5 8.32918L9.99984 3.33252L15 8.32918"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HamburgerIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 6L20 6M4 18L20 18M4 12L20 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
