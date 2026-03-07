import { Metadata } from 'next';
import Link from 'next/link';
import { getAllCompares } from '@/data/compares';

export const metadata: Metadata = {
  title: 'Compare Equipment | AGT Equipment',
  description: 'Compare mini excavators, skid steers, engines, and attachments. Side-by-side comparisons to help you choose the right equipment.',
};

export default function CompareIndex() {
  const compares = getAllCompares();

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="text-sm text-gray-600">
            <Link href="/" className="hover:text-gray-900">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Compare</span>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-orange-600 to-orange-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Compare Equipment</h1>
          <p className="text-xl text-orange-100 max-w-3xl">
            Side-by-side comparisons to help you choose the right equipment.
          </p>
        </div>
      </section>

      {/* Compare Cards */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {compares.map((compare) => (
              <Link
                key={compare.id}
                href={`/compare/${compare.slug}/`}
                className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-500">VS</span>
                    <span className="bg-orange-100 text-orange-700 text-sm px-3 py-1 rounded-full">Comparison</span>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 group-hover:text-orange-600 mb-3">
                    {compare.title}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-2">{compare.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-sm">{compare.leftItem.name} vs {compare.rightItem.name}</span>
                    <span className="inline-flex items-center text-orange-600 font-medium">
                      Compare →
                    </span>
                  </div>
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Still Can&apos;t Decide?</h2>
            <p className="text-gray-600 mb-6">
              Our equipment specialists can help you compare options and find the perfect fit.
            </p>
            <a href="tel:+19498987669" className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700">
              Call (949) 898-7669
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
