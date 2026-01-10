'use client';

import { useState } from 'react';
import { ChatArea } from '@/components/chat-area';
import { ChatInput } from '@/components/chat-input';
import { Avatar3D } from '@/components/avatar-3d';
import { ReadyPlayerMeAvatar } from '@/components/ready-player-me-avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User, Upload, Edit, Shirt, Image } from 'lucide-react';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'user',
      content: 'Hi',
      timestamp: new Date(),
    },
    {
      id: '2',
      role: 'assistant',
      content: 'Hi 💙 I\'m glad you\'re here. How is your mind feeling right now?',
      timestamp: new Date(),
    },
    {
      id: '3',
      role: 'user',
      content: 'what is your name?',
      timestamp: new Date(),
    },
    {
      id: '4',
      role: 'assistant',
      content: 'My name is Buddy 😊 I\'m here to support you and listen whenever you need.',
      timestamp: new Date(),
    },
  ]);
  const [avatarUrl, setAvatarUrl] = useState<string>('/avatar.glb');
  const [isAvatarCreatorOpen, setIsAvatarCreatorOpen] = useState(false);

  const handleSendMessage = (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    // Simulate AI response based on user input
    setTimeout(() => {
      let responseContent = 'I\'m here to listen and support you. What\'s on your mind? 💙';
      
      // Simple response logic
      const lowerContent = content.toLowerCase();
      if (lowerContent.includes('hi') || lowerContent.includes('hello')) {
        responseContent = 'Hi 💙 I\'m glad you\'re here. How is your mind feeling right now?';
      } else if (lowerContent.includes('name')) {
        responseContent = 'My name is Buddy 😊 I\'m here to support you and listen whenever you need.';
      } else if (lowerContent.includes('how are you')) {
        responseContent = 'I\'m doing well, thank you for asking! 😊 More importantly, how are you feeling today?';
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseContent,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    }, 1000);
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Left Side - AI Avatar Section */}
      <div className="hidden lg:flex lg:w-1/2 border-r border-border flex-col items-center justify-center p-8 bg-muted/20 relative">
        {/* Profile Button - Top Right */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 h-9 w-9 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground"
              title="Profile"
            >
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Avatar Settings</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="cursor-pointer"
              onClick={() => setIsAvatarCreatorOpen(true)}
            >
              <Upload className="mr-2 h-4 w-4" />
              <span>Upload Photo</span>
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="cursor-pointer"
              onClick={() => setIsAvatarCreatorOpen(true)}
            >
              <Edit className="mr-2 h-4 w-4" />
              <span>Edit Avatar</span>
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="cursor-pointer"
              onClick={() => setIsAvatarCreatorOpen(true)}
            >
              <Shirt className="mr-2 h-4 w-4" />
              <span>Fashion</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Image className="mr-2 h-4 w-4" />
              <span>Scene</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* 3D Avatar Container */}
        <div className="w-full h-full">
          <Avatar3D avatarUrl={avatarUrl} />
        </div>
      </div>

      {/* Right Side - Buddy Interface */}
      <div className="flex flex-col lg:w-1/2 w-full relative">
        <ChatArea messages={messages} />
        <ChatInput onSendMessage={handleSendMessage} />
      </div>

      {/* Ready Player Me Avatar Creator */}
      <ReadyPlayerMeAvatar
        isOpen={isAvatarCreatorOpen}
        onClose={() => setIsAvatarCreatorOpen(false)}
        onAvatarCreated={(url) => {
          setAvatarUrl(url);
          setIsAvatarCreatorOpen(false);
        }}
      />
    </div>
  );
}
