'use client';

import { AIProvider } from '@/lib/ai-context';
import { AuthProvider } from '@/lib/contexts/AuthContext';
import { CartProvider } from '@/lib/contexts/CartContext';
import { FloatingAssistantButton } from '@/components/ai-assistant';
import { CartDrawer } from '@/components/cart/CartDrawer';

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        <AIProvider>
          {children}
          <FloatingAssistantButton />
          <CartDrawer />
        </AIProvider>
      </CartProvider>
    </AuthProvider>
  );
}
