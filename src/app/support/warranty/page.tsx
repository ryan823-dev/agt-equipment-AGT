import { Metadata } from 'next';
import Link from 'next/link';
import { canonicalUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Warranty Information',
  description: 'Learn about AGT Equipment warranty coverage, how to file a warranty claim, and what\'s covered for mini excavators and skid steers.',
  alternates: {
    canonical: canonicalUrl('/support/warranty/'),
  },
};

export default function WarrantyPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="text-sm text-gray-600">
            <Link href="/" className="hover:text-gray-900">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/support/" className="hover:text-gray-900">Support</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Warranty</span>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Warranty Information</h1>
          <p className="text-xl text-yellow-100 max-w-3xl">
            All AGT equipment comes with a comprehensive 1-year warranty. Learn about coverage and how to file a claim.
          </p>
        </div>
      </section>

      {/* AEO Answer Block */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-yellow-50 rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              What does the AGT warranty cover?
            </h2>
            <p className="text-gray-700 mb-4">
              All AGT equipment includes a 1-year warranty covering manufacturing defects and component failures under normal use. The warranty covers parts and labor for covered repairs.
            </p>
            <ul className="text-gray-700 space-y-1">
              <li>• 1-year coverage from date of delivery</li>
              <li>• Covers manufacturing defects</li>
              <li>• Parts and labor included</li>
              <li>• Does not cover wear items or misuse</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Coverage Details */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What&apos;s Covered</h2>
              <div className="bg-white rounded-lg shadow p-6">
                <ul className="space-y-3">
                  {[
                    'Engine and powertrain components',
                    'Hydraulic system components',
                    'Electrical system failures',
                    'Structural defects',
                    'Manufacturing defects in materials',
                    'Paint and finish defects (when reported within 30 days)',
                    'Control system malfunctions',
                    'Track system defects',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What&apos;s NOT Covered</h2>
              <div className="bg-white rounded-lg shadow p-6">
                <ul className="space-y-3">
                  {[
                    'Normal wear items (filters, belts, hoses)',
                    'Damage from misuse or abuse',
                    'Lack of proper maintenance',
                    'Unauthorized modifications',
                    'Damage from accidents',
                    'Acts of nature (flood, fire, etc.)',
                    'Cosmetic damage after 30 days',
                    'Consumables (oil, grease, hydraulic fluid)',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to File a Claim */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">How to File a Warranty Claim</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-2xl font-bold text-blue-600 mx-auto mb-4">1</div>
              <h3 className="font-semibold text-gray-900 mb-2">Contact Us</h3>
              <p className="text-gray-600 text-sm">Call (949) 898-7669 or email support</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-2xl font-bold text-blue-600 mx-auto mb-4">2</div>
              <h3 className="font-semibold text-gray-900 mb-2">Provide Details</h3>
              <p className="text-gray-600 text-sm">Model, serial number, and issue description</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-2xl font-bold text-blue-600 mx-auto mb-4">3</div>
              <h3 className="font-semibold text-gray-900 mb-2">Diagnosis</h3>
              <p className="text-gray-600 text-sm">Our team will diagnose the issue</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-2xl font-bold text-green-600 mx-auto mb-4">✓</div>
              <h3 className="font-semibold text-gray-900 mb-2">Resolution</h3>
              <p className="text-gray-600 text-sm">Parts shipped or service scheduled</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">Need to File a Claim?</h2>
            <p className="text-yellow-100 mb-6">
              Have an issue with your equipment? Contact our warranty team for assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+19498987669"
                className="inline-flex items-center justify-center bg-white text-yellow-600 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-50 transition-colors"
              >
                Call (949) 898-7669
              </a>
              <Link
                href="/contact/"
                className="inline-flex items-center justify-center border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
