import fs from 'fs';
import path from 'path';
import { getProductPath, products } from '@/data/products';
import type { Product } from '@/types';

export interface KnowledgeEntry {
  id: string;
  type: 'product' | 'article' | 'faq' | 'category' | 'page';
  title: string;
  content: string;
  keywords: string[];
  metadata: Record<string, unknown>;
}

export interface KnowledgeBase {
  version: string;
  generatedAt: string;
  siteUrl: string;
  siteName: string;
  entries: KnowledgeEntry[];
}

export interface KnowledgeSearchResult {
  entry: KnowledgeEntry;
  score: number;
  reasons: string[];
}

export interface AssistantAction {
  type: 'view_product' | 'add_to_cart' | 'request_quote' | 'checkout' | 'contact';
  label: string;
  href?: string;
  productId?: string;
  productName?: string;
}

let knowledgeBaseCache: KnowledgeBase | null = null;
let cacheTime = 0;
const CACHE_TTL = 5 * 60 * 1000;

const BUYING_TERMS = [
  'buy',
  'purchase',
  'order',
  'checkout',
  'cart',
  'quote',
  'quotation',
  'price',
  'cost',
  'payment',
  'pay',
  'financing',
  'deposit',
];

const PRODUCT_INTENT_TERMS = [
  'excavator',
  'skid',
  'steer',
  'loader',
  'equipment',
  'machine',
  'attachment',
  'bucket',
  'thumb',
  'auger',
  'landscaping',
  'trenching',
  'digging',
  'farm',
  'construction',
];

const ACCESSORY_TERMS = [
  'accessory',
  'attachment',
  'bucket',
  'cable',
  'cylinder',
  'switch',
  'pump',
  'cover',
  'filter',
  'belt',
  'hose',
  'part',
  'parts',
  'tooth',
  'teeth',
  'blade',
];

const POLICY_INTENTS = [
  {
    id: 'shipping',
    terms: ['shipping', 'ship', 'delivery', 'deliver', 'freight', 'pickup', 'warehouse', 'international'],
    titles: ['shipping policy', 'how long does shipping take'],
  },
  {
    id: 'warranty',
    terms: ['warranty', 'service', 'repair', 'defect', 'coverage', 'covered'],
    titles: ['warranty information'],
  },
  {
    id: 'payment',
    terms: ['payment', 'pay', 'financing', 'finance', 'deposit', 'wire', 'ach', 'credit card', 'terms'],
    titles: ['payment & financing'],
  },
  {
    id: 'return',
    terms: ['return', 'refund', 'restocking', 'cancel', 'cancellation'],
    titles: ['return policy'],
  },
  {
    id: 'contact',
    terms: ['contact', 'phone', 'email', 'representative', 'human', 'sales'],
    titles: ['about agt equipment', 'how do i contact agt equipment'],
  },
];

export function loadKnowledgeBase(): KnowledgeBase | null {
  const now = Date.now();

  if (knowledgeBaseCache && now - cacheTime < CACHE_TTL) {
    return knowledgeBaseCache;
  }

  try {
    const kbPath = path.join(process.cwd(), 'knowledge-base.json');
    if (!fs.existsSync(kbPath)) {
      console.warn('Knowledge base not found, run: npm run knowledge:generate');
      return null;
    }

    knowledgeBaseCache = JSON.parse(fs.readFileSync(kbPath, 'utf-8'));
    cacheTime = now;
    return knowledgeBaseCache;
  } catch (error) {
    console.error('Error loading knowledge base:', error);
    return null;
  }
}

