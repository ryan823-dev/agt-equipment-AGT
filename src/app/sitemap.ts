import { MetadataRoute } from 'next';
import { getTier1Categories, getTier2Categories } from '@/data/categories';
import { products, getProductPath } from '@/data/products';
import { getAllSolutions } from '@/data/solutions';
import { getAllCompares } from '@/data/compares';
import { articles } from '@/data/articles';
import { canonicalUrl } from '@/lib/seo';

function sitemapEntry(
  path: string,
  priority: number,
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'],
  lastModified = new Date()
): MetadataRoute.Sitemap[number] {
  return {
    url: canonicalUrl(path),
    lastModified,
    changeFrequency,
    priority,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    sitemapEntry('/', 1, 'weekly'),
    sitemapEntry('/products/', 0.9, 'weekly'),
    sitemapEntry('/solutions/', 0.8, 'weekly'),
    sitemapEntry('/compare/', 0.7, 'weekly'),
    sitemapEntry('/knowledge/', 0.8, 'weekly'),
    sitemapEntry('/support/', 0.6, 'monthly'),
    sitemapEntry('/about/', 0.5, 'monthly'),
    sitemapEntry('/contact/', 0.5, 'monthly'),
    sitemapEntry('/faq/', 0.6, 'monthly'),
    sitemapEntry('/privacy/', 0.2, 'yearly'),
    sitemapEntry('/terms/', 0.2, 'yearly'),
  ];

  // Tier 1 Categories
  const tier1Urls: MetadataRoute.Sitemap = getTier1Categories().map((category) => ({
    url: canonicalUrl(`/${category.slug}/`),
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // Tier 2 Subcategories
  const tier2Urls: MetadataRoute.Sitemap = getTier2Categories().map((category) => ({
    url: canonicalUrl(`/${category.parentSlug}/${category.slug}/`),
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Product pages (4-layer URLs)
  const productUrls: MetadataRoute.Sitemap = products.map((product) => ({
    url: canonicalUrl(getProductPath(product)),
    lastModified: new Date(product.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Knowledge articles
  const articleUrls: MetadataRoute.Sitemap = articles.map((article) => ({
    url: canonicalUrl(`/knowledge/${article.slug}/`),
    lastModified: new Date(article.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Solutions pages
  const solutionUrls: MetadataRoute.Sitemap = getAllSolutions().map((solution) => ({
    url: canonicalUrl(`/solutions/${solution.slug}/`),
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Compare pages
  const compareUrls: MetadataRoute.Sitemap = getAllCompares().map((compare) => ({
    url: canonicalUrl(`/compare/${compare.slug}/`),
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Support pages
  const supportUrls: MetadataRoute.Sitemap = [
    '/support/compatibility/',
    '/support/manuals/',
    '/support/shipping-delivery/',
    '/support/financing/',
    '/support/warranty/',
    '/support/maintenance/',
    '/support/parts-compatibility/',
    '/support/troubleshooting/',
  ].map((path) => ({
    url: canonicalUrl(path),
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  return [
    ...staticPages,
    ...tier1Urls,
    ...tier2Urls,
    ...productUrls,
    ...articleUrls,
    ...solutionUrls,
    ...compareUrls,
    ...supportUrls,
  ];
}
