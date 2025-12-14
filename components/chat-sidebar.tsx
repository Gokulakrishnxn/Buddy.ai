'use client';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { OpenAI } from '@lobehub/icons';
import { PenSquare, Search, BookOpen, Compass, Settings, Menu } from 'lucide-react';
import { Chat } from '@/app/page';
import { cn } from '@/lib/utils';

interface ChatSidebarProps {
  chats: Chat[];
  currentChatId: string;
  isOpen: boolean;
  onToggle: () => void;
  onNewChat: () => void;
  onSelectChat: (chatId: string) => void;
  onDeleteChat: (chatId: string) => void;
}

export function ChatSidebar({
  chats,
  currentChatId,
  isOpen,
  onToggle,
  onNewChat,
  onSelectChat,
}: ChatSidebarProps) {
  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={onToggle}
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Sidebar */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-40 w-[260px] bg-sidebar flex flex-col transition-all duration-300',
          isOpen ? 'translate-x-0 md:relative' : '-translate-x-full md:absolute'
        )}
      >
        {/* Header with Logo and New Chat */}
        <div className="flex items-center gap-2 p-3 pb-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-lg hover:bg-sidebar-accent shrink-0"
            onClick={onToggle}
          >
            <div className="flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-sidebar-foreground">
                <path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z" fill="currentColor"/>
              </svg>
            </div>
          </Button>
          <Button
            onClick={onNewChat}
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-lg hover:bg-sidebar-accent shrink-0"
          >
            <PenSquare className="h-5 w-5" />
          </Button>
        </div>

        {/* Main Menu Items */}
        <div className="px-2 pb-2">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 h-10 px-3 rounded-lg hover:bg-sidebar-accent text-sidebar-foreground"
          >
            <Search className="h-4 w-4" />
            <span className="text-sm">Search chats</span>
          </Button>
        </div>

        <Separator className="opacity-20" />

        {/* Chat List */}
        <ScrollArea className="flex-1 px-2">
          <div className="py-2">
            <div className="text-xs font-medium text-muted-foreground px-3 py-2">Your chats</div>
            <div className="space-y-0.5">
              {chats.map((chat) => (
                <div
                  key={chat.id}
                  className={cn(
                    'group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm cursor-pointer transition-colors',
                    currentChatId === chat.id
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                      : 'hover:bg-sidebar-accent text-sidebar-foreground/70 hover:text-sidebar-foreground'
                  )}
                  onClick={() => onSelectChat(chat.id)}
                >
                  <span className="flex-1 truncate text-sm">{chat.title}</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollArea>

        {/* Bottom Navigation */}
        <div className="border-t border-sidebar-border">
          <div className="p-2 space-y-0.5">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-10 px-3 rounded-lg hover:bg-sidebar-accent text-sidebar-foreground"
            >
              <Compass className="h-4 w-4" />
              <span className="text-sm">Explore</span>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-10 px-3 rounded-lg hover:bg-sidebar-accent text-sidebar-foreground"
            >
              <BookOpen className="h-4 w-4" />
              <span className="text-sm">Library</span>
            </Button>
          </div>

          <Separator className="opacity-20" />

          {/* User Section */}
          <div className="p-2">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-10 px-3 rounded-lg hover:bg-sidebar-accent text-sidebar-foreground"
            >
              <div className="h-6 w-6 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-medium shrink-0">
                G
              </div>
              <span className="text-sm flex-1 text-left truncate">Gokulakrishnan</span>
              <Settings className="h-4 w-4 opacity-60" />
            </Button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={onToggle}
        />
      )}
    </>
  );
}
