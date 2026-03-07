import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { JsonLd } from '@/components/seo/JsonLd';
import { generateOrganizationSchema } from '@/lib/schema';
import { getProducts, getCategories } from '@/lib/data';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Products - Mini Excavators, Skid Steers & Attachments',
  description: 'Browse AGT Equipment products: 1-4 ton mini excavators, skid steers, attachments, and parts. Factory direct pricing with free US shipping.',
  alternates: {
    canonical: 'https://agt-equipment.com/products',
  },
};

export default async function ProductsPage() {
  const categories = await getCategories();

  return (
    <>
      <JsonLd data={generateOrganizationSchema()} />
      
      <div className="container py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight">
            Mini Excavators, Skid Steers & Attachments
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            AGT Equipment offers factory direct pricing on compact construction equipment. 
            Free shipping from US warehouses in California and Illinois.
          </p>
          
          {/* Quick Answer for AEO */}
          <div className="mt-6 quick-answer text-left max-w-2xl mx-auto" data-speakable="quick-answer">
            <strong>Quick Answer:</strong>{' '}
            AGT Equipment sells mini excavators (1-4 ton), skid steers, attachments, and parts. 
            All products ship free within the continental US and include a 1-year warranty.
          </div>
        </div>

        {/* Category Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Card key={category.slug} className="group hover:shadow-lg transition-shadow">
              <CardHeader>
                {category.image && (
                  <div className="aspect-video relative bg-muted rounded mb-4 overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <CardTitle className="group-hover:text-primary transition-colors">
                  {category.name}
                </CardTitle>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {category.productCount} products
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href={`/products/${category.slug}`}>
                    View Products
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Signals */}
        <div className="mt-16 bg-muted/50 rounded-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold">Why Buy From AGT Equipment?</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <CheckCircle2 className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold">Factory Direct</h3>
              <p className="text-sm text-muted-foreground">No middleman markup</p>
            </div>
            <div className="text-center">
              <CheckCircle2 className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold">Free Shipping</h3>
              <p className="text-sm text-muted-foreground">Continental US</p>
            </div>
            <div className="text-center">
              <CheckCircle2 className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold">1-Year Warranty</h3>
              <p className="text-sm text-muted-foreground">All equipment covered</p>
            </div>
            <div className="text-center">
              <CheckCircle2 className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold">Expert Support</h3>
              <p className="text-sm text-muted-foreground">Technical assistance</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
