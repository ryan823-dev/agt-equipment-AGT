'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/lib/contexts/CartContext';
import { CheckoutProvider, useCheckout } from '@/lib/contexts/CheckoutContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Check, ArrowLeft } from 'lucide-react';
import ShippingForm from '@/components/checkout/ShippingForm';
import PaymentForm from '@/components/checkout/PaymentForm';
import ReviewOrder from '@/components/checkout/ReviewOrder';
import OrderSummary from '@/components/checkout/OrderSummary';

function CheckoutContent() {
  const router = useRouter();
  const { items, subtotal, isLoading: cartLoading } = useCart();
  const { currentStep, steps, shippingAddress, goToStep } = useCheckout();

  // Redirect if cart is empty
  useEffect(() => {
    if (!cartLoading && items.length === 0) {
      router.push('/cart');
    }
  }, [cartLoading, items.length, router]);

  if (cartLoading) {
    return (
      <div className="container py-12 flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (items.length === 0) {
    return null; // Will redirect
  }

  // Calculate totals
  const shipping = shippingAddress?.country === 'US' ? 0 : 500; // Free shipping for US
  const tax = subtotal * 0.08; // 8% tax estimate
  const total = subtotal + shipping + tax;

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <ShippingForm />;
      case 1:
        return <PaymentForm />;
      case 2:
        return <ReviewOrder />;
      default:
        return null;
    }
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <Link
          href="/cart"
          className="text-blue-600 hover:underline flex items-center gap-1 mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Cart
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <nav aria-label="Progress">
          <ol className="flex items-center">
            {steps.map((step, index) => (
              <li
                key={step.id}
                className={`relative ${index !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''}`}
              >
                <div className="flex items-center">
                  <button
                    onClick={() => {
                      if (step.status === 'complete') {
                        goToStep(index);
                      }
                    }}
                    disabled={step.status === 'upcoming'}
                    className={`relative flex h-8 w-8 items-center justify-center rounded-full ${
                      step.status === 'complete'
                        ? 'bg-blue-600'
                        : step.status === 'current'
                        ? 'border-2 border-blue-600 bg-white'
                        : 'border-2 border-gray-300 bg-white'
                    }`}
                  >
                    {step.status === 'complete' ? (
                      <Check className="h-5 w-5 text-white" />
                    ) : (
                      <span
                        className={`text-sm font-medium ${
                          step.status === 'current' ? 'text-blue-600' : 'text-gray-500'
                        }`}
                      >
                        {index + 1}
                      </span>
                    )}
                  </button>
                  <span
                    className={`ml-3 text-sm font-medium ${
                      step.status === 'current' ? 'text-blue-600' : 'text-gray-500'
                    }`}
                  >
                    {step.name}
                  </span>
                </div>
                {index !== steps.length - 1 && (
                  <div
                    className="absolute top-4 left-8 -ml-px h-0.5 w-full sm:w-20"
                    style={{
                      backgroundColor:
                        step.status === 'complete' ? '#2563eb' : '#d1d5db',
                    }}
                  />
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              {renderStep()}
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <OrderSummary
            items={items}
            subtotal={subtotal}
            shipping={shipping}
            tax={tax}
            total={total}
          />
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <CheckoutProvider>
      <CheckoutContent />
    </CheckoutProvider>
  );
}