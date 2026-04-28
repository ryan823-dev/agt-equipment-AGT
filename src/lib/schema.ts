import { ProductSchema, FAQSchema, BreadcrumbSchema, FAQ, Category } from '@/types';
import { absoluteUrl, canonicalUrl, SITE_URL } from '@/lib/seo';

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
    url: canonicalUrl(`/${category.slug}/`),
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: [],
      numberOfItems: category.productCount,
    },
    isPartOf: {
      '@type': 'WebSite',
      name: 'AGT Equipment',
      url: SITE_URL,
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
      url: canonicalUrl(params.url),
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: 'AGT Equipment',
        url: SITE_URL,
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: '0',
          currency: params.currency || 'USD',
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'US',
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 1,
            maxValue: 3,
            unitCode: 'DAY',
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 3,
            maxValue: 10,
            unitCode: 'DAY',
          },
        },
      },
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
      item: canonicalUrl(item.href),
    })),
  };
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AGT Equipment',
    alternateName: 'AGT Industrial Inc.',
    url: SITE_URL,
    logo: absoluteUrl('/icon-512.png'),
    description: 'AGT Equipment sells mini excavators and skid steers direct from the factory. We offer 1-4 ton excavators with Kubota and Rato engines, shipped free from our US warehouses in California and Illinois.',
    areaServed: 'United States',
    knowsAbout: [
      'mini excavators',
      'mini skid steers',
      'compact construction equipment',
      'excavator attachments',
      'equipment parts',
    ],
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
      availableLanguage: ['English', 'Chinese'],
    },
    sameAs: [
      'https://facebook.com/agtequipment',
      'https://instagram.com/agtequipment',
      'https://linkedin.com/company/agtequipment',
    ],
  };
}

export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'AGT Equipment',
    url: SITE_URL,
    description: 'Factory direct mini excavators and skid steers. 1-4 ton excavators with Kubota and Rato engines. Free shipping from US warehouses.',
    inLanguage: 'en-US',
    publisher: {
      '@type': 'Organization',
      name: 'AGT Equipment',
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl('/icon-512.png'),
      },
    },
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
        url: absoluteUrl('/icon-512.png'),
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
