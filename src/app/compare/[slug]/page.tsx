import { Metadata } from 'next';
import Link from 'next/link';
import { compares, getAllCompares, getCompareBySlug } from '@/data/compares';
import { BreadcrumbSchema, FAQSchema, Compare } from '@/types';

interface ComparePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return getAllCompares().map((compare) => ({
    slug: compare.slug,
  }));
}

export async function generateMetadata({ params }: ComparePageProps): Promise<Metadata> {
  const { slug } = await params;
  const compare = getCompareBySlug(slug);

  if (!compare) {
    return { title: 'Comparison Not Found' };
  }

  return {
    title: compare.metaTitle,
    description: compare.metaDescription,
  };
}

export default async function ComparePage({ params }: ComparePageProps) {
  const { slug } = await params;
  const compare = getCompareBySlug(slug);

  if (!compare) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Comparison Not Found</h1>
          <Link href="/compare/" className="text-blue-600 hover:underline">View all comparisons</Link>
        </div>
      </main>
    );
  }

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema(compare)),
        }}
      />
      {compare.faq.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateFAQSchema(compare.faq)),
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
              <Link href="/compare/" className="hover:text-gray-900">Compare</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900">{compare.title}</span>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <section className="bg-gradient-to-br from-orange-600 to-orange-700 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{compare.title}</h1>
            <p className="text-xl text-orange-100 max-w-3xl">{compare.excerpt}</p>
          </div>
        </section>

        {/* AEO Answer Block */}
        <section className="py-8 bg-orange-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Answer</h2>
              <p className="text-lg text-gray-700 mb-6">{compare.quickAnswer}</p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none">
              {compare.content.split('\n\n').map((paragraph, index) => {
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

        {/* Comparison Table */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              {compare.leftItem.name} vs {compare.rightItem.name}
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg shadow-md">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Feature</th>
                    <th className="px-6 py-4 text-left font-semibold">{compare.leftItem.name}</th>
                    <th className="px-6 py-4 text-left font-semibold">{compare.rightItem.name}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {compare.comparisonTable.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 font-medium text-gray-900">{row.feature}</td>
                      <td className="px-6 py-4 text-gray-700">{row.values[compare.leftItem.name]}</td>
                      <td className="px-6 py-4 text-gray-700">{row.values[compare.rightItem.name]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Verdict */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
              <h2 className="text-2xl font-bold mb-4">Our Verdict</h2>
              <p className="text-blue-100 text-lg">{compare.verdict}</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        {compare.faq.length > 0 && (
          <section className="py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {compare.faq.map((item, index) => (
                  <div key={index} className="bg-white rounded-lg p-6 shadow">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{item.question}</h3>
                    <p className="text-gray-600">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Choose?</h2>
            <p className="text-gray-600 mb-6">Contact our team for personalized recommendations.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+19498987669" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700">
                Call (949) 898-7669
              </a>
              <Link href="/contact/" className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50">
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

function generateBreadcrumbSchema(compare: Compare): BreadcrumbSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agt-equipment.com/' },
      { '@type': 'ListItem', position: 2, name: 'Compare', item: 'https://agt-equipment.com/compare/' },
      { '@type': 'ListItem', position: 3, name: compare.title, item: `https://agt-equipment.com/compare/${compare.slug}/` },
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
