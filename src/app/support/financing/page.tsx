import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Financing Options',
  description: 'Flexible financing options for mini excavators and skid steers. Learn about payment plans, rates, and how to apply for equipment financing.',
};

export default function FinancingPage() {
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
            <span className="text-gray-900">Financing</span>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-purple-600 to-purple-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Financing Options</h1>
          <p className="text-xl text-purple-100 max-w-3xl">
            Get the equipment you need with flexible financing. Multiple options available for businesses and individuals.
          </p>
        </div>
      </section>

      {/* AEO Answer Block */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-purple-50 rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              Does AGT Equipment offer financing?
            </h2>
            <p className="text-gray-700 mb-4">
              Yes, AGT Equipment offers financing through our lending partners. Options include 12-60 month terms with competitive rates. Most applicants receive a decision within 24 hours.
            </p>
            <ul className="text-gray-700 space-y-1">
              <li>• Terms from 12 to 60 months</li>
              <li>• Rates starting at 7.99% APR</li>
              <li>• Quick application process</li>
              <li>• Available for businesses and individuals</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Financing Options */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Available Financing Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-2xl mb-4">🏢</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Business Financing</h3>
              <p className="text-gray-600 mb-4">
                Ideal for contractors, landscapers, and construction businesses.
              </p>
              <ul className="text-gray-600 space-y-2">
                <li>• Up to $100,000 financing</li>
                <li>• 24-60 month terms</li>
                <li>• Tax benefits available</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-2xl mb-4">👤</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Personal Financing</h3>
              <p className="text-gray-600 mb-4">
                For property owners and individual buyers.
              </p>
              <ul className="text-gray-600 space-y-2">
                <li>• Up to $50,000 financing</li>
                <li>• 12-48 month terms</li>
                <li>• Competitive rates</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center text-2xl mb-4">📋</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Lease-to-Own</h3>
              <p className="text-gray-600 mb-4">
                Lower monthly payments with ownership at term end.
              </p>
              <ul className="text-gray-600 space-y-2">
                <li>• Lower upfront costs</li>
                <li>• 36-60 month terms</li>
                <li>• $1 buyout option</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How to Apply */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">How to Apply</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-2xl font-bold text-blue-600 mx-auto mb-4">1</div>
              <h3 className="font-semibold text-gray-900 mb-2">Request Quote</h3>
              <p className="text-gray-600 text-sm">Select your equipment and request a quote</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-2xl font-bold text-blue-600 mx-auto mb-4">2</div>
              <h3 className="font-semibold text-gray-900 mb-2">Apply Online</h3>
              <p className="text-gray-600 text-sm">Complete the simple application form</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-2xl font-bold text-blue-600 mx-auto mb-4">3</div>
              <h3 className="font-semibold text-gray-900 mb-2">Get Approved</h3>
              <p className="text-gray-600 text-sm">Receive decision within 24 hours</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-2xl font-bold text-green-600 mx-auto mb-4">✓</div>
              <h3 className="font-semibold text-gray-900 mb-2">Take Delivery</h3>
              <p className="text-gray-600 text-sm">Sign documents and receive equipment</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Apply?</h2>
            <p className="text-purple-100 mb-6">
              Contact our sales team to discuss financing options for your equipment purchase.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+19498987669"
                className="inline-flex items-center justify-center bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
              >
                Call (949) 898-7669
              </a>
              <Link
                href="/contact/"
                className="inline-flex items-center justify-center border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                Request Financing Info
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
