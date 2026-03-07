/**
 * Knowledge Base Generator
 *
 * 从网站数据源提取知识，生成 AI 助手可用的知识库
 * 运行方式: npx tsx scripts/generate-knowledge.ts
 */

import fs from 'fs';
import path from 'path';

// 数据源路径
const DATA_DIR = path.join(process.cwd(), 'src/data');
const OUTPUT_FILE = path.join(process.cwd(), 'knowledge-base.json');

// 知识条目类型
interface KnowledgeEntry {
  id: string;
  type: 'product' | 'article' | 'faq' | 'category' | 'page';
  title: string;
  content: string; // 用于检索和作为上下文
  keywords: string[];
  metadata: Record<string, unknown>;
  updatedAt: string;
}

interface KnowledgeBase {
  version: string;
  generatedAt: string;
  siteUrl: string;
  siteName: string;
  entries: KnowledgeEntry[];
  summary: {
    totalEntries: number;
    byType: Record<string, number>;
    products: number;
    articles: number;
    faqs: number;
  };
}

// 提取关键词的简单函数
function extractKeywords(text: string): string[] {
  // 移除标点和特殊字符，分词
  const words = text.toLowerCase()
    .replace(/[^\w\s-]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 2);

  // 停用词列表
  const stopWords = new Set([
    'the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'had',
    'her', 'was', 'one', 'our', 'out', 'has', 'have', 'been', 'will', 'your',
    'from', 'they', 'this', 'that', 'with', 'what', 'when', 'where', 'which',
    'how', 'why', 'who', 'its', 'his', 'she', 'him', 'her', 'their', 'them',
  ]);

  // 过滤并去重
  const filtered = words.filter(w => !stopWords.has(w) && !/^\d+$/.test(w));
  return Array.from(new Set(filtered));
}

// 从产品提取知识
async function extractProducts(): Promise<KnowledgeEntry[]> {
  const productsPath = path.join(DATA_DIR, 'products.ts');
  if (!fs.existsSync(productsPath)) return [];

  const { products } = await import('../src/data/products');

  return products.map(product => ({
    id: `product-${product.id}`,
    type: 'product' as const,
    title: product.name,
    content: [
      `Product: ${product.name}`,
      `SKU: ${product.sku}`,
      `Price: $${product.price.toLocaleString()} USD`,
      product.compareAtPrice ? `Compare at: $${product.compareAtPrice.toLocaleString()}` : '',
      `Category: ${product.category}`,
      product.subcategory ? `Subcategory: ${product.subcategory}` : '',
      product.shortDescription || '',
      `Features: ${product.features.join(', ')}`,
      `Specifications: ${Object.entries(product.specifications).map(([k, v]) => `${k}: ${v}`).join('; ')}`,
      product.stock === 'in_stock' ? 'In Stock' : product.stock === 'out_of_stock' ? 'Out of Stock' : 'Pre-order',
      product.rating ? `Rating: ${product.rating.average}/5 (${product.rating.count} reviews)` : '',
    ].filter(Boolean).join('\n'),
    keywords: extractKeywords(
      `${product.name} ${product.category} ${product.subcategory || ''} ${product.features.join(' ')} ${product.tags.join(' ')}`
    ),
    metadata: {
      sku: product.sku,
      price: product.price,
      category: product.category,
      slug: product.slug,
      stock: product.stock,
    },
    updatedAt: product.updatedAt,
  }));
}

// 从文章提取知识
async function extractArticles(): Promise<KnowledgeEntry[]> {
  const articlesPath = path.join(DATA_DIR, 'articles.ts');
  if (!fs.existsSync(articlesPath)) return [];

  const { articles } = await import('../src/data/articles');

  return articles.map(article => ({
    id: `article-${article.id}`,
    type: 'article' as const,
    title: article.title,
    content: [
      `Article: ${article.title}`,
      `Category: ${article.category}`,
      `Summary: ${article.excerpt}`,
      `Quick Answer: ${article.quickAnswer}`,
      `Reading Time: ${article.readingTime} minutes`,
      `FAQs:`,
      ...article.faq.map(faq => `Q: ${faq.question}\nA: ${faq.answer}`),
    ].join('\n'),
    keywords: extractKeywords(
      `${article.title} ${article.excerpt} ${article.tags.join(' ')}`
    ),
    metadata: {
      slug: article.slug,
      category: article.category,
      readingTime: article.readingTime,
    },
    updatedAt: article.updatedAt,
  }));
}

