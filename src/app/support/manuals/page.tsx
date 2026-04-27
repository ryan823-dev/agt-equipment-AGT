import { Metadata } from 'next';
import Link from 'next/link';
import { canonicalUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Manuals & Documentation',
  description: 'Download operator manuals, parts catalogs, and technical documentation for AGT mini excavators and skid steers.',
  alternates: {
    canonical: canonicalUrl('/support/manuals/'),
  },
};

const manuals = [
  {
    category: 'Mini Excavators',
    items: [
      { name: 'H15R Operator Manual', file: '/manuals/H15R-manual.pdf', size: '5.2 MB' },
      { name: 'DM12X Operator Manual', file: '/manuals/DM12X-manual.pdf', size: '4.8 MB' },
      { name: 'CFG-40UF Operator Manual', file: '/manuals/CFG-40UF-manual.pdf', size: '6.1 MB' },
    ],
  },
  {
    category: 'Mini Skid Steers',
    items: [
      { name: 'MSL-500 Operator Manual', file: '/manuals/MSL-500-manual.pdf', size: '3.9 MB' },
    ],
  },
  {
    category: 'Parts Catalogs',
    items: [
      { name: 'Mini Excavator Parts Catalog', file: '/manuals/excavator-parts.pdf', size: '12 MB' },
      { name: 'Skid Steer Parts Catalog', file: '/manuals/skidsteer-parts.pdf', size: '8 MB' },
    ],
  },
];

export default function ManualsPage() {
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
            <span className="text-gray-900">Manuals</span>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Manuals & Documentation</h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Download operator manuals, parts catalogs, and technical documentation for your AGT equipment.
          </p>
        </div>
      </section>

      {/* AEO Answer Block */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-50 rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              Where can I find the manual for my AGT equipment?
            </h2>
            <p className="text-gray-700 mb-4">
              Operator manuals are available for download below. Each manual includes operating instructions, maintenance schedules, and safety information. If you need a manual not listed, contact our support team.
            </p>
            <ul className="text-gray-700 space-y-1">
              <li>• All manuals are PDF format</li>
              <li>• Includes English language versions</li>
              <li>• Covers operation, maintenance, and safety</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Manual Downloads */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {manuals.map((section) => (
            <div key={section.category} className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{section.category}</h2>
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Document</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Size</th>
                      <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">Download</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {section.items.map((item) => (
                      <tr key={item.name} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <svg className="w-6 h-6 text-red-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                            </svg>
                            <span className="font-medium text-gray-900">{item.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{item.size}</td>
                        <td className="px-6 py-4 text-right">
                          <a
                            href={item.file}
                            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                            download
                          >
                            <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            Download
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Help Section */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gray-600 text-center">
            Can&apos;t find what you&apos;re looking for?{' '}
            <Link href="/contact/" className="text-blue-600 hover:underline">
              Contact our support team
            </Link>
            {' '}or call (949) 898-7669.
          </p>
        </div>
      </section>
    </main>
  );
}
