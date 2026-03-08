import { Metadata } from 'next';
import Link from 'next/link';
import { solutions, getAllSolutions, getSolutionBySlug } from '@/data/solutions';
import { getProductById, getProductPath } from '@/data/products';
import { Solution, BreadcrumbSchema, FAQSchema } from '@/types';

interface SolutionPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return getAllSolutions().map((solution) => ({
    slug: solution.slug,
  }));
}

export async function generateMetadata({ params }: SolutionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);

  if (!solution) {
    return { title: 'Solution Not Found' };
  }

  return {
    title: solution.metaTitle,
    description: solution.metaDescription,
  };
}

export default async function SolutionPage({ params }: SolutionPageProps) {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);

  if (!solution) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Solution Not Found</h1>
          <Link href="/solutions/" className="text-blue-600 hover:underline">View all solutions</Link>
        </div>
      </main>
    );
  }

  const recommendedProducts = solution.recommendedProducts
    .map((id) => getProductById(id))
    .filter((p) => p !== undefined);

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema(solution)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateArticleSchema(solution)),
        }}
      />
      {solution.faq.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateFAQSchema(solution.faq)),
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
              <Link href="/solutions/" className="hover:text-gray-900">Solutions</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900">{solution.title}</span>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <section className="bg-gradient-to-br from-teal-600 to-teal-700 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{solution.title}</h1>
            <p className="text-xl text-teal-100 max-w-3xl">{solution.excerpt}</p>
          </div>
        </section>

        {/* AEO Answer Block */}
        <section className="py-8 bg-teal-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Quick Answer
              </h2>
              <p className="text-lg text-gray-700 mb-6">{solution.quickAnswer}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {solution.keyFacts.map((fact, index) => (
                  <div key={index} className="flex items-start">
                    <svg className="w-5 h-5 text-teal-500 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{fact}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none">
              {solution.content.split('\n\n').map((paragraph, index) => {
                if (paragraph.startsWith('## ')) {
                  return <h2 key={index} className="text-2xl font-bold text-gray-900 mt-10 mb-4">{paragraph.replace('## ', '')}</h2>;
                }
                if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                  return <h3 key={index} className="text-xl font-semibold text-gray-900 mt-6 mb-2">{paragraph.replace(/\*\*/g, '')}</h3>;
                }
                if (paragraph.startsWith('- ')) {
                  const items = paragraph.split('\n').filter(line => line.startsWith('- '));
                  return (
                    <ul key={index} className="list-disc pl-6 my-4">
                      {items.map((item, i) => <li key={i}>{item.replace('- ', '')}</li>)}
                    </ul>
                  );
                }
                return <p key={index} className="text-gray-700 mb-4">{paragraph}</p>;
              })}
            </div>
          </div>
        </section>

        {/* Recommended Products */}
        {recommendedProducts.length > 0 && (
          <section className="py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Recommended Equipment</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendedProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={getProductPath(product)}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <img
                      src={product.images[0]?.url}
                      alt={product.images[0]?.alt}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.shortDescription}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-gray-900">${product.price.toLocaleString()}</span>
                        <span className="text-blue-600 font-medium">View Details →</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQ */}
        {solution.faq.length > 0 && (
          <section className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {solution.faq.map((item, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{item.question}</h3>
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/support/shipping-delivery/" className="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-md">
                <span className="text-2xl mr-4">🚚</span>
                <div><h3 className="font-semibold">Shipping Info</h3><p className="text-sm text-gray-600">Free continental US shipping</p></div>
              </Link>
              <Link href="/support/financing/" className="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-md">
                <span className="text-2xl mr-4">💳</span>
                <div><h3 className="font-semibold">Financing</h3><p className="text-sm text-gray-600">Flexible payment options</p></div>
              </Link>
              <Link href="/contact/" className="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-md">
                <span className="text-2xl mr-4">📞</span>
                <div><h3 className="font-semibold">Contact Us</h3><p className="text-sm text-gray-600">Get expert advice</p></div>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

function generateBreadcrumbSchema(solution: Solution): BreadcrumbSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agt-equipment.com/' },
      { '@type': 'ListItem', position: 2, name: 'Solutions', item: 'https://agt-equipment.com/solutions/' },
      { '@type': 'ListItem', position: 3, name: solution.title, item: `https://agt-equipment.com/solutions/${solution.slug}/` },
    ],
  };
}

function generateFAQSchema(faqs: { question: string; answer: string }[]): FAQSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

function generateArticleSchema(solution: Solution) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: solution.title,
    description: solution.excerpt,
    author: {
      '@type': 'Organization',
      name: 'AGT Equipment',
      url: 'https://agt-equipment.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'AGT Equipment',
      logo: {
        '@type': 'ImageObject',
        url: 'https://agt-equipment.com/icon-512.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://agt-equipment.com/solutions/${solution.slug}/`,
    },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['[data-speakable="quick-answer"]'],
    },
  };
}
