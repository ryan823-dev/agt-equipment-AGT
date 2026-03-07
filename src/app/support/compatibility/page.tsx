import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Parts & Attachments Compatibility Guide | AGT Equipment',
  description: 'Find compatible parts and attachments for your AGT mini excavator or skid steer. H12, H15, QH12, DM12, KRT23, KTT23 compatibility charts.',
};

// Compatibility data
const excavatorModels = [
  {
    model: 'H12',
    series: '1-Ton',
    engine: 'RATO 420D',
    trackSize: '180x72x37',
    bucketWidth: '8-18"',
    attachments: ['Hydraulic Thumb', 'Digging Buckets', 'Auger', 'Ripper', 'Rake', 'Brush Cutter'],
    commonParts: ['Oil Filter', 'Air Filter', 'Spark Plug', 'Ignition Switch', 'Starter'],
  },
  {
    model: 'H15R',
    series: '1-Ton',
    engine: 'RATO 420D',
    trackSize: '180x72x37',
    bucketWidth: '8-18"',
    attachments: ['Hydraulic Thumb', 'Digging Buckets', 'Auger', 'Ripper', 'Rake', 'Brush Cutter', 'Quick Attach'],
    commonParts: ['Oil Filter', 'Air Filter', 'Spark Plug', 'Ignition Switch', 'Starter', 'Hydraulic Pump'],
  },
  {
    model: 'QH12',
    series: '1-Ton',
    engine: 'RATO 420D',
    trackSize: '180x72x37',
    bucketWidth: '8-18"',
    attachments: ['Hydraulic Thumb', 'Digging Buckets', 'Auger', 'Ripper', 'Quick Attach'],
    commonParts: ['Oil Filter', 'Air Filter', 'Spark Plug', 'Ignition Switch'],
  },
  {
    model: 'DM12X',
    series: '1-2 Ton',
    engine: 'B&S EFI / RATO',
    trackSize: '180x72x37',
    bucketWidth: '10-24"',
    attachments: ['Hydraulic Thumb', 'Digging Buckets', 'Auger', 'Ripper', 'Brush Cutter', 'Quick Attach', 'Pallet Forks'],
    commonParts: ['Oil Filter', 'Air Filter', 'Fuel Filter', 'EFI Components', 'Hydraulic Filter'],
  },
  {
    model: 'DM12-C',
    series: '1-2 Ton',
    engine: 'B&S / RATO',
    trackSize: '180x72x37',
    bucketWidth: '10-24"',
    attachments: ['Hydraulic Thumb', 'Digging Buckets', 'Auger', 'Ripper', 'Quick Attach'],
    commonParts: ['Oil Filter', 'Air Filter', 'Hydraulic Filter'],
  },
  {
    model: 'MX20R',
    series: '1-2 Ton',
    engine: 'RATO',
    trackSize: '230x72x78',
    bucketWidth: '12-24"',
    attachments: ['Hydraulic Thumb', 'Digging Buckets', 'Auger', 'Brush Cutter'],
    commonParts: ['Oil Filter', 'Air Filter', 'Hydraulic Filter'],
  },
  {
    model: 'CFG-40UF',
    series: '3-4 Ton',
    engine: 'Kubota D1703',
    trackSize: '300x52.5x80',
    bucketWidth: '12-36"',
    attachments: ['Hydraulic Thumb', 'Digging Buckets', 'Cleanup Buckets', 'Auger', 'Breaker', 'Grapple'],
    commonParts: ['Kubota Oil Filter', 'Kubota Fuel Filter', 'Kubota Air Filter', 'Hydraulic Filter'],
  },
];

const skidSteerModels = [
  {
    model: 'KRT23',
    type: 'Stand-On Track',
    engine: 'RATO',
    attachments: ['4-in-1 Bucket', 'Auger', 'Trencher', 'Pallet Forks', 'Brush Cutter', 'Sweeper', 'Grapple'],
    commonParts: ['Tracks', 'Idler Wheel', 'Hydraulic Hoses', 'Control Valve Parts'],
  },
  {
    model: 'KTT23',
    type: 'Stand-On Track',
    engine: 'RATO',
    attachments: ['4-in-1 Bucket', 'Auger', 'Trencher', 'Pallet Forks', 'Brush Cutter', 'Sweeper'],
    commonParts: ['Tracks', 'Idler Wheel', 'Hydraulic Hoses'],
  },
  {
    model: 'TK35',
    type: 'Track Loader',
    engine: 'Kubota',
    attachments: ['Bucket', 'Auger', 'Pallet Forks', 'Brush Cutter', 'Snow Blade'],
    commonParts: ['Kubota Filters', 'Tracks', 'Hydraulic Components'],
  },
];

// Cross-compatibility matrix
const crossCompatibility = [
  {
    group: 'H12 / QH12 / H15R',
    sharedParts: ['Oil Filter (RATO 420D)', 'Air Filter', 'Spark Plug', 'Tracks 180x72x37', 'Starter Motor'],
    sharedAttachments: ['12EX Series Buckets', '12EX-RC Brush Cutter', '12EX-PZ20 Rake', '12EX-STQ Ripper', 'Quick Attach'],
  },
  {
    group: 'DM12X / DM12-C / DM12X-PLUS',
    sharedParts: ['Tracks 180x72x37', 'Hydraulic Filter', 'Control Valve Components'],
    sharedAttachments: ['12EX Series Buckets', 'Quick Attach', 'Auger'],
  },
];