// 从分类提取知识
async function extractCategories(): Promise<KnowledgeEntry[]> {
  const categoriesPath = path.join(DATA_DIR, 'categories.ts');
  if (!fs.existsSync(categoriesPath)) return [];

  const { categories } = await import('../src/data/categories');

  return categories.map(category => ({
    id: `category-${category.id}`,
    type: 'category' as const,
    title: category.name,
    content: [
      `Category: ${category.name}`,
      `Description: ${category.description}`,
      `Products: ${category.productCount} items`,
    ].join('\n'),
    keywords: extractKeywords(`${category.name} ${category.description}`),
    metadata: {
      slug: category.slug,
      productCount: category.productCount,
    },
    updatedAt: new Date().toISOString(),
  }));
}

// 提取页面知识（硬编码的页面内容）
function extractPages(): KnowledgeEntry[] {
  return [
    {
      id: 'page-about',
      type: 'page' as const,
      title: 'About AGT Equipment',
      content: `About AGT Equipment / AGT Industrial Inc.

Company Overview:
- Founded in 2004, headquartered in China
- US warehouses: Santa Ana, CA (2602 Halladay Street, 92707) and Chicago, IL (6200 S Oak Park Ave, 60638)
- Specializes in mini excavators (1-4 ton) and skid steers
- Factory direct pricing with 1-year warranty
- Free shipping within continental US
- Contact: +1 (949) 898-7669, info@agrotkindustrial.com
- Business hours: Mon-Fri 8AM-5PM PST

Key Selling Points:
- Factory direct pricing (no middleman)
- Free continental US shipping
- 1-year warranty on all equipment
- Expert technical support
- US warehouses for fast delivery`,
      keywords: ['about', 'company', 'agt', 'warehouse', 'shipping', 'warranty', 'contact'],
      metadata: { slug: 'about' },
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'page-shipping',
      type: 'page' as const,
      title: 'Shipping Policy',
      content: `Shipping Policy

Free Shipping:
- Free shipping within continental United States
- Ships from California (Santa Ana) or Illinois (Chicago) warehouses
- Delivery time: 3-7 business days depending on location

Delivery Requirements:
- Someone 18+ must be present to sign for delivery
- Equipment delivered on flatbed or lowboy trailer
- Customer needs forklift, ramps, or equipment to unload
- Liftgate delivery available for smaller machines (additional fee)

Pickup Option:
- Pickup available at Santa Ana, CA or Chicago, IL warehouses
- Contact to schedule pickup appointment
- Shipping cost deducted from order

International Shipping:
- Alaska, Hawaii, and international shipping available for additional cost
- Contact for quote`,
      keywords: ['shipping', 'delivery', 'free shipping', 'pickup', 'international'],
      metadata: { slug: 'shipping' },
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'page-warranty',
      type: 'page' as const,
      title: 'Warranty Information',
      content: `Warranty Information

Coverage:
- All AGT equipment includes 1-year warranty
- Covers manufacturing defects and component failures under normal use
- Includes: engine, hydraulics, electrical systems, structural components

Not Covered:
- Wear items: filters, tracks, belts, brake pads
- Damage from misuse, neglect, or accidents
- Modifications not approved by AGT

Warranty Service:
- Contact support at (949) 898-7669 or info@agrotkindustrial.com
- We diagnose the issue and ship replacement parts or direct to service center
- For major repairs, return shipping may be arranged

Extended Warranty:
- Extended warranty options available
- Contact for pricing and terms`,
      keywords: ['warranty', 'coverage', 'service', 'repair', 'parts'],
      metadata: { slug: 'warranty' },
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'page-payment',
      type: 'page' as const,
      title: 'Payment & Financing',
      content: `Payment & Financing Options

Payment Methods:
- Bank wire transfer (preferred for orders over $10,000)
- ACH transfer
- Cashier's check
- Credit card (3% processing fee applies)

Financing:
- Equipment financing available through partner providers
- Terms: 24-60 months
- Approval typically takes 1-2 business days
- Contact for financing quote

Deposit Requirements:
- Standard orders: 10% deposit to reserve
- Custom orders: 30% deposit may be required
- Full payment due before shipping

Order Process:
1. Request quote via phone, email, or contact form
2. Confirm availability and specifications
3. Pay deposit to reserve
4. Complete payment before shipping
5. Receive tracking information`,
      keywords: ['payment', 'financing', 'deposit', 'wire', 'credit card'],
      metadata: { slug: 'payment' },
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'page-return',
      type: 'page' as const,
      title: 'Return Policy',
      content: `Return Policy

Return Window:
- Equipment can be returned within 7 days of delivery
- Must be unused and in original condition

Return Costs:
- Return shipping is buyer's responsibility
- 15% restocking fee may apply

Return Process:
1. Contact us before returning
2. We authorize the return and provide instructions
3. Ship equipment back at your cost
4. Inspection upon receipt
5. Refund issued (minus restocking fee if applicable)

Refunds:
- Refunds processed within 7-10 business days
- Original payment method used for refund`,
      keywords: ['return', 'refund', 'policy', 'restocking'],
      metadata: { slug: 'return' },
      updatedAt: new Date().toISOString(),
    },
  ];
}

