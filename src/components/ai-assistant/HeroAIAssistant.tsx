'use client';

import { useState } from 'react';
import { Bot, Send, Sparkles, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { useAI } from '@/lib/ai-context';

const quickActions = [
  { label: 'Find Products', prompt: 'Help me find the right equipment for my needs' },
  { label: 'Get a Quote', prompt: 'I need a quotation for equipment. What information do you need?' },
  { label: 'Order Help', prompt: 'I have a question about my order or shipping' },
];

export function HeroAIAssistant() {
  const { openChat, sendMessage } = useAI();
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const message = input.trim();
    setInput('');
    openChat(message);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleQuickAction = (prompt: string) => {
    openChat(prompt);
  };

  return (
    <div className="bg-card border rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 bg-primary text-primary-foreground">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold">AI Sourcing Assistant</h3>
            <p className="text-xs text-primary-foreground/80">Find products · Add to cart · Get quotes</p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        <p className="text-sm text-muted-foreground mb-4">
          Tell me what you need, I&apos;ll help you find it!
        </p>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2 mb-4">
          {quickActions.map((action) => (
            <Button
              key={action.label}
              variant="outline"
              size="sm"
              onClick={() => handleQuickAction(action.prompt)}
              className="h-8 text-xs"
            >
              {action.label}
            </Button>
          ))}
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="What are you looking for? e.g., mini excavator for landscaping..."
            className="flex-1 min-h-[44px] max-h-[100px] resize-none"
            rows={1}
          />
          <Button
            type="submit"
            disabled={!input.trim()}
            size="icon"
            className="shrink-0 h-11 w-11"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>

        {/* Disclaimer */}
        <p className="text-[10px] text-muted-foreground mt-3 text-center">
          AI provides preliminary guidance · Our team verifies all technical details
        </p>
      </div>
    </div>
  );
}
