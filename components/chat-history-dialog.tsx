'use client';

import { useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Message } from '@/app/page';
import { OpenAI } from '@lobehub/icons';
import { format } from 'date-fns';

interface ChatHistoryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  messages: Message[];
}

export function ChatHistoryDialog({ isOpen, onClose, messages }: ChatHistoryDialogProps) {
  // Handle CMD+K / CTRL+K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] p-0">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle className="text-xl">Chat History</DialogTitle>
          <DialogDescription>
            View all your previous messages in this conversation
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="h-[60vh] px-6 py-4">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              <p>No messages yet. Start a conversation!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {messages.map((message) => (
                <div key={message.id} className="flex gap-4">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    {message.role === 'assistant' ? (
                      <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center">
                        <OpenAI size={24} />
                      </div>
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-orange-500 flex items-center justify-center text-white text-sm font-medium">
                        G
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm">
                        {message.role === 'assistant' ? 'Buddy' : 'You'}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {format(message.timestamp, 'MMM d, yyyy h:mm a')}
                      </span>
                    </div>
                    <div className="text-sm leading-relaxed">
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        <div className="px-6 py-3 border-t bg-muted/20">
          <p className="text-xs text-muted-foreground text-center">
            Press <kbd className="px-2 py-1 text-xs font-semibold text-foreground bg-muted border border-border rounded">⌘K</kbd> or{' '}
            <kbd className="px-2 py-1 text-xs font-semibold text-foreground bg-muted border border-border rounded">Ctrl+K</kbd> to close
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

