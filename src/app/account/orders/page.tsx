'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/contexts/AuthContext';
import { getSupabaseClient } from '@/lib/supabase/client';
import { Order, OrderStatus } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Package, Clock, Truck, CheckCircle, XCircle, Loader2, ArrowRight } from 'lucide-react';

const statusConfig: Record<OrderStatus, { label: string; icon: typeof Clock; color: string }> = {
  pending: { label: 'Pending', icon: Clock, color: 'text-yellow-600 bg-yellow-50' },
  confirmed: { label: 'Confirmed', icon: CheckCircle, color: 'text-blue-600 bg-blue-50' },
  processing: { label: 'Processing', icon: Package, color: 'text-blue-600 bg-blue-50' },
  shipped: { label: 'Shipped', icon: Truck, color: 'text-purple-600 bg-purple-50' },
  delivered: { label: 'Delivered', icon: CheckCircle, color: 'text-green-600 bg-green-50' },
  cancelled: { label: 'Cancelled', icon: XCircle, color: 'text-red-600 bg-red-50' },
  refunded: { label: 'Refunded', icon: XCircle, color: 'text-gray-600 bg-gray-50' },
};

export default function OrdersPage() {
  const { user, isAuthenticated } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const supabase = getSupabaseClient();

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchOrders();
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated, user]);

  const fetchOrders = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('orders')
      .select('*, order_items(*)')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setOrders(data as Order[]);
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="bg-white rounded-lg border p-12 text-center">
        <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Sign in to view orders</h3>
        <p className="text-gray-500 mb-6">
          Please sign in to view your order history.
        </p>
        <Button asChild>
          <Link href="/auth/login">Sign In</Link>
        </Button>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
          <p className="text-gray-600 mt-1">View and track your orders.</p>
        </div>

        <div className="bg-white rounded-lg border p-12 text-center">
          <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
          <p className="text-gray-500 mb-6">When you place orders, they&apos;ll appear here.</p>
          <Button asChild>
            <Link href="/mini-excavators">
              Start Shopping
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
        <p className="text-gray-600 mt-1">View and track your orders.</p>
      </div>

      <div className="space-y-4">
        {orders.map((order) => {
          const status = statusConfig[order.status];
          const StatusIcon = status.icon;

          return (
            <Card key={order.id}>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div>
                    <p className="font-medium text-gray-900">Order #{order.order_number}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(order.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${status.color}`}>
                    <StatusIcon className="h-4 w-4" />
                    <span className="text-sm font-medium">{status.label}</span>
                  </div>
                </div>

                {/* Order Items Summary */}
                {order.items && order.items.length > 0 && (
                  <div className="border-t pt-4">
                    <p className="text-sm text-gray-600">
                      {order.items.length} {order.items.length === 1 ? 'item' : 'items'} - Total:{' '}
                      <span className="font-medium text-gray-900">
                        ${order.total_amount.toFixed(2)}
                      </span>
                    </p>
                  </div>
                )}

                {/* Tracking */}
                {order.tracking_number && (
                  <div className="border-t pt-4 mt-4">
                    <p className="text-sm text-gray-600">
                      Tracking Number:{' '}
                      <span className="font-medium text-gray-900">{order.tracking_number}</span>
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}