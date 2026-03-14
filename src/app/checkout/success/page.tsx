'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/contexts/AuthContext';
import { getSupabaseClient } from '@/lib/supabase/client';
import { Order } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Package, Truck, ArrowRight, Loader2 } from 'lucide-react';

export default function CheckoutSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isAuthenticated } = useAuth();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const orderId = searchParams.get('orderId');

  useEffect(() => {
    if (!isAuthenticated && !orderId) {
      router.push('/auth/login');
      return;
    }

    fetchOrder();
  }, [isAuthenticated, orderId]);

  const fetchOrder = async () => {
    const supabase = getSupabaseClient();

    let query = supabase
      .from('orders')
      .select('*, order_items(*)')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (orderId) {
      query = supabase
        .from('orders')
        .select('*, order_items(*)')
        .eq('id', orderId)
        .single();
    }

    const { data, error } = await query;

    if (!error && data) {
      setOrder(data as Order);
    }

    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="container py-12 flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="container py-12">
      <div className="max-w-2xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Order Confirmed!</h1>
          <p className="text-gray-600 mt-2">
            Thank you for your purchase. We&apos;ve received your order.
          </p>
        </div>

        {/* Order Details */}
        {order && (
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-gray-900">Order Details</h2>
                <span className="text-sm text-gray-500">
                  Order #{order.order_number}
                </span>
              </div>

              <div className="space-y-4">
                {/* Order Items */}
                {order.items && order.items.length > 0 && (
                  <div className="border rounded-lg divide-y">
                    {order.items.map((item) => (
                      <div key={item.id} className="p-4 flex justify-between">
                        <div>
                          <p className="font-medium">{item.product_name}</p>
                          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-medium">${item.subtotal.toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Totals */}
                <div className="space-y-2 pt-4 border-t">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span>${order.subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span>{order.shipping_cost === 0 ? 'Free' : `$${order.shipping_cost}`}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax</span>
                    <span>${order.tax_amount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-semibold pt-2 border-t">
                    <span>Total</span>
                    <span>${order.total_amount.toFixed(2)}</span>
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="pt-4 border-t">
                  <h3 className="font-medium text-gray-900 mb-2">Shipping Address</h3>
                  <p className="text-sm text-gray-600">
                    {order.shipping_address?.first_name} {order.shipping_address?.last_name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {order.shipping_address?.address_line1}
                  </p>
                  <p className="text-sm text-gray-600">
                    {order.shipping_address?.city}, {order.shipping_address?.state}{' '}
                    {order.shipping_address?.postal_code}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* What's Next */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h2 className="font-semibold text-gray-900 mb-4">What&apos;s Next?</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Package className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Order Processing</p>
                  <p className="text-sm text-gray-600">
                    We&apos;re preparing your order for shipment.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Truck className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Shipping Updates</p>
                  <p className="text-sm text-gray-600">
                    You&apos;ll receive email updates about your shipment.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          {isAuthenticated && (
            <Button asChild variant="outline" className="flex-1">
              <Link href="/account/orders">
                View All Orders
              </Link>
            </Button>
          )}
          <Button asChild className="flex-1">
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