'use client';

import { useCart } from '@/lib/contexts/CartContext';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';

export function CartBadge() {
  const { itemCount } = useCart();

  return (
    <Link href="/cart" className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors">
      <ShoppingCart className="h-5 w-5" />
      {itemCount > 0 && (
        <span className="absolute -top-0.5 -right-0.5 h-5 w-5 rounded-full bg-blue-600 text-white text-xs font-medium flex items-center justify-center">
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}
    </Link>
  );
}
