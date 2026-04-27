import { Metadata } from 'next';
import Link from 'next/link';
import { canonicalUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Maintenance Guides',
  description: 'Keep your mini excavator or skid steer running smoothly with maintenance schedules, tips, and troubleshooting guides.',
  alternates: {
    canonical: canonicalUrl('/support/maintenance/'),
  },
};

export default function MaintenancePage() {
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
            <span className="text-gray-900">Maintenance</span>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-red-600 to-red-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Maintenance Guides</h1>
          <p className="text-xl text-red-100 max-w-3xl">
            Proper maintenance extends equipment life and prevents costly repairs. Find schedules, tips, and troubleshooting help.
          </p>
        </div>
      </section>

      {/* AEO Answer Block */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              How often should I service my mini excavator?
            </h2>
            <p className="text-gray-700 mb-4">
              Service your mini excavator every 250 operating hours or every 6 months, whichever comes first. Daily checks include fluid levels, track tension, and visual inspection.
            </p>
            <ul className="text-gray-700 space-y-1">
              <li>• Daily: Check fluids, inspect for leaks</li>
              <li>• Every 50 hours: Grease fittings, check filters</li>
              <li>• Every 250 hours: Oil change, filter replacement</li>
              <li>• Every 500 hours: Hydraulic fluid, coolant check</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Maintenance Schedule */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Maintenance Schedule</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Interval</th>
                  <th className="px-6 py-4 text-left">Task</th>
                  <th className="px-6 py-4 text-left">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">Daily (Before Use)</td>
                  <td className="px-6 py-4">Visual inspection</td>
                  <td className="px-6 py-4 text-gray-600">Check for leaks, damage, loose bolts</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">Daily</td>
                  <td className="px-6 py-4">Fluid levels</td>
                  <td className="px-6 py-4 text-gray-600">Engine oil, hydraulic fluid, coolant</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">Every 50 Hours</td>
                  <td className="px-6 py-4">Grease all fittings</td>
                  <td className="px-6 py-4 text-gray-600">Pins, bushings, pivot points</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">Every 250 Hours</td>
                  <td className="px-6 py-4">Engine oil & filter</td>
                  <td className="px-6 py-4 text-gray-600">Use specified oil grade</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">Every 250 Hours</td>
                  <td className="px-6 py-4">Fuel filter</td>
                  <td className="px-6 py-4 text-gray-600">Replace with OEM filter</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">Every 500 Hours</td>
                  <td className="px-6 py-4">Hydraulic fluid</td>
                  <td className="px-6 py-4 text-gray-600">Check level, sample for contamination</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">Every 500 Hours</td>
                  <td className="px-6 py-4">Air filter</td>
                  <td className="px-6 py-4 text-gray-600">Clean or replace as needed</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">Every 1000 Hours</td>
                  <td className="px-6 py-4">Track tension</td>
                  <td className="px-6 py-4 text-gray-600">Adjust to specification</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Common Issues */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Troubleshooting Common Issues</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                issue: 'Engine won\'t start',
                causes: ['Low fuel', 'Dead battery', 'Clogged fuel filter', 'Safety switch engaged'],
              },
              {
                issue: 'Hydraulic system slow',
                causes: ['Low hydraulic fluid', 'Clogged filter', 'Worn pump', 'Air in system'],
              },
              {
                issue: 'Tracks coming off',
                causes: ['Incorrect tension', 'Worn sprockets', 'Damaged track', 'Misaligned idler'],
              },
              {
                issue: 'Excessive smoke',
                causes: ['Dirty air filter', 'Wrong oil grade', 'Overfilled oil', 'Worn injectors'],
              },
            ].map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-3">{item.issue}</h3>
                <p className="text-sm text-gray-600 mb-2">Possible causes:</p>
                <ul className="text-gray-600">
                  {item.causes.map((cause, i) => (
                    <li key={i} className="flex items-center">
                      <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                      {cause}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Parts & Service CTA */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              href="/parts/"
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center">
                <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center text-2xl mr-4">🔩</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Order Parts</h3>
                  <p className="text-gray-600">Find filters, fluids, and replacement parts</p>
                </div>
              </div>
            </Link>
            <Link
              href="/contact/"
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center">
                <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center text-2xl mr-4">📞</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Contact Service</h3>
                  <p className="text-gray-600">Talk to our technical support team</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
