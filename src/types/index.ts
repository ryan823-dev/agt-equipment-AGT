// Category tier type for 4-layer architecture
export type CategoryTier = 'tier1' | 'tier2';

// Comparison table row for category pages
export interface ComparisonRow {
  feature: string;
  values: Record<string, string>;
}

// Product types
export interface Product {
  id: string;
  slug: string;
  name: string;
  sku: string;
  price: number;
  compareAtPrice?: number;
  description: string;
  shortDescription?: string;
  images: ProductImage[];
  // New: Support 4-layer URL structure
  categorySlug: string;           // Tier 1 category slug (e.g., 'mini-excavators')
  subcategorySlug?: string;       // Tier 2 subcategory slug (e.g., '1-ton')
  // Legacy fields (kept for backward compatibility)
  category: string;               // Display name (e.g., 'Mini Excavators')
  subcategory?: string;           // Display name (e.g., '1-Ton')
  specifications: Record<string, string>;
  features: string[];
  // New: AEO and cross-sell fields
  primaryUseCases?: string[];     // Main use cases for this product
  compatibleAttachments?: string[]; // IDs of compatible attachments
  relatedParts?: string[];        // IDs of related parts/consumables
  rating?: {
    average: number;
    count: number;
  };
  stock: 'in_stock' | 'out_of_stock' | 'preorder';
  tags: string[];
  faq?: FAQ[];
  relatedProducts?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductImage {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

// Category types - Extended for 4-layer architecture
export interface Category {
  id: string;
  slug: string;                   // URL segment (e.g., 'mini-excavators', '1-ton')
  name: string;                   // Display name (e.g., 'Mini Excavators')
  tier: CategoryTier;             // 'tier1' or 'tier2'
  parentSlug?: string;            // Parent category slug (for tier2 categories)
  description: string;
  longDescription?: string;       // 150-300 word buying guide summary
  image?: string;
  // New: SEO/AEO content
  faq?: FAQ[];                    // Category-level FAQ
  comparisonTable?: ComparisonRow[]; // Comparison table data
  answerBlock?: {                 // AEO answer block
    question: string;
    answer: string;
    keyFacts: string[];
  };
  // Legacy
  parentId?: string;              // Kept for backward compatibility
  productCount: number;
}

// Blog/Article types for AEO
export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  quickAnswer: string;            // AEO critical: ≤50 words
  category: 'buying-guide' | 'how-to' | 'explainer' | 'comparison' | 'safety' | 'maintenance';
  tags: string[];
  author: Author;
  faq: FAQ[];
  readingTime: number;
  publishedAt: string;
  updatedAt: string;
}

// Solution page type (Tier 4 - scenario pages)
export interface Solution {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  // AEO answer block
  quickAnswer: string;
  keyFacts: string[];
  // Related products
  recommendedProducts: string[];  // Product IDs
  compatibleAttachments: string[];
  // SEO
  faq: FAQ[];
  metaTitle: string;
  metaDescription: string;
}

// Compare page type (Tier 4 - comparison pages)
export interface Compare {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  // Comparison data
  leftItem: {
    name: string;
    slug: string;
    type: 'product' | 'category' | 'brand' | 'subcategory' | 'equipment' | 'option' | 'condition';
  };
  rightItem: {
    name: string;
    slug: string;
    type: 'product' | 'category' | 'brand' | 'subcategory' | 'equipment' | 'option' | 'condition';
  };
  comparisonTable: ComparisonRow[];
  // AEO
  quickAnswer: string;
  verdict: string;
  // SEO
  faq: FAQ[];
  metaTitle: string;
  metaDescription: string;
}

// Support page type (Tier 4 - support center)
export interface SupportPage {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  icon: string;
  // AEO
  quickAnswer?: string;
  // SEO
  faq?: FAQ[];
  metaTitle: string;
  metaDescription: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Author {
  name: string;
  role: string;
  bio?: string;
  image?: string;
  credentials?: string[];
}

// Schema.org types for structured data
export interface ProductSchema {
  '@context': 'https://schema.org';
  '@type': 'Product';
  name: string;
  description: string;
  image: string[];
  sku: string;
  brand: {
    '@type': 'Brand';
    name: string;
  };
  offers: {
    '@type': 'Offer';
    price: string;
    priceCurrency: string;
    availability: string;
    url: string;
  };
  aggregateRating?: {
    '@type': 'AggregateRating';
    ratingValue: string;
    reviewCount: string;
  };
}

export interface ItemListSchema {
  '@context': 'https://schema.org';
  '@type': 'ItemList';
  name: string;
  description: string;
  numberOfItems: number;
  itemListElement: Array<{
    '@type': 'ListItem';
    position: number;
    url: string;
    name?: string;
    image?: string;
  }>;
}

export interface FAQSchema {
  '@context': 'https://schema.org';
  '@type': 'FAQPage';
  mainEntity: Array<{
    '@type': 'Question';
    name: string;
    acceptedAnswer: {
      '@type': 'Answer';
      text: string;
    };
  }>;
}

export interface BreadcrumbSchema {
  '@context': 'https://schema.org';
  '@type': 'BreadcrumbList';
  itemListElement: Array<{
    '@type': 'ListItem';
    position: number;
    name: string;
    item: string;
  }>;
}

// Navigation types
export interface NavItem {
  name: string;
  href: string;
  children?: NavItem[];
}

export interface BreadcrumbItem {
  name: string;
  href: string;
}

// Filter/Search types
export interface ProductFilter {
  category?: string;
  subcategory?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  tags?: string[];
  sort?: 'price-asc' | 'price-desc' | 'name' | 'newest' | 'rating';
}
