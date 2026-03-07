'use client';

import { AIProvider } from '@/lib/ai-context';
import { FloatingAssistantButton } from '@/components/ai-assistant';

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <AIProvider>
      {children}
      <FloatingAssistantButton />
    </AIProvider>
  );
}
