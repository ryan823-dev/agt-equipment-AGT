'use client';

import Image from 'next/image';
import { CartItemWithProduct } from '@/types';
import { Shield, Truck, RotateCcw } from 'lucide-react';

interface OrderSummaryProps {
  items: CartItemWithProduct[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

export default function OrderSummary({
  items,
  subtotal,
  shipping,
  tax,
  total,
}: OrderSummaryProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>

      {/* Items */}
      <div className="space-y-3 mb-4">
        {items.map((item) => (
          <div key={item.id} className="flex gap-3">
            <div className="relative h-12 w-12 rounded overflow-hidden bg-gray-200 flex-shrink-0">
              {item.product.images[0] ? (
                <Image
                  src={item.product.images[0].url}
                  alt={item.product.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-gray-400 text-xs">
                  N/A
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {item.product.name}
              </p>
              <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
            </div>
            <p className="text-sm font-medium">
              ${(item.unit_price * item.quantity).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="border-t border-gray-200 pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">${subtotal.toLocaleString()}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping</span>
          <span className={`font-medium ${shipping === 0 ? 'text-green-600' : ''}`}>
            {shipping === 0 ? 'Free' : `$${shipping}`}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Estimated Tax</span>
          <span className="font-medium">${tax.toFixed(2)}</span>
        </div>

        <div className="border-t border-gray-200 pt-2 mt-2">
          <div className="flex justify-between">
            <span className="text-base font-semibold">Total</span>
            <span className="text-base font-semibold">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Trust Signals */}
      <div className="mt-6 pt-4 border-t border-gray-200 space-y-3">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Truck className="h-4 w-4 text-green-600" />
          Free shipping within US
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Shield className="h-4 w-4 text-green-600" />
          Secure checkout
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <RotateCcw className="h-4 w-4 text-green-600" />
          30-day return policy
        </div>
      </div>
    </div>
  );
}