'use client';

import { useState } from 'react';
import { Product } from '@/types';
import { AddToCartButton } from '@/components/cart/AddToCartButton';
import { Minus, Plus, Phone } from 'lucide-react';

interface ProductActionsProps {
  product: Product;
}

export function ProductActions({ product }: ProductActionsProps) {
  const [quantity, setQuantity] = useState(1);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const isOutOfStock = product.stock === 'out_of_stock';

  return (
    <div className="space-y-4">
      {/* Quantity Selector */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-gray-700">Quantity:</span>
        <div className="flex items-center border rounded-lg">
          <button
            onClick={decreaseQuantity}
            disabled={quantity <= 1}
            className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="px-4 py-2 text-sm font-medium min-w-[3rem] text-center">
            {quantity}
          </span>
          <button
            onClick={increaseQuantity}
            disabled={isOutOfStock}
            className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <AddToCartButton
          product={product}
          quantity={quantity}
          className="flex-1 py-3 sm:py-4 px-6 sm:px-8 text-sm sm:text-base"
        />
        <a
          href="tel:+19498987669"
          className="flex-1 border border-gray-300 text-gray-700 py-3 sm:py-4 px-6 sm:px-8 rounded-lg font-semibold text-center hover:bg-gray-50 transition-colors text-sm sm:text-base flex items-center justify-center gap-2"
        >
          <Phone className="h-4 w-4" />
          Call (949) 898-7669
        </a>
      </div>

      {/* Stock Warning */}
      {isOutOfStock && (
        <p className="text-sm text-red-600 text-center">
          This product is currently out of stock. Please call for availability.
        </p>
      )}
    </div>
  );
}