export default function CompatibilityPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm mb-4 text-gray-300">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/support/" className="hover:text-white">Support</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Compatibility</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Parts & Attachments Compatibility Guide
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Find the right parts and attachments for your AGT mini excavator or skid steer. 
            Select your model to see compatible options.
          </p>
        </div>
      </section>

      {/* Quick Answer */}
      <section className="bg-blue-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              How do I find parts for my AGT equipment?
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Find your model in the tables below to see compatible parts and attachments. 
              H12, H15, and QH12 share many parts; DM12X and DM12-C share parts; 
              all 12EX series attachments fit 1-2 ton excavators.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <svg className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">H12, QH12, H15R share RATO 420D engine parts</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">All 12EX attachments fit 1-2 ton excavators</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">CFG-40UF uses Kubota D1703 engine (different parts)</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Mini Excavator Compatibility */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Mini Excavator Compatibility</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-md">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="px-4 py-3 text-left">Model</th>
                  <th className="px-4 py-3 text-left">Series</th>
                  <th className="px-4 py-3 text-left">Engine</th>
                  <th className="px-4 py-3 text-left">Track Size</th>
                  <th className="px-4 py-3 text-left">Bucket Width</th>
                  <th className="px-4 py-3 text-left">Compatible Attachments</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {excavatorModels.map((model, index) => (
                  <tr key={model.model} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-4 py-3 font-semibold">{model.model}</td>
                    <td className="px-4 py-3">{model.series}</td>
                    <td className="px-4 py-3">{model.engine}</td>
                    <td className="px-4 py-3">{model.trackSize}</td>
                    <td className="px-4 py-3">{model.bucketWidth}</td>
                    <td className="px-4 py-3 text-sm">{model.attachments.join(', ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Cross-Compatibility */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Cross-Compatibility Groups</h2>
          <p className="text-gray-600 mb-8">
            These model groups share parts and attachments. If you own one model, parts from the same group will typically fit.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            {crossCompatibility.map((group) => (
              <div key={group.group} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{group.group}</h3>
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-700 mb-2">Shared Parts:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {group.sharedParts.map((part) => (
                      <li key={part} className="flex items-center">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                        {part}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Shared Attachments:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {group.sharedAttachments.map((att) => (
                      <li key={att} className="flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        {att}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skid Steer Compatibility */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Mini Skid Steer Compatibility</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-md">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="px-4 py-3 text-left">Model</th>
                  <th className="px-4 py-3 text-left">Type</th>
                  <th className="px-4 py-3 text-left">Engine</th>
                  <th className="px-4 py-3 text-left">Compatible Attachments</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {skidSteerModels.map((model, index) => (
                  <tr key={model.model} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-4 py-3 font-semibold">{model.model}</td>
                    <td className="px-4 py-3">{model.type}</td>
                    <td className="px-4 py-3">{model.engine}</td>
                    <td className="px-4 py-3 text-sm">{model.attachments.join(', ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Common Parts by Model */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Common Parts by Model</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {excavatorModels.slice(0, 6).map((model) => (
              <div key={model.model} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">{model.model}</h3>
                <p className="text-sm text-gray-500 mb-3">{model.series} • {model.engine}</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  {model.commonParts.map((part) => (
                    <li key={part}>{part}</li>
                  ))}
                </ul>
                <Link 
                  href={`/parts/by-model/${model.model.toLowerCase()}-parts/`}
                  className="mt-4 inline-block text-blue-600 hover:underline text-sm font-medium"
                >
                  View all {model.model} parts →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Do H12 parts fit H15R?
              </h3>
              <p className="text-gray-600">
                Yes, H12, QH12, and H15R share the same RATO 420D engine and many hydraulic components. 
                Oil filters, air filters, spark plugs, and starters are interchangeable.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                What attachments fit 1-ton excavators?
              </h3>
              <p className="text-gray-600">
                All 12EX series attachments fit 1-ton and 2-ton AGT excavators. This includes buckets, 
                augers, rippers, rakes, and brush cutters. The quick attach system is universal.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Can I use Kubota parts on CFG-40UF?
              </h3>
              <p className="text-gray-600">
                The CFG-40UF uses a genuine Kubota D1703 engine. Kubota genuine filters and engine parts 
                are compatible. Contact support with your serial number for specific part numbers.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                What track size does H15R use?
              </h3>
              <p className="text-gray-600">
                The H15R uses 180x72x37 rubber tracks. This is the same track size as H12, QH12, 
                DM12-C, and DM12X models. We stock replacement tracks in our US warehouse.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Cannot Find Your Model?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Contact our support team with your model and serial number for personalized assistance.
          </p>
          <Link 
            href="/contact/"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Contact Support
          </Link>
        </div>
      </section>
    </main>
  );
}
