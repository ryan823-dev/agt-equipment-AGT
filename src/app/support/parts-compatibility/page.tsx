import { Metadata } from 'next';
import Link from 'next/link';
import { canonicalUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Parts Compatibility',
  description: 'Find the right parts for your AGT mini excavator or skid steer. Compatibility charts, part number lookup, and cross-reference guides.',
  alternates: {
    canonical: canonicalUrl('/support/parts-compatibility/'),
  },
};

export default function PartsCompatibilityPage() {
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
            <span className="text-gray-900">Parts Compatibility</span>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-600 to-indigo-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Parts Compatibility</h1>
          <p className="text-xl text-indigo-100 max-w-3xl">
            Find the right parts for your equipment. Use our compatibility guides or contact support for help identifying the correct parts.
          </p>
        </div>
      </section>

      {/* AEO Answer Block */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-indigo-50 rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              How do I find the right parts for my AGT equipment?
            </h2>
            <p className="text-gray-700 mb-4">
              Find parts by your model number or OEM part number. Our compatibility charts show which parts fit each model. If you&apos;re unsure, contact us with your model and serial number.
            </p>
            <ul className="text-gray-700 space-y-1">
              <li>• Check your model plate for model and serial number</li>
              <li>• Cross-reference with our parts catalog</li>
              <li>• Contact support for assistance</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Model Lookup */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Find Parts by Model</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { model: 'H15R', name: 'AGT H15R Mini Excavator', type: 'Mini Excavators', slug: 'h15r' },
              { model: 'DM12X', name: 'AGT DM12X Mini Excavator', type: 'Mini Excavators', slug: 'dm12x' },
              { model: 'CFG-40UF', name: 'CFG-40UF 4-Ton Excavator', type: 'Mini Excavators', slug: 'cfg-40uf' },
              { model: 'MSL-500', name: 'AGT MSL-500 Skid Steer', type: 'Skid Steers', slug: 'msl-500' },
            ].map((item) => (
              <Link
                key={item.model}
                href={`/parts/?model=${item.slug}`}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <span className="text-sm text-gray-500">{item.type}</span>
                <h3 className="text-xl font-semibold text-gray-900 mt-1">{item.model}</h3>
                <p className="text-gray-600 text-sm mt-2">{item.name}</p>
                <span className="inline-flex items-center mt-4 text-blue-600 font-medium text-sm">
                  View compatible parts →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Common Parts */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Common Replacement Parts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Oil Filters', icon: '🛢️', desc: 'Engine oil filters for all models' },
              { name: 'Fuel Filters', icon: '⛽', desc: 'Diesel fuel filters' },
              { name: 'Air Filters', icon: '💨', desc: 'Engine air intake filters' },
              { name: 'Hydraulic Filters', icon: '🔧', desc: 'Hydraulic system filters' },
              { name: 'Tracks', icon: '🛤️', desc: 'Rubber tracks for mini excavators' },
              { name: 'Bucket Teeth', icon: '🦷', desc: 'Replacement bucket teeth' },
              { name: 'Hydraulic Hoses', icon: '➰', desc: 'High-pressure hydraulic hoses' },
              { name: 'Drive Motors', icon: '⚙️', desc: 'Track drive motors' },
            ].map((part) => (
              <Link
                key={part.name}
                href={`/parts/?category=${part.name.toLowerCase().replace(' ', '-')}`}
                className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
              >
                <span className="text-2xl">{part.icon}</span>
                <h3 className="font-semibold text-gray-900 mt-2">{part.name}</h3>
                <p className="text-gray-600 text-sm mt-1">{part.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-indigo-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Need Help Finding Parts?</h2>
            <p className="text-gray-600 mb-6">
              Can&apos;t find what you&apos;re looking for? Our team can help identify the correct parts for your equipment. Have your model and serial number ready.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:+19498987669"
                className="inline-flex items-center justify-center bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
              >
                Call (949) 898-7669
              </a>
              <Link
                href="/contact/"
                className="inline-flex items-center justify-center bg-white text-indigo-600 border border-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors"
              >
                Email Support
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
