import { NextRequest, NextResponse } from 'next/server';
import { requireAdminUser } from '@/lib/supabase/admin';

export const dynamic = 'force-dynamic';

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';

// Content generation prompts
const CONTENT_PROMPTS = {
  category: `You are an expert SEO content writer for AGT Equipment, a company selling mini excavators, skid steers, and attachments.

Generate SEO-optimized category page content following AEO (Answer Engine Optimization) best practices.

The content should:
1. Start with a direct answer (2-3 sentences) that directly answers "What is [category]?"
2. Include semantic triples (subject-predicate-object statements) for machine readability
3. Have clear H2/H3 structure with keyword-rich headings
4. Include a comparison table in Markdown format
5. End with a FAQ section (3-5 questions)
6. Be informative, not salesy
7. Use natural language that answers voice search queries

Output format:
- quickAnswer: 2-3 sentence direct answer
- semanticTriples: array of 3-5 factual statements
- introduction: 1-2 paragraphs (100-150 words)
- sections: array of {title, content}
- comparisonTable: markdown table if applicable
- faq: array of {question, answer}
- metaDescription: 150-160 characters
- titleTag: 50-60 characters`,

  article: `You are an expert technical writer for AGT Equipment, creating educational content about compact construction equipment.

Generate a comprehensive article following AEO best practices.

The article should:
1. Start with a "Quick Answer" box (2-3 sentences)
2. Include semantic triples for machine readability
3. Have a clear decision flowchart or step-by-step process
4. Use tables for comparisons where applicable
5. Include practical tips and real-world examples
6. End with a FAQ section (3-5 questions)
7. Be 800-1500 words

Output format:
- quickAnswer: direct answer summary
- semanticTriples: array of factual statements
- title: article title
- excerpt: 1-2 sentence summary
- content: full article in HTML format (h2, h3, p, ul, table tags)
- faq: array of {question, answer}
- readingTime: estimated minutes
- metaDescription: 150-160 characters`,

  faq: `You are an expert in compact construction equipment. Generate a comprehensive FAQ answer.

The answer should:
1. Start with a direct answer (1-2 sentences)
2. Provide additional context if needed
3. Include specific numbers/specs when relevant
4. Be 100-200 words total
5. Sound natural for voice search

Output format:
- question: the FAQ question
- answer: comprehensive answer
- relatedQuestions: array of 2-3 related questions`,
};

export async function POST(request: NextRequest) {
  try {
    const admin = await requireAdminUser();
    if (!admin.ok) return admin.response;

    const body = await request.json();
    const { type, topic, context, additionalInstructions } = body;

    if (!type || !topic) {
      return NextResponse.json({ error: 'Type and topic are required' }, { status: 400 });
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    // Build the prompt
    const systemPrompt = CONTENT_PROMPTS[type as keyof typeof CONTENT_PROMPTS] || CONTENT_PROMPTS.article;
    
    const userPrompt = `Topic: ${topic}
${context ? `Context: ${context}` : ''}
${additionalInstructions ? `Additional Instructions: ${additionalInstructions}` : ''}

Generate the content now. Output ONLY valid JSON, no markdown code blocks.`;

    // Call OpenRouter with Claude Sonnet
    const response = await fetch(OPENROUTER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'https://miniironpro.com',
        'X-Title': 'AGT Equipment Content Generator',
      },
      body: JSON.stringify({
        model: 'anthropic/claude-3.5-sonnet',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.7,
        max_tokens: 4000,
      }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      console.error('OpenRouter error:', error);
      return NextResponse.json({ error: 'Failed to generate content' }, { status: 500 });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      return NextResponse.json({ error: 'No content generated' }, { status: 500 });
    }

    // Try to parse as JSON, if not return as raw content
    try {
      const parsed = JSON.parse(content);
      return NextResponse.json({ success: true, content: parsed });
    } catch {
      return NextResponse.json({ success: true, content, raw: true });
    }
  } catch (error) {
    console.error('Content generation error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
