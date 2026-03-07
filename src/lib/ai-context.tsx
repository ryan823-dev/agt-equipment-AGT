'use client';

import { createContext, useContext, useState, useCallback, useRef, type ReactNode } from 'react';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
}

interface PageContext {
  currentPath: string;
  productContext?: {
    category?: string;
    product?: string;
  };
}

interface AIContextType {
  isOpen: boolean;
  messages: Message[];
  isStreaming: boolean;
  hasStarted: boolean;
  pageContext: PageContext;
  openChat: (initialMessage?: string) => void;
  closeChat: () => void;
  sendMessage: (content: string) => void;
  startConsultation: (option: string) => void;
  resetChat: () => void;
}

const AIContext = createContext<AIContextType | null>(null);

// AGT Equipment System Prompt
const SYSTEM_PROMPT = `You are the AI pre-sales consultant for AGT Equipment (AGT Industrial Inc.).

COMPANY OVERVIEW:
- Founded in 2004, headquartered in China
- US warehouses: Santa Ana, CA and Chicago, IL
- Specializes in mini excavators (1-4 ton) and skid steers
- Factory direct pricing with 1-year warranty
- Free shipping within continental US

PRODUCT LINES:

1. Mini Excavators:
   - 1-Ton Class (H15R, DM12X): Rato/Kubota engines, 13.5-24.8 HP, dig depth 5-6ft
   - 2-Ton Class: Kubota engines, 6-7ft dig depth
   - 4-Ton Class (CFG-40UF): Kubota V2403-CR, 54 HP, 12ft dig depth, climate-controlled cabin

2. Skid Steers:
   - Stand-On Loaders (MSL-500): 25 HP Kohler, 1100 lb capacity, 36" width for gate access
   - Track Loaders: Various models

3. Attachments & Parts:
   - Hydraulic thumbs, augers, brush cutters, hammers, buckets
   - Genuine replacement parts

KEY SPECIFICATIONS TO KNOW:
- H15R: $11,999, Rato 186F engine, 13.5 HP, 2,425 lbs, 5'9" dig depth
- DM12X: $14,999, Kubota D1103, 24.8 HP, 2,645 lbs, 6'7" dig depth
- CFG-40UF: $29,000, Kubota V2403-CR, 54 HP, 8,818 lbs, 12ft dig depth
- MSL-500: $8,999, Kohler Command Pro, 25 HP, 1,102 lb capacity

RULES:
1. Be professional, helpful, and technically accurate
2. Only cite facts from this knowledge base — never fabricate specifications
3. When users ask about pricing: provide the price if known, otherwise explain pricing depends on configuration
4. Guide interested customers toward requesting a quote or calling +1 (949) 898-7669
5. Detect buying signals and suggest next steps: product recommendation, quote request, or call
6. Cross-sell: if someone asks about excavators, mention compatible attachments
7. Keep responses concise but informative — max 3-4 paragraphs
8. Always mention warranty (1-year) and shipping (free continental US)
9. If you don't know something, offer to connect them with our team`;

// Demo fallback responses (used when API is unavailable)
function generateFallbackResponse(userInput: string): string {
  const input = userInput.toLowerCase();

  if (input.includes('price') || input.includes('cost') || input.includes('how much')) {
    return "Great question! Here are our current prices:\n\n• **H15R Mini Excavator**: $11,999 (1.1-ton, Rato engine)\n• **DM12X Mini Excavator**: $14,999 (1.2-ton, Kubota engine)\n• **CFG-40UF Mini Excavator**: $29,000 (4-ton, Kubota, cabin)\n• **MSL-500 Skid Steer**: $8,999 (25 HP, stand-on)\n\nAll prices include free shipping within the continental US and a 1-year warranty. Would you like a detailed quote for a specific model?";
  }

  if (input.includes('excavator') || input.includes('dig')) {
    return "We offer mini excavators from 1 to 4 tons:\n\n• **1-Ton (H15R, DM12X)**: Perfect for landscaping, fence work, indoor projects. Dig depth 5-7ft. $11,999-$14,999\n• **2-Ton**: Utility trenches, tree work. Dig depth 6-8ft.\n• **4-Ton (CFG-40UF)**: Construction, agricultural work. 12ft dig depth, climate-controlled cabin. $29,000\n\nWhat type of work will you be doing? That'll help me recommend the right size.";
  }

  if (input.includes('skid') || input.includes('loader')) {
    return "Our MSL-500 Mini Skid Steer is perfect for landscaping and property maintenance:\n\n• 25 HP Kohler engine\n• 1,102 lb operating capacity\n• 36\" width (fits through standard gates)\n• 100+ attachment options\n• **Price: $8,999** with free shipping\n\nWould you like to know about available attachments?";
  }

  if (input.includes('shipping') || input.includes('delivery')) {
    return "We offer **free shipping** within the continental United States! Equipment ships from our warehouses in:\n\n• **California**: 2602 Halladay Street, Santa Ana, CA 92707\n• **Illinois**: 6200 S Oak Park Ave, Chicago, IL 60638\n\nDelivery typically takes 3-7 business days depending on your location. We'll provide tracking information once your order ships.";
  }

  if (input.includes('warranty')) {
    return "All AGT equipment comes with a **1-year warranty** covering manufacturing defects and component failures under normal use.\n\nOur technical support team is available to help with any issues. We also stock genuine replacement parts for quick repairs.";
  }

  if (input.includes('compare') || input.includes('difference') || input.includes('vs')) {
    return "Happy to help compare! Here's a quick guide:\n\n**Mini Excavator vs Skid Steer:**\n- Choose **Excavator** for: digging trenches, foundations, minimal ground disturbance\n- Choose **Skid Steer** for: loading, grading, maximum attachment versatility\n\n**H15R vs DM12X:**\n- H15R: Rato engine, $11,999, best value for occasional use\n- DM12X: Kubota engine, $14,999, more power for daily operation\n\nWhat specific tasks do you need to accomplish?";
  }

  return "Thanks for reaching out! I'm the AGT Equipment AI assistant. I can help you with:\n\n• **Product recommendations** — Find the right excavator or skid steer for your needs\n• **Specifications & comparisons** — Technical details on any model\n• **Pricing & quotes** — Get pricing information or a detailed quote\n• **Shipping & warranty** — Learn about delivery and coverage\n\nWhat would you like to know more about?";
}

