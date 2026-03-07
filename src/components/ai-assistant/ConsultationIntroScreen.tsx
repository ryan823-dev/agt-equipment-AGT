'use client';

import { useAI } from '@/lib/ai-context';
import { Cog, Sparkles, HelpCircle, ArrowRight, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';

const starterOptions = [
  {
    id: 'recommend',
    icon: Cog,
    label: 'Help me find the right equipment for my needs',
    prompt: 'I need help choosing the right equipment. I want to...',
  },
  {
    id: 'improve',
    icon: Sparkles,
    label: 'I need specifications and pricing for a specific model',
    prompt: 'I want to know more about specifications and pricing for...',
  },
  {
    id: 'compare',
    icon: HelpCircle,
    label: 'I\'m comparing options and need expert guidance',
    prompt: 'I\'m considering different options and need help comparing...',
  },
];

export function ConsultationIntroScreen() {
  const { startConsultation } = useAI();

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 border-b bg-muted/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center">
            <Bot className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">AGT AI Consultant</h3>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs text-muted-foreground">Online · Ready to help</span>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 flex flex-col px-6 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-3">
            Start a consultation
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Describe your equipment needs and I&apos;ll help you find the right mini excavator, 
            skid steer, or attachment.
          </p>
        </div>

        {/* Quick Info */}
        <div className="mb-8 space-y-2">
          <p className="text-sm text-muted-foreground">
            I can help you with:
          </p>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li className="flex items-center gap-2">
              <span className="text-primary">•</span> Product recommendations
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary">•</span> Specifications & comparisons
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary">•</span> Pricing & quotes
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary">•</span> Shipping & warranty info
            </li>
          </ul>
        </div>

        {/* Starter options */}
        <div className="space-y-3">
          {starterOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => startConsultation(option.prompt)}
              className={cn(
                'w-full flex items-start gap-4 p-4 rounded-lg',
                'bg-muted/50 hover:bg-muted',
                'border border-border hover:border-primary/30',
                'transition-all duration-200',
                'text-left group'
              )}
            >
              <div className="flex-shrink-0 mt-0.5">
                <option.icon className="h-5 w-5 text-primary" />
              </div>
              <span className="flex-1 text-sm text-foreground leading-relaxed">
                {option.label}
              </span>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-0.5" />
            </button>
          ))}
        </div>

        {/* Footer note */}
        <p className="mt-auto pt-6 text-xs text-muted-foreground text-center">
          AI provides preliminary guidance · Our team verifies all technical details
        </p>
      </div>
    </div>
  );
}
