import { Compare } from '@/types';

export const compares: Compare[] = [
  {
    id: '1',
    slug: 'mini-excavator-vs-mini-skid-steer',
    title: 'Mini Excavator vs Mini Skid Steer: Which Do You Need?',
    excerpt: 'Both machines are compact and versatile, but they excel at different tasks. Learn when to choose an excavator vs a skid steer.',
    content: `If you're choosing between a mini excavator and a mini skid steer, the decision comes down to one question: What's your primary task?

## Mini Excavator: Built for Digging

Mini excavators are purpose-built for excavation tasks. The boom and arm configuration gives them superior dig depth and reach compared to skid steers.

**Choose a Mini Excavator if you:**
- Need to dig trenches deeper than 4 feet
- Work in tight spaces where swing radius matters
- Need precision digging around utilities
- Want to dig and place material in one motion (with thumb)
- Work on slopes (tracks provide stability)

## Mini Skid Steer: Built for Loading and Hauling

Mini skid steers are loaders first. Their forward-facing design and quick-attach system make them ideal for material handling.

**Choose a Mini Skid Steer if you:**
- Need to load trucks or dump trailers
- Want maximum attachment versatility
- Work in confined areas with limited swing room
- Need to carry materials across sites
- Change attachments frequently

## Side-by-Side Comparison`,
    quickAnswer: 'Choose a mini excavator for digging (trenches, foundations, holes). Choose a mini skid steer for loading, carrying, and attachment versatility. Many contractors own both for complete job site coverage.',
    verdict: 'If you can only buy one machine and your primary work involves digging (trenching, foundations, excavation), choose a mini excavator. If your work involves loading, hauling, or diverse attachment tasks, choose a mini skid steer. For complete versatility, many contractors invest in both.',
    leftItem: {
      name: 'Mini Excavator',
      slug: 'mini-excavators',
      type: 'category',
    },
    rightItem: {
      name: 'Mini Skid Steer',
      slug: 'mini-skid-steers',
      type: 'category',
    },
    comparisonTable: [
      { feature: 'Primary Function', values: { 'Mini Excavator': 'Digging', 'Mini Skid Steer': 'Loading/Hauling' } },
      { feature: 'Dig Depth', values: { 'Mini Excavator': '5-12 ft', 'Mini Skid Steer': '2-4 ft (with bucket)' } },
      { feature: 'Lift Capacity', values: { 'Mini Excavator': 'Limited', 'Mini Skid Steer': '1,000-1,500 lbs' } },
      { feature: 'Attachment Options', values: { 'Mini Excavator': '10-15', 'Mini Skid Steer': '50+' } },
      { feature: 'Visibility', values: { 'Mini Excavator': '360°', 'Mini Skid Steer': 'Forward only' } },
      { feature: 'Swing Radius', values: { 'Mini Excavator': 'Requires space', 'Mini Skid Steer': 'None (tracks)' } },
      { feature: 'Typical Width', values: { 'Mini Excavator': '36-70"', 'Mini Skid Steer': '36"' } },
      { feature: 'Price Range', values: { 'Mini Excavator': '$11,000-$35,000', 'Mini Skid Steer': '$8,000-$15,000' } },
    ],
    faq: [
      {
        question: 'Can a mini skid steer dig trenches?',
        answer: 'Yes, but only 2-4 feet deep with a bucket. For deeper trenches, a mini excavator is much more efficient. Some mini skid steers can use a trencher attachment for narrow trenches.',
      },
      {
        question: 'Which is better for landscaping?',
        answer: 'It depends. Mini excavators are better for digging pools, ponds, and deep trenches. Mini skid steers are better for moving soil, mulch, and using multiple attachments. Many landscapers own both.',
      },
      {
        question: 'Can they work together?',
        answer: 'Absolutely. A common setup is a mini excavator doing the digging while a mini skid steers loads trucks and moves material. This combination maximizes efficiency on job sites.',
      },
    ],
    metaTitle: 'Mini Excavator vs Mini Skid Steer Comparison | AGT Equipment',
    metaDescription: 'Compare mini excavators and mini skid steers to decide which machine is right for your work. Side-by-side comparison of capabilities and uses.',
  },
  {
    id: '2',
    slug: 'kubota-vs-rato-mini-excavator',
    title: 'Kubota vs RATO Engine: Which is Better for Your Mini Excavator?',
    excerpt: 'Compare Kubota and RATO diesel engines in mini excavators. Reliability, performance, resale value, and which one is right for you.',
    content: `The engine is the heart of your mini excavator. When choosing between Kubota and RATO engines, you're balancing brand reputation, cost, and intended use.

## Kubota Engines

Kubota is a Japanese manufacturer with decades of experience in small diesel engines. Their engines are known for reliability and are used by many leading equipment brands.

**Pros:**
- Proven reliability track record
- Strong resale value for Kubota-powered machines
- Extensive dealer and service network
- Widely available parts

**Cons:**
- Higher initial cost
- Premium parts pricing

## RATO Engines

RATO is a Chinese engine manufacturer that has gained traction in the compact equipment market. They offer competitive power at a lower price point.

**Pros:**
- Lower initial cost
- Good value for occasional use
- Adequate power for most tasks

**Cons:**
- Less brand recognition
- Potentially lower resale value
- Smaller service network

## Which Should You Choose?`,
    quickAnswer: 'Choose Kubota if you plan to use the machine daily or want better resale value. Choose RATO if you need to save on upfront cost and will use the machine occasionally (under 200 hours/year).',
    verdict: 'For professional users who will put 500+ hours per year on their machine, the Kubota engine\'s reliability and resale value typically justify the higher cost. For homeowners and occasional users (under 200 hours/year), the RATO engine offers excellent value.',
    leftItem: {
      name: 'Kubota',
      slug: 'kubota',
      type: 'brand',
    },
    rightItem: {
      name: 'RATO',
      slug: 'rato',
      type: 'brand',
    },
    comparisonTable: [
      { feature: 'Origin', values: { 'Kubota': 'Japan', 'RATO': 'China' } },
      { feature: 'Reliability', values: { 'Kubota': 'Excellent', 'RATO': 'Good' } },
      { feature: 'Price', values: { 'Kubota': 'Higher', 'RATO': 'Lower' } },
      { feature: 'Resale Value', values: { 'Kubota': 'Strong', 'RATO': 'Moderate' } },
      { feature: 'Parts Availability', values: { 'Kubota': 'Excellent', 'RATO': 'Good' } },
      { feature: 'Service Network', values: { 'Kubota': 'Extensive', 'RATO': 'Limited' } },
      { feature: 'Best For', values: { 'Kubota': 'Daily professional use', 'RATO': 'Occasional homeowner use' } },
    ],
    faq: [
      {
        question: 'Are RATO engines reliable?',
        answer: 'RATO engines have improved significantly and are adequate for most applications. They\'re best suited for occasional use (under 200 hours/year) rather than daily professional operation.',
      },
      {
        question: 'Is the Kubota engine worth the extra cost?',
        answer: 'For professional users, yes. The reliability, parts availability, and resale value typically offset the higher initial cost. For occasional users, the RATO may be more cost-effective.',
      },
    ],
    metaTitle: 'Kubota vs RATO Engine Comparison | AGT Equipment',
    metaDescription: 'Compare Kubota and RATO diesel engines for mini excavators. Reliability, price, resale value, and which is right for your needs.',
  },
  {
    id: '3',
    slug: '1-ton-vs-2-ton-mini-excavator',
    title: '1-Ton vs 2-Ton Mini Excavator: Which Size Do You Need?',
    excerpt: 'Choosing between a 1-ton and 2-ton mini excavator? Compare dig depth, lift capacity, transport requirements, and ideal use cases.',
    content: `Size matters when choosing a mini excavator. The difference between 1-ton and 2-ton machines affects not just capability, but also transport, access, and operating costs.

## 1-Ton Mini Excavators (H15R Class)

1-ton machines are the smallest excavators that still offer meaningful digging capability. They excel at access and transportability.

**Best For:**
- Residential backyard work
- Indoor demolition
- Working through 36" gates
- Small utility trenches
- Light landscaping

## 2-Ton Mini Excavators (DM12X Class)

2-ton machines offer significantly more dig depth and lifting power while still being towable behind a pickup.

**Best For:**
- Deeper trenches (6-8 feet)
- Foundation work
- Heavier lifting tasks
- Rental fleet use
- Professional landscaping

## Key Differences`,
    quickAnswer: 'Choose 1-ton for backyard access, gates, and light work. Choose 2-ton for deeper digging, more lifting power, and professional use. Both are towable behind a half-ton pickup.',
    verdict: 'If you need to access backyards through standard gates, the 1-ton is your only option. For everything else, the 2-ton offers more capability for a modest price increase. Many contractors start with a 2-ton as their first mini excavator.',
    leftItem: {
      name: '1-Ton (H15R)',
      slug: '1-ton',
      type: 'subcategory',
    },
    rightItem: {
      name: '2-Ton (DM12X)',
      slug: '2-ton',
      type: 'subcategory',
    },
    comparisonTable: [
      { feature: 'Operating Weight', values: { '1-Ton (H15R)': '2,425 lbs', '2-Ton (DM12X)': '4,400 lbs' } },
      { feature: 'Dig Depth', values: { '1-Ton (H15R)': '5.75 ft', '2-Ton (DM12X)': '7.5 ft' } },
      { feature: 'Lift Capacity', values: { '1-Ton (H15R)': '400 lbs', '2-Ton (DM12X)': '1,200 lbs' } },
      { feature: 'Min Width', values: { '1-Ton (H15R)': '36"', '2-Ton (DM12X)': '43"' } },
      { feature: 'Gate Access', values: { '1-Ton (H15R)': 'Yes (36" gate)', '2-Ton (DM12X)': 'No' } },
      { feature: 'Engine Power', values: { '1-Ton (H15R)': '13.5 HP', '2-Ton (DM12X)': '19 HP' } },
      { feature: 'Tow Vehicle', values: { '1-Ton (H15R)': 'Half-ton pickup', '2-Ton (DM12X)': 'Half-ton pickup' } },
      { feature: 'Price Range', values: { '1-Ton (H15R)': '$11,000-$14,000', '2-Ton (DM12X)': '$16,000-$22,000' } },
    ],
    faq: [
      {
        question: 'Can a 1-ton excavator dig a septic trench?',
        answer: 'Yes, but depth may be limited depending on your local code. Most septic lines need 2-4 feet of depth, which a 1-ton can handle. For deeper leach fields, a 2-ton is better.',
      },
      {
        question: 'Which is better for rental income?',
        answer: '2-ton machines are more popular for rentals because they offer more capability. However, 1-ton machines have less competition and are easier for homeowners to operate.',
      },
      {
        question: 'Do I need a trailer for a 2-ton?',
        answer: 'A 2-ton mini excavator weighs about 4,400 lbs. With a trailer (3,000 lbs), you need a tow vehicle rated for 7,500+ lbs. Most half-ton pickups can handle this.',
      },
    ],
    metaTitle: '1-Ton vs 2-Ton Mini Excavator Comparison | AGT Equipment',
    metaDescription: 'Compare 1-ton and 2-ton mini excavators. Dig depth, lift capacity, gate access, transport requirements, and price differences.',
  },
  {
    id: '4',
    slug: 'mini-excavator-vs-backhoe',
    title: 'Mini Excavator vs Backhoe: Which Machine for Your Job?',
    excerpt: 'Compare mini excavators and backhoes for digging tasks. Dig depth, versatility, transport, and which machine fits your work.',
    content: `Both machines dig, but they serve different markets. A backhoe is a tractor with a digging attachment; a mini excavator is purpose-built for excavation.

## Mini Excavators

Mini excavators are dedicated digging machines. All their weight and power go into the digging function.

**Advantages:**
- Superior dig depth for size
- 360-degree rotation
- Tracks handle rough terrain
- Lower purchase price
- Easier to transport
- More attachment options

## Backhoes (Tractor-Backhoe Combos)

Backhoes combine a tractor with a rear digging arm. The tractor can also run front loaders, mowers, and other implements.

**Advantages:**
- Can do multiple jobs (loader + backhoe + tractor)
- Higher travel speed (drive between sites)
- Loader bucket included
- Good for farms and large properties

## The Decision`,
    quickAnswer: 'Choose a mini excavator for dedicated digging work, tight access, and lower cost. Choose a backhoe if you need a tractor for multiple tasks (loading, mowing, digging) and can drive between sites.',
    verdict: 'For excavation contractors, landscapers, and anyone doing primarily digging work, the mini excavator is the clear choice. For farmers, large property owners, and those who need multiple functions in one machine, a backhoe-loader-tractor combo makes more sense.',
    leftItem: {
      name: 'Mini Excavator',
      slug: 'mini-excavators',
      type: 'category',
    },
    rightItem: {
      name: 'Backhoe',
      slug: 'backhoe',
      type: 'equipment',
    },
    comparisonTable: [
      { feature: 'Primary Function', values: { 'Mini Excavator': 'Excavation only', 'Backhoe': 'Multi-function' } },
      { feature: 'Dig Depth (mid-size)', values: { 'Mini Excavator': '7-10 ft', 'Backhoe': '14-16 ft' } },
      { feature: 'Rotation', values: { 'Mini Excavator': '360°', 'Backhoe': '180° swing' } },
      { feature: 'Travel Speed', values: { 'Mini Excavator': '2-3 mph', 'Backhoe': '15-25 mph' } },
      { feature: 'Loader', values: { 'Mini Excavator': 'Optional/No', 'Backhoe': 'Standard' } },
      { feature: 'Transport', values: { 'Mini Excavator': 'Trailer required', 'Backhoe': 'Drives on road' } },
      { feature: 'Purchase Price', values: { 'Mini Excavator': '$11,000-$35,000', 'Backhoe': '$25,000-$80,000' } },
      { feature: 'Operating Cost', values: { 'Mini Excavator': 'Lower', 'Backhoe': 'Higher' } },
    ],
    faq: [
      {
        question: 'Can a backhoe do everything a mini excavator can?',
        answer: 'A backhoe can dig trenches and holes, but it cannot match a mini excavator\'s precision, rotation, or access to tight spaces. Mini excavators are purpose-built for digging; backhoes are jack-of-all-trades.',
      },
      {
        question: 'Which is better for farm use?',
        answer: 'For farms, a backhoe-loader-tractor is often better because it can mow, move materials, grade roads, and dig. But if your farm has a tractor already, adding a mini excavator may be more cost-effective.',
      },
      {
        question: 'Which digs deeper?',
        answer: 'Full-size backhoes can dig 14-16 feet deep. Most mini excavators max out at 7-10 feet. However, mini excavators can reach deeper spots in tighter spaces.',
      },
    ],
    metaTitle: 'Mini Excavator vs Backhoe Comparison | AGT Equipment',
    metaDescription: 'Compare mini excavators and backhoes for digging. Dig depth, versatility, transport, price, and which machine is right for your work.',
  },
  {
    id: '5',
    slug: 'rent-vs-buy-mini-excavator',
    title: 'Rent vs Buy a Mini Excavator: Complete Cost Analysis',
    excerpt: 'Should you rent or buy a mini excavator? Compare total cost of ownership vs rental costs, break-even hours, and when each option makes sense.',
    content: `The rent vs buy decision depends on how many hours per year you will use the machine. Let\'s run the numbers.

## Cost of Owning

**Purchase Price:** $15,000-$25,000 (2-ton mini excavator)

**Annual Costs:**
- Depreciation: $2,000-$3,000 (year 1-3)
- Insurance: $300-$500
- Maintenance: $500-$1,500
- Storage: $0-$200
- **Total Annual:** $2,800-$5,200

## Cost of Renting

**Daily Rate:** $250-$350
**Weekly Rate:** $900-$1,200
**Monthly Rate:** $2,500-$3,500

## Break-Even Analysis`,
    quickAnswer: 'If you need a mini excavator more than 15-20 days per year, buying is typically cheaper than renting. Under 10 days per year, rent. Between 10-20 days, consider your cash flow and storage situation.',
    verdict: 'Buy if: You will use 150+ hours/year, have secure storage, can handle maintenance, and want to build equity. Rent if: You need under 100 hours/year, have variable projects, want no maintenance responsibility, or want to try before you buy.',
    leftItem: {
      name: 'Buy',
      slug: 'buy',
      type: 'option',
    },
    rightItem: {
      name: 'Rent',
      slug: 'rent',
      type: 'option',
    },
    comparisonTable: [
      { feature: 'Upfront Cost', values: { 'Buy': '$15,000-$25,000', 'Rent': '$250-$350/day' } },
      { feature: 'Break-Even (days/year)', values: { 'Buy': '15-20 days', 'Rent': 'N/A' } },
      { feature: 'Maintenance', values: { 'Buy': 'Your responsibility', 'Rent': 'Rental company' } },
      { feature: 'Availability', values: { 'Buy': 'Always available', 'Rent': 'May need reservation' } },
      { feature: 'Familiarity', values: { 'Buy': 'Learn one machine', 'Rent': 'Different machines' } },
      { feature: 'Tax Deduction', values: { 'Buy': 'Depreciation + expenses', 'Rent': 'Full rental cost' } },
      { feature: 'Storage', values: { 'Buy': 'Required', 'Rent': 'Not needed' } },
      { feature: 'Resale Value', values: { 'Buy': '50-70% after 5 years', 'Rent': 'N/A' } },
    ],
    faq: [
      {
        question: 'What is the break-even point for owning vs renting?',
        answer: 'At typical rental rates ($300/day), you break even at about 50-60 rental days over the machine\'s life, or roughly 15-20 days per year over 3 years. The more you use it, the more sense owning makes.',
      },
      {
        question: 'Can I rent out my mini excavator when not using it?',
        answer: 'Yes, many owners rent their machines through platforms like EquipmentShare or locally. This can offset ownership costs significantly. Factor in insurance, wear, and coordination effort.',
      },
      {
        question: 'Should I rent before buying?',
        answer: 'Absolutely. Rent different models to see what you like before committing $15,000+. Rental experience also helps you estimate your actual usage hours.',
      },
    ],
    metaTitle: 'Rent vs Buy Mini Excavator Cost Analysis | AGT Equipment',
    metaDescription: 'Compare the total cost of buying vs renting a mini excavator. Break-even analysis, hidden costs, and when each option makes financial sense.',
  },
  {
    id: '6',
    slug: 'new-vs-used-mini-excavator',
    title: 'New vs Used Mini Excavator: What to Consider',
    excerpt: 'Buying new or used mini excavator? Compare warranty, condition, financing, depreciation, and where to find reliable used machines.',
    content: `A used mini excavator can save you 30-50% off new price. But what are you giving up, and what should you check before buying?

## Buying New

**Advantages:**
- Full warranty (1-2 years)
- Zero operating history
- Latest features and technology
- Financing options available
- No surprise repairs (first 1-2 years)

**Disadvantages:**
- Higher purchase price
- Maximum depreciation hit

## Buying Used

**Advantages:**
- Lower purchase price
- Less depreciation
- May include attachments
- Immediate availability

**Disadvantages:**
- No or limited warranty
- Unknown operating history
- Potential hidden problems
- May need immediate repairs

## What to Check on a Used Machine`,
    quickAnswer: 'Buy new if you want warranty protection and can afford $15,000+. Buy used if you can inspect machines, handle repairs, and want to save 30-50%. Avoid machines over 5,000 hours unless priced very low.',
    verdict: 'For first-time buyers or those without mechanical skills, a new machine with warranty is safer. For experienced operators who can inspect and repair equipment, a quality used machine offers excellent value. Have any used machine inspected by a mechanic before purchase.',
    leftItem: {
      name: 'New',
      slug: 'new',
      type: 'condition',
    },
    rightItem: {
      name: 'Used',
      slug: 'used',
      type: 'condition',
    },
    comparisonTable: [
      { feature: 'Price (2-ton)', values: { 'New': '$18,000-$25,000', 'Used': '$9,000-$15,000' } },
      { feature: 'Warranty', values: { 'New': '1-2 years', 'Used': 'None or 30-90 days' } },
      { feature: 'Financing', values: { 'New': 'Available', 'Used': 'Limited' } },
      { feature: 'Depreciation', values: { 'New': '20-30% year 1', 'Used': '5-10% per year' } },
      { feature: 'Repairs (year 1)', values: { 'New': 'Warranty covered', 'Used': '$500-$3,000 possible' } },
      { feature: 'Hours', values: { 'New': '0', 'Used': '500-5,000' } },
      { feature: 'Attachments', values: { 'New': 'Buy separately', 'Used': 'May be included' } },
      { feature: 'Availability', values: { 'New': 'Order and wait', 'Used': 'Buy today' } },
    ],
    faq: [
      {
        question: 'How many hours is too many for a used mini excavator?',
        answer: 'Under 2,000 hours is excellent. 2,000-4,000 hours is acceptable with good maintenance. Over 5,000 hours expect significant repairs soon. Always check hour meter accuracy.',
      },
      {
        question: 'What should I inspect on a used mini excavator?',
        answer: 'Check: 1) Track condition and tension, 2) Hydraulic leaks and cylinder scoring, 3) Play in boom/stick pins, 4) Engine smoke and sounds, 5) Swing motor operation, 6) Undercarriage wear, 7) Hour meter accuracy.',
      },
      {
        question: 'Can I get financing for a used mini excavator?',
        answer: 'Yes, but terms are less favorable than new. Expect higher rates, shorter terms, and larger down payments. Some dealers offer in-house financing for used equipment.',
      },
    ],
    metaTitle: 'New vs Used Mini Excavator Buying Guide | AGT Equipment',
    metaDescription: 'Compare new vs used mini excavators. Price, warranty, depreciation, what to inspect, and how to decide which is right for you.',
  },
];

export function getCompareBySlug(slug: string): Compare | undefined {
  return compares.find((c) => c.slug === slug);
}

export function getAllCompares(): Compare[] {
  return compares;
}
