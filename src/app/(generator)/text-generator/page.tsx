'use client';

import GeneratorInput from '@/components/generator/generator-input';
import { RenderMessage } from '@/components/generator/render-message';
import { GradientBlob } from '@/components/gradient-blob';
import { useChat } from '@ai-sdk/react';
import { createIdGenerator } from 'ai';
import { useState } from 'react';

export default function Page() {
  const [isThinking, setIsThinking] = useState(false);
  const [input, setInput] = useState('');

  const chatHandler = useChat({
    generateId: createIdGenerator({ prefix: 'msgc' }),
    onFinish: () => setIsThinking(false),
    onError: () => setIsThinking(false),
  });

  return (
    <div className="contents">
      <RenderMessage useChat={chatHandler} isThinking={isThinking} />

      <div className="px-5 md:px-12">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!input.trim()) return;

            setIsThinking(true);
            chatHandler.sendMessage({ text: input });
            setInput('');
          }}
        >
          <GeneratorInput
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </form>

        <GradientBlob />
      </div>
    </div>
  );
}
