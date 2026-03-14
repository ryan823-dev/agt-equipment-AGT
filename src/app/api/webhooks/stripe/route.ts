import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@/lib/supabase/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2026-02-25.clover',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature') || '';

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    );
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;

      // Update order status
      const supabase = await createClient();

      const { error } = await supabase
        .from('orders')
        .update({
          status: 'confirmed',
          payment_status: 'paid',
          paid_at: new Date().toISOString(),
        })
        .eq('payment_id', paymentIntent.id);

      if (error) {
        console.error('Error updating order:', error);
      }

      // Get order to clear cart
      const { data: order } = await supabase
        .from('orders')
        .select('user_id')
        .eq('payment_id', paymentIntent.id)
        .single();

      if (order?.user_id) {
        await supabase
          .from('cart_items')
          .delete()
          .eq('user_id', order.user_id);
      }

      break;
    }

    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;

      // Update order status
      const supabase = await createClient();

      await supabase
        .from('orders')
        .update({
          status: 'pending',
          payment_status: 'failed',
        })
        .eq('payment_id', paymentIntent.id);

      break;
    }

    case 'charge.refunded': {
      const charge = event.data.object as Stripe.Charge;

      // Update order status
      const supabase = await createClient();

      await supabase
        .from('orders')
        .update({
          status: 'refunded',
          payment_status: 'refunded',
        })
        .eq('payment_id', charge.payment_intent);

      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}