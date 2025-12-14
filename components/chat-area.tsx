'use client';

import { useEffect, useRef } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Message } from '@/app/page';
import { OpenAI } from '@lobehub/icons';

interface ChatAreaProps {
  messages: Message[];
}

export function ChatArea({ messages }: ChatAreaProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="text-center space-y-6 max-w-3xl w-full">
          <h1 className="text-4xl font-medium text-foreground">Welcome Buddy Here</h1>
        </div>
      </div>
    );
  }

  return (
    <ScrollArea className="flex-1" ref={scrollRef}>
      <div className="pb-32 pt-8">
        {messages.map((message) => (
          <div
            key={message.id}
            className="group w-full text-foreground"
          >
            <div className="max-w-3xl mx-auto px-4 py-6 md:px-6">
              {message.role === 'assistant' ? (
                // AI Message - Left aligned
                <div className="flex gap-6 justify-start">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center">
                      <OpenAI size={24} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-2 overflow-hidden pt-0.5 max-w-[70%]">
                    <div className="font-semibold text-sm">Buddy</div>
                    <div className="text-[15px] leading-7">
                      <p className="whitespace-pre-wrap">
                        {message.content}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                // User Message - Right aligned
                <div className="flex gap-6 justify-end">
                  {/* Content */}
                  <div className="flex-1 space-y-2 overflow-hidden pt-0.5 max-w-[70%] text-right">
                    <div className="font-semibold text-sm">You</div>
                    <div className="text-[15px] leading-7 bg-accent/50 rounded-2xl px-4 py-3 inline-block text-left">
                      <p className="whitespace-pre-wrap">
                        {message.content}
                      </p>
                    </div>
                  </div>

                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-orange-500 flex items-center justify-center text-white text-sm font-medium">
                      G
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
