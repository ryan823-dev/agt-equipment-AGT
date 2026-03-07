import { Metadata } from 'next';
import Link from 'next/link';
import { getAllSolutions } from '@/data/solutions';

export const metadata: Metadata = {
  title: 'Solutions | AGT Equipment',
  description: 'Find the right equipment for your specific needs. Browse solutions for farming, landscaping, construction, and more.',
};

export default function SolutionsIndex() {
  const solutions = getAllSolutions();

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="text-sm text-gray-600">
            <Link href="/" className="hover:text-gray-900">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Solutions</span>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-teal-600 to-teal-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Solutions</h1>
          <p className="text-xl text-teal-100 max-w-3xl">
            Find the right equipment for your specific needs. Browse guides for farming, landscaping, construction, and more.
          </p>
        </div>
      </section>

      {/* Solution Cards */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutions.map((solution) => (
              <Link
                key={solution.id}
                href={`/solutions/${solution.slug}/`}
                className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 group-hover:text-teal-600 mb-3">
                    {solution.title}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">{solution.excerpt}</p>
                  <span className="inline-flex items-center text-teal-600 font-medium">
                    Read Guide
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Need Help Choosing?</h2>
            <p className="text-gray-600 mb-6">
              Our team can help you find the right equipment for your specific needs.
            </p>
            <a href="tel:+19498987669" className="bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700">
              Call (949) 898-7669
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