// 提取常见问题（从页面和文章汇总）
function extractFAQs(): KnowledgeEntry[] {
  return [
    {
      id: 'faq-general-1',
      type: 'faq' as const,
      title: 'What products does AGT Equipment sell?',
      content: `Question: What products does AGT Equipment sell?

Answer: AGT Equipment sells mini excavators (1-4 ton), skid steers, attachments, and parts. Mini excavators range from $11,999 to $29,000. Skid steers start at $8,999. We offer over 120 attachment types. All products ship free within continental US and include 1-year warranty.`,
      keywords: ['products', 'sell', 'mini excavator', 'skid steer', 'attachments'],
      metadata: { category: 'general' },
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'faq-general-2',
      type: 'faq' as const,
      title: 'How do I contact AGT Equipment?',
      content: `Question: How do I contact AGT Equipment?

Answer: You can reach AGT Equipment by:
- Phone: +1 (949) 898-7669
- Email: info@agrotkindustrial.com
- Website contact form: agt-equipment.com/contact
- Business hours: Monday-Friday, 8AM-5PM PST

Our team provides technical support before and after purchase.`,
      keywords: ['contact', 'phone', 'email', 'support'],
      metadata: { category: 'general' },
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'faq-shipping-1',
      type: 'faq' as const,
      title: 'How long does shipping take?',
      content: `Question: How long does shipping take?

Answer: Shipping takes 3-7 business days within the continental United States, depending on your location relative to our California or Illinois warehouses. We provide tracking information once your equipment ships.`,
      keywords: ['shipping', 'delivery', 'time', 'how long'],
      metadata: { category: 'shipping' },
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'faq-price-1',
      type: 'faq' as const,
      title: 'What are the prices for mini excavators?',
      content: `Question: What are the prices for mini excavators?

Answer: AGT mini excavator prices:
- H15R (1.1-ton, Rato engine): $11,999
- DM12X (1.2-ton, Kubota engine): $14,999
- CFG-40UF (4-ton, Kubota, cabin): $29,000

All prices include free shipping within continental US. Financing available.`,
      keywords: ['price', 'cost', 'mini excavator', 'how much'],
      metadata: { category: 'pricing' },
      updatedAt: new Date().toISOString(),
    },
  ];
}

// 主函数
async function generateKnowledgeBase() {
  console.log('🔄 Generating knowledge base...');

  try {
    // 提取所有知识
    const [products, articles, categories] = await Promise.all([
      extractProducts(),
      extractArticles(),
      extractCategories(),
    ]);

    const pages = extractPages();
    const faqs = extractFAQs();

    // 合并所有条目
    const entries: KnowledgeEntry[] = [
      ...products,
      ...articles,
      ...categories,
      ...pages,
      ...faqs,
    ];

    // 统计
    const byType: Record<string, number> = {};
    entries.forEach(e => {
      byType[e.type] = (byType[e.type] || 0) + 1;
    });

    // 构建知识库
    const knowledgeBase: KnowledgeBase = {
      version: new Date().toISOString().split('T')[0], // YYYY-MM-DD
      generatedAt: new Date().toISOString(),
      siteUrl: 'https://agt-equipment.com',
      siteName: 'AGT Equipment',
      entries,
      summary: {
        totalEntries: entries.length,
        byType,
        products: products.length,
        articles: articles.length,
        faqs: faqs.length,
      },
    };

    // 写入文件
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(knowledgeBase, null, 2), 'utf-8');

    console.log('✅ Knowledge base generated successfully!');
    console.log(`   Total entries: ${entries.length}`);
    console.log(`   Products: ${products.length}`);
    console.log(`   Articles: ${articles.length}`);
    console.log(`   Categories: ${categories.length}`);
    console.log(`   Pages: ${pages.length}`);
    console.log(`   FAQs: ${faqs.length}`);
    console.log(`   Output: ${OUTPUT_FILE}`);

    return knowledgeBase;
  } catch (error) {
    console.error('❌ Error generating knowledge base:', error);
    process.exit(1);
  }
}

// 执行
generateKnowledgeBase();
