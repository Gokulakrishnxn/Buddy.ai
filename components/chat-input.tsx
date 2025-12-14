'use client';

import { useState, KeyboardEvent, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Paperclip, Mic } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (content: string) => void;
}

export function ChatInput({ onSendMessage }: ChatInputProps) {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (input.trim()) {
      onSendMessage(input);
      setInput('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [input]);

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-background">
      <div className="w-full max-w-3xl mx-auto px-4 pb-6 pt-2">
        <div className="relative flex items-end gap-2 bg-muted border border-input rounded-[28px] shadow-sm px-4 py-3 focus-within:shadow-md transition-shadow">
          {/* Plus Button */}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full flex-shrink-0 hover:bg-accent self-end"
          >
            <Plus className="h-5 w-5" />
          </Button>

          {/* Input Area */}
          <div className="flex-1 max-h-[200px] overflow-y-auto">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything"
              className="w-full bg-transparent border-0 focus:outline-none focus:ring-0 resize-none text-[15px] leading-6 placeholder:text-muted-foreground py-1.5"
              rows={1}
              style={{ minHeight: '24px', maxHeight: '200px' }}
            />
          </div>

          {/* Right Side Buttons */}
          <div className="flex items-center gap-1 self-end">
            {!input.trim() ? (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full flex-shrink-0 hover:bg-accent"
                >
                  <Paperclip className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full flex-shrink-0 hover:bg-accent"
                >
                  <Mic className="h-5 w-5" />
                </Button>
              </>
            ) : (
              <Button
                onClick={handleSend}
                size="icon"
                className="h-8 w-8 rounded-full bg-foreground hover:bg-foreground/90 text-background flex-shrink-0"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                </svg>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
