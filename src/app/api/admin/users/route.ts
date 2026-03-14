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

// GET /api/admin/users - List all users with pagination
export async function GET(request: NextRequest) {
  try {
    const supabase = getAdminClient();
    const searchParams = request.nextUrl.searchParams;
    
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const search = searchParams.get('search');
    const customer_type = searchParams.get('customer_type');
    
    const offset = (page - 1) * limit;

    let query = supabase
      .from('user_profiles')
      .select('*, b2b_accounts(*)', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (search) {
      query = query.or(`full_name.ilike.%${search}%,email.ilike.%${search}%,company_name.ilike.%${search}%`);
    }

    if (customer_type) {
      query = query.eq('customer_type', customer_type);
    }

    const { data, error, count } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // Get auth emails from admin API
    const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
    
    const emailMap = new Map<string, string>();
    if (authUsers && !authError) {
      authUsers.users.forEach((user) => {
        if (user.email) {
          emailMap.set(user.id, user.email);
        }
      });
    }

    const usersWithEmail = data?.map((user: { id: string; [key: string]: unknown }) => ({
      ...user,
      email: emailMap.get(user.id) || '',
    }));

    return NextResponse.json({
      users: usersWithEmail,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

// PATCH /api/admin/users - Update user (e.g., set as admin)
export async function PATCH(request: NextRequest) {
  try {
    const supabase = getAdminClient();
    const body = await request.json();
    
    const { id, is_admin, customer_type } = body;

    if (!id) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const updateData: Record<string, unknown> = {};
    if (is_admin !== undefined) updateData.is_admin = is_admin;
    if (customer_type !== undefined) updateData.customer_type = customer_type;

    const { data, error } = await supabase
      .from('user_profiles')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ user: data });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    );
  }
}