export function normalizeSearchText(value: string): string {
  return value
    .toLowerCase()
    .replace(/&amp;/g, ' and ')
    .replace(/<[^>]*>/g, ' ')
    .replace(/[^a-z0-9.\-\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function compact(value: string): string {
  return normalizeSearchText(value).replace(/[^a-z0-9]/g, '');
}

function tokenize(value: string): string[] {
  const stopWords = new Set([
    'the',
    'and',
    'for',
    'with',
    'what',
    'which',
    'that',
    'this',
    'need',
    'want',
    'your',
    'about',
    'from',
    'have',
    'does',
    'can',
    'how',
    'all',
    'our',
  ]);

  return normalizeSearchText(value)
    .split(/\s+/)
    .filter((word) => word.length > 1 && !stopWords.has(word));
}

function textHasAny(text: string, terms: string[]): boolean {
  return terms.some((term) => text.includes(term));
}

function policyIntentIds(queryText: string): string[] {
  return POLICY_INTENTS
    .filter((intent) => intent.terms.some((term) => queryText.includes(term)))
    .map((intent) => intent.id);
}

function productForEntry(entry: KnowledgeEntry): Product | undefined {
  if (entry.type !== 'product') return undefined;
  const id = entry.id.replace(/^product-/, '');
  return products.find((product) => product.id === id);
}

function productAliases(product: Product): string[] {
  const raw = [
    product.sku,
    product.slug,
    ...product.tags,
    ...product.sku.split(/[-_\s]+/),
  ];

  if (product.sku.toLowerCase().startsWith('agt-')) {
    raw.push(product.sku.slice(4));
  }

  return Array.from(
    new Set(
      raw
        .map((value) => normalizeSearchText(value))
        .flatMap((value) => [value, compact(value)])
        .filter((value) => value.length >= 3)
    )
  );
}

function isAccessoryLike(entry: KnowledgeEntry, product?: Product): boolean {
  const title = normalizeSearchText(entry.title);
  const category = normalizeSearchText(String(entry.metadata.category || product?.category || ''));
  const subcategory = normalizeSearchText(String(product?.subcategory || ''));

  return (
    category.includes('parts') ||
    category.includes('accessories') ||
    category.includes('attachments') ||
    subcategory.includes('parts') ||
    textHasAny(title, ACCESSORY_TERMS)
  );
}

function scoreEntry(entry: KnowledgeEntry, query: string, queryTokens: string[]): KnowledgeSearchResult {
  const queryText = normalizeSearchText(query);
  const queryCompact = compact(query);
  const title = normalizeSearchText(entry.title);
  const content = normalizeSearchText(entry.content);
  const keywords = entry.keywords.map((keyword) => normalizeSearchText(keyword));
  const policyIds = policyIntentIds(queryText);
  const product = productForEntry(entry);
  const reasons: string[] = [];
  let score = 0;

  if (entry.type === 'page' || entry.type === 'faq') {
    for (const intent of POLICY_INTENTS) {
      if (!policyIds.includes(intent.id)) continue;

      if (intent.titles.some((intentTitle) => title.includes(normalizeSearchText(intentTitle)))) {
        score += entry.type === 'page' ? 900 : 500;
        reasons.push(`${intent.id}-policy`);
      } else if (intent.terms.some((term) => title.includes(term) || content.includes(term))) {
        score += entry.type === 'page' ? 300 : 180;
        reasons.push(`${intent.id}-related`);
      }
    }
  }

  if (entry.type === 'product' && product) {
    for (const alias of productAliases(product)) {
      if (queryText.includes(alias) || queryCompact.includes(alias)) {
        score += alias === compact(product.sku) || alias === normalizeSearchText(product.sku) ? 1100 : 850;
        reasons.push('sku-or-model-match');
        break;
      }
    }

    if (queryText.includes(title) || queryCompact.includes(compact(title))) {
      score += 450;
      reasons.push('title-phrase');
    }
  }

  for (const token of queryTokens) {
    if (title.split(/\s+/).some((titleToken) => titleToken === token)) {
      score += 20;
      reasons.push('title-token');
    } else if (title.includes(token)) {
      score += 10;
    }

    if (keywords.some((keyword) => keyword === token || keyword.includes(token))) {
      score += 8;
      reasons.push('keyword');
    }

    if (content.includes(token)) {
      score += 2;
    }
  }

  const hasProductIntent = textHasAny(queryText, PRODUCT_INTENT_TERMS);
  const hasBuyingIntent = textHasAny(queryText, BUYING_TERMS);
  const wantsSpecificProductInfo = textHasAny(queryText, ['price', 'cost', 'spec', 'depth', 'digging', 'engine', 'horsepower', 'hp']);

  if (entry.type === 'product') {
    if (hasProductIntent || hasBuyingIntent) {
      score += 35;
    }

    if (product?.stock === 'in_stock') {
      score += 8;
    }

    if (isAccessoryLike(entry, product) && hasProductIntent && !textHasAny(queryText, ACCESSORY_TERMS)) {
      score -= wantsSpecificProductInfo ? 220 : 90;
      reasons.push('accessory-downranked');
    }
  }

  if ((entry.type === 'page' || entry.type === 'faq') && policyIds.length > 0) {
    score += 50;
  }

  return { entry, score, reasons };
}

export function searchKnowledge(query: string, kb: KnowledgeBase, limit = 8): KnowledgeSearchResult[] {
  const queryTokens = tokenize(query);
  const queryText = normalizeSearchText(query);

  if (queryTokens.length === 0) {
    return [];
  }

  let scored = kb.entries
    .map((entry) => scoreEntry(entry, query, queryTokens))
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score);

  const exactPrimaryProduct = scored.find((result) => {
    const product = productForEntry(result.entry);
    return (
      result.entry.type === 'product' &&
      product &&
      result.reasons.includes('sku-or-model-match') &&
      !isAccessoryLike(result.entry, product)
    );
  });

  if (exactPrimaryProduct && !textHasAny(queryText, ACCESSORY_TERMS)) {
    scored = scored.filter((result) => {
      const product = productForEntry(result.entry);
      return (
        result.entry.type !== 'product' ||
        !product ||
        !isAccessoryLike(result.entry, product) ||
        result.score >= exactPrimaryProduct.score - 120
      );
    });
  }

  const byId = new Map<string, KnowledgeSearchResult>();
  for (const result of scored) {
    if (!byId.has(result.entry.id)) {
      byId.set(result.entry.id, result);
    }
  }

  return Array.from(byId.values()).slice(0, limit);
}

export function knowledgeContext(results: KnowledgeSearchResult[]): string {
  return results
    .map(({ entry }) => `[${entry.type.toUpperCase()}] ${entry.title}\n${entry.content}`)
    .join('\n\n---\n\n');
}

function quoteHref(product?: Product): string {
  if (!product) return '/inquiry';
  const params = new URLSearchParams({
    productId: product.id,
    productName: product.name,
  });
  return `/inquiry?${params.toString()}`;
}

function addUniqueAction(actions: AssistantAction[], action: AssistantAction) {
  const key = `${action.type}:${action.productId || action.href || action.label}`;
  if (!actions.some((existing) => `${existing.type}:${existing.productId || existing.href || existing.label}` === key)) {
    actions.push(action);
  }
}

export function buildAssistantActions(query: string, results: KnowledgeSearchResult[]): AssistantAction[] {
  const queryText = normalizeSearchText(query);
  const actions: AssistantAction[] = [];
  const productMatches = results
    .map((result) => ({ result, product: productForEntry(result.entry) }))
    .filter((match): match is { result: KnowledgeSearchResult; product: Product } => Boolean(match.product));
  const productResults = (productMatches[0]?.result.reasons.includes('sku-or-model-match')
    ? productMatches.slice(0, 1)
    : productMatches.slice(0, 2)
  ).map((match) => match.product);

  if (textHasAny(queryText, ['checkout', 'buy', 'purchase'])) {
    addUniqueAction(actions, {
      type: 'checkout',
      label: 'Go to checkout',
      href: '/checkout',
    });
  }

  for (const product of productResults) {
    addUniqueAction(actions, {
      type: 'view_product',
      label: `View ${product.sku}`,
      href: getProductPath(product),
      productId: product.id,
      productName: product.name,
    });

    if (product.stock !== 'out_of_stock') {
      addUniqueAction(actions, {
        type: 'add_to_cart',
        label: 'Add to cart',
        productId: product.id,
        productName: product.name,
      });
    }

    addUniqueAction(actions, {
      type: 'request_quote',
      label: 'Request quote',
      href: quoteHref(product),
      productId: product.id,
      productName: product.name,
    });
  }

  if (textHasAny(queryText, BUYING_TERMS) || productResults.length > 0) {
    addUniqueAction(actions, {
      type: 'request_quote',
      label: productResults.length > 0 ? 'Quote this item' : 'Request a quote',
      href: quoteHref(productResults[0]),
      productId: productResults[0]?.id,
      productName: productResults[0]?.name,
    });
  }

  if (textHasAny(queryText, ['checkout', 'buy', 'purchase', 'order'])) {
    addUniqueAction(actions, {
      type: 'checkout',
      label: 'Go to checkout',
      href: '/checkout',
    });
  }

  addUniqueAction(actions, {
    type: 'contact',
    label: 'Call sales',
    href: 'tel:+19498987669',
  });

  return actions.slice(0, 5);
}

export function generateKnowledgeBasedResponse(query: string, results: KnowledgeSearchResult[]): string {
  if (results.length === 0) {
    return "I can help with AGT mini excavators, skid steers, attachments, pricing, shipping, warranty, payment, and return policies. I do not have a confident match for that question yet, so the safest next step is to request a quote or call (949) 898-7669.";
  }

  const policyResults = results.filter((result) => result.entry.type === 'page' || result.entry.type === 'faq');
  const productResults = results.filter((result) => result.entry.type === 'product');
  const hasPolicyIntent = policyIntentIds(normalizeSearchText(query)).length > 0;

  if (hasPolicyIntent && policyResults.length > 0) {
    return `${policyResults
      .slice(0, 2)
      .map((result) => `${result.entry.title}\n${result.entry.content}`)
      .join('\n\n')}\n\nFor anything specific to your order, our team can confirm details at (949) 898-7669.`;
  }

  if (productResults.length > 0) {
    const selectedProductResults = productResults[0]?.reasons.includes('sku-or-model-match')
      ? productResults.slice(0, 1)
      : productResults.slice(0, 3);

    const productLines = selectedProductResults.map((result) => {
      const product = productForEntry(result.entry);
      const price = product ? `$${product.price.toLocaleString()} USD` : 'Contact for price';
      const stock = product?.stock === 'in_stock' ? 'In stock' : product?.stock === 'preorder' ? 'Pre-order' : 'Check availability';
      const href = product ? getProductPath(product) : '';
      return `- ${result.entry.title}: ${price}; SKU ${product?.sku || 'N/A'}; ${stock}${href ? `; ${href}` : ''}`;
    });

    return `Here are the best matches from the current AGT catalog:\n\n${productLines.join('\n')}\n\nAll equipment purchases include free continental US shipping and a 1-year warranty. You can request a quote or add an in-stock item to the cart from the actions below.`;
  }

  return `${results[0].entry.content}\n\nNeed a confirmed quote or availability check? Call (949) 898-7669 or use the quote action below.`;
}
