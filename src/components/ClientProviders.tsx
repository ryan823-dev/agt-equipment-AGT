'use client';

import { AIProvider } from '@/lib/ai-context';
import { AuthProvider } from '@/lib/contexts/AuthContext';
import { FloatingAssistantButton } from '@/components/ai-assistant';

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AIProvider>
        {children}
        <FloatingAssistantButton />
      </AIProvider>
    </AuthProvider>
  );
}
