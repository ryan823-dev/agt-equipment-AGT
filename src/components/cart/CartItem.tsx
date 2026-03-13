'use client';

import Image from 'next/image';
import Link from 'next/link';
import { CartItemWithProduct } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Minus, Plus, Loader2 } from 'lucide-react';

interface CartItemProps {
  item: CartItemWithProduct;
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  isUpdating?: boolean;
}

export function CartItemCard({ item, onRemove, onUpdateQuantity, isUpdating }: CartItemProps) {
  const { product, quantity, unit_price } = item;
  const subtotal = unit_price * quantity;

  const handleDecrease = () => {
    if (quantity > 1) {
      onUpdateQuantity(item.id, quantity - 1);
    }
  };

  const handleIncrease = () => {
    onUpdateQuantity(item.id, quantity + 1);
  };

  return (
    <div className="flex gap-4 py-4 border-b last:border-b-0">
      {/* Product Image */}
      <Link href={`/products/${product.slug}`} className="flex-shrink-0">
        <div className="relative h-20 w-20 rounded-md overflow-hidden bg-gray-100">
          {product.images[0] ? (
            <Image
              src={product.images[0].url}
              alt={product.images[0].alt || product.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-gray-400">
              No image
            </div>
          )}
        </div>
      </Link>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <Link
          href={`/products/${product.slug}`}
          className="text-sm font-medium text-gray-900 hover:text-blue-600 line-clamp-2"
        >
          {product.name}
        </Link>
        <p className="text-xs text-gray-500 mt-0.5">SKU: {product.sku}</p>
        
        {/* Price */}
        <div className="mt-1 flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-900">
            ${unit_price.toLocaleString()}
          </span>
          {product.compareAtPrice && product.compareAtPrice > unit_price && (
            <span className="text-xs text-gray-400 line-through">
              ${product.compareAtPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Quantity Controls */}
        <div className="mt-2 flex items-center gap-2">
          <div className="flex items-center border rounded-md">
            <button
              onClick={handleDecrease}
              disabled={isUpdating || quantity <= 1}
              className="p-1.5 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="px-3 text-sm font-medium min-w-[2rem] text-center">
              {quantity}
            </span>
            <button
              onClick={handleIncrease}
              disabled={isUpdating}
              className="p-1.5 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>

          <button
            onClick={() => onRemove(item.id)}
            disabled={isUpdating}
            className="p-1.5 text-gray-400 hover:text-red-500 disabled:opacity-50"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Subtotal */}
      <div className="flex-shrink-0 text-right">
        <span className="text-sm font-semibold text-gray-900">
          ${subtotal.toLocaleString()}
        </span>
      </div>
    </div>
  );
}
