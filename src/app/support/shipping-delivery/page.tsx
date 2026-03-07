import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Shipping & Delivery | AGT Equipment Support',
  description: 'Learn about free shipping on mini excavators and skid steers. Delivery times, shipping process, and what to expect when your equipment arrives.',
};

export default function ShippingPage() {
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
            <span className="text-gray-900">Shipping & Delivery</span>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-green-600 to-green-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Shipping & Delivery</h1>
          <p className="text-xl text-green-100 max-w-3xl">
            Free shipping within the continental United States. Learn about our delivery process and what to expect.
          </p>
        </div>
      </section>

      {/* AEO Answer Block */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-green-50 rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              How is equipment shipped and delivered?
            </h2>
            <p className="text-gray-700 mb-4">
              All AGT equipment includes free shipping within the continental US. Equipment is delivered on a flatbed or step-deck trailer. You&apos;ll need a forklift or similar equipment to unload. Delivery typically takes 3-7 business days.
            </p>
            <ul className="text-gray-700 space-y-1">
              <li>• Ships from California or Illinois warehouse</li>
              <li>• Delivery time: 3-7 business days</li>
              <li>• Customer responsible for unloading</li>
              <li>• Tracking provided via email</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Free Shipping Policy</h2>
              <div className="prose prose-lg text-gray-600">
                <p>
                  All AGT Equipment purchases include <strong>free shipping</strong> within the continental United States. This applies to mini excavators, mini skid steers, and most attachments.
                </p>
                <p>
                  Equipment ships from our warehouses in:
                </p>
                <ul>
                  <li><strong>California:</strong> 2602 Halladay Street, Santa Ana, CA 92707</li>
                  <li><strong>Illinois:</strong> 6200 S Oak Park Ave, Chicago, IL 60638</li>
                </ul>
                <p>
                  We&apos;ll ship from the location closest to you to minimize delivery time.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-6 mt-10">Delivery Timeline</h2>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">1</div>
                    <div className="ml-4">
                      <h3 className="font-semibold text-gray-900">Order Confirmation</h3>
                      <p className="text-gray-600">Within 24 hours of purchase</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">2</div>
                    <div className="ml-4">
                      <h3 className="font-semibold text-gray-900">Shipping Scheduled</h3>
                      <p className="text-gray-600">1-2 business days for in-stock items</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">3</div>
                    <div className="ml-4">
                      <h3 className="font-semibold text-gray-900">Transit Time</h3>
                      <p className="text-gray-600">3-7 business days depending on location</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">✓</div>
                    <div className="ml-4">
                      <h3 className="font-semibold text-gray-900">Delivery</h3>
                      <p className="text-gray-600">Carrier calls 24 hours before delivery</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Unloading Requirements</h2>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">Important: Unloading is Your Responsibility</h3>
                <p className="text-gray-600">
                  Equipment is delivered on a flatbed or step-deck trailer. You must have a way to unload the equipment from the truck.
                </p>
              </div>

              <h3 className="font-semibold text-gray-900 mb-4">Recommended Unloading Methods:</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600"><strong>Forklift:</strong> Best option for most equipment. Minimum 5,000 lb capacity recommended.</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600"><strong>Roll-off Trailer:</strong> Drive equipment off if you have a loading dock or ramp.</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600"><strong>Crane/Hoist:</strong> For larger equipment or job site delivery.</span>
                </li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-6 mt-10">Equipment Weights</h2>
              <table className="w-full bg-white rounded-lg shadow">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Equipment</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Weight</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Forklift Needed</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-3 text-gray-700">1-Ton Excavators</td>
                    <td className="px-4 py-3 text-gray-700">2,400-2,800 lbs</td>
                    <td className="px-4 py-3 text-gray-700">3,000+ lb</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-gray-700">2-Ton Excavators</td>
                    <td className="px-4 py-3 text-gray-700">4,000-5,000 lbs</td>
                    <td className="px-4 py-3 text-gray-700">5,000+ lb</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-gray-700">4-Ton Excavators</td>
                    <td className="px-4 py-3 text-gray-700">8,000-9,000 lbs</td>
                    <td className="px-4 py-3 text-gray-700">10,000+ lb</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-gray-700">Mini Skid Steers</td>
                    <td className="px-4 py-3 text-gray-700">1,500-2,500 lbs</td>
                    <td className="px-4 py-3 text-gray-700">3,000+ lb</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              { q: 'Do you ship to Alaska or Hawaii?', a: 'Yes, we can ship to Alaska and Hawaii. Additional shipping charges apply. Contact us for a quote.' },
              { q: 'Can I pick up the equipment myself?', a: 'Yes, pickup is available at our Santa Ana, CA or Chicago, IL warehouses. Contact us to schedule.' },
              { q: 'What if I don\'t have a forklift?', a: 'You can rent a forklift, hire a rigger, or arrange delivery to a location with unloading capability.' },
              { q: 'Will the driver help unload?', a: 'The driver is not responsible for unloading. You must have equipment or personnel ready to unload.' },
            ].map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
