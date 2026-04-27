import { NextResponse } from 'next/server';
import { requireAdminUser } from '@/lib/supabase/admin';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const admin = await requireAdminUser();
    if (!admin.ok) return admin.response;

    const supabase = admin.supabase;

    // Get order stats
    const { data: orders } = await supabase
      .from('orders')
      .select('status, total_amount, created_at');

    // Get inquiry stats
    const { data: inquiries } = await supabase
      .from('inquiries')
      .select('status, type, created_at');

    // Get quote stats
    const { data: quotes } = await supabase
      .from('quotes')
      .select('status, total_amount, created_at');

    // Get B2B account stats
    const { data: b2bAccounts } = await supabase
      .from('b2b_accounts')
      .select('status, discount_tier');

    // Get user stats
    const { count: totalUsers } = await supabase
      .from('user_profiles')
      .select('*', { count: 'exact', head: true });

    // Calculate stats
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const orderStats = {
      total: orders?.length || 0,
      pending: orders?.filter((o: { status: string }) => o.status === 'pending').length || 0,
      processing: orders?.filter((o: { status: string }) => o.status === 'processing').length || 0,
      shipped: orders?.filter((o: { status: string }) => o.status === 'shipped').length || 0,
      delivered: orders?.filter((o: { status: string }) => o.status === 'delivered').length || 0,
      totalRevenue: orders?.reduce((sum: number, o: { total_amount: number }) => sum + (o.total_amount || 0), 0) || 0,
      last30Days: orders?.filter((o: { created_at: string }) => new Date(o.created_at) >= thirtyDaysAgo).length || 0,
      last7Days: orders?.filter((o: { created_at: string }) => new Date(o.created_at) >= sevenDaysAgo).length || 0,
      last30DaysRevenue: orders
        ?.filter((o: { created_at: string }) => new Date(o.created_at) >= thirtyDaysAgo)
        .reduce((sum: number, o: { total_amount: number }) => sum + (o.total_amount || 0), 0) || 0,
    };

    const inquiryStats = {
      total: inquiries?.length || 0,
      pending: inquiries?.filter((i: { status: string }) => i.status === 'pending').length || 0,
      quoted: inquiries?.filter((i: { status: string }) => i.status === 'quoted').length || 0,
      converted: inquiries?.filter((i: { status: string }) => i.status === 'converted').length || 0,
      single: inquiries?.filter((i: { type: string }) => i.type === 'single').length || 0,
      bulk: inquiries?.filter((i: { type: string }) => i.type === 'bulk').length || 0,
      custom: inquiries?.filter((i: { type: string }) => i.type === 'custom').length || 0,
      last7Days: inquiries?.filter((i: { created_at: string }) => new Date(i.created_at) >= sevenDaysAgo).length || 0,
    };

    const quoteStats = {
      total: quotes?.length || 0,
      draft: quotes?.filter((q: { status: string }) => q.status === 'draft').length || 0,
      sent: quotes?.filter((q: { status: string }) => q.status === 'sent').length || 0,
      accepted: quotes?.filter((q: { status: string }) => q.status === 'accepted').length || 0,
      rejected: quotes?.filter((q: { status: string }) => q.status === 'rejected').length || 0,
      totalValue: quotes?.reduce((sum: number, q: { total_amount: number }) => sum + (q.total_amount || 0), 0) || 0,
    };

    const b2bStats = {
      total: b2bAccounts?.length || 0,
      pending: b2bAccounts?.filter((b: { status: string }) => b.status === 'pending').length || 0,
      approved: b2bAccounts?.filter((b: { status: string }) => b.status === 'approved').length || 0,
      suspended: b2bAccounts?.filter((b: { status: string }) => b.status === 'suspended').length || 0,
    };

    return NextResponse.json({
      orders: orderStats,
      inquiries: inquiryStats,
      quotes: quoteStats,
      b2b: b2bStats,
      users: {
        total: totalUsers || 0,
      },
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}
