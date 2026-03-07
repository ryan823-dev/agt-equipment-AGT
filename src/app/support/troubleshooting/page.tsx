import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Mini Excavator Troubleshooting Guide | AGT Equipment',
  description: 'Troubleshoot common mini excavator problems: engine won\'t start, hydraulic issues, track problems. Step-by-step diagnostic guides for AGT equipment.',
};

const troubleshootingGuides = [
  {
    category: 'Engine Problems',
    issues: [
      {
        title: 'Engine Won\'t Start',
        symptoms: 'Engine cranks but won\'t fire, or doesn\'t crank at all',
        causes: [
          'Dead battery or weak charge',
          'Fuel system problems (no fuel, clogged filter, air in lines)',
          'Spark plug issues (gasoline engines)',
          'Glow plug failure (diesel engines in cold weather)',
          'Safety interlock engaged',
        ],
        solutions: [
          'Check battery voltage (should be 12.6V or higher)',
          'Verify fuel is reaching the engine (check fuel filter, fuel pump)',
          'Inspect spark plugs for fouling or wear',
          'Test glow plugs with multimeter (diesel)',
          'Check seat switch and safety interlocks are engaged',
        ],
        relatedParts: ['Battery', 'Spark Plug', 'Glow Plug', 'Fuel Filter', 'Ignition Switch'],
      },
      {
        title: 'Engine Overheating',
        symptoms: 'Temperature gauge high, steam from radiator, engine loses power',
        causes: [
          'Low coolant level',
          'Radiator blocked with debris',
          'Fan belt loose or broken',
          'Thermostat stuck closed',
          'Water pump failure',
        ],
        solutions: [
          'Check coolant level when engine is cold',
          'Clean radiator fins with compressed air',
          'Inspect and tension fan belt',
          'Replace thermostat if stuck',
          'Check water pump for leaks or noise',
        ],
        relatedParts: ['Radiator', 'Fan Belt', 'Thermostat', 'Water Pump', 'Coolant'],
      },
      {
        title: 'Engine Losses Power',
        symptoms: 'Engine runs but lacks power under load',
        causes: [
          'Clogged air filter',
          'Fuel filter restriction',
          'Injector problems',
          'Turbo issues (if equipped)',
          'Exhaust restriction',
        ],
        solutions: [
          'Clean or replace air filter',
          'Replace fuel filter',
          'Have injectors tested and cleaned',
          'Check turbo boost pressure',
          'Inspect exhaust for blockages',
        ],
        relatedParts: ['Air Filter', 'Fuel Filter', 'Injectors'],
      },
    ],
  },
  {
    category: 'Hydraulic Problems',
    issues: [
      {
        title: 'Slow Hydraulic Response',
        symptoms: 'Boom, arm, or bucket moves slowly; weak lifting power',
        causes: [
          'Low hydraulic fluid level',
          'Clogged hydraulic filter',
          'Worn hydraulic pump',
          'Cylinder seals leaking',
          'Control valve problems',
        ],
        solutions: [
          'Check hydraulic fluid level and top off',
          'Replace hydraulic filter (should be done every 500 hours)',
          'Test pump pressure with gauge',
          'Inspect cylinders for external leaks',
          'Check control valve for sticking spools',
        ],
        relatedParts: ['Hydraulic Filter', 'Hydraulic Pump', 'Cylinder Seals', 'Control Valve'],
      },
      {
        title: 'Hydraulic System Overheating',
        symptoms: 'Hydraulic fluid gets too hot, system loses efficiency',
        causes: [
          'Low fluid level',
          'Clogged oil cooler',
          'Continuous high-load operation',
          'Worn pump or motor',
          'Wrong fluid viscosity',
        ],
        solutions: [
          'Check and top off hydraulic fluid',
          'Clean hydraulic oil cooler',
          'Allow machine to rest and cool during heavy use',
          'Have pump and motor tested',
          'Verify correct fluid is being used',
        ],
        relatedParts: ['Hydraulic Oil Cooler', 'Hydraulic Pump', 'Hydraulic Fluid'],
      },
      {
        title: 'Hydraulic Cylinder Leaking',
        symptoms: 'Visible fluid leak from cylinder; drift when holding position',
        causes: [
          'Worn cylinder seals',
          'Damaged cylinder rod (scratches, dents)',
          'Loose gland nut',
          'Over-pressurization',
        ],
        solutions: [
          'Replace cylinder seals (seal kit available)',
          'Polish or replace damaged rod',
          'Tighten gland nut to specification',
          'Check system pressure relief valve',
        ],
        relatedParts: ['Cylinder Seal Kit', 'Hydraulic Cylinder', 'Rod'],
      },
    ],
  },
  {
    category: 'Track & Undercarriage Problems',
    issues: [
      {
        title: 'Tracks Coming Off',
        symptoms: 'Track derails frequently during operation',
        causes: [
          'Incorrect track tension',
          'Worn idler or sprocket',
          'Damaged track links',
          'Operating on steep side slopes',
        ],
        solutions: [
          'Adjust track tension per operator manual (typically 1-2" sag)',
          'Inspect idler and sprocket for wear, replace if needed',
          'Inspect track for damage, replace if worn',
          'Avoid operating on extreme slopes sideways',
        ],
        relatedParts: ['Rubber Tracks', 'Idler Wheel', 'Sprocket', 'Track Adjuster'],
      },
      {
        title: 'Excessive Track Wear',
        symptoms: 'Tracks wear quickly; steel cords showing; cracks in rubber',
        causes: [
          'Operating on abrasive surfaces (concrete, asphalt)',
          'Sharp turns on hard surfaces',
          'Debris between track and rollers',
          'Incorrect tension',
        ],
        solutions: [
          'Avoid prolonged operation on abrasive surfaces',
          'Make wider turns on hard ground',
          'Clean tracks daily, remove packed debris',
          'Maintain correct track tension',
        ],
        relatedParts: ['Rubber Tracks', 'Track Roller', 'Idler Wheel'],
      },
    ],
  },
  {
    category: 'Electrical Problems',
    issues: [
      {
        title: 'Battery Draining',
        symptoms: 'Battery goes dead after sitting; hard starting',
        causes: [
          'Parasitic draw from accessories',
          'Bad alternator (not charging)',
          'Old battery',
          'Corroded connections',
        ],
        solutions: [
          'Test for parasitic draw with multimeter',
          'Check alternator output (should be 13.5-14.5V when running)',
          'Replace battery if more than 3-4 years old',
          'Clean battery terminals and cable connections',
        ],
        relatedParts: ['Battery', 'Alternator', 'Battery Cables'],
      },
      {
        title: 'Controls Not Responding',
        symptoms: 'Joystick or pilot controls don\'t work or work intermittently',
        causes: [
          'Safety interlock not engaged',
          'Electrical connection loose',
          'Hydraulic pilot pressure low',
          'Control valve issue',
        ],
        solutions: [
          'Ensure seat switch and safety interlocks are properly engaged',
          'Check electrical connections at control valves',
          'Verify pilot pump pressure',
          'Inspect control valve spools for sticking',
        ],
        relatedParts: ['Safety Switch', 'Control Valve', 'Pilot Pump'],
      },
    ],
  },
];

