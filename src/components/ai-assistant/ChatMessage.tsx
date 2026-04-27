'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Bot, User } from 'lucide-react';
import { products } from '@/data/products';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/contexts/CartContext';
import { cn } from '@/lib/utils';
import type { AssistantAction, Message } from '@/lib/ai-context';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';
  const { addItem } = useCart();
  const [addingProductId, setAddingProductId] = useState<string | null>(null);

  const handleAction = async (action: AssistantAction) => {
    if (action.type !== 'add_to_cart' || !action.productId) return;

    const product = products.find((item) => item.id === action.productId);
    if (!product) return;

    setAddingProductId(action.productId);
    await addItem(product, 1);
    setAddingProductId(null);
  };

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
      <div className="max-w-[80%] space-y-2">
        <div
          className={cn(
            'px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap',
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

        {!isUser && message.actions && message.actions.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {message.actions.map((action, index) => {
              if (action.type === 'add_to_cart') {
                return (
                  <Button
                    key={`${action.type}-${action.productId || index}`}
                    type="button"
                    size="sm"
                    onClick={() => handleAction(action)}
                    disabled={!action.productId || addingProductId === action.productId}
                    className="h-8 px-3 text-xs"
                  >
                    {addingProductId === action.productId ? 'Adding...' : action.label}
                  </Button>
                );
              }

              if (!action.href) return null;

              const isExternal = action.href.startsWith('tel:') || action.href.startsWith('mailto:');

              return (
                <Button
                  key={`${action.type}-${action.href}-${index}`}
                  asChild
                  size="sm"
                  variant={action.type === 'request_quote' ? 'default' : 'outline'}
                  className="h-8 px-3 text-xs"
                >
                  {isExternal ? (
                    <a href={action.href}>{action.label}</a>
                  ) : (
                    <Link href={action.href}>{action.label}</Link>
                  )}
                </Button>
              );
            })}
          </div>
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
