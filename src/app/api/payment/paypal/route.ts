import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// Check if PayPal is configured
function isPayPalConfigured() {
  return !!(process.env.PAYPAL_CLIENT_ID && process.env.PAYPAL_CLIENT_SECRET);
}

// PayPal API configuration
const getPayPalApi = () => {
  return process.env.PAYPAL_MODE === 'live'
    ? 'https://api-m.paypal.com'
    : 'https://api-m.sandbox.paypal.com';
};

async function getPayPalAccessToken() {
  if (!isPayPalConfigured()) {
    throw new Error('PayPal is not configured');
  }

  const auth = Buffer.from(
    `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
  ).toString('base64');

  const response = await fetch(`${getPayPalApi()}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${auth}`,
    },
    body: 'grant_type=client_credentials',
  });

  const data = await response.json();
  return data.access_token;
}

export async function POST(request: NextRequest) {
  try {
    // Check if PayPal is configured
    if (!isPayPalConfigured()) {
      return NextResponse.json(
        { error: 'PayPal payment is not available. Please contact support.' },
        { status: 503 }
      );
    }

    const { amount, currency = 'USD', returnUrl, cancelUrl } = await request.json();

    if (!amount || amount < 1) {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      );
    }

    const accessToken = await getPayPalAccessToken();

    // Create PayPal order
    const response = await fetch(`${getPayPalApi()}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: currency,
              value: amount.toFixed(2),
            },
            description: 'AGT Equipment Order',
          },
        ],
        application_context: {
          brand_name: 'AGT Equipment',
          landing_page: 'BILLING',
          user_action: 'PAY_NOW',
          return_url: returnUrl,
          cancel_url: cancelUrl,
        },
      }),
    });

    const order = await response.json();

    if (order.error) {
      console.error('PayPal order error:', order.error);
      return NextResponse.json(
        { error: 'Failed to create PayPal order' },
        { status: 500 }
      );
    }

    // Create pending order in our database
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
    const shippingCost = 0;
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
    const { data: dbOrder, error: orderError } = await supabase
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
        payment_method: 'paypal',
        payment_id: order.id,
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
      order_id: dbOrder.id,
      product_id: item.product_id,
      product_name: 'Product',
      product_sku: null,
      unit_price: item.unit_price,
      quantity: item.quantity,
      subtotal: item.unit_price * item.quantity,
    }));

    await supabase.from('order_items').insert(orderItems);

    // Get approval URL
    const approvalUrl = order.links?.find((link: { rel: string; href: string }) => link.rel === 'approve')?.href;

    return NextResponse.json({
      orderId: dbOrder.id,
      paypalOrderId: order.id,
      approvalUrl,
    });
  } catch (error) {
    console.error('PayPal payment error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}