export default function TroubleshootingPage() {
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
            <span className="text-white">Troubleshooting</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Mini Excavator Troubleshooting Guide
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Diagnose and fix common mini excavator and skid steer problems. 
            Step-by-step guides for engine, hydraulic, track, and electrical issues.
          </p>
        </div>
      </section>

      {/* Quick Answer */}
      <section className="bg-blue-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              My mini excavator will not start. What should I check first?
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Check these items in order: (1) Battery voltage and connections, (2) Fuel level and fuel shutoff valve, 
              (3) Safety interlocks (seat switch), (4) Spark plugs or glow plugs, (5) Fuel filter for clogs. 
              Most starting issues are battery or fuel related.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-sm font-bold mr-3">1</span>
                <span className="text-gray-700">Battery: Should read 12.6V+ when off, 13.5-14.5V when running</span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-sm font-bold mr-3">2</span>
                <span className="text-gray-700">Fuel: Check level, filter, and that fuel reaches engine</span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-sm font-bold mr-3">3</span>
                <span className="text-gray-700">Safety: Seat switch and other interlocks must be engaged</span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-sm font-bold mr-3">4</span>
                <span className="text-gray-700">Ignition: Check spark plugs (gas) or glow plugs (diesel)</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Troubleshooting by Category */}
      {troubleshootingGuides.map((category) => (
        <section key={category.category} className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">{category.category}</h2>
            
            <div className="space-y-8">
              {category.issues.map((issue) => (
                <div key={issue.title} className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{issue.title}</h3>
                  <p className="text-gray-600 mb-4"><strong>Symptoms:</strong> {issue.symptoms}</p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">Possible Causes:</h4>
                      <ul className="space-y-1">
                        {issue.causes.map((cause) => (
                          <li key={cause} className="text-gray-600 flex items-start">
                            <span className="text-red-500 mr-2">•</span>
                            {cause}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">Solutions:</h4>
                      <ul className="space-y-1">
                        {issue.solutions.map((solution) => (
                          <li key={solution} className="text-gray-600 flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            {solution}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <span className="text-sm font-medium text-gray-700">Related Parts: </span>
                    <span className="text-sm text-blue-600">
                      {issue.relatedParts.join(' • ')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Maintenance Schedule */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Preventive Maintenance Schedule</h2>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Component</th>
                  <th className="px-6 py-4 text-left">Interval</th>
                  <th className="px-6 py-4 text-left">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4">Engine Oil & Filter</td>
                  <td className="px-6 py-4">250 hours</td>
                  <td className="px-6 py-4">Change oil and filter</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4">Air Filter</td>
                  <td className="px-6 py-4">50-250 hours</td>
                  <td className="px-6 py-4">Clean or replace</td>
                </tr>
                <tr>
                  <td className="px-6 py-4">Fuel Filter</td>
                  <td className="px-6 py-4">500 hours</td>
                  <td className="px-6 py-4">Replace</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4">Hydraulic Filter</td>
                  <td className="px-6 py-4">500 hours</td>
                  <td className="px-6 py-4">Replace</td>
                </tr>
                <tr>
                  <td className="px-6 py-4">Hydraulic Fluid</td>
                  <td className="px-6 py-4">1000 hours</td>
                  <td className="px-6 py-4">Change fluid</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4">Track Tension</td>
                  <td className="px-6 py-4">50 hours</td>
                  <td className="px-6 py-4">Check and adjust</td>
                </tr>
                <tr>
                  <td className="px-6 py-4">Grease Points</td>
                  <td className="px-6 py-4">10 hours</td>
                  <td className="px-6 py-4">Lubricate all pins and bushings</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Need Expert Help?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Our technical support team can help diagnose problems and recommend the right parts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact/"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Contact Support
            </Link>
            <Link 
              href="/support/manuals/"
              className="inline-block bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-400 transition"
            >
              View Manuals
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
