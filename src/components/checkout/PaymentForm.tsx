'use client';

import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useCheckout } from '@/lib/contexts/CheckoutContext';
import { useAuth } from '@/lib/contexts/AuthContext';
import { useCart } from '@/lib/contexts/CartContext';
import { PaymentMethod } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, CreditCard, ArrowLeft, AlertCircle } from 'lucide-react';

// Check if Stripe is configured
const isStripeConfigured = !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

// Initialize Stripe only if configured
const stripePromise = isStripeConfigured
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '')
  : null;

// Card element styling
const cardElementOptions = {
  style: {
    base: {
      fontSize: '16px',
      color: '#1f2937',
      '::placeholder': {
        color: '#9ca3af',
      },
    },
    invalid: {
      color: '#ef4444',
    },
  },
};

function StripePaymentForm({ onSuccess, total }: { onSuccess: () => void; total: number }) {
  const stripe = useStripe();
  const elements = useElements();
  const { shippingAddress, customerNotes } = useCheckout();
  const { items, clearCart } = useCart();
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      // Create payment intent
      const response = await fetch('/api/payment/stripe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: Math.round(total * 100), // Convert to cents
          currency: 'usd',
        }),
      });

      const { clientSecret, orderId } = await response.json();

      if (!clientSecret) {
        throw new Error('Failed to create payment intent');
      }

      // Confirm card payment
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement)!,
            billing_details: {
              name: `${shippingAddress?.first_name} ${shippingAddress?.last_name}`,
              email: user?.email,
              address: {
                line1: shippingAddress?.address_line1,
                line2: shippingAddress?.address_line2,
                city: shippingAddress?.city,
                state: shippingAddress?.state,
                postal_code: shippingAddress?.postal_code,
                country: shippingAddress?.country,
              },
            },
          },
        }
      );

      if (stripeError) {
        setError(stripeError.message || 'Payment failed');
        setIsProcessing(false);
        return;
      }

      if (paymentIntent?.status === 'succeeded') {
        // Update order with payment confirmation
        await fetch('/api/orders/confirm', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderId,
            paymentId: paymentIntent.id,
            paymentMethod: 'stripe',
          }),
        });

        // Clear cart and redirect
        await clearCart();
        onSuccess();
      }
    } catch (err) {
      console.error('Payment error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="p-4 border rounded-lg bg-gray-50">
        <CardElement options={cardElementOptions} />
      </div>

      {error && (
        <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
          {error}
        </div>
      )}

      <Button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full"
        size="lg"
      >
        {isProcessing ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Processing...
          </>
        ) : (
          `Pay $${total.toFixed(2)}`
        )}
      </Button>

      <p className="text-xs text-gray-500 text-center">
        Your payment is secured with SSL encryption
      </p>
    </form>
  );
}

function PayPalButton({ onSuccess, total }: { onSuccess: () => void; total: number }) {
  const { shippingAddress, customerNotes } = useCheckout();
  const { items, clearCart } = useCart();
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayPal = async () => {
    setIsProcessing(true);

    try {
      // Create PayPal order
      const response = await fetch('/api/payment/paypal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: total,
          currency: 'USD',
          returnUrl: `${window.location.origin}/checkout/paypal/success`,
          cancelUrl: `${window.location.origin}/checkout/paypal/cancel`,
        }),
      });

      const { approvalUrl, orderId } = await response.json();

      if (approvalUrl) {
        // Store order ID in session storage for later retrieval
        sessionStorage.setItem('pendingOrderId', orderId);
        window.location.href = approvalUrl;
      }
    } catch (error) {
      console.error('PayPal error:', error);
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-4">
      <Button
        type="button"
        onClick={handlePayPal}
        disabled={isProcessing}
        variant="outline"
        className="w-full h-12 bg-[#0070ba] hover:bg-[#003087] text-white border-0"
        size="lg"
      >
        {isProcessing ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Redirecting to PayPal...
          </>
        ) : (
          <>
            <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.72a.771.771 0 0 1 .757-.629h6.527c2.167 0 3.917.472 5.063 1.365 1.237.966 1.68 2.397 1.318 4.255-.558 2.858-2.506 4.258-5.47 4.258h-2.31a.771.771 0 0 0-.757.629l-.85 5.39a.641.641 0 0 1-.633.549zm9.363-15.242c-.798-.627-2.131-.946-3.963-.946H6.94l-1.76 11.188h3.17l.796-5.037a.771.771 0 0 1 .757-.629h1.47c2.238 0 3.844-.503 4.774-1.496.93-.993 1.196-2.37.692-4.08z" />
            </svg>
            Pay with PayPal
          </>
        )}
      </Button>

      <p className="text-xs text-gray-500 text-center">
        You will be redirected to PayPal to complete your payment
      </p>
    </div>
  );
}

