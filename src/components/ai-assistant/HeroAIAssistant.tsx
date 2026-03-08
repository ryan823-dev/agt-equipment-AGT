'use client';

import { useState } from 'react';
import { Bot, Send, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useAI } from '@/lib/ai-context';

const quickActions = [
  { label: 'Find Products', prompt: 'Help me find the right equipment for my needs' },
  { label: 'Get a Quote', prompt: 'I need a quotation for equipment. What information do you need?' },
  { label: 'Order Inquiry', prompt: 'I have a question about my order or shipping' },
];

export function HeroAIAssistant() {
  const { openChat } = useAI();
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
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full">
      {/* Header */}
      <div className="px-6 py-5 bg-gradient-to-r from-blue-600 to-blue-500 text-white">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
            <Bot className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-lg">AI Sourcing Assistant</h3>
              <Sparkles className="w-4 h-4 text-yellow-300" />
            </div>
            <p className="text-sm text-blue-100">Find products · Add to cart · Get quotes</p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 space-y-4">
        <p className="text-base text-slate-600 leading-relaxed">
          Tell me what you&apos;re looking for. I&apos;ll help you find the right equipment!
        </p>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2">
          {quickActions.map((action) => (
            <Button
              key={action.label}
              variant="outline"
              size="sm"
              onClick={() => handleQuickAction(action.prompt)}
              className="h-9 text-sm px-4 border-slate-200 hover:border-blue-300 hover:text-blue-600"
            >
              {action.label}
            </Button>
          ))}
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="flex gap-3">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g., mini excavator for landscaping..."
            className="flex-1 min-h-[80px] max-h-[120px] resize-none text-base"
            rows={2}
          />
          <Button
            type="submit"
            disabled={!input.trim()}
            size="icon"
            className="shrink-0 h-[80px] w-12 bg-blue-600 hover:bg-blue-700"
          >
            <Send className="h-5 w-5" />
          </Button>
        </form>

        {/* Disclaimer */}
        <p className="text-xs text-slate-400 text-center">
          AI provides preliminary guidance · Our team verifies all technical details
        </p>
      </div>
    </div>
  );
}
