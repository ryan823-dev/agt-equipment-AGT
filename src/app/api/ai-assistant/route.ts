import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Knowledge base types
interface KnowledgeEntry {
  id: string;
  type: 'product' | 'article' | 'faq' | 'category' | 'page';
  title: string;
  content: string;
  keywords: string[];
  metadata: Record<string, unknown>;
}

interface KnowledgeBase {
  version: string;
  generatedAt: string;
  siteUrl: string;
  siteName: string;
  entries: KnowledgeEntry[];
}

// Cache for knowledge base
let knowledgeBaseCache: KnowledgeBase | null = null;
let cacheTime: number = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// Load knowledge base
function loadKnowledgeBase(): KnowledgeBase | null {
  const now = Date.now();

  // Return cached if still valid
  if (knowledgeBaseCache && (now - cacheTime) < CACHE_TTL) {
    return knowledgeBaseCache;
  }

  try {
    const kbPath = path.join(process.cwd(), 'knowledge-base.json');
    if (!fs.existsSync(kbPath)) {
      console.warn('Knowledge base not found, run: npm run knowledge:generate');
      return null;
    }

    const content = fs.readFileSync(kbPath, 'utf-8');
    knowledgeBaseCache = JSON.parse(content);
    cacheTime = now;
    return knowledgeBaseCache;
  } catch (error) {
    console.error('Error loading knowledge base:', error);
    return null;
  }
}

// Simple keyword-based search
function searchKnowledge(query: string, kb: KnowledgeBase, limit: number = 5): KnowledgeEntry[] {
  const queryWords = query.toLowerCase()
    .replace(/[^\w\s-]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 2);

  // Score each entry
  const scored = kb.entries.map(entry => {
    let score = 0;

    // Check title match (highest weight)
    const titleWords = entry.title.toLowerCase().split(/\s+/);
    queryWords.forEach(word => {
      if (titleWords.some(tw => tw.includes(word))) {
        score += 10;
      }
    });

    // Check keyword match
    queryWords.forEach(word => {
      if (entry.keywords.some(kw => kw.includes(word))) {
        score += 3;
      }
    });

    // Check content match
    const contentWords = entry.content.toLowerCase();
    queryWords.forEach(word => {
      if (contentWords.includes(word)) {
        score += 1;
      }
    });

    return { entry, score };
  });

  // Sort by score and return top results
  return scored
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(s => s.entry);
}

// Build system prompt with knowledge context
function buildSystemPrompt(relevantKnowledge: KnowledgeEntry[]): string {
  const basePrompt = `You are the AI pre-sales consultant for AGT Equipment (AGT Industrial Inc.).

IMPORTANT: You have access to real-time knowledge about our products, articles, policies, and FAQs. Use this knowledge to answer questions accurately.

RESPONSE RULES:
1. Be professional, helpful, and technically accurate
2. ONLY use facts from the provided knowledge - never fabricate specifications or prices
3. When users ask about pricing: provide exact prices from the knowledge if available
4. Guide customers toward requesting a quote or calling +1 (949) 898-7669
5. Keep responses concise — max 3-4 paragraphs
6. Always mention: 1-year warranty and free continental US shipping
7. If you don't know something, offer to connect them with our team

KNOWLEDGE UPDATES: Our knowledge base is synced with the website content, so you always have current product info, prices, and policies.`;

  if (relevantKnowledge.length === 0) {
    return basePrompt;
  }

  const knowledgeContext = relevantKnowledge.map(k =>
    `[${k.type.toUpperCase()}] ${k.title}\n${k.content}`
  ).join('\n\n---\n\n');

  return `${basePrompt}

RELEVANT KNOWLEDGE FROM OUR DATABASE:
---
${knowledgeContext}
---

Use the above knowledge to answer the user's question accurately. If the knowledge doesn't contain the answer, say so and offer to connect them with our team.`;
}

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Messages are required' }, { status: 400 });
    }

    // Load knowledge base
    const kb = loadKnowledgeBase();

    // Get the last user message for context search
    const lastUserMessage = messages.filter((m: { role: string }) => m.role === 'user').pop();
    let relevantKnowledge: KnowledgeEntry[] = [];

    if (kb && lastUserMessage) {
      relevantKnowledge = searchKnowledge(lastUserMessage.content, kb, 5);
    }

    // Build system prompt with knowledge
    const systemPrompt = buildSystemPrompt(relevantKnowledge);

    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      // Demo mode - use knowledge to generate response
      const demoResponse = generateKnowledgeBasedResponse(lastUserMessage?.content || '', relevantKnowledge);

      const encoder = new TextEncoder();
      const stream = new ReadableStream({
        start(controller) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ choices: [{ delta: { content: demoResponse } }] })}\n\n`));
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();
        },
      });

      return new Response(stream, {
        headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache' },
      });
    }

    // Call OpenRouter
    const response = await fetch(OPENROUTER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'https://agt-equipment.com',
        'X-Title': 'AGT Equipment AI',
      },
      body: JSON.stringify({
        model: 'anthropic/claude-3.5-haiku',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages.map((m: { role: string; content: string }) => ({ role: m.role, content: m.content })),
        ],
        stream: true,
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const demoResponse = generateKnowledgeBasedResponse(lastUserMessage?.content || '', relevantKnowledge);
      const encoder = new TextEncoder();
      const stream = new ReadableStream({
        start(controller) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ choices: [{ delta: { content: demoResponse } }] })}\n\n`));
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();
        },
      });
      return new Response(stream, {
        headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache' },
      });
    }

    // Stream response
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader();
        if (!reader) { controller.close(); return; }

        const decoder = new TextDecoder();
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            controller.enqueue(encoder.encode(decoder.decode(value)));
          }
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache' },
    });
  } catch (error) {
    console.error('AI Assistant error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Generate response from knowledge when API unavailable
function generateKnowledgeBasedResponse(query: string, knowledge: KnowledgeEntry[]): string {
  if (knowledge.length === 0) {
    return "I'd be happy to help! I can assist with questions about our mini excavators, skid steers, attachments, pricing, shipping, and warranty. What would you like to know? You can also call us at (949) 898-7669 for immediate assistance.";
  }

  // Find product info if query is about products
  const productEntry = knowledge.find(k => k.type === 'product');
  const faqEntry = knowledge.find(k => k.type === 'faq');

  if (productEntry) {
    return `Based on our current inventory:\n\n${productEntry.content}\n\nAll our equipment includes free shipping within the continental US and a 1-year warranty. Would you like more details or a quote?`;
  }

  if (faqEntry) {
    return `${faqEntry.content}\n\nIs there anything else I can help you with?`;
  }

  // Return first relevant knowledge
  return `${knowledge[0].content}\n\nNeed more help? Call us at (949) 898-7669.`;
}
