'use client';

import { useState } from 'react';
import { 
  AvatarCreator, 
  AvatarCreatorConfig,
  AvatarExportedEvent,
  UserSetEvent,
  UserAuthorizedEvent
} from '@readyplayerme/react-avatar-creator';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface ReadyPlayerMeAvatarProps {
  isOpen: boolean;
  onClose: () => void;
  onAvatarCreated?: (avatarUrl: string) => void;
}

export function ReadyPlayerMeAvatar({ isOpen, onClose, onAvatarCreated }: ReadyPlayerMeAvatarProps) {
  const [avatarUrl, setAvatarUrl] = useState<string>('');

  const config: AvatarCreatorConfig = {
    clearCache: false,
    bodyType: 'fullbody',
    quickStart: false,
    language: 'en',
  };

  const handleAvatarExported = (event: AvatarExportedEvent) => {
    const url = event.data.url;
    setAvatarUrl(url);
    if (onAvatarCreated) {
      onAvatarCreated(url);
    }
  };

  const handleUserSet = (event: UserSetEvent) => {
    console.log('User set:', event.data);
  };

  const handleUserAuthorized = (event: UserAuthorizedEvent) => {
    console.log('User authorized:', event.data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] p-0 overflow-hidden">
        <DialogHeader className="px-6 py-4 border-b">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle>Create Your Avatar</DialogTitle>
              <DialogDescription>
                Customize your 3D avatar with Ready Player Me
              </DialogDescription>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="w-full h-[80vh]">
          <AvatarCreator
            subdomain="buddy"
            config={config}
            onAvatarExported={handleAvatarExported}
            onUserSet={handleUserSet}
            onUserAuthorized={handleUserAuthorized}
            style={{ width: '100%', height: '100%', border: 'none' }}
          />
        </div>

        {avatarUrl && (
          <div className="px-6 py-4 border-t bg-muted/20">
            <p className="text-sm text-muted-foreground">
              Avatar created! URL: <span className="font-mono text-xs break-all">{avatarUrl}</span>
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

