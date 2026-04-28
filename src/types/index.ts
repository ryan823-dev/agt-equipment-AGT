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
  productIds?: string[];
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
    itemCondition?: string;
    seller?: {
      '@type': 'Organization';
      name: string;
      url: string;
    };
    shippingDetails?: Record<string, unknown>;
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

// ============================================
// E-Commerce Types
// ============================================

// User Profile (extends Supabase Auth)
export interface UserProfile {
  id: string;
  full_name: string | null;
  phone: string | null;
  company_name: string | null;
  customer_type: 'b2c' | 'b2b';
  google_id: string | null;
  avatar_url: string | null;
  is_admin: boolean;
  created_at: string;
  updated_at: string;
}

// Address
export interface Address {
  id: string;
  user_id: string;
  type: 'billing' | 'shipping';
  is_default: boolean;
  first_name: string | null;
  last_name: string | null;
  company: string | null;
  address_line1: string;
  address_line2: string | null;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  phone: string | null;
  created_at: string;
  updated_at: string;
}

export interface AddressFormData {
  type: 'billing' | 'shipping';
  is_default?: boolean;
  first_name: string;
  last_name: string;
  company?: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  postal_code: string;
  country?: string;
  phone?: string;
}

// Cart
export interface CartItem {
  id: string;
  user_id: string | null;
  session_id: string | null;
  product_id: string;
  quantity: number;
  unit_price: number;
  created_at: string;
  updated_at: string;
  // Joined data
  product?: Product;
}

export interface CartItemWithProduct extends CartItem {
  product: Product;
}

// Order
export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';
export type PaymentMethod = 'stripe' | 'paypal';

export interface Order {
  id: string;
  order_number: string;
  user_id: string | null;
  status: OrderStatus;
  subtotal: number;
  shipping_cost: number;
  tax_amount: number;
  discount_amount: number;
  total_amount: number;
  currency: string;
  shipping_address: AddressFormData;
  billing_address: AddressFormData;
  shipping_method: string | null;
  tracking_number: string | null;
  shipped_at: string | null;
  delivered_at: string | null;
  payment_status: PaymentStatus;
  payment_method: PaymentMethod | null;
  payment_id: string | null;
  paid_at: string | null;
  customer_notes: string | null;
  internal_notes: string | null;
  created_at: string;
  updated_at: string;
  // Joined data
  items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product_name: string;
  product_sku: string | null;
  unit_price: number;
  quantity: number;
  subtotal: number;
  specifications: Record<string, string> | null;
  created_at: string;
}

// Inquiry (B2B Quote Request)
export type InquiryType = 'single' | 'bulk' | 'custom';
export type InquiryStatus = 'pending' | 'quoted' | 'accepted' | 'converted' | 'expired';

export interface Inquiry {
  id: string;
  inquiry_number: string;
  user_id: string | null;
  contact_name: string;
  contact_email: string;
  contact_phone: string | null;
  company_name: string | null;
  type: InquiryType;
  status: InquiryStatus;
  message: string | null;
  use_case: string | null;
  preferred_timeline: string | null;
  attachments: Record<string, unknown>[] | null;
  quote_id: string | null;
  converted_order_id: string | null;
  created_at: string;
  updated_at: string;
  // Joined data
  items?: InquiryItem[];
  quote?: Quote;
}

export interface InquiryItem {
  id: string;
  inquiry_id: string;
  product_id: string | null;
  product_name: string;
  quantity: number;
  notes: string | null;
  created_at: string;
}

export interface InquiryFormData {
  contact_name: string;
  contact_email: string;
  contact_phone?: string;
  company_name?: string;
  type: InquiryType;
  message?: string;
  use_case?: string;
  preferred_timeline?: string;
  items: {
    product_id?: string;
    product_name: string;
    quantity: number;
    notes?: string;
  }[];
}

// Quote (B2B)
export type QuoteStatus = 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired';

export interface Quote {
  id: string;
  quote_number: string;
  inquiry_id: string | null;
  user_id: string | null;
  status: QuoteStatus;
  valid_until: string | null;
  subtotal: number;
  shipping_cost: number;
  discount_amount: number;
  total_amount: number;
  currency: string;
  payment_terms: string | null;
  shipping_terms: string | null;
  warranty_terms: string | null;
  notes: string | null;
  created_by: string | null;
  approved_by: string | null;
  approved_at: string | null;
  sent_at: string | null;
  created_at: string;
  updated_at: string;
  // Joined data
  items?: QuoteItem[];
}

export interface QuoteItem {
  id: string;
  quote_id: string;
  product_id: string | null;
  product_name: string;
  product_sku: string | null;
  quantity: number;
  unit_price: number;
  discount_percent: number;
  subtotal: number;
  notes: string | null;
  created_at: string;
}

// B2B Account
export type B2BStatus = 'pending' | 'approved' | 'suspended';
export type BusinessType = 'contractor' | 'dealer' | 'rental' | 'other';
export type DiscountTier = 'bronze' | 'silver' | 'gold' | 'platinum';
export type PaymentTerms = 'net15' | 'net30' | 'net60';

export interface B2BAccount {
  id: string;
  user_id: string;
  company_name: string;
  business_type: BusinessType | null;
  tax_id: string | null;
  website: string | null;
  status: B2BStatus;
  verified_at: string | null;
  verified_by: string | null;
  credit_limit: number;
  credit_used: number;
  payment_terms: PaymentTerms | null;
  discount_tier: DiscountTier;
  default_discount_percent: number;
  created_at: string;
  updated_at: string;
}

export interface B2BApplicationFormData {
  company_name: string;
  business_type: BusinessType;
  tax_id?: string;
  website?: string;
}

// Checkout
export interface CheckoutData {
  shipping_address: AddressFormData;
  billing_address?: AddressFormData;
  same_as_shipping: boolean;
  shipping_method: string;
  payment_method: PaymentMethod;
  customer_notes?: string;
}

// Auth
export interface AuthState {
  user: {
    id: string;
    email: string;
    email_confirmed_at: string | null;
  } | null;
  profile: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  email: string;
  password: string;
  confirm_password: string;
  full_name: string;
  phone?: string;
}

// Cart State
export interface CartState {
  items: CartItemWithProduct[];
  itemCount: number;
  subtotal: number;
  isLoading: boolean;
  isOpen: boolean;
}
