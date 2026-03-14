import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Create Supabase client with service role for admin operations
function getAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}

// Generate quote number
function generateQuoteNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `QT-${timestamp}-${random}`;
}

// GET /api/admin/quotes - List all quotes with pagination and filters
export async function GET(request: NextRequest) {
  try {
    const supabase = getAdminClient();
    const searchParams = request.nextUrl.searchParams;
    
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    
    const offset = (page - 1) * limit;

    let query = supabase
      .from('quotes')
      .select('*, quote_items(*), inquiry:inquiries(*), user:user_profiles(full_name, email)', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (status) {
      query = query.eq('status', status);
    }

    if (search) {
      query = query.or(`quote_number.ilike.%${search}%`);
    }

    const { data, error, count } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({
      quotes: data,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching quotes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch quotes' },
      { status: 500 }
    );
  }
}

// POST /api/admin/quotes - Create a new quote
export async function POST(request: NextRequest) {
  try {
    const supabase = getAdminClient();
    const body = await request.json();
    
    const {
      inquiry_id,
      user_id,
      valid_until,
      subtotal,
      shipping_cost,
      discount_amount,
      total_amount,
      payment_terms,
      shipping_terms,
      warranty_terms,
      notes,
      items,
    } = body;

    // Create quote
    const quoteNumber = generateQuoteNumber();
    
    const { data: quote, error: quoteError } = await supabase
      .from('quotes')
      .insert({
        quote_number: quoteNumber,
        inquiry_id,
        user_id,
        status: 'draft',
        valid_until,
        subtotal,
        shipping_cost: shipping_cost || 0,
        discount_amount: discount_amount || 0,
        total_amount,
        payment_terms,
        shipping_terms,
        warranty_terms,
        notes,
      })
      .select()
      .single();

    if (quoteError) {
      return NextResponse.json({ error: quoteError.message }, { status: 400 });
    }

    // Create quote items
    if (items && items.length > 0) {
      const quoteItems = items.map((item: {
        product_id: string | null;
        product_name: string;
        product_sku: string | null;
        quantity: number;
        unit_price: number;
        discount_percent: number;
        subtotal: number;
        notes: string | null;
      }) => ({
        quote_id: quote.id,
        ...item,
      }));

      const { error: itemsError } = await supabase
        .from('quote_items')
        .insert(quoteItems);

      if (itemsError) {
        // Rollback quote
        await supabase.from('quotes').delete().eq('id', quote.id);
        return NextResponse.json({ error: itemsError.message }, { status: 400 });
      }
    }

    // Update inquiry status if provided
    if (inquiry_id) {
      await supabase
        .from('inquiries')
        .update({ status: 'quoted', quote_id: quote.id })
        .eq('id', inquiry_id);
    }

    return NextResponse.json({ quote });
  } catch (error) {
    console.error('Error creating quote:', error);
    return NextResponse.json(
      { error: 'Failed to create quote' },
      { status: 500 }
    );
  }
}

// PATCH /api/admin/quotes - Update quote status
export async function PATCH(request: NextRequest) {
  try {
    const supabase = getAdminClient();
    const body = await request.json();
    
    const { id, status, sent_at } = body;

    if (!id) {
      return NextResponse.json({ error: 'Quote ID is required' }, { status: 400 });
    }

    const updateData: Record<string, unknown> = {};
    if (status) updateData.status = status;
    if (sent_at !== undefined) updateData.sent_at = sent_at;

    const { data, error } = await supabase
      .from('quotes')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ quote: data });
  } catch (error) {
    console.error('Error updating quote:', error);
    return NextResponse.json(
      { error: 'Failed to update quote' },
      { status: 500 }
    );
  }
}