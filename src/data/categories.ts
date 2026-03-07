import { Category } from '@/types';

export const categories: Category[] = [
  // ==================== TIER 1 - Main Categories ====================
  {
    id: '1',
    slug: 'mini-excavators',
    name: 'Mini Excavators',
    tier: 'tier1',
    description: 'Compact 1-4 ton excavators with Kubota and Rato diesel engines. Perfect for landscaping, utility work, and small construction projects.',
    longDescription: `Mini excavators are compact, versatile machines designed for digging, trenching, and material handling in spaces where larger equipment can't reach. At AGT Equipment, we offer a range of mini excavators from 1 to 4 tons, powered by reliable Kubota and Rato diesel engines.

These machines excel at landscaping, utility trenching, foundation work, and property maintenance. With dig depths from 5 to 12 feet and widths as narrow as 36 inches, our mini excavators can access backyards, crawl through gates, and work indoors.

All AGT mini excavators include a 1-year warranty, free shipping within the continental US, and come with hydraulic thumb attachments standard on most models.`,
    image: 'https://cdn.shopify.com/s/files/1/0690/6757/1452/files/category-excavators.jpg',
    answerBlock: {
      question: 'What is a mini excavator best for?',
      answer: 'A mini excavator is best for digging trenches, foundations, and holes in tight spaces where larger equipment cannot access. They are ideal for landscaping, utility work, property maintenance, and small construction projects.',
      keyFacts: [
        'Dig depth: 5-12 feet depending on model',
        'Width: 36-70 inches (fits through standard gates)',
        'Weight: 2,400-8,800 lbs (towable with standard trailer)',
        'Engine options: Kubota or Rato diesel',
        'All models include hydraulic thumb',
      ],
    },
    faq: [
      {
        question: 'What size mini excavator do I need?',
        answer: 'For backyard and residential work, a 1-2 ton excavator is usually sufficient. For construction, agricultural work, or deeper digging, consider a 3-4 ton model. The main factors are dig depth needed, access width, and the type of material you\'ll be excavating.',
      },
      {
        question: 'Do mini excavators come with a warranty?',
        answer: 'Yes, all AGT mini excavators come with a 1-year warranty covering manufacturing defects and component failures under normal use.',
      },
      {
        question: 'How are mini excavators delivered?',
        answer: 'We offer free shipping within the continental US. Equipment ships from our warehouses in California or Illinois and typically arrives within 3-7 business days. You\'ll need a trailer or forklift for unloading.',
      },
      {
        question: 'What\'s the difference between Kubota and Rato engines?',
        answer: 'Kubota is a Japanese brand known for reliability and resale value. Rato is a Chinese engine that offers excellent value for occasional use. Both are diesel engines suitable for heavy-duty work.',
      },
      {
        question: 'Do I need a hydraulic thumb?',
        answer: 'A hydraulic thumb is essential for moving logs, rocks, and debris. Most AGT excavators include a thumb as standard equipment, adding significant versatility to your machine.',
      },
      {
        question: 'Can I tow a mini excavator with my truck?',
        answer: '1-2 ton excavators (2,400-3,000 lbs) can be towed with a half-ton truck and a 7,000 lb trailer. 3-4 ton models require a 3/4 ton truck and 10,000+ lb trailer capacity.',
      },
    ],
    comparisonTable: [
      { feature: 'Dig Depth', values: { '1-Ton': '5-6 ft', '1-2 Ton': '6-8 ft', '3-4 Ton': '10-12 ft' } },
      { feature: 'Operating Weight', values: { '1-Ton': '2,400-2,800 lbs', '1-2 Ton': '3,000-4,500 lbs', '3-4 Ton': '7,000-9,000 lbs' } },
      { feature: 'Engine Power', values: { '1-Ton': '13-25 HP', '1-2 Ton': '20-35 HP', '3-4 Ton': '40-55 HP' } },
      { feature: 'Gate Access', values: { '1-Ton': 'Yes (36-42")', '1-2 Ton': 'Yes (42-48")', '3-4 Ton': 'Limited (60"+)' } },
      { feature: 'Towable', values: { '1-Ton': 'Light truck/trailer', '1-2 Ton': 'Half-ton truck', '3-4 Ton': 'Heavy-duty trailer' } },
      { feature: 'Price Range', values: { '1-Ton': '$11,000-$15,000', '1-2 Ton': '$15,000-$22,000', '3-4 Ton': '$25,000-$35,000' } },
    ],
    productCount: 45,
  },
  {
    id: '2',
    slug: 'mini-skid-steers',
    name: 'Mini Skid Steers',
    tier: 'tier1',
    description: 'Stand-on and track loaders for landscaping, construction, and property maintenance. Multiple attachment options available.',
    longDescription: `Mini skid steers are compact, highly maneuverable loaders that excel at material handling, grading, and attachment-based tasks. Unlike mini excavators, skid steers are designed for loading, pushing, and carrying rather than digging.

AGT Equipment offers stand-on mini skid steers that fit through standard 36-inch gates, making them perfect for residential landscaping and property maintenance. With 50+ attachment options, one machine can handle digging, trenching, sweeping, snow removal, and more.

All models feature universal quick-attach plates, allowing you to use attachments from major brands like Bobcat, Kubota, and Toro.`,
    image: 'https://cdn.shopify.com/s/files/1/0690/6757/1452/files/category-skidsteer.jpg',
    answerBlock: {
      question: 'What is a mini skid steer best for?',
      answer: 'A mini skid steer is best for loading, grading, and material handling in tight spaces. With attachments, it can also trench, auger holes, sweep, and remove snow. It excels at tasks requiring forward-facing visibility and frequent attachment changes.',
      keyFacts: [
        'Operating capacity: 500-1,500 lbs',
        'Width: 36 inches (fits through gates)',
        'Attachment options: 50+ available',
        'Stand-on or sit-in models available',
        'Ideal for landscaping and property maintenance',
      ],
    },
    faq: [
      {
        question: 'Mini skid steer vs mini excavator - which do I need?',
        answer: 'Choose a mini excavator if your primary task is digging (trenches, foundations, holes). Choose a mini skid steer if you need to load, carry, grade, or use multiple attachments frequently. Many contractors own both.',
      },
      {
        question: 'What attachments are available?',
        answer: 'Popular attachments include buckets, augers, trenchers, pallet forks, brush cutters, stump grinders, snow blowers, and sweepers. All use universal quick-attach mounting.',
      },
      {
        question: 'How narrow are mini skid steers?',
        answer: 'Our stand-on models are 36 inches wide, allowing them to fit through standard residential gates. Track models are slightly wider at 42-48 inches.',
      },
    ],
    productCount: 18,
  },
  {
    id: '3',
    slug: 'attachments',
    name: 'Attachments',
    tier: 'tier1',
    description: 'Buckets, augers, brush cutters, hammers, thumbs, and more. Universal quick-attach compatible with most brands.',
    longDescription: `Expand the capabilities of your mini excavator or skid steer with our extensive attachment selection. From digging buckets to hydraulic thumbs, augers to brush cutters, we have attachments for every task.

All attachments feature universal mounting plates compatible with AGT equipment and major brands including Bobcat, Kubota, John Deere, and more. Most hydraulic attachments include hoses and couplers for plug-and-play installation.`,
    image: 'https://cdn.shopify.com/s/files/1/0690/6757/1452/files/category-attachments.jpg',
    answerBlock: {
      question: 'What attachments do I need for my mini excavator?',
      answer: 'Essential attachments include a digging bucket (included), hydraulic thumb (included with AGT models), and auger for post holes. Popular additions include brush cutters for land clearing and pallet forks for material handling.',
      keyFacts: [
        'Universal quick-attach mounting',
        'Hydraulic attachments include hoses',
        'Compatibility with major brands',
        'Price range: $200-$5,000+',
      ],
    },
    faq: [
      {
        question: 'Are attachments universal?',
        answer: 'Most attachments use universal quick-attach plates that fit multiple brands. However, always check compatibility with your specific machine model and hydraulic flow requirements.',
      },
      {
        question: 'Do hydraulic attachments come with hoses?',
        answer: 'Yes, all hydraulic attachments include hoses and standard couplers. Most are plug-and-play with AGT equipment.',
      },
    ],
    productCount: 120,
  },
  {
    id: '4',
    slug: 'parts',
    name: 'Parts & Accessories',
    tier: 'tier1',
    description: 'Genuine replacement parts, filters, tracks, and accessories for AGT and compatible equipment.',
    longDescription: `Keep your equipment running with genuine replacement parts and accessories. We stock filters, hydraulic components, engine parts, tracks, and wear items for AGT equipment and compatible brands.

All parts include detailed compatibility information to ensure you get the right fit. Need help identifying a part? Contact our support team with your model and serial number.`,
    image: 'https://cdn.shopify.com/s/files/1/0690/6757/1452/files/category-parts.jpg',
    answerBlock: {
      question: 'Where can I get parts for my AGT equipment?',
      answer: 'AGT stocks genuine replacement parts including filters, hydraulic components, engine parts, and tracks. Use your model number to find compatible parts, or contact support for assistance.',
      keyFacts: [
        'Genuine AGT parts in stock',
        'Filters, hydraulics, engine parts',
        'Rubber tracks available',
        'Fast shipping from US warehouses',
      ],
    },
    productCount: 85,
  },

  // ==================== TIER 2 - Subcategories ====================
  // Mini Excavators subcategories
  {
    id: '5',
    slug: '1-ton',
    name: '1-Ton Mini Excavators',
    tier: 'tier2',
    parentSlug: 'mini-excavators',
    description: 'Compact 1-ton class mini excavators with dig depths of 5-6 feet. Perfect for backyard access, landscaping, and utility work.',
    longDescription: `1-ton mini excavators are the smallest and most accessible machines in our lineup. With operating weights around 2,400-2,800 lbs and widths of 36-42 inches, these machines can access virtually any residential backyard through standard gates.

Ideal for landscaping, fence installation, utility trenching, and small excavation projects. Despite their compact size, 1-ton excavators offer impressive digging power with dig depths of 5-6 feet.

These machines are easily towable with a light truck and standard trailer, making them perfect for contractors who need to move between job sites frequently.`,
    answerBlock: {
      question: 'What is a 1-ton mini excavator best for?',
      answer: 'A 1-ton mini excavator is best for backyard work, fence installation, utility trenching, and small landscaping projects. It fits through standard 36" gates and can be towed with a light truck.',
      keyFacts: [
        'Fits through 36" gates',
        'Dig depth: 5-6 feet',
        'Weight: 2,400-2,800 lbs',
        'Towable with light truck',
        'Price: $5,000-$15,000',
      ],
    },
    faq: [
      {
        question: 'Can a 1-ton excavator fit through a gate?',
        answer: 'Yes, 1-ton excavators are typically 36-42 inches wide and can fit through standard residential gates. The H15R even features adjustable track width for extra-tight spaces.',
      },
      {
        question: 'What can I dig with a 1-ton excavator?',
        answer: '1-ton excavators can dig trenches 5-6 feet deep, perfect for utility lines, irrigation, fence posts, and small foundations. They handle soil, clay, and light rocky conditions.',
      },
    ],
    productCount: 34,
  },
  {
    id: '6',
    slug: '1-2-ton',
    name: '1-2 Ton Mini Excavators',
    tier: 'tier2',
    parentSlug: 'mini-excavators',
    description: 'Mid-size mini excavators with dig depths of 6-8 feet. Balance of power and accessibility for serious landscaping and utility work.',
    longDescription: `1-2 ton mini excavators offer increased digging depth and power while maintaining good accessibility. With operating weights of 3,000-4,500 lbs and dig depths of 6-8 feet, these machines handle more demanding projects.

Popular with landscapers and utility contractors who need to dig deeper trenches but still require gate access. Most models in this class feature Kubota diesel engines for proven reliability.

These excavators can be towed with a half-ton truck and 7,000 lb trailer, making them practical for mobile contractors.`,
    answerBlock: {
      question: 'What can a 1-2 ton mini excavator do?',
      answer: 'A 1-2 ton mini excavator can dig 6-8 feet deep, handle larger trenches, excavate for small foundations, and perform serious landscaping work. Many still fit through gates while offering more power.',
      keyFacts: [
        'Dig depth: 6-8 feet',
        'Weight: 3,000-4,500 lbs',
        'May fit through 42" gates',
        'Kubota diesel options available',
      ],
    },
    faq: [
      {
        question: 'Can a 1-2 ton excavator fit through a gate?',
        answer: 'Most 1-2 ton excavators are 42-48 inches wide. They can fit through wider gates but may not access all backyards. Measure your access points before purchasing.',
      },
    ],
    productCount: 11,
  },
  {
    id: '6b',
    slug: 'kubota-engine',
    name: 'Kubota Engine Mini Excavators',
    tier: 'tier2',
    parentSlug: 'mini-excavators',
    description: 'Mini excavators powered by reliable Kubota diesel engines. Proven Japanese engineering for professional and heavy-duty applications.',
    longDescription: `Kubota diesel engines are the gold standard in compact equipment. Known for reliability, fuel efficiency, and strong resale value, Kubota-powered mini excavators are the preferred choice for professional contractors and serious property owners.

All Kubota engines in AGT excavators are genuine OEM units with full manufacturer support. These liquid-cooled diesel engines deliver consistent power, easy cold starts, and long service intervals.

Popular models with Kubota engines include the CFG-40UF (4-ton, D1703 engine) and various mid-size excavators in the 2-4 ton range.`,
    answerBlock: {
      question: 'Why choose a Kubota engine mini excavator?',
      answer: 'Kubota diesel engines offer proven reliability, excellent fuel economy, and strong resale value. They are the preferred choice for professional contractors who need dependable performance and easy serviceability.',
      keyFacts: [
        'Japanese engineering reliability',
        'Excellent fuel efficiency',
        'Strong resale value',
        'Easy parts availability',
        'Professional-grade power',
      ],
    },
    faq: [
      {
        question: 'Are Kubota engines reliable?',
        answer: 'Kubota diesel engines are among the most reliable in the industry. With proper maintenance, they regularly exceed 5,000-10,000 operating hours. Parts are widely available through Kubota dealers and aftermarket suppliers.',
      },
      {
        question: 'Where can I get parts for Kubota engine?',
        answer: 'Kubota engine parts are available through AGT Equipment, Kubota dealers, and aftermarket suppliers. Common maintenance items (filters, belts, hoses) are stocked for quick shipping.',
      },
    ],
    productCount: 15,
  },
  {
    id: '6c',
    slug: 'rato-engine',
    name: 'RATO Engine Mini Excavators',
    tier: 'tier2',
    parentSlug: 'mini-excavators',
    description: 'Mini excavators with RATO gasoline and diesel engines. Excellent value for residential and light commercial use.',
    longDescription: `RATO engines provide an excellent value proposition for mini excavator buyers. These Chinese-manufactured engines offer reliable performance at a lower price point than Japanese alternatives, making them ideal for residential use and light commercial applications.

RATO gasoline engines (like the 420D in the H15R) are popular for smaller excavators where the lower cost and simpler maintenance of gasoline power make sense. RATO diesel engines are available for larger models.

While RATO engines may not have the same resale value as Kubota, they deliver excellent ROI for occasional use and are supported by AGT's parts inventory in the US.`,
    answerBlock: {
      question: 'Are RATO engines good for mini excavators?',
      answer: 'RATO engines offer excellent value for residential and light commercial use. They are reliable, easy to maintain, and cost significantly less than Japanese alternatives. Ideal for property owners who use equipment occasionally.',
      keyFacts: [
        'Lower cost than Kubota',
        'Reliable for occasional use',
        'Easy maintenance',
        'Gasoline and diesel options',
        'US parts support from AGT',
      ],
    },
    faq: [
      {
        question: 'RATO vs Kubota engine - which should I choose?',
        answer: 'Choose Kubota for professional use, high hours, and resale value. Choose RATO for occasional residential use, lower initial cost, and easier maintenance. Both are reliable with proper care.',
      },
      {
        question: 'Where can I get RATO engine parts?',
        answer: 'AGT Equipment stocks RATO engine parts including filters, carburetors, starters, and ignition components. Parts ship from US warehouses for quick delivery.',
      },
    ],
    productCount: 35,
  },
  {
    id: '7',
    slug: '2-3-ton',
    name: '2-3 Ton Mini Excavators',
    tier: 'tier2',
    parentSlug: 'mini-excavators',
    description: 'Professional mini excavators with dig depths of 8-10 feet. Ideal for contractors and serious landscaping work.',
    longDescription: `2-3 ton mini excavators bridge the gap between compact residential machines and professional construction equipment. With dig depths of 8-10 feet and operating weights of 5,000-7,000 lbs, these machines handle serious excavation work.

Popular with landscaping contractors, utility companies, and property developers. Features like hydraulic thumbs, pilot controls, and dozer blades come standard on most models.`,
    answerBlock: {
      question: 'What can a 2-3 ton mini excavator do?',
      answer: 'A 2-3 ton mini excavator can dig 8-10 feet deep, handle larger trenching projects, excavate for small foundations, and move more material than smaller machines. They are ideal for professional landscapers and contractors.',
      keyFacts: [
        'Dig depth: 8-10 feet',
        'Operating weight: 5,000-7,000 lbs',
        'Popular with contractors',
        'May not fit through standard gates',
      ],
    },
    faq: [
      {
        question: 'Will a 2-3 ton excavator fit through my gate?',
        answer: 'Most 2-3 ton excavators are 48-60 inches wide. They may not fit through standard 36-42" residential gates. Measure your access points before purchasing or renting.',
      },
    ],
    productCount: 5,
  },
  {
    id: '8',
    slug: '3-4-ton',
    name: '3-4 Ton Mini Excavators',
    tier: 'tier2',
    parentSlug: 'mini-excavators',
    description: 'Professional-grade mini excavators with dig depths up to 12 feet. Climate-controlled cabs and powerful hydraulics for construction and agricultural work.',
    longDescription: `3-4 ton mini excavators are professional-grade machines designed for construction, agricultural, and heavy-duty applications. With dig depths up to 12 feet and operating weights of 7,000-9,000 lbs, these machines handle serious excavation work.

Features like climate-controlled cabs, dual hydraulic pumps, and dozer blades come standard. The CFG-40UF flagship model includes a 54 HP Kubota turbo diesel engine.

These machines require heavy-duty trailers for transport but deliver productivity that rivals larger equipment in a more compact package.`,
    answerBlock: {
      question: 'What is a 3-4 ton mini excavator used for?',
      answer: 'A 3-4 ton mini excavator is used for construction, agricultural excavation, septic installation, pool excavation, and heavy-duty trenching. They offer dig depths up to 12 feet and often include climate-controlled cabs.',
      keyFacts: [
        'Dig depth: 10-12 feet',
        'Operating weight: 7,000-9,000 lbs',
        'Climate-controlled cabs available',
        'Requires heavy-duty trailer for transport',
      ],
    },
    faq: [
      {
        question: 'What truck do I need to tow a 4-ton excavator?',
        answer: 'You\'ll need at least a 3/4 ton truck (F-250, Silverado 2500, etc.) and a 10,000+ lb equipment trailer. Total towing weight including machine and trailer will be 10,000-14,000 lbs.',
      },
    ],
    productCount: 2,
  },

  // Mini Skid Steers subcategories
  {
    id: '10',
    slug: 'stand-on',
    name: 'Stand-On Mini Skid Steers',
    tier: 'tier2',
    parentSlug: 'mini-skid-steers',
    description: 'Compact stand-on loaders with 36-inch width for gate access. Perfect for residential landscaping and property maintenance.',
    longDescription: `Stand-on mini skid steers offer excellent visibility and maneuverability in tight spaces. With widths as narrow as 36 inches, these machines access backyards and indoor spaces that larger equipment can't reach.

The operator platform provides clear sightlines for precision work, while the compact footprint minimizes turf damage. Popular with landscapers, fence contractors, and property maintenance professionals.`,
    answerBlock: {
      question: 'What is a stand-on mini skid steer best for?',
      answer: 'A stand-on mini skid steer is best for residential landscaping, fence installation, and property maintenance where 36" gate access is required. The operator has excellent visibility for precision work.',
      keyFacts: [
        'Width: 36 inches (fits gates)',
        'Operating capacity: 500-900 lbs',
        'Excellent visibility',
        '50+ attachment options',
      ],
    },
    faq: [
      {
        question: 'Can a stand-on skid steer fit through a gate?',
        answer: 'Yes, stand-on mini skid steers are typically 36 inches wide and designed specifically to fit through standard residential gates.',
      },
      {
        question: 'What attachments work with stand-on skid steers?',
        answer: 'Popular attachments include augers, trenchers, pallet forks, brush cutters, and sweepers. Most use universal quick-attach mounting.',
      },
    ],
    productCount: 16,
  },
  {
    id: '11',
    slug: 'track',
    name: 'Track Loaders',
    tier: 'tier2',
    parentSlug: 'mini-skid-steers',
    description: 'Tracked mini skid steers for improved traction and flotation. Better on soft ground, slopes, and rough terrain.',
    longDescription: `Track loaders offer superior traction and lower ground pressure compared to wheeled models. Ideal for soft ground conditions, slopes, and rough terrain where wheels might sink or slip.

The track system distributes weight over a larger area, reducing turf damage and improving stability. These machines excel at grading, leveling, and material handling on varied terrain.`,
    answerBlock: {
      question: 'When should I choose a track loader over wheels?',
      answer: 'Choose a track loader for soft ground, muddy conditions, slopes, or when you need to minimize ground disturbance. Tracks provide better traction and flotation but may be wider than wheeled models.',
      keyFacts: [
        'Lower ground pressure',
        'Better traction on soft ground',
        'Width: 42-48 inches',
        'Ideal for slopes and rough terrain',
      ],
    },
    faq: [
      {
        question: 'Do tracks damage grass less than wheels?',
        answer: 'Yes, tracks distribute weight over a larger area, reducing ground pressure and turf damage. However, they can still tear grass when turning sharply.',
      },
    ],
    productCount: 4,
  },

  // Attachments subcategories
  {
    id: '20',
    slug: 'mini-excavator',
    name: 'Mini Excavator Attachments',
    tier: 'tier2',
    parentSlug: 'attachments',
    description: 'Buckets, thumbs, augers, and hydraulic attachments for mini excavators. Universal mounting for 1-4 ton machines.',
    longDescription: `Expand your mini excavator's capabilities with purpose-built attachments. From digging buckets in various widths to hydraulic thumbs, augers, and brush cutters.

All attachments feature universal pin-on or quick-attach mounting compatible with AGT excavators and major brands. Hydraulic attachments include hoses and couplers sized for standard mini excavator flow rates.`,
    answerBlock: {
      question: 'What attachments do I need for my mini excavator?',
      answer: 'Essential attachments include a digging bucket (included), hydraulic thumb (included with AGT models), and auger for post holes. Popular additions include brush cutters for land clearing and pallet forks for material handling.',
      keyFacts: [
        'Universal mounting available',
        'Hydraulic attachments include hoses',
        'Compatible with major brands',
        'Price range: $200-$5,000+',
      ],
    },
    productCount: 60,
  },
  {
    id: '21',
    slug: 'skid-steer',
    name: 'Skid Steer Attachments',
    tier: 'tier2',
    parentSlug: 'attachments',
    description: 'Universal quick-attach implements for mini skid steers. Buckets, forks, trenchers, augers, and more.',
    longDescription: `Transform your mini skid steer into a multi-purpose machine with our attachment selection. Universal quick-attach plates fit AGT loaders and major brands including Bobcat, Toro, and Kubota.

Popular options include augers for fence posts, trenchers for irrigation, pallet forks for material handling, and brush cutters for land clearing.`,
    answerBlock: {
      question: 'What attachments fit a mini skid steer?',
      answer: 'Mini skid steer attachments include augers, trenchers, pallet forks, brush cutters, sweepers, and grapple buckets. Most use universal quick-attach mounting compatible with multiple brands.',
      keyFacts: [
        'Universal quick-attach plates',
        '50+ attachment types available',
        'Compatible with Bobcat, Toro, Kubota',
        'Hydraulic and manual options',
      ],
    },
    productCount: 45,
  },

  // Parts subcategories
  {
    id: '22',
    slug: 'filters',
    name: 'Filters',
    tier: 'tier2',
    parentSlug: 'parts',
    description: 'Oil filters, fuel filters, air filters, and hydraulic filters. Keep your equipment running with genuine replacement parts.',
    longDescription: `Regular filter changes are essential for equipment longevity. We stock genuine filters for AGT equipment and compatible brands including Kubota, Rato, and Perkins engines.

Use your part number or model information to find the correct filter. Our filters meet or exceed OEM specifications for fit and filtration efficiency.`,
    answerBlock: {
      question: 'How often should I change filters on my mini excavator?',
      answer: 'Change oil filters every 250 hours, fuel filters every 500 hours, air filters every 250-500 hours depending on conditions, and hydraulic filters every 500 hours. Always replace filters with oil changes.',
      keyFacts: [
        'Oil filter: 250 hours',
        'Fuel filter: 500 hours',
        'Air filter: 250-500 hours',
        'Hydraulic filter: 500 hours',
      ],
    },
    faq: [
      {
        question: 'Are AGT filters compatible with Kubota engines?',
        answer: 'Yes, we stock filters compatible with Kubota, Rato, and Perkins engines. Check your engine model and filter part number for correct fitment.',
      },
    ],
    productCount: 15,
  },
  {
    id: '23',
    slug: 'hydraulic-parts',
    name: 'Hydraulic Parts',
    tier: 'tier2',
    parentSlug: 'parts',
    description: 'Hydraulic cylinders, hoses, couplers, and valves. Replacement components for mini excavator and skid steer hydraulic systems.',
    longDescription: `Keep your hydraulic system running strong with quality replacement parts. We stock cylinders, hoses, couplers, and valves for AGT equipment.

All hydraulic components are tested for compatibility and performance. Need help identifying a part? Contact support with your model and serial number.`,
    answerBlock: {
      question: 'What hydraulic parts do mini excavators need?',
      answer: 'Common hydraulic replacement parts include boom/stick/bucket cylinders, hydraulic hoses, control valves, and hydraulic pumps. Regular inspection helps identify wear before failure.',
      keyFacts: [
        'Cylinders: boom, stick, bucket',
        'Hoses: various lengths and fittings',
        'Valves: control and relief',
        'Pumps: gear and piston types',
      ],
    },
    productCount: 15,
  },
  {
    id: '24',
    slug: 'engine-parts',
    name: 'Engine Parts',
    tier: 'tier2',
    parentSlug: 'parts',
    description: 'Engine components, gaskets, belts, and cooling parts for Kubota, Rato, and Kohler engines.',
    longDescription: `Maintain your engine with quality replacement parts. We stock components for Kubota, Rato, and Kohler diesel and gas engines used in AGT equipment.

From filters and belts to gaskets and cooling components, we have the parts to keep your engine running reliably.`,
    answerBlock: {
      question: 'What engine parts are commonly replaced?',
      answer: 'Commonly replaced engine parts include filters, belts, hoses, gaskets, thermostats, glow plugs, and starters. Regular maintenance prevents most engine failures.',
      keyFacts: [
        'Filters: oil, fuel, air',
        'Electrical: starters, glow plugs',
        'Cooling: radiators, fans, thermostats',
        'Gaskets and seals',
      ],
    },
    productCount: 27,
  },
  {
    id: '25',
    slug: 'tracks-undercarriage',
    name: 'Tracks & Undercarriage',
    tier: 'tier2',
    parentSlug: 'parts',
    description: 'Rubber tracks, track rollers, idlers, and sprockets for mini excavators and skid steers.',
    longDescription: `Keep your machine moving with quality tracks and undercarriage components. We stock rubber tracks for AGT excavators and skid steers, plus rollers, idlers, and sprockets.

Proper track maintenance extends undercarriage life. Inspect tracks regularly for cuts, cracks, and tread wear. Replace tracks when tread is worn 50% or when damage exposes steel cords.`,
    answerBlock: {
      question: 'How long do rubber tracks last on a mini excavator?',
      answer: 'Rubber tracks typically last 1,000-2,000 operating hours depending on terrain and usage. Inspect regularly for cracks, cuts, and tread wear. Replace when tread is worn 50% or steel cords are exposed.',
      keyFacts: [
        'Lifespan: 1,000-2,000 hours',
        'Inspect weekly for damage',
        'Check tension monthly',
        'Replace when cords show',
      ],
    },
    productCount: 8,
  },
  {
    id: '26',
    slug: 'electrical',
    name: 'Electrical Parts',
    tier: 'tier2',
    parentSlug: 'parts',
    description: 'Starters, alternators, ignition switches, wiring harnesses, and electrical components for AGT equipment.',
    longDescription: `Electrical system components including starters, alternators, ignition switches, wiring harnesses, sensors, and switches. We stock parts for AGT equipment with Kubota, Rato, and other engines.

All electrical parts are tested for compatibility. If you're experiencing starting or charging issues, contact support for diagnostic assistance.`,
    answerBlock: {
      question: 'What electrical parts commonly fail on mini excavators?',
      answer: 'Common electrical failures include starters, alternators, batteries, ignition switches, and safety interlock switches. Regular battery maintenance and clean connections prevent many issues.',
      keyFacts: [
        'Starters: Rato, Kubota compatible',
        'Ignition switches and keys',
        'Wiring harnesses',
        'Sensors and switches',
      ],
    },
    productCount: 12,
  },
  {
    id: '28',
    slug: 'by-model',
    name: 'Parts by Model',
    tier: 'tier2',
    parentSlug: 'parts',
    description: 'Find parts by your AGT mini excavator or skid steer model. H12, H15, QH12, DM12, KRT23, and more.',
    longDescription: `Find the right parts for your specific AGT equipment model. We organize parts by model to make it easy to find what you need without searching through thousands of part numbers.

Select your model below to see all compatible parts including filters, hydraulic components, engine parts, and undercarriage items. If you don't see your model listed, contact support with your serial number for assistance.`,
    answerBlock: {
      question: 'How do I find parts for my AGT mini excavator?',
      answer: 'Select your model below to see all compatible parts. You can also search by part number or contact support with your model and serial number for assistance finding the right parts.',
      keyFacts: [
        'Parts for H12, H15, QH12, DM12',
        'Parts for KRT23, KTT23 skid steers',
        'Search by model or part number',
        'Contact support for help',
      ],
    },
    faq: [
      {
        question: 'What if my model is not listed?',
        answer: 'Contact our support team with your model name and serial number. We can identify and source parts for all AGT equipment models, including discontinued ones.',
      },
    ],
    productCount: 50,
  },
  {
    id: '27',
    slug: 'hardware',
    name: 'Hardware & Fasteners',
    tier: 'tier2',
    parentSlug: 'parts',
    description: 'Bolts, nuts, pins, bushings, and hardware for mini excavator and skid steer maintenance.',
    longDescription: `Replacement hardware including pins, bushings, bolts, nuts, and specialty fasteners. Quality hardware is essential for safe equipment operation.

When replacing pins and bushings, always inspect related components for wear. Hardware kits are available for common maintenance procedures.`,
    answerBlock: {
      question: 'What hardware does my mini excavator need?',
      answer: 'Common replacement hardware includes bucket pins and bushings, track adjuster hardware, hydraulic hose fittings, and mounting bolts. Keep spare hardware on hand for field repairs.',
      keyFacts: [
        'Pins and bushings',
        'Track hardware',
        'Hydraulic fittings',
        'Mounting bolts and nuts',
      ],
    },
    productCount: 3,
  },

  // Attachments detailed subcategories
  {
    id: '30',
    slug: 'buckets',
    name: 'Buckets',
    tier: 'tier2',
    parentSlug: 'attachments',
    description: 'Digging buckets, cleanup buckets, tilt buckets for mini excavators. Various widths from 8" to 24".',
    longDescription: `Buckets are the most essential attachment for any excavator. We offer digging buckets with teeth for aggressive excavation, smooth-edge cleanup buckets for grading, and tilt buckets for slope work.

Choose bucket width based on your application: narrow buckets (8-12") for trenching, medium buckets (12-18") for general excavation, wide buckets (20"+) for grading and material handling.`,
    answerBlock: {
      question: 'What size bucket do I need for my mini excavator?',
      answer: 'For trenching, choose a bucket slightly wider than your trench width (8-12"). For general excavation, a 12-18" bucket is versatile. For grading and cleanup, use a 20"+ smooth-edge bucket.',
      keyFacts: [
        'Trenching: 8-12" buckets',
        'General digging: 12-18" buckets',
        'Grading: 20"+ smooth edge',
        'All include teeth where specified',
      ],
    },
    faq: [
      {
        question: 'What size bucket do I need?',
        answer: 'For trenching, choose a bucket 6-12 inches wider than your trench width. For general excavation, a 24-inch bucket is versatile. For grading and cleanup, use a 36-inch smooth-edge bucket.',
      },
    ],
    productCount: 25,
  },
  {
    id: '31',
    slug: 'augers',
    name: 'Augers',
    tier: 'tier2',
    parentSlug: 'attachments',
    description: 'Hydraulic augers for fence posts, tree planting, and footing holes. Diameters from 6" to 24".',
    longDescription: `Hydraulic augers transform your excavator into a powerful post hole digger. Choose from 6" to 24" diameter auger bits depending on your application.

Augers require auxiliary hydraulics. All AGT excavators include standard-flow auxiliary hydraulics compatible with our auger attachments.`,
    answerBlock: {
      question: 'What diameter auger do I need?',
      answer: 'For fence posts, 9-12" augers work well. For 4x4 posts, use 12". For 6x6 posts or small trees, use 18". For deck footings, 12-18" is typical depending on load requirements.',
      keyFacts: [
        'Fence posts: 9-12" diameter',
        '4x4 posts: 12" diameter',
        'Small trees: 18" diameter',
        'Deck footings: 12-18" diameter',
      ],
    },
    faq: [
      {
        question: 'What diameter auger do I need?',
        answer: 'For fence posts, 9-12" augers work well. For 4x4 posts, use 12". For 6x6 posts or small trees, use 18". For deck footings, 12-18" is typical depending on load.',
      },
    ],
    productCount: 4,
  },
  {
    id: '32',
    slug: 'thumbs',
    name: 'Thumbs',
    tier: 'tier2',
    parentSlug: 'attachments',
    description: 'Hydraulic thumbs for handling logs, rocks, and debris. Progressive linkage for full clamping force.',
    longDescription: `A hydraulic thumb adds 30% more capability to your excavator by allowing you to grab and move materials. Progressive linkage design maintains clamping force throughout the curl range.

Thumbs are essential for land clearing, demolition, and material handling. All AGT excavators include thumbs as standard equipment on most models.`,
    answerBlock: {
      question: 'Do I need a hydraulic thumb on my excavator?',
      answer: 'A hydraulic thumb is essential for moving logs, rocks, and debris. It transforms your excavator into a material handler, adding 30% more capability. Most AGT excavators include thumbs standard.',
      keyFacts: [
        'Essential for land clearing',
        'Handles logs, rocks, debris',
        'Progressive linkage design',
        'Often included with AGT excavators',
      ],
    },
    productCount: 2,
  },
  {
    id: '33',
    slug: 'forks',
    name: 'Forks',
    tier: 'tier2',
    parentSlug: 'attachments',
    description: 'Pallet forks for mini excavators and skid steers. Lift and transport pallets, materials, and equipment.',
    longDescription: `Pallet forks turn your excavator or skid steer into a material handler. Adjustable fork spacing accommodates different pallet sizes.

Use pallet forks for loading trucks, moving materials, and transporting equipment around job sites. Capacity ranges from 2,000-4,000 lbs depending on machine size.`,
    answerBlock: {
      question: 'Can I use pallet forks on a mini excavator?',
      answer: 'Yes, pallet forks attach to mini excavators for material handling. They are useful for moving pallets, loading trucks, and handling equipment. Capacity depends on machine size.',
      keyFacts: [
        'Capacity: 2,000-4,000 lbs',
        'Adjustable fork spacing',
        'Material handling tasks',
        'Quick-attach mounting',
      ],
    },
    productCount: 2,
  },
  {
    id: '34',
    slug: 'brush-cutters',
    name: 'Brush Cutters',
    tier: 'tier2',
    parentSlug: 'attachments',
    description: 'Hydraulic brush cutters and flail mowers for land clearing, vegetation management, and right-of-way maintenance.',
    longDescription: `Brush cutters and flail mowers transform your excavator or skid steer into a powerful land clearing machine. Ideal for vegetation management, fence line clearing, and right-of-way maintenance.

Hydraulic brush cutters feature heavy-duty blades that handle saplings, brush, and tall grass. Flail mowers provide a finer cut for finished areas.`,
    answerBlock: {
      question: 'What size brush can a brush cutter handle?',
      answer: 'Mini excavator brush cutters typically handle brush and saplings up to 3-4 inches in diameter. Larger skid steer models can cut up to 6-inch material. Always check manufacturer specifications.',
      keyFacts: [
        'Cut capacity: 3-6" diameter',
        'Ideal for land clearing',
        'Hydraulic powered',
        'Multiple blade configurations',
      ],
    },
    productCount: 15,
  },
  {
    id: '35',
    slug: 'hammers',
    name: 'Hammers & Breakers',
    tier: 'tier2',
    parentSlug: 'attachments',
    description: 'Hydraulic hammers and breakers for concrete demolition, rock breaking, and asphalt removal.',
    longDescription: `Hydraulic hammers and breakers deliver powerful impact energy for breaking concrete, rock, and asphalt. Essential for demolition work, foundation removal, and utility excavation in rocky conditions.

Choose hammer size based on carrier weight and application. All hammers include mounting hardware and hydraulic lines.`,
    answerBlock: {
      question: 'What can a hydraulic hammer break?',
      answer: 'Hydraulic hammers break concrete, rock, asphalt, and frozen ground. They are essential for demolition, foundation removal, trenching in rocky soil, and utility work.',
      keyFacts: [
        'Breaks concrete and rock',
        'Demolition applications',
        'Trenching in rocky soil',
        'Multiple sizes available',
      ],
    },
    productCount: 7,
  },
  {
    id: '36',
    slug: 'trenchers',
    name: 'Trenchers',
    tier: 'tier2',
    parentSlug: 'attachments',
    description: 'Chain trenchers for mini skid steers and excavators. Dig narrow trenches for utilities, irrigation, and drainage.',
    longDescription: `Chain trenchers dig narrow, deep trenches for utility lines, irrigation systems, and drainage. More efficient than buckets for long, narrow trenches.

Available in various digging depths and chain configurations for different soil conditions. Crumber bars help clean trench bottoms for pipe installation.`,
    answerBlock: {
      question: 'When should I use a trencher instead of a bucket?',
      answer: 'Use a trencher when you need narrow, deep trenches for utilities or irrigation. Trenchers are faster than buckets for long runs and produce cleaner trench walls with less backfill.',
      keyFacts: [
        'Depth: 24-48 inches',
        'Width: 4-12 inches',
        'Ideal for utilities and irrigation',
        'Clean trench walls',
      ],
    },
    productCount: 4,
  },
  {
    id: '37',
    slug: 'sweepers',
    name: 'Sweepers',
    tier: 'tier2',
    parentSlug: 'attachments',
    description: 'Angle brooms and pickup sweepers for skid steers. Clean pavement, parking lots, and construction sites.',
    longDescription: `Sweeper attachments clean pavement, parking lots, and construction sites quickly. Angle brooms push debris to the side, while pickup sweepers collect material in a hopper.

Popular with property maintenance companies, construction contractors, and municipalities for keeping sites clean.`,
    answerBlock: {
      question: 'What does a skid steer sweeper do?',
      answer: 'A skid steer sweeper cleans pavement, parking lots, and construction sites. Angle brooms push debris aside, while pickup sweepers collect material for easy disposal.',
      keyFacts: [
        'Angle brooms and pickup models',
        'Cleans pavement and lots',
        'Property maintenance',
        'Construction site cleanup',
      ],
    },
    productCount: 4,
  },
  {
    id: '38',
    slug: 'grapples',
    name: 'Grapples',
    tier: 'tier2',
    parentSlug: 'attachments',
    description: 'Grapple buckets and log grapples for moving brush, logs, demolition debris, and loose materials.',
    longDescription: `Grapple attachments provide strong gripping power for moving irregular materials. Use log grapples for forestry work, brush grapples for land clearing, and scrap grapples for demolition.

All grapples feature hydraulic cylinders for powerful clamping and are compatible with standard hydraulic flow.`,
    answerBlock: {
      question: 'What can I move with a grapple attachment?',
      answer: 'Grapple attachments move logs, brush, demolition debris, rocks, and loose materials. They provide strong gripping power for irregular loads that buckets cannot handle.',
      keyFacts: [
        'Handles logs and brush',
        'Demolition debris removal',
        'Hydraulic clamping power',
        'Various jaw configurations',
      ],
    },
    productCount: 2,
  },
  {
    id: '39',
    slug: 'snow-removal',
    name: 'Snow Removal',
    tier: 'tier2',
    parentSlug: 'attachments',
    description: 'Snow plows, snow blowers, and snow pushers for skid steers and mini excavators.',
    longDescription: `Snow removal attachments turn your skid steer or excavator into a winter workhorse. Options include straight plows, V-plows, snow blowers, and snow pushers.

Choose attachment size based on typical snowfall and the area you need to clear. All snow attachments are hydraulic or manual angle adjustable.`,
    answerBlock: {
      question: 'What snow removal attachment do I need?',
      answer: 'For light snow on pavement, a snow plow is fastest. For heavy snow or gravel surfaces, a snow blower throws snow farther. Snow pushers work well for large lots and stacking snow.',
      keyFacts: [
        'Snow plows: fast clearing',
        'Snow blowers: heavy snow',
        'Snow pushers: large areas',
        'Hydraulic angle adjustment',
      ],
    },
    productCount: 1,
  },
  {
    id: '40',
    slug: 'tillers',
    name: 'Tillers',
    tier: 'tier2',
    parentSlug: 'attachments',
    description: 'Rotary tillers for seedbed preparation, soil mixing, and landscape renovation.',
    longDescription: `Rotary tillers prepare seedbeds, mix soil amendments, and renovate landscapes. Tines break up soil to a consistent depth for planting.

Available in various widths to match your skid steer or excavator capacity. Bi-directional rotation helps in different soil conditions.`,
    answerBlock: {
      question: 'What does a rotary tiller attachment do?',
      answer: 'A rotary tiller breaks up and aerates soil for seedbed preparation, landscape renovation, and mixing soil amendments. It creates a fine tilth for planting.',
      keyFacts: [
        'Seedbed preparation',
        'Soil mixing and aeration',
        'Landscape renovation',
        'Various widths available',
      ],
    },
    productCount: 1,
  },
  {
    id: '41',
    slug: 'mulchers',
    name: 'Mulchers',
    tier: 'tier2',
    parentSlug: 'attachments',
    description: 'Forestry mulchers for clearing trees, brush, and vegetation. Turn debris into mulch on site.',
    longDescription: `Forestry mulchers clear trees, brush, and vegetation, turning debris into mulch on site. Ideal for land clearing, right-of-way maintenance, and wildfire prevention.

High-speed cutting discs handle trees up to 6-8 inches in diameter. Discharge deflector controls mulch distribution.`,
    answerBlock: {
      question: 'What size trees can a mulcher handle?',
      answer: 'Mini excavator mulchers typically handle trees and brush up to 4-6 inches in diameter. Larger skid steer disc mulchers can process material up to 8 inches. Check specifications for your model.',
      keyFacts: [
        'Cut capacity: 4-8" diameter',
        'Turns debris to mulch',
        'Land clearing applications',
        'Right-of-way maintenance',
      ],
    },
    productCount: 1,
  },
  {
    id: '42',
    slug: 'chippers',
    name: 'Chippers',
    tier: 'tier2',
    parentSlug: 'attachments',
    description: 'Wood chippers for skid steers. Chip branches and small trees for disposal or mulch.',
    longDescription: `Skid steer-mounted wood chippers process branches and small trees into wood chips. Ideal for tree care contractors, land clearing, and property maintenance.

Hydraulic feed systems pull material into the chipper automatically. Discharge chutes direct chips where you want them.`,
    answerBlock: {
      question: 'What can a skid steer chipper handle?',
      answer: 'Skid steer wood chippers handle branches and small trees up to 4-6 inches in diameter. They are ideal for tree care, land clearing, and turning debris into usable mulch.',
      keyFacts: [
        'Branch capacity: 4-6" diameter',
        'Hydraulic feed system',
        'Tree care applications',
        'Produces usable mulch',
      ],
    },
    productCount: 1,
  },
  {
    id: '43',
    slug: 'specialty',
    name: 'Specialty Attachments',
    tier: 'tier2',
    parentSlug: 'attachments',
    description: 'Rippers, rakes, and specialty attachments for unique applications.',
    longDescription: `Specialty attachments include rippers for breaking hard ground, landscape rakes for grading and cleanup, and other purpose-built tools for unique applications.

Contact us if you need an attachment not listed. We can source specialty equipment from our manufacturer network.`,
    answerBlock: {
      question: 'What specialty attachments are available?',
      answer: 'Specialty attachments include rippers for hard ground, landscape rakes for grading, stump grinders, concrete mixers, and more. Contact us for custom attachment needs.',
      keyFacts: [
        'Rippers for hard ground',
        'Landscape rakes',
        'Stump grinders',
        'Custom solutions available',
      ],
    },
    productCount: 1,
  },
];

// Helper functions for category queries
export function getTier1Categories(): Category[] {
  return categories.filter(c => c.tier === 'tier1');
}

export function getTier2Categories(): Category[] {
  return categories.filter(c => c.tier === 'tier2');
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find(c => c.slug === slug);
}

export function getSubcategories(parentSlug: string): Category[] {
  return categories.filter(c => c.tier === 'tier2' && c.parentSlug === parentSlug);
}

export function getCategoryBySlugAndParent(slug: string, parentSlug?: string): Category | undefined {
  if (parentSlug) {
    return categories.find(c => c.slug === slug && c.parentSlug === parentSlug);
  }
  return categories.find(c => c.slug === slug && c.tier === 'tier1');
}
