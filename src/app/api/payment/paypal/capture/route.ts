import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

const PAYPAL_API = process.env.PAYPAL_MODE === 'live'
  ? 'https://api-m.paypal.com'
  : 'https://api-m.sandbox.paypal.com';

async function getPayPalAccessToken() {
  const auth = Buffer.from(
    `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
  ).toString('base64');

  const response = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
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
    const { orderId, paypalOrderId } = await request.json();

    if (!paypalOrderId) {
      return NextResponse.json(
        { error: 'PayPal order ID is required' },
        { status: 400 }
      );
    }

    const accessToken = await getPayPalAccessToken();

    // Capture the PayPal order
    const response = await fetch(
      `${PAYPAL_API}/v2/checkout/orders/${paypalOrderId}/capture`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const captureData = await response.json();

    if (captureData.error) {
      console.error('PayPal capture error:', captureData.error);
      return NextResponse.json(
        { error: 'Failed to capture PayPal payment' },
        { status: 500 }
      );
    }

    // Update order status
    const supabase = await createClient();

    if (orderId) {
      await supabase
        .from('orders')
        .update({
          status: 'confirmed',
          payment_status: 'paid',
          payment_id: paypalOrderId,
          paid_at: new Date().toISOString(),
        })
        .eq('id', orderId);

      // Clear cart
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        await supabase.from('cart_items').delete().eq('user_id', user.id);
      }
    }

    return NextResponse.json({ success: true, captureData });
  } catch (error) {
    console.error('PayPal capture error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}