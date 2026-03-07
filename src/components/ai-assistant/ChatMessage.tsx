'use client';

import { Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Message } from '@/lib/ai-context';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div
      className={cn(
        'flex gap-2.5',
        isUser ? 'justify-end' : 'justify-start'
      )}
    >
      {!isUser && (
        <div className="w-7 h-7 shrink-0 rounded-lg bg-primary/15 flex items-center justify-center mt-0.5">
          <Bot className="w-3.5 h-3.5 text-primary" />
        </div>
      )}
      <div
        className={cn(
          'max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap',
          isUser
            ? 'bg-primary text-primary-foreground rounded-br-md'
            : 'bg-muted border rounded-bl-md'
        )}
      >
        {message.content || (
          <span className="inline-flex gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0s' }} />
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.15s' }} />
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.3s' }} />
          </span>
        )}
      </div>
      {isUser && (
        <div className="w-7 h-7 shrink-0 rounded-lg bg-muted flex items-center justify-center mt-0.5">
          <User className="w-3.5 h-3.5 text-muted-foreground" />
        </div>
      )}
    </div>
  );
}
