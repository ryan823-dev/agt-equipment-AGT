import { Metadata } from 'next';
import { Card, CardContent } from '@/components/ui/card';
import { JsonLd } from '@/components/seo/JsonLd';
import { generateOrganizationSchema } from '@/lib/schema';
import { canonicalUrl } from '@/lib/seo';
import { MapPin, Phone, Mail, Clock, Users, Award, Truck, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us - AGT Industrial Inc.',
  description: 'AGT Industrial Inc. has been manufacturing compact construction equipment since 2004. US warehouses in California and Illinois provide fast delivery.',
  alternates: {
    canonical: canonicalUrl('/about/'),
  },
};

const stats = [
  { label: 'Years in Business', value: '20+' },
  { label: 'Products Sold', value: '5000+' },
  { label: 'US Warehouses', value: '2' },
  { label: 'Customer Rating', value: '4.9/5' },
];

const values = [
  {
    icon: Shield,
    title: 'Quality First',
    description: 'Every machine is tested before shipping. We use proven engines from Kubota and Rato.',
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'US warehouses in California and Illinois mean faster delivery and easier support.',
  },
  {
    icon: Users,
    title: 'Customer Support',
    description: 'Our team provides technical support before and after your purchase.',
  },
  {
    icon: Award,
    title: 'Warranty Included',
    description: 'All equipment comes with a 1-year warranty for your peace of mind.',
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={generateOrganizationSchema()} />

      <div className="container py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight mb-4">About AGT Equipment</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            AGT Industrial Inc. manufactures and distributes compact construction equipment 
            for contractors, farmers, and property owners across North America.
          </p>
        </div>

        {/* Quick Answer for AEO */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="quick-answer" data-speakable="quick-answer">
            <strong>Quick Answer:</strong>{' '}
            AGT Industrial Inc. is a manufacturer of mini excavators and skid steers, founded in 2004. 
            The company operates US warehouses in Santa Ana, California and Chicago, Illinois, 
            providing factory-direct pricing with free continental US shipping.
          </div>

          {/* Semantic Triples for AEO */}
          <div className="mt-4 text-sm text-muted-foreground">
            <span className="semantic-triple">AGT Industrial Inc. was founded in 2004.</span>{' '}
            <span className="semantic-triple">AGT Industrial Inc. operates warehouses in California and Illinois.</span>{' '}
            <span className="semantic-triple">AGT Industrial Inc. manufactures mini excavators and skid steers.</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="pt-6 text-center">
                <div className="text-3xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Story Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Story</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                AGT Industrial Inc. began manufacturing compact construction equipment in 2004. 
                Our focus has always been on delivering reliable machinery at competitive prices 
                by selling directly to customers.
              </p>
              <p>
                Today, we offer a full line of mini excavators (1-4 ton), skid steers, attachments, 
                and parts. Our equipment is used by contractors, farmers, landscapers, and property 
                owners across North America.
              </p>
              <p>
                With warehouses in California and Illinois, we provide fast shipping and responsive 
                customer support. Every machine includes a 1-year warranty and access to our 
                technical team.
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Values</h2>
            <div className="space-y-4">
              {values.map((value) => (
                <div key={value.title} className="flex gap-4">
                  <value.icon className="h-8 w-8 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Warehouses */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Our Locations</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <MapPin className="h-6 w-6 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">California Warehouse</h3>
                    <address className="text-sm text-muted-foreground not-italic">
                      2602 Halladay Street<br />
                      Santa Ana, CA 92707<br />
                      United States
                    </address>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <MapPin className="h-6 w-6 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Illinois Warehouse</h3>
                    <address className="text-sm text-muted-foreground not-italic">
                      6200 S Oak Park Ave<br />
                      Chicago, IL 60638<br />
                      United States
                    </address>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-muted/50 rounded-lg p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold">Get in Touch</h2>
            <p className="text-muted-foreground mt-2">Our team is ready to help with your equipment needs.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-primary" />
              <a href="tel:+19498987669" className="hover:text-primary">+1 (949) 898-7669</a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              <a href="mailto:info@agrotkindustrial.com" className="hover:text-primary">info@agrotkindustrial.com</a>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <span>Mon-Fri: 8AM - 5PM PST</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
