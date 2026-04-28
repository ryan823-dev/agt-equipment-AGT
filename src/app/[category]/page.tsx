import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { categories, getCategoryBySlug, getSubcategories, getTier1Categories } from '@/data/categories';
import { getProductsByCategory, getProductPath } from '@/data/products';
import { Category, Product, BreadcrumbSchema, ItemListSchema, FAQSchema } from '@/types';
import { canonicalUrl, seoDescription } from '@/lib/seo';

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

// Generate static params for all tier 1 categories
export async function generateStaticParams() {
  return getTier1Categories().map((category) => ({
    category: category.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);

  if (!category || category.tier !== 'tier1') {
    return {
      title: 'Category Not Found',
    };
  }

  // Note: Don't add "| AGT Equipment" suffix - it's added by layout template
  return {
    title: category.name,
    description: seoDescription(category.description || category.longDescription),
    alternates: {
      canonical: canonicalUrl(`/${category.slug}/`),
    },
    openGraph: {
      title: category.name,
      description: seoDescription(category.description || category.longDescription),
      url: canonicalUrl(`/${category.slug}/`),
      images: category.image ? [{ url: category.image }] : [],
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);

  if (!category || category.tier !== 'tier1') {
    notFound();
  }

  const subcategories = getSubcategories(categorySlug);
  const products = getProductsByCategory(categorySlug);

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema(category)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateItemListSchema(category, products)),
        }}
      />
      {category.faq && category.faq.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateFAQSchema(category.faq)),
          }}
        />
      )}

      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="text-sm mb-4 text-gray-300">
              <Link href="/" className="hover:text-white">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-white">{category.name}</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{category.name}</h1>
            <p className="text-xl text-gray-300 max-w-3xl">
              {category.description}
            </p>
          </div>
        </section>

        {/* AEO Answer Block */}
        {category.answerBlock && (
          <section className="bg-blue-50 py-12" data-speakable="quick-answer">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {category.answerBlock.question}
                </h2>
                <p className="text-lg text-gray-700 mb-6">
                  {category.answerBlock.answer}
                </p>
                <ul className="space-y-3">
                  {category.answerBlock.keyFacts.map((fact, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{fact}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* Long Description */}
        {category.longDescription && (
          <section className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="prose prose-lg max-w-none">
                {category.longDescription.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-gray-700 mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Comparison Table */}
        {category.comparisonTable && category.comparisonTable.length > 0 && (
          <section className="py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                How to Choose
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full bg-white rounded-lg shadow-md">
                  <thead className="bg-gray-800 text-white">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold">Feature</th>
                      {Object.keys(category.comparisonTable[0].values).map((col) => (
                        <th key={col} className="px-6 py-4 text-left font-semibold">{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {category.comparisonTable.map((row, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-6 py-4 font-medium text-gray-900">{row.feature}</td>
                        {Object.values(row.values).map((value, idx) => (
                          <td key={idx} className="px-6 py-4 text-gray-700">{value}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* Subcategories Grid */}
        {subcategories.length > 0 && (
          <section className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Browse by Size
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {subcategories.map((subcat) => (
                  <Link
                    key={subcat.id}
                    href={`/${category.slug}/${subcat.slug}/`}
                    className="group bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                  >
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 mb-2">
                      {subcat.name}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {subcat.description}
                    </p>
                    <span className="text-blue-600 font-medium">
                      View {subcat.productCount} products 鈫?
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Products Grid */}
        {products.length > 0 && (
          <section className="py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                All {category.name}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <Link
                    key={product.id}
                    href={getProductPath(product)}
                    className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="relative h-48 bg-gray-200">
                      {product.images[0] && (
                        <Image
                          src={product.images[0].url}
                          alt={product.images[0].alt}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 mb-2">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {product.shortDescription}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-gray-900">
                          ${product.price.toLocaleString()}
                        </span>
                        {product.rating && (
                          <div className="flex items-center">
                            <span className="text-yellow-400 mr-1">&#9733;</span>
                            <span className="text-gray-600 text-sm">
                              {product.rating.average} ({product.rating.count})
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQ Section */}
        {category.faq && category.faq.length > 0 && (
          <section className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Frequently Asked Questions
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                {category.faq.map((item, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      {item.question}
                    </h3>
                    <p className="text-gray-600">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Internal Links Section */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Need Help?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link
                href="/support/shipping-delivery/"
                className="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
              >
                <span className="text-2xl mr-4">馃殮</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Shipping Info</h3>
                  <p className="text-sm text-gray-600">Free continental US shipping</p>
                </div>
              </Link>
              <Link
                href="/support/financing/"
                className="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
              >
                <span className="text-2xl mr-4">馃挸</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Financing Options</h3>
                  <p className="text-sm text-gray-600">Flexible payment plans</p>
                </div>
              </Link>
              <Link
                href="/support/warranty/"
                className="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
              >
                <span className="text-2xl mr-4">&#10003;</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Warranty</h3>
                  <p className="text-sm text-gray-600">1-year coverage included</p>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

// Helper functions for Schema generation
function generateBreadcrumbSchema(category: Category): BreadcrumbSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://miniironpro.com/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: category.name,
        item: `https://miniironpro.com/${category.slug}/`,
      },
    ],
  };
}

function generateItemListSchema(category: Category, products: Product[]): ItemListSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: category.name,
    description: category.description,
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `https://miniironpro.com${getProductPath(product)}`,
      name: product.name,
      image: product.images[0]?.url,
    })),
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