export function AIProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [pageContext, setPageContext] = useState<PageContext>({ currentPath: '/' });
  const abortRef = useRef<AbortController | null>(null);

  const sendMessage = useCallback(async (content: string) => {
    const userMsg: Message = { role: 'user', content, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setIsStreaming(true);

    const allMessages = [...messages, userMsg];

    try {
      abortRef.current = new AbortController();

      // Try API first, fallback to demo response
      const res = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: allMessages.map((m) => ({ role: m.role, content: m.content })),
          pageContext,
        }),
        signal: abortRef.current.signal,
      });

      if (!res.ok) {
        // Fallback to demo response
        const fallbackResponse = generateFallbackResponse(content);
        setMessages((prev) => [...prev, { role: 'assistant', content: fallbackResponse, timestamp: new Date() }]);
        setIsStreaming(false);
        return;
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error('No reader');

      const decoder = new TextDecoder();
      let assistantContent = '';

      setMessages((prev) => [...prev, { role: 'assistant', content: '', timestamp: new Date() }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n').filter((l) => l.startsWith('data: '));

        for (const line of lines) {
          const data = line.replace('data: ', '').trim();
          if (data === '[DONE]') break;

          try {
            const json = JSON.parse(data);
            const delta = json.choices?.[0]?.delta?.content;
            if (delta) {
              assistantContent += delta;
              setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = { role: 'assistant', content: assistantContent, timestamp: new Date() };
                return updated;
              });
            }
          } catch {
            // Skip parse errors
          }
        }
      }
    } catch (err) {
      if ((err as Error).name === 'AbortError') return;
      // Fallback response
      const fallbackResponse = generateFallbackResponse(content);
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === 'assistant' && !last.content) {
          const updated = [...prev];
          updated[updated.length - 1] = { role: 'assistant', content: fallbackResponse, timestamp: new Date() };
          return updated;
        }
        return [...prev, { role: 'assistant', content: fallbackResponse, timestamp: new Date() }];
      });
    } finally {
      setIsStreaming(false);
    }
  }, [messages, pageContext]);

  const openChat = useCallback((initialMessage?: string) => {
    setIsOpen(true);
    if (initialMessage) {
      setHasStarted(true);
      setTimeout(() => sendMessage(initialMessage), 100);
    }
  }, [sendMessage]);

  const closeChat = useCallback(() => {
    setIsOpen(false);
    abortRef.current?.abort();
  }, []);

  const startConsultation = useCallback((option: string) => {
    setHasStarted(true);
    sendMessage(option);
  }, [sendMessage]);

  const resetChat = useCallback(() => {
    setMessages([]);
    setHasStarted(false);
  }, []);

  return (
    <AIContext.Provider
      value={{
        isOpen,
        messages,
        isStreaming,
        hasStarted,
        pageContext,
        openChat,
        closeChat,
        sendMessage,
        startConsultation,
        resetChat,
      }}
    >
      {children}
    </AIContext.Provider>
  );
}

export function useAI() {
  const ctx = useContext(AIContext);
  if (!ctx) throw new Error('useAI must be used within AIProvider');
  return ctx;
}
