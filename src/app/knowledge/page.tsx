import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { JsonLd } from '@/components/seo/JsonLd';
import { generateOrganizationSchema } from '@/lib/schema';
import { articles } from '@/data/articles';
import { canonicalUrl } from '@/lib/seo';
import { ArrowRight, BookOpen, HelpCircle, Scale, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Knowledge Center - Buying Guides & How-To Articles',
  description: 'Expert guides on choosing mini excavators, skid steers, and attachments. Learn about equipment specifications, maintenance, and applications.',
  alternates: {
    canonical: canonicalUrl('/knowledge/'),
  },
};

const categories = [
  {
    title: 'Buying Guides',
    description: 'Step-by-step guides to help you choose the right equipment.',
    icon: BookOpen,
    href: '/knowledge?category=buying-guide',
  },
  {
    title: 'Comparisons',
    description: 'Side-by-side comparisons of equipment types and models.',
    icon: Scale,
    href: '/knowledge?category=comparison',
  },
  {
    title: 'How-To',
    description: 'Practical guides on using and maintaining your equipment.',
    icon: FileText,
    href: '/knowledge?category=how-to',
  },
  {
    title: 'FAQs',
    description: 'Answers to commonly asked questions about our products.',
    icon: HelpCircle,
    href: '/faq',
  },
];

export default function KnowledgePage() {
  return (
    <>
      <JsonLd data={generateOrganizationSchema()} />

      <div className="container py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight">Knowledge Center</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Expert guides and resources to help you choose, use, and maintain your equipment.
          </p>

          {/* Quick Answer for AEO */}
          <div className="mt-6 quick-answer text-left max-w-2xl mx-auto" data-speakable="quick-answer">
            <strong>Quick Answer:</strong>{' '}
            The AGT Equipment Knowledge Center provides buying guides, comparison articles, and how-to resources 
            for mini excavators, skid steers, and attachments. All content is written by equipment experts.
          </div>
        </div>

        {/* Category Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {categories.map((category) => (
            <Card key={category.title} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <category.icon className="h-8 w-8 text-primary mb-2" />
                <CardTitle>{category.title}</CardTitle>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full">
                  <Link href={category.href}>
                    Browse
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Featured Articles */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Featured Articles</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {articles.map((article) => (
              <Card key={article.slug} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="text-sm text-primary font-medium mb-2 uppercase tracking-wide">
                    {article.category.replace('-', ' ')}
                  </div>
                  <CardTitle className="text-xl">
                    <Link href={`/knowledge/${article.slug}`} className="hover:text-primary">
                      {article.title}
                    </Link>
                  </CardTitle>
                  <CardDescription>{article.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{article.readingTime} min read</span>
                    <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-primary text-primary-foreground rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-2">Can&apos;t Find What You&apos;re Looking For?</h2>
          <p className="mb-6 opacity-90">
            Our team is ready to answer your questions about equipment selection and specifications.
          </p>
          <Button asChild variant="secondary" size="lg">
            <Link href="/contact">Contact Our Team</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
