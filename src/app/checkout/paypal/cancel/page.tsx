'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { XCircle } from 'lucide-react';

export default function PayPalCancelPage() {
  return (
    <div className="container py-12">
      <div className="max-w-md mx-auto text-center">
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-orange-100 mb-4">
          <XCircle className="h-10 w-10 text-orange-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Payment Cancelled</h1>
        <p className="text-gray-600 mt-2">
          Your payment was cancelled. Your cart items have been preserved.
        </p>
        <div className="mt-6 flex flex-col gap-3">
          <Button asChild>
            <Link href="/checkout">Return to Checkout</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/cart">View Cart</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}