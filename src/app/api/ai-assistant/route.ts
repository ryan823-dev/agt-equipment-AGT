import { NextRequest, NextResponse } from 'next/server';
import {
  buildAssistantActions,
  generateKnowledgeBasedResponse,
  knowledgeContext,
  loadKnowledgeBase,
  searchKnowledge,
  type AssistantAction,
  type KnowledgeSearchResult,
} from '@/lib/ai-assistant/knowledge';

export const dynamic = 'force-dynamic';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const MAX_MESSAGES = 12;
const MAX_MESSAGE_CHARS = 2000;
const MAX_TOTAL_CHARS = 8000;
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 12;
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';

const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

function getClientKey(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'local'
  );
}

function checkRateLimit(clientKey: string): number | null {
  const now = Date.now();
  const existing = rateLimitStore.get(clientKey);

  if (!existing || existing.resetAt <= now) {
    rateLimitStore.set(clientKey, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return null;
  }

  if (existing.count >= RATE_LIMIT_MAX_REQUESTS) {
    return Math.ceil((existing.resetAt - now) / 1000);
  }

  existing.count += 1;

  if (rateLimitStore.size > 1000) {
    rateLimitStore.forEach((value, key) => {
      if (value.resetAt <= now) {
        rateLimitStore.delete(key);
      }
    });
  }

  return null;
}

function normalizeMessages(value: unknown): ChatMessage[] | null {
  if (!Array.isArray(value)) {
    return null;
  }

  const messages = value.slice(-MAX_MESSAGES);
  const normalized: ChatMessage[] = [];
  let totalChars = 0;

  for (const message of messages) {
    if (
      !message ||
      (message.role !== 'user' && message.role !== 'assistant') ||
      typeof message.content !== 'string'
    ) {
      return null;
    }

    const content = message.content.trim();
    totalChars += content.length;

    if (
      content.length === 0 ||
      content.length > MAX_MESSAGE_CHARS ||
      totalChars > MAX_TOTAL_CHARS
    ) {
      return null;
    }

    normalized.push({
      role: message.role,
      content,
    });
  }

  return normalized.length > 0 ? normalized : null;
}

function buildSystemPrompt(relevantKnowledge: KnowledgeSearchResult[]): string {
  const basePrompt = `You are the AI pre-sales consultant for AGT Equipment (AGT Industrial Inc.).

IMPORTANT: You have access to current knowledge about AGT products, articles, policies, and FAQs. Use this knowledge to answer questions accurately.

RESPONSE RULES:
1. Be professional, helpful, and technically accurate.
2. ONLY use facts from the provided knowledge. Never fabricate specifications, prices, stock, policies, or payment terms.
3. When users ask about pricing, provide exact prices from the knowledge if available.
4. When recommending a product, state the exact SKU so the customer and sales team can identify it.
5. Keep responses concise: max 3-4 paragraphs.
6. Mention the 1-year warranty and free continental US shipping when discussing products or purchases.
7. If the provided knowledge does not contain the answer, say so and offer to connect them with the AGT team at +1 (949) 898-7669.
8. Encourage a quote request, cart add, checkout, or sales call when the customer shows buying intent.

KNOWLEDGE UPDATES: The knowledge base is generated from the website catalog and policy content.`;

  if (relevantKnowledge.length === 0) {
    return basePrompt;
  }

  return `${basePrompt}

RELEVANT KNOWLEDGE FROM OUR DATABASE:
---
${knowledgeContext(relevantKnowledge)}
---

Use only the above knowledge to answer the user's question. If the answer is not present, say so and offer a sales handoff.`;
}

function encodeSse(payload: unknown): Uint8Array {
  return new TextEncoder().encode(`data: ${JSON.stringify(payload)}\n\n`);
}

function encodeDone(): Uint8Array {
  return new TextEncoder().encode('data: [DONE]\n\n');
}

function streamFallbackResponse(content: string, actions: AssistantAction[]) {
  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(encodeSse({ choices: [{ delta: { content } }] }));
      controller.enqueue(encodeSse({ actions }));
      controller.enqueue(encodeDone());
      controller.close();
    },
  });

  return new Response(stream, {
    headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache' },
  });
}

async function streamOpenRouterResponse(response: Response, actions: AssistantAction[]) {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const reader = response.body?.getReader();
      if (!reader) {
        controller.enqueue(encodeSse({ actions }));
        controller.enqueue(encodeDone());
        controller.close();
        return;
      }

      const decoder = new TextDecoder();
      let buffer = '';

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const events = buffer.split('\n\n');
          buffer = events.pop() || '';

          for (const event of events) {
            if (!event.trim() || event.trim() === 'data: [DONE]') continue;
            controller.enqueue(encoder.encode(`${event}\n\n`));
          }
        }

        const finalEvent = buffer.trim();
        if (finalEvent && finalEvent !== 'data: [DONE]') {
          controller.enqueue(encoder.encode(`${finalEvent}\n\n`));
        }

        controller.enqueue(encodeSse({ actions }));
        controller.enqueue(encodeDone());
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache' },
  });
}

export async function POST(request: NextRequest) {
  try {
    const retryAfter = checkRateLimit(getClientKey(request));

    if (retryAfter !== null) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait before asking again.' },
        {
          status: 429,
          headers: {
            'Retry-After': retryAfter.toString(),
          },
        }
      );
    }

    const body = await request.json();
    const messages = normalizeMessages(body.messages);

    if (!messages) {
      return NextResponse.json(
        {
          error: `Messages are required and must stay under ${MAX_MESSAGE_CHARS} characters each.`,
        },
        { status: 400 }
      );
    }

    const kb = loadKnowledgeBase();
    const lastUserMessage = messages.filter((message) => message.role === 'user').pop();
    const relevantKnowledge = kb && lastUserMessage
      ? searchKnowledge(lastUserMessage.content, kb, 8)
      : [];
    const actions = buildAssistantActions(lastUserMessage?.content || '', relevantKnowledge);

    if (body.debug === true && process.env.NODE_ENV !== 'production') {
      return NextResponse.json({
        matches: relevantKnowledge.map((result) => ({
          id: result.entry.id,
          type: result.entry.type,
          title: result.entry.title,
          score: result.score,
          reasons: result.reasons,
        })),
        actions,
      });
    }

    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      return streamFallbackResponse(
        generateKnowledgeBasedResponse(lastUserMessage?.content || '', relevantKnowledge),
        actions
      );
    }

    const response = await fetch(OPENROUTER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
        'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'https://miniironpro.com',
        'X-Title': 'AGT Equipment AI',
      },
      body: JSON.stringify({
        model: 'anthropic/claude-3.5-haiku',
        messages: [
          { role: 'system', content: buildSystemPrompt(relevantKnowledge) },
          ...messages,
        ],
        stream: true,
        temperature: 0.2,
        max_tokens: 700,
      }),
    });

    if (!response.ok) {
      return streamFallbackResponse(
        generateKnowledgeBasedResponse(lastUserMessage?.content || '', relevantKnowledge),
        actions
      );
    }

    return streamOpenRouterResponse(response, actions);
  } catch (error) {
    console.error('AI Assistant error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
