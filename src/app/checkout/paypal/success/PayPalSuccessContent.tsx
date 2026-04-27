'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle } from 'lucide-react';

export default function PayPalSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const token = searchParams.get('token');
  const PayerID = searchParams.get('PayerID');

  const capturePayment = useCallback(async () => {
    try {
      // Get pending order ID from session storage
      const pendingOrderId = sessionStorage.getItem('pendingOrderId');

      // Capture PayPal payment
      const response = await fetch('/api/payment/paypal/capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: pendingOrderId,
          paypalOrderId: token,
        }),
      });

      const data = await response.json();

      if (data.success) {
        sessionStorage.removeItem('pendingOrderId');
        router.push(`/checkout/success?orderId=${pendingOrderId}`);
      } else {
        setError(data.error || 'Failed to complete payment');
        setIsProcessing(false);
      }
    } catch (err) {
      console.error('PayPal capture error:', err);
      setError('An error occurred while processing your payment');
      setIsProcessing(false);
    }
  }, [router, token]);

  useEffect(() => {
    if (token && PayerID) {
      capturePayment();
    } else {
      setError('Invalid PayPal response');
      setIsProcessing(false);
    }
  }, [token, PayerID, capturePayment]);

  if (isProcessing) {
    return (
      <div className="container py-12 flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600 mb-4" />
        <h1 className="text-xl font-semibold text-gray-900">Processing your payment...</h1>
        <p className="text-gray-600 mt-2">Please wait while we confirm your order.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-12">
        <div className="max-w-md mx-auto text-center">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
            <CheckCircle className="h-10 w-10 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Payment Error</h1>
          <p className="text-gray-600 mt-2">{error}</p>
          <div className="mt-6 flex flex-col gap-3">
            <Button asChild>
              <Link href="/checkout">Try Again</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/cart">Return to Cart</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
