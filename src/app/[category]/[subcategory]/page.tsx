import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { categories, getCategoryBySlug, getCategoryBySlugAndParent, getTier2Categories } from '@/data/categories';
import { getProductsBySubcategory, getProductPath } from '@/data/products';
import { Category, Product, BreadcrumbSchema, ItemListSchema, FAQSchema } from '@/types';

interface SubcategoryPageProps {
  params: Promise<{
    category: string;
    subcategory: string;
  }>;
}

// Generate static params for all tier 2 categories
export async function generateStaticParams() {
  return getTier2Categories().map((cat) => ({
    category: cat.parentSlug,
    subcategory: cat.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: SubcategoryPageProps): Promise<Metadata> {
  const { category: categorySlug, subcategory: subcategorySlug } = await params;
  const subcategory = getCategoryBySlugAndParent(subcategorySlug, categorySlug);

  if (!subcategory) {
    return {
      title: 'Category Not Found',
    };
  }

  const parentCategory = getCategoryBySlug(categorySlug);

  return {
    title: `${subcategory.name} | ${parentCategory?.name || 'AGT Equipment'}`,
    description: subcategory.longDescription || subcategory.description,
    openGraph: {
      title: subcategory.name,
      description: subcategory.description,
      images: subcategory.image ? [{ url: subcategory.image }] : [],
    },
  };
}

export default async function SubcategoryPage({ params }: SubcategoryPageProps) {
  const { category: categorySlug, subcategory: subcategorySlug } = await params;

  const parentCategory = getCategoryBySlug(categorySlug);
  const subcategory = getCategoryBySlugAndParent(subcategorySlug, categorySlug);

  if (!parentCategory || !subcategory) {
    notFound();
  }

  const products = getProductsBySubcategory(categorySlug, subcategorySlug);

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema(parentCategory, subcategory)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateItemListSchema(subcategory, products)),
        }}
      />
      {subcategory.faq && subcategory.faq.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateFAQSchema(subcategory.faq)),
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
              <Link href={`/${parentCategory.slug}/`} className="hover:text-white">
                {parentCategory.name}
              </Link>
              <span className="mx-2">/</span>
              <span className="text-white">{subcategory.name}</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{subcategory.name}</h1>
            <p className="text-xl text-gray-300 max-w-3xl">
              {subcategory.description}
            </p>
          </div>
        </section>

        {/* AEO Answer Block */}
        {subcategory.answerBlock && (
          <section className="bg-blue-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {subcategory.answerBlock.question}
                </h2>
                <p className="text-lg text-gray-700 mb-6">
                  {subcategory.answerBlock.answer}
                </p>
                <ul className="space-y-3">
                  {subcategory.answerBlock.keyFacts.map((fact, index) => (
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
        {subcategory.longDescription && (
          <section className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="prose prose-lg max-w-none">
                {subcategory.longDescription.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-gray-700 mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Products Grid */}
        {products.length > 0 ? (
          <section className="py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                {subcategory.name} ({products.length} products)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <Link
                    key={product.id}
                    href={getProductPath(product)}
                    className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                      {product.images[0] && (
                        <img
                          src={product.images[0].url}
                          alt={product.images[0].alt}
                          className="w-full h-48 object-cover"
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
                            <span className="text-yellow-400 mr-1">★</span>
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
        ) : (
          <section className="py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <p className="text-gray-600 text-lg">
                Products coming soon. Check back later or{' '}
                <Link href="/contact/" className="text-blue-600 hover:underline">
                  contact us
                </Link>{' '}
                for availability.
              </p>
            </div>
          </section>
        )}

        {/* FAQ Section */}
        {subcategory.faq && subcategory.faq.length > 0 && (
          <section className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Frequently Asked Questions
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                {subcategory.faq.map((item, index) => (
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

        {/* Back to Parent Category */}
        <section className="py-8 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href={`/${parentCategory.slug}/`}
              className="inline-flex items-center text-blue-600 hover:text-blue-700"
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to {parentCategory.name}
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

// Helper functions for Schema generation
function generateBreadcrumbSchema(parent: Category, subcategory: Category): BreadcrumbSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://agt-equipment.com/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: parent.name,
        item: `https://agt-equipment.com/${parent.slug}/`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: subcategory.name,
        item: `https://agt-equipment.com/${parent.slug}/${subcategory.slug}/`,
      },
    ],
  };
}

function generateItemListSchema(subcategory: Category, products: Product[]): ItemListSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: subcategory.name,
    description: subcategory.description,
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `https://agt-equipment.com${getProductPath(product)}`,
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
