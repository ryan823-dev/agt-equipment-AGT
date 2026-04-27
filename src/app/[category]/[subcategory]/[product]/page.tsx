import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { products, getProductBySlug, getProductPath } from '@/data/products';
import { getCategoryBySlug, getCategoryBySlugAndParent } from '@/data/categories';
import { Product, ProductSchema, BreadcrumbSchema, FAQSchema } from '@/types';
import { ProductActions } from '@/components/product/ProductActions';
import { canonicalUrl } from '@/lib/seo';

interface ProductPageProps {
  params: Promise<{
    category: string;
    subcategory: string;
    product: string;
  }>;
}

// Generate static params for all products with subcategories
export async function generateStaticParams() {
  return products
    .filter((p) => p.subcategorySlug)
    .map((p) => ({
      category: p.categorySlug,
      subcategory: p.subcategorySlug!,
      product: p.slug,
    }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { product: productSlug } = await params;
  const product = getProductBySlug(productSlug);

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  // Note: Don't add "| AGT Equipment" suffix here - it's added by layout template
  return {
    title: product.name,
    description: product.shortDescription,
    alternates: {
      canonical: canonicalUrl(getProductPath(product)),
    },
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      url: canonicalUrl(getProductPath(product)),
      images: product.images.map((img) => ({ url: img.url, alt: img.alt })),
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { category: categorySlug, subcategory: subcategorySlug, product: productSlug } = await params;

  const product = getProductBySlug(productSlug);
  const parentCategory = getCategoryBySlug(categorySlug);
  const subcategory = getCategoryBySlugAndParent(subcategorySlug, categorySlug);

  if (!product || !parentCategory) {
    notFound();
  }

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema(parentCategory, subcategory || null, product)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateProductSchema(product)),
        }}
      />
      {product.faq && product.faq.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateFAQSchema(product.faq)),
          }}
        />
      )}

      <main className="min-h-screen bg-white">
        {/* Breadcrumb */}
        <nav className="bg-gray-50 py-3">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-sm text-gray-600">
              <Link href="/" className="hover:text-gray-900">Home</Link>
              <span className="mx-2">/</span>
              <Link href={`/${parentCategory.slug}/`} className="hover:text-gray-900">
                {parentCategory.name}
              </Link>
              {subcategory && (
                <>
                  <span className="mx-2">/</span>
                  <Link
                    href={`/${parentCategory.slug}/${subcategory.slug}/`}
                    className="hover:text-gray-900"
                  >
                    {subcategory.name}
                  </Link>
                </>
              )}
              <span className="mx-2">/</span>
              <span className="text-gray-900">{product.name}</span>
            </div>
          </div>
        </nav>

        {/* Product Hero */}
        <section className="py-6 sm:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-12">
              {/* Product Images */}
              <div>
                <div className="relative h-64 sm:h-80 lg:h-96 bg-gray-100 rounded-lg overflow-hidden">
                  {product.images[0] && (
                    <Image
                      src={product.images[0].url}
                      alt={product.images[0].alt || product.name}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover"
                      priority
                    />
                  )}
                </div>
                {product.images.length > 1 && (
                  <div className="mt-3 sm:mt-4 grid grid-cols-4 gap-1.5 sm:gap-2">
                    {product.images.map((img, index) => (
                      <div
                        key={index}
                        className="relative h-14 sm:h-20 bg-gray-100 rounded cursor-pointer hover:ring-2 hover:ring-blue-500"
                      >
                        <Image
                          src={img.url}
                          alt={img.alt}
                          fill
                          sizes="25vw"
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                  {product.name}
                </h1>

                {/* Short Description - AEO Answer Block */}
                <p className="text-base sm:text-xl text-gray-600 mb-4 sm:mb-6" data-speakable="quick-answer">
                  {product.shortDescription}
                </p>

                {/* Price & Rating */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 mb-6 sm:mb-8">
                  <div>
                    <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                      ${product.price.toLocaleString()}
                    </span>
                    {product.compareAtPrice && (
                      <span className="ml-2 sm:ml-3 text-base sm:text-xl text-gray-400 line-through">
                        ${product.compareAtPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  {product.rating && (
                    <div className="flex items-center">
                      <span className="text-yellow-400 text-lg sm:text-xl mr-1">&#9733;</span>
                      <span className="text-gray-700 font-medium text-sm sm:text-base">
                        {product.rating.average}
                      </span>
                      <span className="text-gray-500 ml-1 text-sm sm:text-base">
                        ({product.rating.count} reviews)
                      </span>
                    </div>
                  )}
                </div>

                {/* SKU & Stock */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
                  <span className="text-xs sm:text-sm text-gray-600">SKU: {product.sku}</span>
                  <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
                    product.stock === 'in_stock'
                      ? 'bg-green-100 text-green-700'
                      : product.stock === 'preorder'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {product.stock === 'in_stock' ? 'In Stock' : product.stock === 'preorder' ? 'Pre-Order' : 'Out of Stock'}
                  </span>
                </div>

                {/* CTA Buttons - Add to Cart */}
                <div className="mb-6 sm:mb-8">
                  <ProductActions product={product} />
                </div>

                {/* Trust Badges */}
                <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm">
                  <div className="flex items-center text-gray-600">
                    <span className="mr-1.5 sm:mr-2">馃殮</span>
                    Free Shipping
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="mr-1.5 sm:mr-2">&#10003;</span>
                    1-Year Warranty
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="mr-1.5 sm:mr-2">馃挸</span>
                    Financing Available
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Specifications - Mobile-friendly card layout */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Specifications</h2>
            {/* Desktop: Table view */}
            <div className="hidden md:block bg-white rounded-lg shadow overflow-hidden">
              <table className="w-full">
                <tbody className="divide-y divide-gray-200">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <tr key={key} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900 w-1/3">{key}</td>
                      <td className="px-6 py-4 text-gray-700">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Mobile: Card view */}
            <div className="md:hidden space-y-2">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="text-sm text-gray-500 font-medium">{key}</div>
                  <div className="mt-1 text-gray-900">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Features</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Primary Use Cases */}
        {product.primaryUseCases && product.primaryUseCases.length > 0 && (
          <section className="py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Ideal For</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {product.primaryUseCases.map((useCase, index) => (
                  <div key={index} className="bg-white rounded-lg p-4 flex items-center">
                    <span className="text-2xl mr-3">&#10003;</span>
                    <span className="text-gray-700">{useCase}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Description */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Details</h2>
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </div>
        </section>

        {/* FAQ */}
        {product.faq && product.faq.length > 0 && (
          <section className="py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {product.faq.map((item, index) => (
                  <div key={index} className="bg-white rounded-lg p-6 shadow">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {item.question}
                    </h3>
                    <p className="text-gray-600">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Support Links */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Need Help?</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Link
                href="/support/manuals/"
                className="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
              >
                <span className="text-2xl mr-4">馃摉</span>
                <span className="font-medium text-gray-900">Manuals</span>
              </Link>
              <Link
                href="/support/shipping-delivery/"
                className="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
              >
                <span className="text-2xl mr-4">馃殮</span>
                <span className="font-medium text-gray-900">Shipping</span>
              </Link>
              <Link
                href="/support/financing/"
                className="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
              >
                <span className="text-2xl mr-4">馃挸</span>
                <span className="font-medium text-gray-900">Financing</span>
              </Link>
              <Link
                href="/support/warranty/"
                className="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
              >
                <span className="text-2xl mr-4">&#10003;</span>
                <span className="font-medium text-gray-900">Warranty</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

// Helper functions for Schema generation
function generateBreadcrumbSchema(
  parent: { slug: string; name: string },
  subcategory: { slug: string; name: string } | null,
  product: Product
): BreadcrumbSchema {
  const items = [
    {
      '@type': 'ListItem' as const,
      position: 1,
      name: 'Home',
      item: 'https://miniironpro.com/',
    },
    {
      '@type': 'ListItem' as const,
      position: 2,
      name: parent.name,
      item: `https://miniironpro.com/${parent.slug}/`,
    },
  ];

  if (subcategory) {
    items.push({
      '@type': 'ListItem' as const,
      position: 3,
      name: subcategory.name,
      item: `https://miniironpro.com/${parent.slug}/${subcategory.slug}/`,
    });
    items.push({
      '@type': 'ListItem' as const,
      position: 4,
      name: product.name,
      item: `https://miniironpro.com${getProductPath(product)}`,
    });
  } else {
    items.push({
      '@type': 'ListItem' as const,
      position: 3,
      name: product.name,
      item: `https://miniironpro.com${getProductPath(product)}`,
    });
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  };
}

function generateProductSchema(product: Product): ProductSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.shortDescription || product.name,
    image: product.images.map((img) => img.url),
    sku: product.sku,
    brand: {
      '@type': 'Brand',
      name: 'AGT Equipment',
    },
    offers: {
      '@type': 'Offer',
      price: product.price.toString(),
      priceCurrency: 'USD',
      availability: product.stock === 'in_stock'
        ? 'https://schema.org/InStock'
        : product.stock === 'preorder'
        ? 'https://schema.org/PreOrder'
        : 'https://schema.org/OutOfStock',
      url: `https://miniironpro.com${getProductPath(product)}`,
    },
    ...(product.rating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: product.rating.average.toString(),
        reviewCount: product.rating.count.toString(),
      },
    }),
  };
}

function generateFAQSchema(faqs: { question: string; answer: string }[]): FAQSchema {
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
