import { Article } from '@/types';

export const articles: Article[] = [
  {
    id: '1',
    slug: 'how-to-choose-mini-excavator',
    title: 'How to Choose the Right Mini Excavator for Your Job',
    excerpt: 'Step-by-step guide to selecting the perfect mini excavator based on dig depth, weight class, engine type, and application.',
    content: `<h2>Quick Decision Flowchart</h2>
<p>1. Is your primary task trenching deeper than 6 feet?</p>
<p>-> Yes: You need a 2-4 ton excavator. Continue to step 2.</p>
<p>-> No: A 1-ton excavator may suffice. Continue to step 3.</p>

<h2>Mini Excavator Types at a Glance</h2>

<h3>1-Ton Excavators</h3>
<p>Best for: Landscaping, fence installation, indoor work</p>
<p>Limitations: Shallow dig depth, limited lifting capacity</p>

<h3>2-Ton Excavators</h3>
<p>Best for: Utility trenches, foundation repair, tree work</p>
<p>Limitations: May struggle with heavy lifting</p>

<h3>4-Ton Excavators</h3>
<p>Best for: Construction sites, agricultural work, demolition</p>
<p>Limitations: Larger footprint, may need trailer permit</p>

<h2>Step 1: Determine Dig Depth Requirements</h2>
<p>Match your excavator's dig depth to your deepest expected trench:</p>
<ul>
<li>3-4 foot trenches: 1-ton class</li>
<li>5-6 foot trenches: 2-ton class</li>
<li>8-12 foot trenches: 3-4 ton class</li>
</ul>

<h2>Step 2: Consider Transport and Access</h2>
<p>Factor in how you'll move the machine:</p>
<ul>
<li>1-ton: Fits in pickup bed or small trailer</li>
<li>2-ton: Requires equipment trailer</li>
<li>4-ton: Requires heavy-duty trailer, may need CDL</li>
</ul>

<h2>Key Takeaways</h2>
<ul>
<li>Match dig depth to your deepest expected trench</li>
<li>Consider transport logistics before buying</li>
<li>Kubota engines offer more power; Rato engines cost less</li>
<li>Hydraulic thumb adds 30% more capability</li>
</ul>`,
    quickAnswer: 'To choose a mini excavator, first determine your required dig depth (1-ton for 3-4ft, 2-ton for 5-6ft, 4-ton for 8-12ft), then consider transport requirements and budget. Kubota engines offer more power, Rato engines cost less.',
    category: 'buying-guide',
    tags: ['mini excavator', 'buying guide', 'equipment selection'],
    author: {
      name: 'AGT Equipment Team',
      role: 'Technical Sales',
    },
    faq: [
      {
        question: 'What size mini excavator do I need for trenching?',
        answer: 'For trenches 3-4 feet deep, a 1-ton excavator works well. For 5-6 foot trenches, choose a 2-ton. For trenches deeper than 8 feet, you need a 3-4 ton machine.',
      },
      {
        question: 'Which engine is better: Kubota or Rato?',
        answer: 'Kubota engines offer more power and longer life expectancy, ideal for daily use. Rato engines are more affordable and sufficient for occasional use. Both are reliable diesel engines.',
      },
      {
        question: 'Do I need a hydraulic thumb?',
        answer: 'A hydraulic thumb increases your excavator\'s versatility by 30%. It allows you to grab logs, rocks, and debris without manual handling. Highly recommended for landscaping and property maintenance.',
      },
    ],
    readingTime: 8,
    publishedAt: '2024-02-15',
    updatedAt: '2024-03-01',
  },
  {
    id: '2',
    slug: 'mini-excavator-vs-skid-steer',
    title: 'Mini Excavator vs Skid Steer: Which Is Right for You',
    excerpt: 'Compare mini excavators and skid steers side-by-side. Learn when to choose each based on your applications.',
    content: `<h2>At a Glance</h2>
<table>
<tr><th>Feature</th><th>Mini Excavator</th><th>Skid Steer</th></tr>
<tr><td>Primary Use</td><td>Digging, trenching</td><td>Loading, grading</td></tr>
<tr><td>Ground Impact</td><td>Low (tracks)</td><td>High (tires/tracks)</td></tr>
<tr><td>Attachments</td><td>Limited</td><td>100+ options</td></tr>
<tr><td>Dig Depth</td><td>3-12 feet</td><td>Minimal</td></tr>
<tr><td>Speed</td><td>Slow</td><td>Fast</td></tr>
</table>

<h2>When to Choose a Mini Excavator</h2>
<p>You need a mini excavator when:</p>
<ul>
<li>Your primary task is digging trenches or holes</li>
<li>You need to minimize ground disturbance</li>
<li>You work in tight spaces with limited swing room</li>
<li>You need precise digging control</li>
</ul>

<h2>When to Choose a Skid Steer</h2>
<p>You need a skid steer when:</p>
<ul>
<li>You need to move and load materials</li>
<li>You want maximum attachment versatility</li>
<li>Speed and mobility matter</li>
<li>You do snow removal, grading, or brush work</li>
</ul>`,
    quickAnswer: 'Choose a mini excavator for digging tasks (trenches, foundations) and minimal ground impact. Choose a skid steer for loading, grading, and maximum attachment versatility.',
    category: 'comparison',
    tags: ['mini excavator', 'skid steer', 'comparison'],
    author: {
      name: 'AGT Equipment Team',
      role: 'Technical Sales',
    },
    faq: [
      {
        question: 'Can a skid steer dig like an excavator?',
        answer: 'Skid steers can dig with an auger or trencher attachment, but cannot match an excavator\'s dig depth or precision. For serious excavation work, choose a mini excavator.',
      },
      {
        question: 'Which is more versatile?',
        answer: 'Skid steers are more versatile with 100+ attachments available. Mini excavators excel at digging but have limited attachment options (buckets, thumbs, hammers).',
      },
    ],
    readingTime: 6,
    publishedAt: '2024-02-20',
    updatedAt: '2024-03-01',
  },
  {
    id: '3',
    slug: 'mini-excavator-shipping-guide',
    title: 'Mini Excavator Shipping: What You Need to Know',
    excerpt: 'Learn how mini excavators are shipped, what equipment you need for unloading, and how to prepare for delivery.',
    content: `<h2>Shipping Overview</h2>
<p>AGT Equipment ships mini excavators from our warehouses in Santa Ana, CA and Chicago, IL. Shipping is free within the continental United States. Equipment is delivered on a flatbed or lowboy trailer.</p>

<h2>Preparing for Delivery</h2>
<p>Before your excavator arrives:</p>
<ul>
<li>Clear a level area for unloading</li>
<li>Ensure someone 18+ is present to sign</li>
<li>Arrange unloading equipment (forks, ramp, or crane)</li>
<li>Check local permits if parking on street</li>
</ul>

<h2>Unloading Options</h2>

<h3>Option 1: Forklift or Telehandler</h3>
<p>Best for: 1-2 ton excavators</p>
<p>Drive the machine off the trailer using forks under the tracks.</p>

<h3>Option 2: Ramps</h3>
<p>Best for: 1-4 ton excavators with operator</p>
<p>Drive the machine down loading ramps. Requires level ground and operator experience.</p>

<h3>Option 3: Liftgate Delivery</h3>
<p>Best for: 1-ton excavators without unloading equipment</p>
<p>Add liftgate service for an additional fee. Machine lowered to ground level.</p>

<h2>Transport Requirements by Size</h2>
<table>
<tr><th>Size</th><th>Weight</th><th>Trailer Type</th><th>Tow Vehicle</th></tr>
<tr><td>1-Ton</td><td>2,425 lbs</td><td>Utility trailer</td><td>Half-ton pickup</td></tr>
<tr><td>2-Ton</td><td>2,645-4,000 lbs</td><td>Equipment trailer</td><td>3/4-ton pickup</td></tr>
<tr><td>4-Ton</td><td>8,818 lbs</td><td>Heavy-duty trailer</td><td>1-ton truck or CDL</td></tr>
</table>`,
    quickAnswer: 'Mini excavators ship free from AGT warehouses in CA or IL. You\'ll need forklift, ramps, or liftgate service to unload. 1-ton machines fit in a pickup; 4-ton machines need a heavy-duty trailer.',
    category: 'how-to',
    tags: ['shipping', 'delivery', 'transport', 'mini excavator'],
    author: {
      name: 'AGT Equipment Team',
      role: 'Logistics',
    },
    faq: [
      {
        question: 'How long does shipping take?',
        answer: 'Shipping takes 3-7 business days depending on your location. We provide tracking information once your order ships.',
      },
      {
        question: 'Do I need a forklift to unload?',
        answer: 'A forklift is the easiest way to unload 1-2 ton excavators. For 4-ton machines, you\'ll need ramps or a crane. Liftgate delivery is available for smaller machines.',
      },
    ],
    readingTime: 5,
    publishedAt: '2024-03-01',
    updatedAt: '2024-03-01',
  },
  {
    id: '4',
    slug: 'kubota-vs-rato-engine',
    title: 'Kubota vs Rato Engines: Which Is Right for You',
    excerpt: 'Compare Kubota and Rato diesel engines used in AGT mini excavators. Learn the pros and cons of each for your application.',
    content: `<h2>Overview</h2>
<p>AGT mini excavators use either Kubota or Rato diesel engines. Both are proven, reliable engines—but they serve different needs.</p>

<h2>Kubota Engines</h2>
<p>Used in: DM12X, CFG-40UF</p>
<p>Kubota is a Japanese manufacturer known worldwide for small diesel engines. Their engines power equipment from brands like Bobcat, Kubota, and Caterpillar.</p>

<h3>Advantages</h3>
<ul>
<li>Higher horsepower per liter</li>
<li>Longer expected service life (8,000+ hours)</li>
<li>Excellent parts availability worldwide</li>
<li>Better fuel efficiency</li>
<li>Lower noise and vibration</li>
</ul>

<h3>Best For</h3>
<p>Daily commercial use, rental fleets, contractors who need maximum reliability.</p>

<h2>Rato Engines</h2>
<p>Used in: H15R</p>
<p>Rato is a Chinese engine manufacturer producing reliable diesel engines at lower cost. Their engines are widely used in agricultural and construction equipment.</p>

<h3>Advantages</h3>
<ul>
<li>Lower initial cost</li>
<li>Simpler mechanical design</li>
<li>Easier field repairs</li>
<li>Good fuel tolerance</li>
</ul>

<h3>Best For</h3>
<p>Occasional use (under 500 hours/year), property owners, budget-conscious buyers.</p>

<h2>Direct Comparison</h2>
<table>
<tr><th>Factor</th><th>Kubota</th><th>Rato</th></tr>
<tr><td>Horsepower</td><td>24.8-54 HP</td><td>13.5 HP</td></tr>
<tr><td>Service Life</td><td>8,000+ hours</td><td>5,000+ hours</td></tr>
<tr><td>Parts Cost</td><td>Higher</td><td>Lower</td></tr>
<tr><td>Availability</td><td>Excellent</td><td>Good</td></tr>
<tr><td>Price Premium</td><td>+$3,000-5,000</td><td>Base</td></tr>
</table>`,
    quickAnswer: 'Kubota engines offer more power, longer life (8,000+ hours), and better parts availability for daily commercial use. Rato engines cost less and are reliable for occasional use under 500 hours/year.',
    category: 'comparison',
    tags: ['engine', 'Kubota', 'Rato', 'comparison', 'mini excavator'],
    author: {
      name: 'AGT Equipment Team',
      role: 'Technical Sales',
    },
    faq: [
      {
        question: 'Are Rato engines reliable?',
        answer: 'Yes, Rato engines are reliable for their intended use case. They\'re designed for 5,000+ hours of service life. For occasional use (under 500 hours/year), they offer excellent value.',
      },
      {
        question: 'Can I get parts for Rato engines?',
        answer: 'Yes, AGT stocks common Rato engine parts. Filters, belts, and injectors are readily available. Major components may have longer lead times than Kubota.',
      },
    ],
    readingTime: 6,
    publishedAt: '2024-03-05',
    updatedAt: '2024-03-05',
  },
  {
    id: '5',
    slug: 'mini-excavator-attachments-guide',
    title: 'Mini Excavator Attachments: Complete Guide',
    excerpt: 'Learn about all the attachments available for mini excavators, from buckets to hammers, and how to choose the right ones.',
    content: `<h2>Essential Attachments</h2>

<h3>Digging Buckets</h3>
<p>The standard attachment for any excavator. Available in widths from 12" to 36".</p>
<ul>
<li><strong>12-18"</strong>: Trenching, utility work</li>
<li><strong>24-30"</strong>: General excavation, foundations</li>
<li><strong>36+"</strong>: Mass excavation, grading</li>
</ul>

<h3>Hydraulic Thumbs</h3>
<p>A thumb mounts opposite the bucket, allowing you to grab and move materials. Adds 30% more capability to your excavator.</p>
<p>Best for: Land clearing, debris removal, log handling</p>

<h3>Augers</h3>
<p>Drill holes for fence posts, tree planting, and footings. Requires auxiliary hydraulics.</p>
<p>Diameter options: 6", 9", 12", 18", 24"</p>

<h2>Specialty Attachments</h2>

<h3>Hydraulic Hammers</h3>
<p>Break concrete, asphalt, and rock. Sized by impact energy (ft-lbs).</p>
<ul>
<li>500-1,000 ft-lbs: 1-2 ton excavators</li>
<li>2,000+ ft-lbs: 4-ton excavators</li>
</ul>

<h3>Rippers</h3>
<p>Single-point tooth for breaking hard ground or prying up roots and rocks.</p>

<h3>Grapples</h3>
<p>Multi-tine grapple for handling brush, logs, and irregular materials.</p>

<h2>Compatibility Checklist</h2>
<p>Before buying an attachment, verify:</p>
<ul>
<li>Pin size and bucket width match your machine</li>
<li>Hydraulic flow rate for hydraulic attachments</li>
<li>Operating weight within machine's lift capacity</li>
<li>Hitch type (pin-on, quick coupler)</li>
</ul>`,
    quickAnswer: 'Essential mini excavator attachments include digging buckets (12-36"), hydraulic thumbs (+30% capability), augers (post holes), and hammers (concrete breaking). Check pin size, hydraulic flow, and lift capacity before buying.',
    category: 'buying-guide',
    tags: ['attachments', 'buckets', 'thumb', 'auger', 'mini excavator'],
    author: {
      name: 'AGT Equipment Team',
      role: 'Technical Sales',
    },
    faq: [
      {
        question: 'What attachments come with AGT excavators?',
        answer: 'AGT excavators include a digging bucket and hydraulic thumb standard. Additional attachments are available separately.',
      },
      {
        question: 'Do I need auxiliary hydraulics?',
        answer: 'Auxiliary hydraulics are required for hydraulic thumbs, augers, hammers, and grapples. All AGT excavators include auxiliary hydraulics standard.',
      },
    ],
    readingTime: 7,
    publishedAt: '2024-03-10',
    updatedAt: '2024-03-10',
  },
  {
    id: '6',
    slug: 'mini-excavator-maintenance-checklist',
    title: 'Mini Excavator Maintenance Checklist',
    excerpt: 'Keep your mini excavator running with this comprehensive maintenance checklist covering daily checks, scheduled service, and winterization.',
    content: `<h2>Daily Checks (Before Starting)</h2>
<ul>
<li>Check engine oil level</li>
<li>Check hydraulic fluid level</li>
<li>Check coolant level</li>
<li>Check fuel level and water separator</li>
<li>Inspect tracks for damage or wear</li>
<li>Check for fluid leaks under machine</li>
<li>Test horn, lights, and backup alarm</li>
</ul>

<h2>Every 50 Hours</h2>
<ul>
<li>Grease all pivot points (boom, arm, bucket)</li>
<li>Check track tension</li>
<li>Clean air filter pre-cleaner</li>
<li>Check battery connections</li>
</ul>

<h2>Every 250 Hours (Monthly)</h2>
<ul>
<li>Change engine oil and filter</li>
<li>Replace fuel filter</li>
<li>Clean or replace air filter</li>
<li>Check hydraulic filter condition</li>
<li>Inspect all hoses for cracks or wear</li>
</ul>

<h2>Every 500 Hours</h2>
<ul>
<li>Change hydraulic fluid and filter</li>
<li>Replace all filters (oil, fuel, air, hydraulic)</li>
<li>Check and adjust valve clearance</li>
<li>Inspect track rollers and idlers</li>
</ul>

<h2>Winter Storage</h2>
<p>If storing your excavator for winter:</p>
<ul>
<li>Fill fuel tank to prevent condensation</li>
<li>Add fuel stabilizer</li>
<li>Change oil before storage</li>
<li>Disconnect battery</li>
<li>Cover exhaust and intake</li>
<li>Store on blocks to relieve track tension</li>
</ul>`,
    quickAnswer: 'Maintain your mini excavator with daily fluid checks, greasing every 50 hours, oil changes every 250 hours, and hydraulic fluid changes every 500 hours. Winter storage requires fuel stabilizer and battery disconnection.',
    category: 'how-to',
    tags: ['maintenance', 'service', 'checklist', 'mini excavator'],
    author: {
      name: 'AGT Equipment Team',
      role: 'Technical Support',
    },
    faq: [
      {
        question: 'How often should I change the oil?',
        answer: 'Change engine oil and filter every 250 hours or every 3 months, whichever comes first. Use 15W-40 diesel engine oil.',
      },
      {
        question: 'What hydraulic fluid should I use?',
        answer: 'Use ISO 46 hydraulic fluid for most conditions. In cold weather (below 32°F), use ISO 32 for better flow. AGT machines require approximately 8-12 gallons depending on model.',
      },
    ],
    readingTime: 5,
    publishedAt: '2024-03-15',
    updatedAt: '2024-03-15',
  },
  {
    id: '7',
    slug: 'mini-excavator-safety-tips',
    title: 'Mini Excavator Safety: Essential Tips for Operators',
    excerpt: 'Stay safe on the job site with these essential mini excavator safety practices, from pre-operation checks to proper operating techniques.',
    content: `<h2>Before You Start</h2>

<h3>Pre-Operation Inspection</h3>
<p>Every operator should perform these checks before starting the engine:</p>
<ul>
<li>Walk around the machine looking for damage, leaks, or debris</li>
<li>Check track condition and tension</li>
<li>Verify all fluid levels (oil, hydraulic, coolant, fuel)</li>
<li>Test all controls and safety systems</li>
<li>Check the work area for hazards (utilities, overhead lines, slopes)</li>
</ul>

<h3>Call 811 Before Digging</h3>
<p>Always have utilities marked before excavation. It's the law in most jurisdictions and prevents potentially fatal accidents.</p>

<h2>Operating Safety</h2>

<h3>Seat and Controls</h3>
<ul>
<li>Adjust the seat so you can reach all controls comfortably</li>
<li>Fasten your seatbelt before starting</li>
<li>Keep the cab clean and free of debris</li>
<li>Never operate while fatigued or impaired</li>
</ul>

<h3>Stability Rules</h3>
<ul>
<li>Never exceed the rated lift capacity</li>
<li>Keep the tracks on firm, level ground when possible</li>
<li>Use the dozer blade for added stability</li>
<li>Never swing a loaded bucket over people or vehicles</li>
</ul>

<h3>Slope Operation</h3>
<ul>
<li>Avoid working on slopes steeper than 30% (17 degrees)</li>
<li>Keep the tracks pointed up/down slope, not sideways</li>
<li>Extend the bucket for balance when traveling slopes</li>
<li>Never swing a loaded bucket on a slope</li>
</ul>

<h2>People and Property Safety</h2>
<ul>
<li>Establish a safe zone around the machine (at least 6 feet)</li>
<li>Use a spotter when working near structures or blind spots</li>
<li>Never allow riders on the machine</li>
<li>Lower all attachments before leaving the operator's seat</li>
</ul>`,
    quickAnswer: 'Key mini excavator safety rules: always call 811 before digging, perform pre-operation inspections, fasten seatbelt, never exceed lift capacity, avoid slopes over 30%, and maintain a 6-foot safe zone around the machine.',
    category: 'safety',
    tags: ['safety', 'operation', 'tips', 'mini excavator'],
    author: {
      name: 'AGT Equipment Team',
      role: 'Technical Support',
    },
    faq: [
      {
        question: 'What is the safe slope angle for a mini excavator?',
        answer: 'Mini excavators should not operate on slopes steeper than 30% (17 degrees). Always keep tracks pointed up/down slope, never sideways. Use extra caution on wet or soft ground.',
      },
      {
        question: 'How close can I dig to overhead power lines?',
        answer: 'Maintain at least 10 feet from power lines under 50kV, and more for higher voltage lines. If you must work closer, contact the utility company for safety guidance.',
      },
    ],
    readingTime: 6,
    publishedAt: '2024-03-20',
    updatedAt: '2024-03-20',
  },
  {
    id: '8',
    slug: 'transporting-mini-excavator',
    title: 'How to Transport a Mini Excavator Safely',
    excerpt: 'Learn the proper way to load, secure, and transport your mini excavator on a trailer. Includes trailer selection and legal requirements.',
    content: `<h2>Choosing the Right Trailer</h2>

<p>Your trailer needs to handle the total weight of excavator + bucket + fuel:</p>

<table>
<tr><th>Excavator Size</th><th>Weight</th><th>Trailer Capacity Needed</th></tr>
<tr><td>1-ton (H15R)</td><td>2,500 lbs</td><td>5,000 lb trailer</td></tr>
<tr><td>2-ton (DM12X)</td><td>4,400 lbs</td><td>7,000 lb trailer</td></tr>
<tr><td>4-ton (CFG-40UF)</td><td>8,800 lbs</td><td>12,000 lb trailer</td></tr>
</table>

<h3>Tow Vehicle Requirements</h3>
<ul>
<li>Check your truck's towing capacity rating</li>
<li>Ensure hitch class matches trailer weight</li>
<li>Verify brake controller is installed and working</li>
<li>Check tire condition and pressure</li>
</ul>

<h2>Loading Procedure</h2>

<ol>
<li><strong>Position trailer</strong> on level ground</li>
<li><strong>Lower ramps</strong> and verify they're secure</li>
<li><strong>Align excavator</strong> with ramp center</li>
<li><strong>Drive up slowly</strong> in low gear</li>
<li><strong>Position over axles</strong> for proper weight distribution</li>
<li><strong>Lower all attachments</strong> to trailer deck</li>
</ol>

<h2>Securing the Load</h2>

<h3>Tie-Down Points</h3>
<p>Use at least 4 tie-downs rated for the machine's weight. Attach to:</p>
<ul>
<li>Manufacturer-provided tie-down points</li>
<li>Track frame (not rollers or moving parts)</li>
<li>Bucket (if attached)</li>
</ul>

<h3>Chains vs Straps</h3>
<ul>
<li><strong>Chains</strong>: Required by DOT for equipment over 10,000 lbs</li>
<li><strong>Straps</strong>: Acceptable for lighter machines (1-2 ton)</li>
</ul>

<h2>Legal Requirements</h2>
<ul>
<li>Check state requirements for trailer brakes (usually required over 3,000 lbs)</li>
<li>Width limit is typically 8'6" without permits</li>
<li>Height limit is typically 13'6"</li>
<li>Check local CDL requirements for combined weight</li>
</ul>`,
    quickAnswer: 'To transport a mini excavator, match trailer capacity to machine weight (7,000 lb trailer for 2-ton), load over axles, use 4+ tie-downs rated for the weight, and verify your tow vehicle has adequate capacity and brake controller.',
    category: 'how-to',
    tags: ['transport', 'trailer', 'loading', 'safety', 'mini excavator'],
    author: {
      name: 'AGT Equipment Team',
      role: 'Technical Support',
    },
    faq: [
      {
        question: 'Can I tow a mini excavator with a half-ton truck?',
        answer: 'A half-ton truck can tow a 1-2 ton mini excavator on a properly rated trailer. Check your specific truck\'s towing capacity (usually 7,000-12,000 lbs for half-tons). Ensure you have a brake controller.',
      },
      {
        question: 'Do I need a CDL to haul a mini excavator?',
        answer: 'For personal use under 26,000 lbs GCWR, no CDL is typically required. Commercial haulers may need a CDL depending on weight and state regulations. Check your state\'s specific requirements.',
      },
    ],
    readingTime: 7,
    publishedAt: '2024-03-25',
    updatedAt: '2024-03-25',
  },
  {
    id: '9',
    slug: 'mini-excavator-operating-tips-beginners',
    title: 'Mini Excavator Operating Tips for Beginners',
    excerpt: 'New to mini excavators? Learn the basics of operation, from controls to digging techniques, with these beginner-friendly tips.',
    content: `<h2>Understanding the Controls</h2>

<p>Most mini excavators use ISO control pattern (most common in North America):</p>

<h3>Right Joystick</h3>
<ul>
<li><strong>Push forward</strong>: Arm (stick) extends out</li>
<li><strong>Pull back</strong>: Arm curls in</li>
<li><strong>Push left</strong>: Swing cab left</li>
<li><strong>Push right</strong>: Swing cab right</li>
</ul>

<h3>Left Joystick</h3>
<ul>
<li><strong>Push forward</strong>: Boom lowers</li>
<li><strong>Pull back</strong>: Boom raises</li>
<li><strong>Push left</strong>: Bucket curls in (scoops)</li>
<li><strong>Push right</strong>: Bucket curls out (dumps)</li>
</ul>

<h3>Tracks</h3>
<ul>
<li><strong>Both levers forward</strong>: Drive straight ahead</li>
<li><strong>Both levers back</strong>: Drive straight back</li>
<li><strong>One forward, one back</strong>: Spin in place</li>
</ul>

<h2>Basic Digging Technique</h2>

<h3>Step 1: Position</h3>
<ul>
<li>Set the tracks perpendicular to the trench direction</li>
<li>Lower the dozer blade for stability</li>
<li>Position the boom over the starting point</li>
</ul>

<h3>Step 2: Dig</h3>
<ul>
<li>Extend the arm and lower the boom</li>
<li>Curl the bucket while pulling the arm in</li>
<li>Keep the bucket teeth angled into the ground</li>
</ul>

<h3>Step 3: Lift and Swing</h3>
<ul>
<li>Raise the boom to lift the bucket out</li>
<li>Swing to your dump location</li>
<li>Extend arm and dump the bucket</li>
</ul>

<h2>Common Beginner Mistakes</h2>

<ul>
<li><strong>Digging too deep in one pass</strong>: Take shallow bites, especially in hard ground</li>
<li><strong>Over-filling the bucket</strong>: Smaller loads are more efficient</li>
<li><strong>Not using the thumb</strong>: Practice grabbing with the thumb</li>
<li><strong>Igoring the dozer blade</strong>: Use it for stability and leveling</li>
<li><strong>Working too fast</strong>: Smooth, controlled movements are more efficient</li>
</ul>`,
    quickAnswer: 'To operate a mini excavator: use right joystick for arm and swing, left joystick for boom and bucket. Dig by extending arm, lowering boom, curling bucket while pulling in. Take shallow bites and use the dozer blade for stability.',
    category: 'how-to',
    tags: ['operation', 'beginners', 'tips', 'controls', 'mini excavator'],
    author: {
      name: 'AGT Equipment Team',
      role: 'Technical Support',
    },
    faq: [
      {
        question: 'Is a mini excavator hard to operate?',
        answer: 'Mini excavators are among the easiest heavy equipment to learn. Most people can become comfortable with basic operation in a few hours. Mastery takes weeks of practice.',
      },
      {
        question: 'What should I practice first?',
        answer: 'Start by practicing smooth boom and arm movements without digging. Then practice digging shallow holes and swinging to dump. Finally, practice tracking (driving) and maneuvering in tight spaces.',
      },
    ],
    readingTime: 6,
    publishedAt: '2024-04-01',
    updatedAt: '2024-04-01',
  },
  {
    id: '10',
    slug: 'winterizing-mini-excavator',
    title: 'How to Winterize Your Mini Excavator',
    excerpt: 'Prepare your mini excavator for cold weather operation or long-term storage with this complete winterization guide.',
    content: `<h2>Cold Weather Operation</h2>

<p>If you plan to use your excavator through winter, prepare it for the cold:</p>

<h3>Engine Prep</h3>
<ul>
<li>Switch to 5W-40 or 0W-40 diesel oil for cold starts</li>
<li>Install a block heater if temperatures drop below 20°F</li>
<li>Check glow plugs and timer function</li>
<li>Consider a fuel additive to prevent gelling</li>
</ul>

<h3>Hydraulic System</h3>
<ul>
<li>Switch to ISO 32 hydraulic fluid for better cold flow</li>
<li>Warm up hydraulics slowly before heavy work</li>
<li>Check hoses for cracks (cold makes rubber brittle)</li>
</ul>

<h3>Tracks</h3>
<ul>
<li>Clean tracks thoroughly before freezing weather</li>
<li>Check tension more frequently (cold changes track dimensions)</li>
<li>Consider track pads for ice and snow traction</li>
</ul>

<h2>Long-Term Winter Storage</h2>

<p>If storing your excavator for winter (common in northern states):</p>

<h3>Fuel System</h3>
<ul>
<li>Fill tank completely (prevents condensation)</li>
<li>Add fuel stabilizer per manufacturer instructions</li>
<li>Run engine for 10 minutes to circulate treated fuel</li>
</ul>

<h3>Engine</h3>
<ul>
<li>Change oil and filter before storage</li>
<li>Remove and charge battery, store indoors</li>
<li>Plug exhaust and intake with steel wool (prevents pests)</li>
</ul>

<h3>Hydraulics</h3>
<ul>
<li>Extend all cylinders fully (protects rod from weather)</li>
<li>Apply grease to exposed cylinder rods</li>
</ul>

<h3>Tracks and Undercarriage</h3>
<ul>
<li>Clean thoroughly to remove mud and debris</li>
<li>Store on blocks or wood (relieves track tension)</li>
</ul>

<h3>General</h3>
<ul>
<li>Cover the machine or store indoors</li>
<li>Start and run monthly if possible</li>
<li>Document storage date and maintenance performed</li>
</ul>`,
    quickAnswer: 'For winter operation: use 5W-40 oil, install block heater, switch to ISO 32 hydraulic fluid. For storage: fill tank with stabilizer, change oil, remove battery, extend cylinders, plug exhaust, store on blocks.',
    category: 'maintenance',
    tags: ['winter', 'storage', 'cold weather', 'maintenance', 'mini excavator'],
    author: {
      name: 'AGT Equipment Team',
      role: 'Technical Support',
    },
    faq: [
      {
        question: 'At what temperature do I need a block heater?',
        answer: 'Block heaters are recommended when temperatures regularly drop below 20°F (-7°C). They make starting easier and reduce wear on cold starts.',
      },
      {
        question: 'How often should I start a stored excavator?',
        answer: 'Start and run the excavator monthly during storage. Run for 15-20 minutes to circulate fluids and charge the battery. If you can\'t start it, at least turn the engine over by hand.',
      },
    ],
    readingTime: 5,
    publishedAt: '2024-10-15',
    updatedAt: '2024-10-15',
  },
];
