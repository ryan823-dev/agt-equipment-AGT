'use client';

import { useCheckout } from '@/lib/contexts/CheckoutContext';
import { useCart } from '@/lib/contexts/CartContext';
import Image from 'next/image';

export default function ReviewOrder() {
  const { items, subtotal } = useCart();
  const { shippingAddress, paymentMethod, customerNotes } = useCheckout();

  // Calculate totals
  const shipping = shippingAddress?.country === 'US' ? 0 : 500;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Review Your Order</h2>
        <p className="text-sm text-gray-600 mt-1">
          Please review your order details before completing your purchase
        </p>
      </div>

      {/* Order Items */}
      <div className="border rounded-lg divide-y">
        {items.map((item) => (
          <div key={item.id} className="p-4 flex gap-4">
            <div className="relative h-16 w-16 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
              {item.product.images[0] ? (
                <Image
                  src={item.product.images[0].url}
                  alt={item.product.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-gray-400 text-xs">
                  No image
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 truncate">{item.product.name}</p>
              <p className="text-sm text-gray-500">SKU: {item.product.sku}</p>
              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
            </div>
            <div className="text-right">
              <p className="font-medium">${(item.unit_price * item.quantity).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Shipping Address */}
      <div className="border rounded-lg p-4">
        <h3 className="font-medium text-gray-900 mb-2">Shipping Address</h3>
        <p className="text-sm text-gray-600">
          {shippingAddress?.first_name} {shippingAddress?.last_name}
        </p>
        {shippingAddress?.company && (
          <p className="text-sm text-gray-600">{shippingAddress.company}</p>
        )}
        <p className="text-sm text-gray-600">
          {shippingAddress?.address_line1}
          {shippingAddress?.address_line2 && `, ${shippingAddress.address_line2}`}
        </p>
        <p className="text-sm text-gray-600">
          {shippingAddress?.city}, {shippingAddress?.state} {shippingAddress?.postal_code}
        </p>
        <p className="text-sm text-gray-600">{shippingAddress?.country}</p>
      </div>

      {/* Payment Method */}
      <div className="border rounded-lg p-4">
        <h3 className="font-medium text-gray-900 mb-2">Payment Method</h3>
        <p className="text-sm text-gray-600 capitalize">
          {paymentMethod === 'stripe' ? 'Credit / Debit Card' : 'PayPal'}
        </p>
      </div>

      {/* Order Notes */}
      {customerNotes && (
        <div className="border rounded-lg p-4">
          <h3 className="font-medium text-gray-900 mb-2">Order Notes</h3>
          <p className="text-sm text-gray-600">{customerNotes}</p>
        </div>
      )}

      {/* Totals */}
      <div className="border rounded-lg p-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span>${subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping</span>
          <span>{shipping === 0 ? 'Free' : `$${shipping}`}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="border-t pt-2 flex justify-between font-semibold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}