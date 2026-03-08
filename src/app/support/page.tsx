import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Support Center',
  description: 'Find manuals, shipping information, warranty details, financing options, and maintenance guides for AGT equipment.',
};

const supportPages = [
  {
    title: 'Manuals & Documentation',
    slug: 'manuals',
    icon: '📖',
    description: 'Download operator manuals, parts catalogs, and technical documentation for your AGT equipment.',
    color: 'bg-blue-500',
  },
  {
    title: 'Shipping & Delivery',
    slug: 'shipping-delivery',
    icon: '🚚',
    description: 'Learn about our free shipping policy, delivery times, and what to expect when your equipment arrives.',
    color: 'bg-green-500',
  },
  {
    title: 'Financing Options',
    slug: 'financing',
    icon: '💳',
    description: 'Explore flexible financing options to help you get the equipment you need with payments that work for you.',
    color: 'bg-purple-500',
  },
  {
    title: 'Warranty Information',
    slug: 'warranty',
    icon: '🛡️',
    description: 'Understand your warranty coverage, how to file a claim, and what\'s included with your purchase.',
    color: 'bg-yellow-500',
  },
  {
    title: 'Maintenance Guides',
    slug: 'maintenance',
    icon: '🔧',
    description: 'Keep your equipment running smoothly with maintenance schedules, tips, and troubleshooting guides.',
    color: 'bg-red-500',
  },
  {
    title: 'Parts Compatibility',
    slug: 'parts-compatibility',
    icon: '🔩',
    description: 'Find the right parts for your equipment with our compatibility guides and part number lookup.',
    color: 'bg-indigo-500',
  },
];

export default function SupportCenter() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm mb-4 text-gray-300">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Support</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Support Center</h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Find answers, documentation, and help for your AGT equipment. Can&apos;t find what you need? Call us at (949) 898-7669.
          </p>
        </div>
      </section>

      {/* Support Cards */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {supportPages.map((page) => (
              <Link
                key={page.slug}
                href={`/support/${page.slug}/`}
                className="group bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className={`w-14 h-14 ${page.color} rounded-lg flex items-center justify-center text-2xl mb-4`}>
                  {page.icon}
                </div>
                <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 mb-2">
                  {page.title}
                </h2>
                <p className="text-gray-600">
                  {page.description}
                </p>
                <span className="inline-flex items-center mt-4 text-blue-600 font-medium">
                  Learn more
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Contact */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">Need Immediate Help?</h2>
            <p className="text-blue-100 mb-6">
              Our support team is available Monday-Friday, 8am-5pm PST
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+19498987669"
                className="inline-flex items-center justify-center bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call (949) 898-7669
              </a>
              <Link
                href="/contact/"
                className="inline-flex items-center justify-center border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