export default function PaymentForm() {
  const {
    paymentMethod,
    setPaymentMethod,
    customerNotes,
    setCustomerNotes,
    prevStep,
    shippingAddress,
  } = useCheckout();
  const { subtotal } = useCart();

  // Calculate totals
  const shipping = shippingAddress?.country === 'US' ? 0 : 500;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleSuccess = () => {
    window.location.href = '/checkout/success';
  };

  // Check if any payment method is available
  const hasPaymentMethods = isStripeConfigured;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Payment Method</h2>
        <p className="text-sm text-gray-600 mt-1">
          Choose how you want to pay
        </p>
      </div>

      {/* Payment Not Available Message */}
      {!hasPaymentMethods && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-yellow-800">Online Payment Unavailable</h3>
              <p className="text-sm text-yellow-700 mt-1">
                Online payment is currently unavailable. Please submit your order as an inquiry
                and our team will contact you with payment options.
              </p>
              <Button
                type="button"
                className="mt-3"
                onClick={() => window.location.href = '/inquiry'}
              >
                Submit as Inquiry
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Method Selection */}
      {hasPaymentMethods && (
        <div className="space-y-3">
          {isStripeConfigured && (
            <button
              onClick={() => setPaymentMethod('stripe')}
              className={`w-full p-4 rounded-lg border-2 text-left transition-colors ${
                paymentMethod === 'stripe'
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <CreditCard className="h-5 w-5 text-gray-600" />
                <div>
                  <span className="font-medium">Credit / Debit Card</span>
                  <p className="text-xs text-gray-500">Visa, Mastercard, American Express</p>
                </div>
              </div>
            </button>
          )}

          <button
            onClick={() => setPaymentMethod('paypal')}
            className={`w-full p-4 rounded-lg border-2 text-left transition-colors ${
              paymentMethod === 'paypal'
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="#0070ba">
                <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.72a.771.771 0 0 1 .757-.629h6.527c2.167 0 3.917.472 5.063 1.365 1.237.966 1.68 2.397 1.318 4.255-.558 2.858-2.506 4.258-5.47 4.258h-2.31a.771.771 0 0 0-.757.629l-.85 5.39a.641.641 0 0 1-.633.549z" />
              </svg>
              <div>
                <span className="font-medium">PayPal</span>
                <p className="text-xs text-gray-500">Pay with your PayPal account</p>
              </div>
            </div>
          </button>
        </div>
      )}

      {/* Payment Forms */}
      {hasPaymentMethods && (
        <div className="pt-4">
          {paymentMethod === 'stripe' && stripePromise ? (
            <Elements stripe={stripePromise}>
              <StripePaymentForm onSuccess={handleSuccess} total={total} />
            </Elements>
          ) : (
            <PayPalButton onSuccess={handleSuccess} total={total} />
          )}
        </div>
      )}

      {/* Order Notes */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Order Notes (Optional)
        </label>
        <textarea
          value={customerNotes}
          onChange={(e) => setCustomerNotes(e.target.value)}
          placeholder="Special instructions for your order..."
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px]"
        />
      </div>

      {/* Back Button */}
      <Button type="button" variant="ghost" onClick={prevStep}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Shipping
      </Button>
    </div>
  );
}