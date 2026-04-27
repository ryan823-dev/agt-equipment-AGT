'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/lib/contexts/AuthContext';
import { getSupabaseClient } from '@/lib/supabase/client';
import { Order, OrderItem, OrderStatus } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Loader2,
  ArrowLeft,
  Package,
  Truck,
  CheckCircle,
  Clock,
  XCircle,
  MapPin,
  CreditCard,
} from 'lucide-react';

const statusConfig: Record<OrderStatus, { label: string; icon: typeof Clock; color: string }> = {
  pending: { label: 'Pending', icon: Clock, color: 'text-yellow-600 bg-yellow-50' },
  confirmed: { label: 'Confirmed', icon: CheckCircle, color: 'text-blue-600 bg-blue-50' },
  processing: { label: 'Processing', icon: Package, color: 'text-blue-600 bg-blue-50' },
  shipped: { label: 'Shipped', icon: Truck, color: 'text-purple-600 bg-purple-50' },
  delivered: { label: 'Delivered', icon: CheckCircle, color: 'text-green-600 bg-green-50' },
  cancelled: { label: 'Cancelled', icon: XCircle, color: 'text-red-600 bg-red-50' },
  refunded: { label: 'Refunded', icon: XCircle, color: 'text-gray-600 bg-gray-50' },
};

const statusSteps: OrderStatus[] = ['pending', 'confirmed', 'processing', 'shipped', 'delivered'];

export default function OrderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const orderId = params.id as string;
  const supabase = getSupabaseClient();

  const fetchOrder = useCallback(async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('orders')
      .select('*, order_items(*)')
      .eq('id', orderId)
      .eq('user_id', user.id)
      .single();

    if (!error && data) {
      setOrder(data as Order);
    }
    setIsLoading(false);
  }, [orderId, user, supabase]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }

    if (user) {
      fetchOrder();
    }
  }, [isAuthenticated, user, router, fetchOrder]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Order not found</h2>
        <p className="text-gray-600 mb-6">The order you&apos;re looking for doesn&apos;t exist.</p>
        <Button asChild>
          <Link href="/account/orders">Back to Orders</Link>
        </Button>
      </div>
    );
  }

  const status = statusConfig[order.status];
  const StatusIcon = status.icon;
  const currentStepIndex = statusSteps.indexOf(order.status);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/account/orders"
            className="text-blue-600 hover:underline flex items-center gap-1 mb-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Orders
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Order #{order.order_number}</h1>
          <p className="text-gray-600 mt-1">
            Placed on {new Date(order.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${status.color}`}>
          <StatusIcon className="h-5 w-5" />
          <span className="font-medium">{status.label}</span>
        </div>
      </div>

      {/* Order Status Timeline */}
      {order.status !== 'cancelled' && order.status !== 'refunded' && (
        <Card>
          <CardContent className="p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Order Status</h2>
            <div className="relative">
              {/* Progress Line */}
              <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200">
                <div
                  className="h-full bg-blue-600 transition-all duration-500"
                  style={{
                    width: `${(currentStepIndex / (statusSteps.length - 1)) * 100}%`,
                  }}
                />
              </div>

              {/* Steps */}
              <div className="relative flex justify-between">
                {statusSteps.map((step, index) => {
                  const stepConfig = statusConfig[step];
                  const StepIcon = stepConfig.icon;
                  const isComplete = index <= currentStepIndex;
                  const isCurrent = index === currentStepIndex;

                  return (
                    <div key={step} className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          isComplete
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-400'
                        } ${isCurrent ? 'ring-4 ring-blue-200' : ''}`}
                      >
                        <StepIcon className="h-5 w-5" />
                      </div>
                      <span
                        className={`mt-2 text-sm font-medium ${
                          isComplete ? 'text-gray-900' : 'text-gray-400'
                        }`}
                      >
                        {stepConfig.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Tracking Number */}
            {order.tracking_number && (
              <div className="mt-6 pt-4 border-t">
                <p className="text-sm text-gray-600">
                  Tracking Number:{' '}
                  <span className="font-medium text-gray-900">{order.tracking_number}</span>
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Items */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <h2 className="font-semibold text-gray-900 mb-4">Order Items</h2>
              <div className="space-y-4">
                {order.items?.map((item: OrderItem) => (
                  <div key={item.id} className="flex gap-4 py-4 border-b last:border-0">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{item.product_name}</p>
                      {item.product_sku && (
                        <p className="text-sm text-gray-500">SKU: {item.product_sku}</p>
                      )}
                      <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                      {item.specifications && Object.keys(item.specifications).length > 0 && (
                        <div className="mt-2 text-sm text-gray-500">
                          {Object.entries(item.specifications).map(([key, value]) => (
                            <span key={key} className="mr-3">
                              {key}: {String(value)}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${item.unit_price.toLocaleString()}</p>
                      <p className="text-sm text-gray-500">
                        Total: ${item.subtotal.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Totals */}
              <div className="mt-6 pt-4 border-t space-y-2">
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
                {order.discount_amount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount</span>
                    <span>-${order.discount_amount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                  <span>Total</span>
                  <span>${order.total_amount.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Shipping & Payment Info */}
        <div className="space-y-6">
          {/* Shipping Address */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="h-5 w-5 text-gray-400" />
                <h2 className="font-semibold text-gray-900">Shipping Address</h2>
              </div>
              <div className="text-sm text-gray-600 space-y-1">
                <p>
                  {order.shipping_address?.first_name} {order.shipping_address?.last_name}
                </p>
                {order.shipping_address?.company && (
                  <p>{order.shipping_address.company}</p>
                )}
                <p>{order.shipping_address?.address_line1}</p>
                {order.shipping_address?.address_line2 && (
                  <p>{order.shipping_address.address_line2}</p>
                )}
                <p>
                  {order.shipping_address?.city}, {order.shipping_address?.state}{' '}
                  {order.shipping_address?.postal_code}
                </p>
                <p>{order.shipping_address?.country}</p>
              </div>
            </CardContent>
          </Card>

          {/* Billing Address */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <CreditCard className="h-5 w-5 text-gray-400" />
                <h2 className="font-semibold text-gray-900">Payment Method</h2>
              </div>
              <p className="text-sm text-gray-600 capitalize">
                {order.payment_method === 'stripe' ? 'Credit / Debit Card' : 'PayPal'}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Status:{' '}
                <span className={`font-medium ${
                  order.payment_status === 'paid' ? 'text-green-600' : 'text-yellow-600'
                }`}>
                  {order.payment_status.charAt(0).toUpperCase() + order.payment_status.slice(1)}
                </span>
              </p>
            </CardContent>
          </Card>

          {/* Customer Notes */}
          {order.customer_notes && (
            <Card>
              <CardContent className="p-6">
                <h2 className="font-semibold text-gray-900 mb-2">Order Notes</h2>
                <p className="text-sm text-gray-600">{order.customer_notes}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        {order.status === 'delivered' && (
          <Button asChild>
            <Link href="/support">Request Support</Link>
          </Button>
        )}
        {order.status === 'pending' && (
          <Button variant="outline" className="text-red-600 hover:text-red-700">
            Cancel Order
          </Button>
        )}
      </div>
    </div>
  );
}
