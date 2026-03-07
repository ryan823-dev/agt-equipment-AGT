import { MetadataRoute } from 'next';
import { categories, getTier1Categories, getTier2Categories } from '@/data/categories';
import { products, getProductPath } from '@/data/products';
import { getAllSolutions } from '@/data/solutions';
import { getAllCompares } from '@/data/compares';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://agt-equipment.com';

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/faq/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/knowledge/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ];

  // Tier 1 Categories
  const tier1Urls: MetadataRoute.Sitemap = getTier1Categories().map((category) => ({
    url: `${baseUrl}/${category.slug}/`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // Tier 2 Subcategories
  const tier2Urls: MetadataRoute.Sitemap = getTier2Categories().map((category) => ({
    url: `${baseUrl}/${category.parentSlug}/${category.slug}/`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Product pages (4-layer URLs)
  const productUrls: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${baseUrl}${getProductPath(product)}`,
    lastModified: new Date(product.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Solutions pages
  const solutionUrls: MetadataRoute.Sitemap = getAllSolutions().map((solution) => ({
    url: `${baseUrl}/solutions/${solution.slug}/`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Compare pages
  const compareUrls: MetadataRoute.Sitemap = getAllCompares().map((compare) => ({
    url: `${baseUrl}/compare/${compare.slug}/`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Support pages
  const supportUrls: MetadataRoute.Sitemap = [
    '/support/',
    '/support/manuals/',
    '/support/shipping-delivery/',
    '/support/financing/',
    '/support/warranty/',
    '/support/maintenance/',
    '/support/parts-compatibility/',
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  return [
    ...staticPages,
    ...tier1Urls,
    ...tier2Urls,
    ...productUrls,
    ...solutionUrls,
    ...compareUrls,
    ...supportUrls,
  ];
}
