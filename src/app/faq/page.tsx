import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { JsonLd } from '@/components/seo/JsonLd';
import { FAQSection } from '@/components/seo/FAQSection';
import { generateFAQSchema, generateOrganizationSchema } from '@/lib/schema';
import { canonicalUrl } from '@/lib/seo';
import { Phone, Truck, Shield, Wrench, CreditCard, Package } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions - Mini Excavators & Skid Steers',
  description: 'Answers to common questions about AGT mini excavators, skid steers, shipping, warranty, financing, and parts. Get expert advice on choosing the right equipment.',
  alternates: {
    canonical: canonicalUrl('/faq/'),
  },
};

const faqCategories = [
  {
    title: 'Products & Specifications',
    icon: Wrench,
    faqs: [
      {
        question: 'What size mini excavator do I need?',
        answer: 'Match your excavator size to your dig depth needs: 1-ton for 3-4ft trenches, 2-ton for 5-6ft trenches, 4-ton for 8-12ft trenches. Also consider transport: 1-ton fits in a pickup bed, while a 4-ton requires a heavy-duty trailer.',
      },
      {
        question: 'What engines do AGT excavators use?',
        answer: 'AGT excavators use Kubota or Rato diesel engines. Kubota engines (D1103, V2403-CR) offer more power and longer life for daily commercial use. Rato engines (186F) are more affordable and reliable for occasional use under 500 hours/year.',
      },
      {
        question: 'What is the difference between H15R and DM12X?',
        answer: 'The H15R ($11,999) uses a Rato 186F 13.5 HP engine with 5\'9" dig depth. The DM12X ($14,999) uses a Kubota D1103 24.8 HP engine with 6\'7" dig depth. Choose DM12X for more power and deeper digging.',
      },
      {
        question: 'What attachments work with AGT equipment?',
        answer: 'AGT mini excavators accept standard pin-on buckets (12-24"), hydraulic thumbs, augers, and hammers. Skid steers use universal quick-attach mounting compatible with 100+ attachments from most major brands.',
      },
      {
        question: 'Do AGT machines have cabs or canopies?',
        answer: 'Most AGT excavators offer both canopy (open) and cabin (enclosed) options. The CFG-40UF 4-ton excavator includes a climate-controlled cabin with A/C standard. Canopy models are more affordable and better for fair weather.',
      },
    ],
  },
  {
    title: 'Shipping & Delivery',
    icon: Truck,
    faqs: [
      {
        question: 'Is shipping really free?',
        answer: 'Yes, AGT Equipment provides free shipping within the continental United States. Equipment ships from our warehouses in Santa Ana, CA or Chicago, IL. Alaska, Hawaii, and international shipping available for additional cost.',
      },
      {
        question: 'How long does delivery take?',
        answer: 'Delivery typically takes 3-7 business days depending on your location relative to our California or Illinois warehouses. We provide tracking information once your equipment ships.',
      },
      {
        question: 'Do I need to be present for delivery?',
        answer: 'Yes, someone must be present to sign for delivery. Equipment is delivered on a flatbed or lowboy trailer. You\'ll need equipment (forks, excavator) or a ramp to unload, or we can arrange liftgate delivery for smaller machines.',
      },
      {
        question: 'Can I pick up my equipment?',
        answer: 'Yes, pickup is available at our Santa Ana, CA or Chicago, IL warehouses. Contact us to schedule a pickup appointment and we\'ll deduct shipping costs from your order.',
      },
    ],
  },
  {
    title: 'Warranty & Support',
    icon: Shield,
    faqs: [
      {
        question: 'What does the warranty cover?',
        answer: 'All AGT equipment includes a 1-year warranty covering manufacturing defects and component failures under normal use. This includes engine, hydraulics, electrical systems, and structural components. Wear items (filters, tracks, belts) are not covered.',
      },
      {
        question: 'How do I get warranty service?',
        answer: 'Contact our support team at (949) 898-7669 or info@agrotkindustrial.com. We\'ll diagnose the issue and either ship replacement parts or direct you to a nearby service center. For major repairs, we may arrange return shipping.',
      },
      {
        question: 'Are parts available?',
        answer: 'Yes, AGT stocks common wear items (filters, belts, hydraulic seals) and major components for all models. Most parts ship within 1-2 business days. Engine parts for Kubota and Rato engines are widely available.',
      },
      {
        question: 'Is technical support available after purchase?',
        answer: 'Yes, our technical support team is available Monday-Friday 8AM-5PM PST to help with operation, maintenance, and troubleshooting. We also provide video tutorials and written guides in our Knowledge Center.',
      },
    ],
  },
  {
    title: 'Financing & Payment',
    icon: CreditCard,
    faqs: [
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept bank wire transfer, ACH, cashier\'s check, and credit cards (3% processing fee for cards). For orders over $10,000, bank transfer or ACH is preferred.',
      },
      {
        question: 'Do you offer financing?',
        answer: 'Yes, we partner with equipment financing providers to offer terms from 24-60 months. Approval typically takes 1-2 business days. Contact us for a financing quote.',
      },
      {
        question: 'Is a deposit required?',
        answer: 'A 10% deposit is required to reserve equipment. Full payment is due before shipping. For custom orders, a 30% deposit may be required.',
      },
    ],
  },
  {
    title: 'Ordering & Returns',
    icon: Package,
    faqs: [
      {
        question: 'How do I place an order?',
        answer: 'Call us at (949) 898-7669, email info@agrotkindustrial.com, or use the contact form on our website. We\'ll confirm availability, provide a formal quote, and process your order.',
      },
      {
        question: 'Can I return equipment?',
        answer: 'Equipment can be returned within 7 days of delivery if unused and in original condition. Return shipping costs are the buyer\'s responsibility. A 15% restocking fee may apply. Contact us before returning.',
      },
      {
        question: 'How do I check order status?',
        answer: 'Contact us by phone or email with your order number. We\'ll provide current status and tracking information once shipped.',
      },
    ],
  },
];

// Flatten all FAQs for schema
const allFaqs = faqCategories.flatMap((cat) => cat.faqs);

export default function FAQPage() {
  return (
    <>
      <JsonLd data={generateOrganizationSchema()} />
      <JsonLd data={generateFAQSchema(allFaqs)} />

      <div className="container py-8">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about our mini excavators, skid steers, 
            shipping, warranty, and more.
          </p>

          {/* Quick Answer for AEO */}
          <div className="mt-6 quick-answer text-left max-w-2xl mx-auto" data-speakable="quick-answer">
            <strong>Quick Answer:</strong>{' '}
            AGT Equipment sells mini excavators ($11,999-$29,000) and skid steers ($8,999+) 
            with free continental US shipping, 1-year warranty, and financing available. 
            Call (949) 898-7669 for personalized assistance.
          </div>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-12">
          {faqCategories.map((category) => (
            <section key={category.title}>
              <div className="flex items-center gap-3 mb-6">
                <category.icon className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold">{category.title}</h2>
              </div>
              <FAQSection faqs={category.faqs} />
            </section>
          ))}
        </div>

        {/* CTA */}
        <section className="mt-16 bg-primary text-primary-foreground rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-2">Still Have Questions?</h2>
          <p className="mb-6 opacity-90">
            Our equipment specialists are ready to help you find the right machine for your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="secondary" size="lg">
              <Link href="/contact">Contact Us</Link>
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
