import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      contact_name,
      contact_email,
      contact_phone,
      company_name,
      type,
      message,
      use_case,
      preferred_timeline,
      items,
    } = body;

    // Validate required fields
    if (!contact_name || !contact_email || !items || items.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Generate inquiry number
    const inquiryNumber = `INQ-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

    // Create inquiry
    const { data: inquiry, error: inquiryError } = await supabase
      .from('inquiries')
      .insert({
        inquiry_number: inquiryNumber,
        user_id: user?.id || null,
        contact_name,
        contact_email,
        contact_phone: contact_phone || null,
        company_name: company_name || null,
        type: type || 'single',
        status: 'pending',
        message: message || null,
        use_case: use_case || null,
        preferred_timeline: preferred_timeline || null,
      })
      .select()
      .single();

    if (inquiryError) {
      console.error('Error creating inquiry:', inquiryError);
      return NextResponse.json(
        { error: 'Failed to create inquiry' },
        { status: 500 }
      );
    }

    // Create inquiry items
    const inquiryItems = items.map((item: { product_id?: string; product_name: string; quantity: number; notes?: string }) => ({
      inquiry_id: inquiry.id,
      product_id: item.product_id || null,
      product_name: item.product_name,
      quantity: item.quantity || 1,
      notes: item.notes || null,
    }));

    const { error: itemsError } = await supabase
      .from('inquiry_items')
      .insert(inquiryItems);

    if (itemsError) {
      console.error('Error creating inquiry items:', itemsError);
      // Don't fail the request, just log the error
    }

    return NextResponse.json({
      success: true,
      inquiry: {
        id: inquiry.id,
        inquiry_number: inquiryNumber,
      },
    });
  } catch (error) {
    console.error('Inquiry API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { data: inquiries, error } = await supabase
      .from('inquiries')
      .select('*, inquiry_items(*)')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching inquiries:', error);
      return NextResponse.json(
        { error: 'Failed to fetch inquiries' },
        { status: 500 }
      );
    }

    return NextResponse.json({ inquiries });
  } catch (error) {
    console.error('Inquiry API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}