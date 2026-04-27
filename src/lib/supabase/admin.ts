import { NextResponse } from 'next/server';
import {
  createClient as createSupabaseClient,
  type SupabaseClient,
  type User,
} from '@supabase/supabase-js';
import { createClient as createServerSupabaseClient } from './server';

type AdminAuthSuccess = {
  ok: true;
  supabase: SupabaseClient;
  user: User;
};

type AdminAuthFailure = {
  ok: false;
  response: NextResponse;
};

type AdminAuthResult = AdminAuthSuccess | AdminAuthFailure;

function createAdminClient(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error('Supabase admin environment variables are not configured');
  }

  return createSupabaseClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

export async function requireAdminUser(): Promise<AdminAuthResult> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: 'Supabase authentication is not configured' },
        { status: 500 }
      ),
    };
  }

  const userClient = await createServerSupabaseClient();
  const {
    data: { user },
    error: userError,
  } = await userClient.auth.getUser();

  if (userError || !user) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      ),
    };
  }

  const { data: profile, error: profileError } = await userClient
    .from('user_profiles')
    .select('is_admin')
    .eq('id', user.id)
    .maybeSingle();

  if (profileError || !profile?.is_admin) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      ),
    };
  }

  try {
    return {
      ok: true,
      supabase: createAdminClient(),
      user,
    };
  } catch (error) {
    console.error('Failed to create Supabase admin client:', error);
    return {
      ok: false,
      response: NextResponse.json(
        { error: 'Admin backend is not configured' },
        { status: 500 }
      ),
    };
  }
}
