import { ProductSchema, FAQSchema, BreadcrumbSchema, FAQ, Category } from '@/types';

interface GenerateProductSchemaParams {
  name: string;
  description: string;
  images: string[];
  sku: string;
  price: number;
  currency?: string;
  availability: 'in_stock' | 'out_of_stock' | 'preorder';
  url: string;
  rating?: {
    average: number;
    count: number;
  };
}

export function generateCategorySchema(category: Category) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: category.name,
    description: category.description,
    url: `https://agt-equipment.com/category/${category.slug}`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: [],
      numberOfItems: category.productCount,
    },
    isPartOf: {
      '@type': 'WebSite',
      name: 'AGT Equipment',
      url: 'https://agt-equipment.com',
    },
  };
}

export function generateProductSchema(params: GenerateProductSchemaParams): ProductSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: params.name,
    description: params.description,
    image: params.images,
    sku: params.sku,
    brand: {
      '@type': 'Brand',
      name: 'AGT Industrial',
    },
    offers: {
      '@type': 'Offer',
      price: params.price.toString(),
      priceCurrency: params.currency || 'USD',
      availability: `https://schema.org/${params.availability === 'in_stock' ? 'InStock' : params.availability === 'preorder' ? 'PreOrder' : 'OutOfStock'}`,
      url: params.url,
    },
    ...(params.rating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: params.rating.average.toString(),
        reviewCount: params.rating.count.toString(),
      },
    }),
  };
}

export function generateFAQSchema(faqs: FAQ[]): FAQSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

interface BreadcrumbItem {
  name: string;
  href: string;
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]): BreadcrumbSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://agt-equipment.com${item.href}`,
    })),
  };
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AGT Equipment',
    alternateName: 'AGT Industrial Inc.',
    url: 'https://agt-equipment.com',
    logo: 'https://agt-equipment.com/logo.png',
    description: 'AGT Equipment sells mini excavators and skid steers direct from the factory.',
    address: [
      {
        '@type': 'PostalAddress',
        addressLocality: 'Santa Ana',
        addressRegion: 'CA',
        postalCode: '92707',
        streetAddress: '2602 Halladay Street',
        addressCountry: 'US',
      },
      {
        '@type': 'PostalAddress',
        addressLocality: 'Chicago',
        addressRegion: 'IL',
        postalCode: '60638',
        streetAddress: '6200 S Oak Park Ave',
        addressCountry: 'US',
      },
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-949-898-7669',
      contactType: 'customer service',
      email: 'info@agrotkindustrial.com',
    },
    sameAs: [
      'https://facebook.com/agtequipment',
      'https://instagram.com/agtequipment',
      'https://linkedin.com/company/agtequipment',
    ],
  };
}

export function generateArticleSchema(article: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
  author: { name: string; url?: string };
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.image,
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    author: {
      '@type': 'Person',
      name: article.author.name,
      url: article.author.url,
    },
    publisher: {
      '@type': 'Organization',
      name: 'AGT Equipment',
      logo: {
        '@type': 'ImageObject',
        url: 'https://agt-equipment.com/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': article.url,
    },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['[data-speakable="quick-answer"]'],
    },
  };
}

// Combine multiple schemas into @graph
export function combineSchemas(...schemas: object[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': schemas,
  };
}
