import { AI_MODEL } from "@/lib/ai/model";
import { PROMPT } from "@/lib/ai/prompts";
import { errorHandler, getMostRecentUserMessage } from "@/lib/utils";
import {
  convertToModelMessages,
  createIdGenerator,
  streamText,
  type UIMessage,
} from "ai";

export const maxDuration = 50;

export const POST = async (req: Request) => {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();

    const userMessage = getMostRecentUserMessage(messages);

    if (!userMessage) {
      return new Response("No user message found", {
        status: 404,
      });
    }

    const result = streamText({
      model: AI_MODEL,
      system: PROMPT,
      messages: await convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse({
      originalMessages: messages,
      generateMessageId: createIdGenerator({ prefix: "msgs" }),
    });
  } catch (error) {
    return new Response(errorHandler(error), {
      status: 500,
    });
  }
};
