'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { getSupabaseClient } from '@/lib/supabase/client';
import { useAuth } from './AuthContext';
import { CartItem, CartItemWithProduct, Product } from '@/types';

interface CartContextType {
  items: CartItemWithProduct[];
  itemCount: number;
  subtotal: number;
  isLoading: boolean;
  isOpen: boolean;
  sessionId: string | null;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (product: Product, quantity?: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Generate or get session ID for guest users
function getSessionId(): string {
  if (typeof window === 'undefined') return '';
  
  let sessionId = localStorage.getItem('cart_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('cart_session_id', sessionId);
  }
  return sessionId;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItemWithProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  
  const { user, isAuthenticated } = useAuth();
  const supabase = getSupabaseClient();

  // Initialize session ID
  useEffect(() => {
    setSessionId(getSessionId());
  }, []);

  // Calculate derived values
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.unit_price * item.quantity, 0);

  // Fetch cart items from database
  const fetchCartItems = useCallback(async () => {
    if (!sessionId && !user) return;

    try {
      const query = supabase
        .from('cart_items')
        .select('*');

      if (user) {
        query.eq('user_id', user.id);
      } else if (sessionId) {
        query.eq('session_id', sessionId);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching cart:', error);
        return;
      }

      // Fetch product details for each cart item
      if (data && data.length > 0) {
        // Import products data
        const { products } = await import('@/data/products');
        
        const itemsWithProducts: CartItemWithProduct[] = (data as CartItem[]).map((item) => {
          const product = products.find((p) => p.id === item.product_id);
          return {
            ...item,
            product: product!,
          } as CartItemWithProduct;
        }).filter((item) => item.product);

        setItems(itemsWithProducts);
      } else {
        setItems([]);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setIsLoading(false);
    }
  }, [user, sessionId, supabase]);

  // Merge guest cart with user cart on login
  const mergeGuestCart = useCallback(async () => {
    if (!user || !sessionId) return;

    try {
      // Get guest cart items
      const { data: guestItems, error: fetchError } = await supabase
        .from('cart_items')
        .select('*')
        .eq('session_id', sessionId);

      if (fetchError || !guestItems || guestItems.length === 0) return;

      // For each guest item, add to user cart
      for (const item of guestItems) {
        // Check if user already has this product in cart
        const { data: existingItem } = await supabase
          .from('cart_items')
          .select('*')
          .eq('user_id', user.id)
          .eq('product_id', item.product_id)
          .single();

        if (existingItem) {
          // Update quantity
          await supabase
            .from('cart_items')
            .update({ quantity: existingItem.quantity + item.quantity })
            .eq('id', existingItem.id);
        } else {
          // Insert new item with user_id
          await supabase.from('cart_items').insert({
            user_id: user.id,
            product_id: item.product_id,
            quantity: item.quantity,
            unit_price: item.unit_price,
          });
        }
      }

      // Delete guest cart items
      await supabase.from('cart_items').delete().eq('session_id', sessionId);
      
      // Clear session ID from localStorage
      localStorage.removeItem('cart_session_id');
      setSessionId(null);
    } catch (error) {
      console.error('Error merging cart:', error);
    }
  }, [user, sessionId, supabase]);

  // Initial fetch and merge on auth change
  useEffect(() => {
    if (sessionId) {
      if (isAuthenticated && user) {
        mergeGuestCart().then(() => fetchCartItems());
      } else {
        fetchCartItems();
      }
    }
  }, [isAuthenticated, user, sessionId, mergeGuestCart, fetchCartItems]);

  const addItem = async (product: Product, quantity: number = 1) => {
    if (!sessionId && !user) return;

    try {
      // Check if item already exists
      const query = supabase
        .from('cart_items')
        .select('*');

      if (user) {
        query.eq('user_id', user.id);
      } else {
        query.eq('session_id', sessionId);
      }
      query.eq('product_id', product.id);

      const { data: existingItem } = await query.single();

      if (existingItem) {
        // Update quantity
        const { error } = await supabase
          .from('cart_items')
          .update({ quantity: existingItem.quantity + quantity })
          .eq('id', existingItem.id);

        if (error) throw error;
      } else {
        // Insert new item
        const { error } = await supabase.from('cart_items').insert({
          user_id: user?.id || null,
          session_id: user ? null : sessionId,
          product_id: product.id,
          quantity,
          unit_price: product.price,
        });

        if (error) throw error;
      }

      await fetchCartItems();
      setIsOpen(true); // Open cart drawer
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const removeItem = async (itemId: string) => {
    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', itemId);

      if (error) throw error;
      
      setItems(items.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (quantity < 1) {
      await removeItem(itemId);
      return;
    }

    try {
      const { error } = await supabase
        .from('cart_items')
        .update({ quantity })
        .eq('id', itemId);

      if (error) throw error;
      
      setItems(items.map((item) => 
        item.id === itemId ? { ...item, quantity } : item
      ));
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const clearCart = async () => {
    try {
      const query = supabase.from('cart_items').delete();

      if (user) {
        query.eq('user_id', user.id);
      } else {
        query.eq('session_id', sessionId);
      }

      await query;
      setItems([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const refreshCart = async () => {
    await fetchCartItems();
  };

  const value: CartContextType = {
    items,
    itemCount,
    subtotal,
    isLoading,
    isOpen,
    sessionId,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
    toggleCart: () => setIsOpen(!isOpen),
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    refreshCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
