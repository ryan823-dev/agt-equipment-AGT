import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

const privatePaths = [
  '/account/',
  '/admin/',
  '/api/',
  '/auth/',
  '/cart/',
  '/checkout/',
  '/inquiry/',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: privatePaths,
      },
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'Claude-Web',
          'Claude-User',
          'Anthropic-AI',
          'Google-Extended',
          'PerplexityBot',
          'YouBot',
        ],
        allow: '/',
        disallow: privatePaths,
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
