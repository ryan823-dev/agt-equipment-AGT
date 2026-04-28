import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { FAQSection } from '@/components/seo/FAQSection';
import { JsonLd } from '@/components/seo/JsonLd';
import { generateArticleSchema, generateFAQSchema, generateBreadcrumbSchema, generateProductSchema } from '@/lib/schema';
import { getArticleBySlug, getArticles } from '@/lib/data';
import { canonicalUrl, seoDescription } from '@/lib/seo';
import { getProductPath, products } from '@/data/products';
import { ArrowRight, Clock, User } from 'lucide-react';

interface ArticlePageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const articleList = await getArticles();

  return articleList.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    return { title: 'Article Not Found' };
  }

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      url: canonicalUrl(`/knowledge/${article.slug}/`),
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.author.name],
    },
    alternates: {
      canonical: canonicalUrl(`/knowledge/${article.slug}/`),
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  const articleProducts = (article.productIds || [])
    .map((productId) => products.find((product) => product.id === productId))
    .filter((product): product is NonNullable<typeof product> => Boolean(product));

  const breadcrumbs = [
    { name: 'Knowledge', href: '/knowledge' },
    { name: article.title, href: `/knowledge/${article.slug}` },
  ];

  return (
    <>
      {/* Structured Data */}
      <JsonLd
        data={generateArticleSchema({
          title: article.title,
          description: article.excerpt,
          url: canonicalUrl(`/knowledge/${article.slug}/`),
          datePublished: article.publishedAt,
          dateModified: article.updatedAt,
          author: { name: article.author.name },
        })}
      />
      <JsonLd data={generateFAQSchema(article.faq)} />
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />
      {articleProducts.map((product) => (
        <JsonLd
          key={product.id}
          data={generateProductSchema({
            name: product.name,
            description: seoDescription(product.shortDescription || product.description),
            images: product.images.map((image) => image.url),
            sku: product.sku,
            price: product.price,
            availability: product.stock,
            url: getProductPath(product),
            rating: product.rating,
          })}
        />
      ))}

      <div className="container py-8">
        <Breadcrumbs items={breadcrumbs.slice(0, -1)} />

        <article className="max-w-3xl mx-auto">
          {/* Article Header */}
          <header className="mb-8">
            <div className="text-sm text-primary font-medium mb-2 uppercase tracking-wide">
              {article.category.replace('-', ' ')}
            </div>
            <h1 className="text-3xl font-bold tracking-tight mb-4">{article.title}</h1>

            {/* Meta Info */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                {article.author.name}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {article.readingTime} min read
              </div>
              <time dateTime={article.publishedAt}>
                {new Date(article.publishedAt).toLocaleDateString()}
              </time>
            </div>
          </header>

          {/* Quick Answer - AEO Critical */}
          <div className="quick-answer mb-8" data-speakable="quick-answer">
            <strong>Quick Answer:</strong> {article.quickAnswer}
          </div>

          {/* Article Content */}
          <div
            className="article-content"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {articleProducts.length > 0 && (
            <section className="mt-12 border-t pt-8">
              <h2 className="text-2xl font-bold tracking-tight mb-4">Related Equipment</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {articleProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={getProductPath(product)}
                    className="rounded-lg border bg-card p-4 transition-colors hover:border-primary"
                  >
                    <div className="text-sm text-muted-foreground">{product.sku}</div>
                    <h3 className="mt-1 font-semibold text-card-foreground">{product.name}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {seoDescription(product.shortDescription || product.description, 110)}
                    </p>
                    <div className="mt-3 text-sm font-medium text-primary">
                      View product
                      <ArrowRight className="ml-1 inline h-4 w-4" />
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* FAQ Section */}
          <div className="mt-12">
            <FAQSection faqs={article.faq} />
          </div>

          {/* Next Steps */}
          <div className="mt-12 bg-muted/50 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Next Steps</h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild>
                <Link href="/products">
                  Browse Products
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </article>
      </div>
    </>
  );
}
