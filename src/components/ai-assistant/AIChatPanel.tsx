'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Send, Bot, User, Sparkles, Phone, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { useAI, Message } from '@/lib/ai-context';
import { ChatMessage } from './ChatMessage';

const quickActions = [
  { label: 'Product Specs', prompt: 'What mini excavators and skid steers do you offer? What are the specifications?' },
  { label: 'Get a Quote', prompt: 'I need a quotation for equipment. What information do you need?' },
  { label: 'Compare Models', prompt: 'Help me compare different mini excavator models for my needs.' },
  { label: 'Shipping Info', prompt: 'What are the shipping options and delivery times?' },
];

export function AIChatPanel() {
  const { messages, isStreaming, sendMessage, closeChat } = useAI();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, []);

  const handleSend = useCallback(() => {
    const trimmed = input.trim();
    if (!trimmed || isStreaming) return;
    setInput('');
    sendMessage(trimmed);
  }, [input, isStreaming, sendMessage]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleQuickAction = (prompt: string) => {
    sendMessage(prompt);
  };

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Messages Area */}
      <ScrollArea className="flex-1 px-4 py-4">
        <div className="space-y-4">
          {messages.length === 0 ? (
            // Welcome Screen
            <div className="flex flex-col items-center justify-center h-full text-center px-4 py-8">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5">
                <Sparkles className="w-7 h-7 text-primary" />
              </div>
              <h4 className="text-base font-bold text-foreground mb-2">
                Welcome to AGT Equipment
              </h4>
              <p className="text-sm text-muted-foreground mb-6 max-w-xs leading-relaxed">
                I&apos;m your AI pre-sales consultant. Ask me about mini excavators, skid steers, 
                specifications, or get a quote.
              </p>
              <div className="grid grid-cols-2 gap-2 w-full max-w-xs">
                {quickActions.map((action) => (
                  <button
                    key={action.label}
                    onClick={() => handleQuickAction(action.prompt)}
                    className="px-3 py-2.5 text-xs font-medium rounded-lg border border-border
                      bg-muted/50 text-foreground hover:text-primary hover:border-primary/30
                      hover:bg-primary/5 transition-all duration-200 text-left"
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            // Messages
            messages.map((msg, i) => (
              <ChatMessage key={i} message={msg} />
            ))
          )}
          
          {/* Streaming indicator */}
          {isStreaming && messages[messages.length - 1]?.role !== 'assistant' && (
            <div className="flex gap-2.5 justify-start">
              <div className="w-7 h-7 shrink-0 rounded-lg bg-primary/15 flex items-center justify-center mt-0.5">
                <Bot className="w-3.5 h-3.5 text-primary" />
              </div>
              <div className="px-4 py-3 rounded-2xl bg-muted border text-sm">
                <span className="inline-flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0s' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.15s' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.3s' }} />
                </span>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="p-4 border-t bg-background">
        <div className="flex gap-2">
          <Textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about products, specs, pricing..."
            disabled={isStreaming}
            className="flex-1 resize-none min-h-[44px] max-h-[120px]"
            rows={1}
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isStreaming}
            size="icon"
            className="shrink-0 self-end h-11 w-11"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Quick Actions & Contact */}
        <div className="flex items-center justify-between mt-3">
          <p className="text-[10px] text-muted-foreground">
            Powered by AI · Our team verifies all technical details
          </p>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-7 text-xs text-muted-foreground hover:text-foreground"
              onClick={() => sendMessage('I need to speak with a human representative')}
            >
              <Phone className="h-3 w-3 mr-1" />
              Contact Team
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
