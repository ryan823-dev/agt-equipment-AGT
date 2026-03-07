import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { JsonLd } from '@/components/seo/JsonLd';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { FAQSection } from '@/components/seo/FAQSection';
import { generateCategorySchema, generateFAQSchema, generateBreadcrumbSchema } from '@/lib/schema';
import { getProductsByCategory, getCategoryBySlug } from '@/lib/data';
import { ArrowRight, CheckCircle2, Scale, Phone, Truck, Shield, Wrench } from 'lucide-react';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

// Category SEO content
const CATEGORY_CONTENT: Record<string, {
  quickAnswer: string;
  semanticTriples: string[];
  introduction: string;
  useCases: { title: string; description: string; icon: typeof Truck }[];
  comparisonTitle?: string;
  comparisonData?: { feature: string; models: string[] }[];
  buyingTips: string[];
  faq: { question: string; answer: string }[];
}> = {
  'mini-excavators': {
    quickAnswer: 'Mini excavators are compact tracked excavators weighing 1-4 tons, designed for digging trenches, foundations, and landscaping work in spaces too small for full-size machines. AGT Equipment offers 1-4 ton mini excavators with Kubota and Rato diesel engines, priced from $11,999 with free US shipping.',
    semanticTriples: [
      'Mini excavators are tracked excavators weighing 1-4 tons.',
      'Mini excavators are used for digging trenches and foundations.',
      'AGT Equipment sells mini excavators with Kubota and Rato engines.',
      'AGT Equipment offers free shipping within the continental US.',
      'All AGT mini excavators include a 1-year warranty.',
    ],
    introduction: `Mini excavators—also known as compact excavators—are the workhorses of small-scale construction and landscaping. Weighing between 1 and 4 tons, these machines pack serious digging power into a footprint that fits through standard gates and doorways.

AGT Equipment specializes in factory-direct mini excavators from 1.1 to 4 tons. Every machine ships free from our California or Illinois warehouses and includes a 1-year warranty.`,
    useCases: [
      { title: 'Landscaping', description: 'Dig ponds, tree holes, and grading with minimal ground disturbance', icon: Wrench },
      { title: 'Utility Work', description: 'Trench for irrigation, electrical, and plumbing lines', icon: Truck },
      { title: 'Foundation Repair', description: 'Excavate around existing structures for repairs', icon: Shield },
      { title: 'Demolition', description: 'Small structure tear-down and debris handling', icon: Scale },
    ],
    comparisonTitle: 'Mini Excavator Size Comparison',
    comparisonData: [
      { feature: 'Operating Weight', models: ['2,425 lbs (1.1-ton)', '2,645 lbs (1.2-ton)', '8,818 lbs (4-ton)'] },
      { feature: 'Dig Depth', models: ['5\'9" (1.75m)', '6\'7" (2.0m)', '12\' (3.65m)'] },
      { feature: 'Engine', models: ['Rato 186F', 'Kubota D1103', 'Kubota V2403-CR'] },
      { feature: 'Horsepower', models: ['13.5 HP', '24.8 HP', '54 HP'] },
      { feature: 'Price', models: ['$11,999', '$14,999', '$29,000'] },
    ],
    buyingTips: [
      'Match dig depth to your deepest expected trench plus 6 inches for clearance',
      'Consider transport—a 1-ton fits in a pickup, a 4-ton needs a heavy-duty trailer',
      'Kubota engines offer more power for daily use; Rato engines save money for occasional use',
      'A hydraulic thumb adds 30% more capability for material handling',
      'Check local regulations—machines over 26,000 lbs GVW may require CDL for transport',
    ],
    faq: [
      {
        question: 'What size mini excavator do I need for residential work?',
        answer: 'For most residential projects (fence posts, small trenches, tree planting), a 1-ton mini excavator like the H15R is sufficient. For deeper trenches (6+ feet) or foundation work, consider a 2-4 ton machine.',
      },
      {
        question: 'Can I tow a mini excavator with my pickup truck?',
        answer: 'A 1-ton mini excavator (2,425 lbs) plus trailer can typically be towed by a half-ton pickup. A 4-ton excavator (8,818 lbs) requires a heavy-duty truck and may require a CDL depending on your state.',
      },
      {
        question: 'Which is better: Kubota or Rato engine?',
        answer: 'Kubota engines offer more horsepower and longer life expectancy, making them ideal for daily commercial use. Rato engines are more affordable and reliable for occasional use (under 500 hours/year). Both are proven diesel engines with parts availability.',
      },
      {
        question: 'Do mini excavators come with a warranty?',
        answer: 'Yes, all AGT Equipment mini excavators include a 1-year warranty covering manufacturing defects and component failures under normal use. Extended warranties are available.',
      },
    ],
  },
  'skid-steer': {
    quickAnswer: 'Skid steers are compact loader machines that lift, grade, and move materials using a wide range of attachments. AGT Equipment offers stand-on and track skid steers from $8,999 with over 100 attachment options.',
    semanticTriples: [
      'Skid steers are compact loader machines for material handling.',
      'Skid steers support over 100 attachment types.',
      'AGT Equipment sells the MSL-500 mini skid steer for $8,999.',
      'Skid steers are available in wheeled and tracked configurations.',
    ],
    introduction: `Skid steers are the most versatile machines in the compact equipment category. Their unique design—two independent drive wheels or tracks—allows them to pivot in place, making them ideal for confined spaces.

The AGT MSL-500 stand-on skid steer is our flagship model, offering 1,102 lbs of operating capacity in a 36" wide package that fits through standard gates.`,
    useCases: [
      { title: 'Landscaping', description: 'Move mulch, soil, and pallets with bucket or fork attachments', icon: Truck },
      { title: 'Grading', description: 'Level ground for patios, driveways, and lawns', icon: Wrench },
      { title: 'Snow Removal', description: 'Clear driveways and parking lots with snow blade or blower', icon: Shield },
      { title: 'Property Maintenance', description: 'Haul debris, spread gravel, and maintain grounds', icon: Scale },
    ],
    buyingTips: [
      'Stand-on models (like MSL-500) are more affordable and compact than cabin models',
      'Track loaders offer better traction in mud; wheeled models are faster on hard surfaces',
      'Universal quick-attach lets you use attachments from most major brands',
      'Consider your most common task—loading needs more capacity, grading needs better visibility',
    ],
    faq: [
      {
        question: 'What\'s the difference between a skid steer and a mini excavator?',
        answer: 'Skid steers excel at loading, grading, and material handling with 100+ attachment options. Mini excavators excel at digging trenches and foundations with minimal ground disturbance. Choose skid steer for versatility; choose excavator for serious digging.',
      },
      {
        question: 'How wide is the AGT MSL-500 skid steer?',
        answer: 'The MSL-500 is 36 inches wide, allowing it to fit through standard residential gates. This makes it ideal for backyard landscaping and property maintenance.',
      },
      {
        question: 'What attachments work with the MSL-500?',
        answer: 'The MSL-500 uses universal quick-attach and is compatible with over 100 attachments including buckets, forks, augers, trenchers, brush cutters, snow blades, and sweepers.',
      },
    ],
  },
  'attachments': {
    quickAnswer: 'Excavator and skid steer attachments transform your base machine into a multi-purpose tool. AGT Equipment offers buckets, augers, thumbs, hammers, and 100+ other attachments with universal quick-attach mounting.',
    semanticTriples: [
      'Attachments expand the capability of excavators and skid steers.',
      'Universal quick-attach fits most major equipment brands.',
      'AGT Equipment sells over 120 attachment types.',
      'Hydraulic attachments require auxiliary hydraulics on the base machine.',
    ],
    introduction: `The right attachment turns your excavator or skid steer into a specialized machine for any job. From digging buckets to hydraulic hammers, each attachment multiplies your equipment's value.

AGT Equipment stocks over 120 attachments with universal mounting plates compatible with most major brands.`,
    useCases: [
      { title: 'Buckets', description: 'General purpose, ditch cleaning, and rock buckets for digging', icon: Wrench },
      { title: 'Augers', description: 'Drill post holes, tree holes, and footings', icon: Truck },
      { title: 'Hydraulic Thumbs', description: 'Grab logs, rocks, and debris without manual handling', icon: Shield },
      { title: 'Hammers', description: 'Break concrete, asphalt, and rock', icon: Scale },
    ],
    buyingTips: [
      'Check your machine\'s hydraulic flow rate before buying hydraulic attachments',
      'Match attachment weight to your machine\'s lift capacity',
      'Universal skid steer mounting plate fits most brands',
      'Consider renting specialized attachments before buying',
    ],
    faq: [
      {
        question: 'What attachments work with mini excavators?',
        answer: 'Common mini excavator attachments include: digging buckets (12-36"), hydraulic thumbs, augers, hammers, rippers, and grapples. Most require the machine\'s auxiliary hydraulics.',
      },
      {
        question: 'What is a hydraulic thumb?',
        answer: 'A hydraulic thumb is a clamping attachment that mounts opposite the bucket, allowing you to grab and move logs, rocks, and debris. It increases your excavator\'s versatility by 30%.',
      },
    ],
  },
  'parts': {
    quickAnswer: 'AGT Equipment stocks genuine replacement parts for AGT mini excavators and skid steers, including filters, tracks, hydraulic components, and engine parts. All parts ship free within the continental US.',
    semanticTriples: [
      'AGT Equipment sells genuine replacement parts.',
      'Parts ship free within the continental United States.',
      'Common parts include filters, tracks, and hydraulic components.',
    ],
    introduction: `Keep your equipment running with genuine AGT replacement parts. We stock common wear items like filters, tracks, and hydraulic seals, plus engine components for Kubota and Rato diesel engines.`,
    useCases: [
      { title: 'Filters', description: 'Oil, fuel, air, and hydraulic filters', icon: Wrench },
      { title: 'Tracks', description: 'Rubber tracks for mini excavators', icon: Truck },
      { title: 'Hydraulic Parts', description: 'Cylinders, hoses, and seals', icon: Shield },
      { title: 'Engine Components', description: 'Kubota and Rato engine parts', icon: Scale },
    ],
    buyingTips: [
      'Keep spare oil and fuel filters on hand for regular maintenance',
      'Check track tension every 50 hours of operation',
      'Replace hydraulic seals at first sign of leakage',
    ],
    faq: [
      {
        question: 'Where can I get parts for my AGT excavator?',
        answer: 'AGT Equipment stocks genuine replacement parts for all AGT machines. Contact us with your model and serial number for specific parts availability.',
      },
    ],
  },
};

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return { title: 'Category Not Found' };
  }

  const content = CATEGORY_CONTENT[slug];
  const title = `${category.name} - Factory Direct | AGT Equipment`;
  const description = content?.quickAnswer?.slice(0, 160) || category.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
    },
    alternates: {
      canonical: `https://agt-equipment.com/category/${category.slug}`,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const products = await getProductsByCategory(category.name);
  const content = CATEGORY_CONTENT[slug];

  if (!content) {
    // Fallback for categories without rich content
    return (
      <div className="container py-8">
        <h1 className="text-3xl font-bold">{category.name}</h1>
        <p className="mt-4 text-muted-foreground">{category.description}</p>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((p) => (
            <Link key={p.id} href={`/products/${p.slug}`} className="block">
              <Card>
                <CardHeader>
                  <CardTitle>{p.name}</CardTitle>
                  <CardDescription>${p.price.toLocaleString()}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  const breadcrumbs = [
    { name: 'Products', href: '/products' },
    { name: category.name, href: `/category/${category.slug}` },
  ];

  return (
    <>
      {/* Structured Data */}
      <JsonLd data={generateCategorySchema(category)} />
      <JsonLd data={generateFAQSchema(content.faq)} />
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />

      <div className="container py-8">
        <Breadcrumbs items={breadcrumbs.slice(0, -1)} />

        {/* Hero Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight">{category.name}</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">{category.description}</p>

          {/* Quick Answer for AEO */}
          <div className="mt-6 quick-answer text-left max-w-3xl" data-speakable="quick-answer">
            <strong>Quick Answer:</strong> {content.quickAnswer}
          </div>

          {/* Semantic Triples */}
          <div className="mt-4 text-sm text-muted-foreground">
            {content.semanticTriples.map((triple, i) => (
              <span key={i} className="semantic-triple mr-2">{triple}</span>
            ))}
          </div>
        </div>

        {/* Introduction */}
        <div className="prose prose-lg max-w-none mb-12 article-content">
          <div dangerouslySetInnerHTML={{ __html: content.introduction.replace(/\n\n/g, '</p><p>').replace(/^/, '<p>').replace(/$/, '</p>') }} />
        </div>

        {/* Use Cases */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Common Applications</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.useCases.map((useCase) => (
              <Card key={useCase.title}>
                <CardHeader>
                  <useCase.icon className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">{useCase.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{useCase.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Comparison Table */}
        {content.comparisonData && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">{content.comparisonTitle}</h2>
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="text-left p-4 font-medium">Feature</th>
                        <th className="text-left p-4 font-medium">H15R (1.1-Ton)</th>
                        <th className="text-left p-4 font-medium">DM12X (1.2-Ton)</th>
                        <th className="text-left p-4 font-medium">CFG-40UF (4-Ton)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {content.comparisonData.map((row, i) => (
                        <tr key={i} className="border-b last:border-0">
                          <td className="p-4 font-medium">{row.feature}</td>
                          {row.models.map((value, j) => (
                            <td key={j} className="p-4">{value}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        {/* Products Grid */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Shop {category.name}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Link key={product.id} href={`/products/${product.slug}`}>
                <Card className="group hover:shadow-lg transition-shadow h-full">
                  <div className="aspect-video relative bg-muted rounded-t-lg overflow-hidden">
                    {product.images[0] && (
                      <Image
                        src={product.images[0].url}
                        alt={product.images[0].alt || product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    )}
                  </div>
                  <CardHeader>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      {product.name}
                    </CardTitle>
                    <CardDescription>{product.shortDescription?.slice(0, 100)}...</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary">
                        ${product.price.toLocaleString()}
                      </span>
                      <Button variant="outline" size="sm">
                        View Details
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Buying Tips */}
        <section className="mb-12 bg-muted/50 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Buying Tips</h2>
          <ul className="space-y-3">
            {content.buyingTips.map((tip, i) => (
              <li key={i} className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <FAQSection faqs={content.faq} />
        </section>

        {/* CTA */}
        <section className="bg-primary text-primary-foreground rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-2">Need Help Choosing?</h2>
          <p className="mb-6 opacity-90">
            Our equipment specialists can help you select the right {category.name.toLowerCase()} for your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="secondary" size="lg">
              <Link href="/contact">Get Expert Advice</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <a href="tel:+19498987669">
                <Phone className="mr-2 h-4 w-4" />
                Call (949) 898-7669
              </a>
            </Button>
          </div>
        </section>
      </div>
    </>
  );
}
