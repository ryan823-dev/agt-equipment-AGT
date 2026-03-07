import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { JsonLd } from '@/components/seo/JsonLd';
import { generateOrganizationSchema } from '@/lib/schema';
import { Phone, Mail, MapPin, Clock, MessageSquare } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us - Get a Quote',
  description: 'Contact AGT Equipment for quotes, technical support, and product inquiries. Call +1 (949) 898-7669 or email info@agrotkindustrial.com.',
  alternates: {
    canonical: 'https://agt-equipment.com/contact',
  },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd data={generateOrganizationSchema()} />

      <div className="container py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Contact Us</h1>
            <p className="text-lg text-muted-foreground">
              Get a quote, ask a question, or schedule a consultation with our equipment experts.
            </p>
          </div>

          {/* Quick Answer for AEO */}
          <div className="quick-answer mb-8" data-speakable="quick-answer">
            <strong>Quick Answer:</strong>{' '}
            Contact AGT Equipment by phone at +1 (949) 898-7669, email at info@agrotkindustrial.com, 
            or use the contact form below. Our team responds within 24 hours on business days.
          </div>

          {/* Contact Options */}
          <div className="grid md:grid-cols-3 gap-4 mb-12">
            <Card>
              <CardContent className="pt-6 text-center">
                <Phone className="h-8 w-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold">Call Us</h3>
                <a href="tel:+19498987669" className="text-primary hover:underline">
                  +1 (949) 898-7669
                </a>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Mail className="h-8 w-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold">Email Us</h3>
                <a href="mailto:info@agrotkindustrial.com" className="text-primary hover:underline">
                  info@agrotkindustrial.com
                </a>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold">Business Hours</h3>
                <p className="text-muted-foreground">Mon-Fri: 8AM - 5PM PST</p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Send a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="text-sm font-medium mb-1 block">
                        Name *
                      </label>
                      <Input id="name" name="name" required placeholder="Your name" />
                    </div>
                    <div>
                      <label htmlFor="phone" className="text-sm font-medium mb-1 block">
                        Phone
                      </label>
                      <Input id="phone" name="phone" type="tel" placeholder="Your phone" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="text-sm font-medium mb-1 block">
                      Email *
                    </label>
                    <Input id="email" name="email" type="email" required placeholder="your@email.com" />
                  </div>
                  <div>
                    <label htmlFor="subject" className="text-sm font-medium mb-1 block">
                      Subject *
                    </label>
                    <Input id="subject" name="subject" required placeholder="How can we help?" />
                  </div>
                  <div>
                    <label htmlFor="message" className="text-sm font-medium mb-1 block">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Tell us about your project or question..."
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Warehouse Locations */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    California Warehouse
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <address className="text-muted-foreground not-italic">
                    2602 Halladay Street<br />
                    Santa Ana, CA 92707<br />
                    United States
                  </address>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Illinois Warehouse
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <address className="text-muted-foreground not-italic">
                    6200 S Oak Park Ave<br />
                    Chicago, IL 60638<br />
                    United States
                  </address>
                </CardContent>
              </Card>

              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2">Need a Quick Quote?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Call us directly for immediate assistance. Our team can provide pricing, 
                    availability, and shipping estimates in minutes.
                  </p>
                  <Button asChild className="w-full">
                    <a href="tel:+19498987669">
                      <Phone className="mr-2 h-4 w-4" />
                      Call Now
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
