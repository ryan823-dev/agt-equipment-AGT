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

// GET /api/admin/b2b - List all B2B accounts with pagination and filters
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
      .from('b2b_accounts')
      .select('*, user:user_profiles(id, full_name, email, phone)', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (status) {
      query = query.eq('status', status);
    }

    if (search) {
      query = query.or(`company_name.ilike.%${search}%`);
    }

    const { data, error, count } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // Get auth emails
    const userIds = data?.map((b: { user_id: string }) => b.user_id).filter(Boolean) || [];
    let emailMap = new Map<string, string>();
    
    if (userIds.length > 0) {
      const { data: authUsers } = await supabase.auth.admin.listUsers();
      if (authUsers) {
        authUsers.users.forEach((user) => {
          if (user.email) {
            emailMap.set(user.id, user.email);
          }
        });
      }
    }

    const accountsWithEmail = data?.map((account: { user: { id: string } | null }) => ({
      ...account,
      user: account.user ? {
        ...account.user,
        email: emailMap.get(account.user.id) || '',
      } : null,
    }));

    return NextResponse.json({
      accounts: accountsWithEmail,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching B2B accounts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch B2B accounts' },
      { status: 500 }
    );
  }
}

// PATCH /api/admin/b2b - Update B2B account (approve, suspend, set credit limit, etc.)
export async function PATCH(request: NextRequest) {
  try {
    const supabase = getAdminClient();
    const body = await request.json();
    
    const {
      id,
      status,
      credit_limit,
      payment_terms,
      discount_tier,
      default_discount_percent,
      verified_by,
    } = body;

    if (!id) {
      return NextResponse.json({ error: 'Account ID is required' }, { status: 400 });
    }

    const updateData: Record<string, unknown> = {};
    if (status) {
      updateData.status = status;
      if (status === 'approved') {
        updateData.verified_at = new Date().toISOString();
        if (verified_by) updateData.verified_by = verified_by;
      }
    }
    if (credit_limit !== undefined) updateData.credit_limit = credit_limit;
    if (payment_terms !== undefined) updateData.payment_terms = payment_terms;
    if (discount_tier !== undefined) updateData.discount_tier = discount_tier;
    if (default_discount_percent !== undefined) updateData.default_discount_percent = default_discount_percent;

    const { data, error } = await supabase
      .from('b2b_accounts')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // If approved, also update user's customer_type
    if (status === 'approved' && data.user_id) {
      await supabase
        .from('user_profiles')
        .update({ customer_type: 'b2b' })
        .eq('id', data.user_id);
    }

    return NextResponse.json({ account: data });
  } catch (error) {
    console.error('Error updating B2B account:', error);
    return NextResponse.json(
      { error: 'Failed to update B2B account' },
      { status: 500 }
    );
  }
}