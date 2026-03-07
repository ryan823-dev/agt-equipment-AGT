import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { FAQSection } from '@/components/seo/FAQSection';
import { JsonLd } from '@/components/seo/JsonLd';
import { generateProductSchema, generateFAQSchema, generateBreadcrumbSchema } from '@/lib/schema';
import { getProductBySlug, getRelatedProducts } from '@/lib/data';
import { CheckCircle2, Phone, ArrowRight } from 'lucide-react';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  
  if (!product) {
    return { title: 'Product Not Found' };
  }

  const title = `${product.name} | AGT Equipment`;
  const description = product.shortDescription || product.description.slice(0, 160);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: product.images.slice(0, 1).map((img) => ({
        url: img.url,
        alt: img.alt,
      })),
      type: 'website',
    },
    alternates: {
      canonical: `https://agt-equipment.com/products/${product.slug}`,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product);

  // Generate semantic triples for AEO
  const triples = [
    `${product.name} weighs ${product.specifications['Weight'] || product.specifications['Operating Weight'] || 'N/A'}.`,
    `${product.name} features ${product.specifications['Engine'] || 'N/A'} engine.`,
    `${product.name} costs $${product.price.toLocaleString()} USD.`,
  ];

  // Default FAQs if product doesn't have any
  const defaultFaqs = [
    {
      question: `What is the price of ${product.name}?`,
      answer: `The ${product.name} is priced at $${product.price.toLocaleString()} USD. Contact us for current availability and shipping options.`,
    },
    {
      question: `Does ${product.name} come with a warranty?`,
      answer: `Yes, all AGT equipment includes a 1-year warranty covering manufacturing defects and component failures under normal use.`,
    },
    {
      question: `What are the shipping options for ${product.name}?`,
      answer: `We offer free shipping within the continental United States. Equipment ships from our California or Illinois warehouses.`,
    },
  ];

  const faqs = product.faq?.length ? product.faq : defaultFaqs;
  const breadcrumbs = [
    { name: 'Products', href: '/products' },
    { name: product.category, href: `/category/${product.category.toLowerCase().replace(/\s+/g, '-')}` },
    { name: product.name, href: `/products/${product.slug}` },
  ];

  return (
    <>
      {/* Structured Data */}
      <JsonLd
        data={generateProductSchema({
          name: product.name,
          description: product.description,
          images: product.images.map((i) => i.url),
          sku: product.sku,
          price: product.price,
          availability: product.stock,
          url: `https://agt-equipment.com/products/${product.slug}`,
          rating: product.rating,
        })}
      />
      <JsonLd data={generateFAQSchema(faqs)} />
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />

      <div className="container py-8">
        <Breadcrumbs items={breadcrumbs.slice(0, -1)} />

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square relative bg-muted rounded-lg overflow-hidden">
              {product.images[0] && (
                <Image
                  src={product.images[0].url}
                  alt={product.images[0].alt || product.name}
                  fill
                  className="object-cover"
                  priority
                />
              )}
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.slice(1, 5).map((img, i) => (
                  <div key={i} className="aspect-square relative bg-muted rounded overflow-hidden">
                    <Image
                      src={img.url}
                      alt={img.alt || `${product.name} image ${i + 2}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>
            <p className="text-sm text-muted-foreground mt-2">SKU: {product.sku}</p>

            {/* Price */}
            <div className="mt-4">
              <span className="text-3xl font-bold">${product.price.toLocaleString()}</span>
              {product.compareAtPrice && (
                <span className="text-lg text-muted-foreground line-through ml-2">
                  ${product.compareAtPrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* Quick Answer for AEO */}
            <div className="mt-6 quick-answer" data-speakable="quick-answer">
              <strong>Quick Answer:</strong>{' '}
              {product.shortDescription || `The ${product.name} is a ${product.category.toLowerCase()} available for $${product.price.toLocaleString()} with free shipping.`}
            </div>

            {/* Semantic Triples */}
            <div className="mt-4 text-sm text-muted-foreground">
              {triples.map((triple, i) => (
                <span key={i} className="semantic-triple mr-2">{triple}</span>
              ))}
            </div>

            {/* Features */}
            {product.features.length > 0 && (
              <div className="mt-6">
                <h2 className="font-semibold mb-2">Key Features</h2>
                <ul className="space-y-1">
                  {product.features.slice(0, 6).map((feature, i) => (
                    <li key={i} className="flex items-start text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* CTA */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="flex-1">
                <Link href="/contact">
                  Get Quote
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="tel:+19498987669">
                  <Phone className="mr-2 h-4 w-4" />
                  Call Us
                </a>
              </Button>
            </div>

            {/* Trust Signals */}
            <div className="mt-8 grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-primary mr-2" />
                Free Shipping (US)
              </div>
              <div className="flex items-center text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-primary mr-2" />
                1-Year Warranty
              </div>
              <div className="flex items-center text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-primary mr-2" />
                US Warehouses
              </div>
              <div className="flex items-center text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-primary mr-2" />
                Expert Support
              </div>
            </div>
          </div>
        </div>

        {/* Specifications */}
        {Object.keys(product.specifications).length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Specifications</h2>
            <Card>
              <CardContent className="p-0">
                <table className="spec-table">
                  <tbody>
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <tr key={key}>
                        <td className="font-medium w-1/3">{key}</td>
                        <td>{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </section>
        )}

        {/* Description */}
        <section className="mt-12 article-content">
          <h2 className="text-2xl font-bold mb-4">About This Product</h2>
          <div dangerouslySetInnerHTML={{ __html: product.description }} />
        </section>

        {/* FAQ */}
        <div className="mt-12">
          <FAQSection faqs={faqs} />
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedProducts.map((rp) => (
                <Link key={rp.id} href={`/products/${rp.slug}`} className="product-card">
                  <div className="aspect-square relative bg-muted rounded mb-2">
                    {rp.images[0] && (
                      <Image
                        src={rp.images[0].url}
                        alt={rp.images[0].alt || rp.name}
                        fill
                        className="object-cover rounded"
                      />
                    )}
                  </div>
                  <h3 className="font-medium text-sm line-clamp-2">{rp.name}</h3>
                  <p className="text-primary font-bold mt-1">${rp.price.toLocaleString()}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
