import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Truck, 
  Wrench, 
  ArrowRight,
  CheckCircle2,
  Phone,
  MapPin,
  Shield,
  Cog
} from 'lucide-react';
import Link from 'next/link';

// Semantic triples for AEO - these are clear, extractable facts
const heroTriples = [
  'AGT Equipment sells mini excavators and skid steers.',
  'AGT Equipment operates warehouses in California and Illinois.',
  'AGT Equipment offers factory direct pricing on all machinery.',
];

const categories = [
  {
    title: 'Mini Excavators',
    description: '1-4 ton compact excavators with Kubota and Rato diesel engines. Cabin and canopy options available.',
    href: '/category/mini-excavators',
    icon: Cog,
    specs: ['1-4 ton capacity', 'Kubota/Rato engines', 'Hydraulic thumb'],
  },
  {
    title: 'Mini Skid Steers',
    description: 'Stand-on and track loaders for landscaping, construction, and property maintenance.',
    href: '/category/skid-steer',
    icon: Truck,
    specs: ['500-900 kg', 'Multiple attachments', 'Track or wheel'],
  },
  {
    title: 'Attachments & Parts',
    description: 'Buckets, augers, brush cutters, hammers, and genuine replacement parts.',
    href: '/category/attachments',
    icon: Wrench,
    specs: ['100+ attachments', 'Genuine parts', 'Fast shipping'],
  },
];

const trustSignals = [
  {
    icon: Shield,
    title: '1-Year Warranty',
    description: 'All machines covered',
  },
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'Continental US',
  },
  {
    icon: MapPin,
    title: 'US Warehouses',
    description: 'CA & IL locations',
  },
  {
    icon: Phone,
    title: 'Expert Support',
    description: 'Technical assistance',
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section id="hero-section" className="relative bg-gradient-to-b from-primary/5 to-background py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-balance">
              Mini Excavators & Skid Steers{' '}
              <span className="text-primary">Factory Direct</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              AGT Equipment delivers compact excavators and skid steers directly from our 
              US warehouses. Kubota and Rato engines, 1-year warranty, and free shipping.
            </p>
            
            {/* Quick Answer for AEO */}
            <div className="mt-8 quick-answer text-left" data-speakable="quick-answer">
              <strong>Quick Answer:</strong>{' '}
              AGT Equipment sells 1-4 ton mini excavators and skid steers with Kubota or Rato 
              diesel engines. Machines ship free from US warehouses in California and Illinois. 
              All equipment includes a 1-year warranty.
            </div>

            {/* Semantic Triples (machine-readable facts) */}
            <div className="mt-6 text-sm text-muted-foreground">
              {heroTriples.map((triple, i) => (
                <span key={i} className="semantic-triple mr-2">{triple}</span>
              ))}
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/products">
                  Browse Equipment
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/knowledge/how-to-choose-mini-excavator">
                  Buying Guide
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="border-y bg-muted/30 py-8">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustSignals.map((signal) => (
              <div key={signal.title} className="flex items-center gap-3">
                <signal.icon className="h-8 w-8 text-primary flex-shrink-0" />
                <div>
                  <div className="font-semibold">{signal.title}</div>
                  <div className="text-sm text-muted-foreground">{signal.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Product Categories</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Explore our range of compact equipment for construction, landscaping, 
              agriculture, and property maintenance.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Card key={category.title} className="group hover:shadow-lg transition-shadow">
                <CardHeader>
                  <category.icon className="h-10 w-10 text-primary mb-2" />
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {category.title}
                  </CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-4">
                    {category.specs.map((spec) => (
                      <li key={spec} className="flex items-center text-sm">
                        <CheckCircle2 className="h-4 w-4 text-primary mr-2" />
                        {spec}
                      </li>
                    ))}
                  </ul>
                  <Button asChild variant="outline" className="w-full">
                    <Link href={category.href}>
                      View Products
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why AGT Section */}
      <section className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                Why Choose AGT Equipment?
              </h2>
              <div className="mt-6 space-y-4">
                <p>
                  <strong>AGT Equipment</strong> specializes in compact excavation and 
                  loading equipment for contractors, farmers, and property owners.
                </p>
                <p>
                  <strong>We operate</strong> warehouses in California and Illinois, 
                  enabling fast delivery across the continental United States.
                </p>
                <p>
                  <strong>Every machine</strong> includes a 1-year warranty and 
                  access to our technical support team.
                </p>
                {/* Semantic triples for AEO */}
                <div className="mt-6 text-sm opacity-90 space-y-1">
                  <p>AGT Equipment specializes in compact construction equipment.</p>
                  <p>AGT Equipment operates warehouses in California and Illinois.</p>
                  <p>AGT Equipment provides 1-year warranty on all machinery.</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-primary-foreground/10 border-primary-foreground/20">
                <CardHeader>
                  <CardTitle className="text-2xl">250+</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-primary-foreground/80">
                    Products in stock
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="bg-primary-foreground/10 border-primary-foreground/20">
                <CardHeader>
                  <CardTitle className="text-2xl">500+</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-primary-foreground/80">
                    Machines sold
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="bg-primary-foreground/10 border-primary-foreground/20">
                <CardHeader>
                  <CardTitle className="text-2xl">4.9★</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-primary-foreground/80">
                    Average rating
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="bg-primary-foreground/10 border-primary-foreground/20">
                <CardHeader>
                  <CardTitle className="text-2xl">2</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-primary-foreground/80">
                    US warehouses
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight">
              Ready to Find Your Equipment?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Browse our catalog or contact our team for personalized recommendations.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/products">
                  View All Products
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">
                  Contact Us
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
