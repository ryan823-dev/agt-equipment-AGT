import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@/lib/supabase/server';

// Check if Stripe is configured
function isStripeConfigured() {
  return !!process.env.STRIPE_SECRET_KEY;
}

// Lazy initialization of Stripe to avoid build-time errors
function getStripe() {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error('Stripe is not configured');
  }
  return new Stripe(secretKey, {
    apiVersion: '2026-02-25.clover',
  });
}

export async function POST(request: NextRequest) {
  try {
    // Check if Stripe is configured
    if (!isStripeConfigured()) {
      return NextResponse.json(
        { error: 'Credit card payment is not available. Please contact support.' },
        { status: 503 }
      );
    }

    const { amount, currency = 'usd' } = await request.json();

    if (!amount || amount < 50) {
      return NextResponse.json(
        { error: 'Invalid amount. Minimum is $0.50' },
        { status: 400 }
      );
    }

    // Create a PaymentIntent with the order amount and currency
    const stripe = getStripe();
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        integration: 'agt-equipment',
      },
    });

    // Create pending order in database
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'User authentication required' },
        { status: 401 }
      );
    }

    // Generate order number
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

    // Get cart items
    const { data: cartItems, error: cartError } = await supabase
      .from('cart_items')
      .select('*')
      .eq('user_id', user.id);

    if (cartError || !cartItems || cartItems.length === 0) {
      return NextResponse.json(
        { error: 'Cart is empty' },
        { status: 400 }
      );
    }

    // Calculate totals
    const subtotal = cartItems.reduce((sum: number, item: { unit_price: number; quantity: number }) => sum + item.unit_price * item.quantity, 0);
    const shippingCost = 0; // Free shipping
    const taxAmount = subtotal * 0.08;
    const totalAmount = subtotal + shippingCost + taxAmount;

    // Get user's default shipping address
    const { data: addresses } = await supabase
      .from('addresses')
      .select('*')
      .eq('user_id', user.id)
      .eq('type', 'shipping')
      .eq('is_default', true)
      .single();

    const shippingAddress = addresses || {
      first_name: '',
      last_name: '',
      address_line1: '',
      city: '',
      state: '',
      postal_code: '',
      country: 'US',
    };

    // Create order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        order_number: orderNumber,
        user_id: user.id,
        status: 'pending',
        subtotal,
        shipping_cost: shippingCost,
        tax_amount: taxAmount,
        total_amount: totalAmount,
        currency: 'USD',
        shipping_address: shippingAddress,
        billing_address: shippingAddress,
        payment_status: 'pending',
        payment_method: 'stripe',
        payment_id: paymentIntent.id,
      })
      .select()
      .single();

    if (orderError) {
      console.error('Error creating order:', orderError);
      return NextResponse.json(
        { error: 'Failed to create order' },
        { status: 500 }
      );
    }

    // Create order items
    const orderItems = cartItems.map((item: { product_id: string; unit_price: number; quantity: number }) => ({
      order_id: order.id,
      product_id: item.product_id,
      product_name: 'Product', // We'd need to fetch actual product name
      product_sku: null,
      unit_price: item.unit_price,
      quantity: item.quantity,
      subtotal: item.unit_price * item.quantity,
    }));

    await supabase.from('order_items').insert(orderItems);

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      orderId: order.id,
    });
  } catch (error) {
    console.error('Stripe payment error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}