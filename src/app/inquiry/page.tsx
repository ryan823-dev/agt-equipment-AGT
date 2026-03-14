'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import InquiryForm from '@/components/inquiry/InquiryForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight } from 'lucide-react';

export default function InquiryPage() {
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(false);
  const [inquiryNumber, setInquiryNumber] = useState('');

  const handleSuccess = () => {
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="container py-12">
        <div className="max-w-lg mx-auto text-center">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Inquiry Submitted Successfully!
          </h1>
          <p className="text-gray-600 mb-6">
            Thank you for your interest. Our team will review your inquiry and contact you within 24 hours.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="outline">
              <Link href="/account/quotes">
                View My Inquiries
              </Link>
            </Button>
            <Button asChild>
              <Link href="/mini-excavators">
                Continue Shopping
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Request a Quote</h1>
          <p className="text-gray-600 mt-1">
            Get personalized pricing for your equipment needs. Our team will respond within 24 hours.
          </p>
        </div>

        <Card>
          <CardContent className="p-6">
            <InquiryForm onSuccess={handleSuccess} />
          </CardContent>
        </Card>

        {/* Trust Signals */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="text-center p-4">
            <div className="text-2xl font-bold text-blue-600">24h</div>
            <div className="text-sm text-gray-600">Response Time</div>
          </div>
          <div className="text-center p-4">
            <div className="text-2xl font-bold text-blue-600">500+</div>
            <div className="text-sm text-gray-600">Happy Customers</div>
          </div>
          <div className="text-center p-4">
            <div className="text-2xl font-bold text-blue-600">Best Price</div>
            <div className="text-sm text-gray-600">Guarantee</div>
          </div>
        </div>
      </div>
    </div>
  );
}