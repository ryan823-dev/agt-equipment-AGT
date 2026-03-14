import { createBrowserClient } from '@supabase/ssr';

function getSupabaseUrl() {
  return process.env.NEXT_PUBLIC_SUPABASE_URL || '';
}

function getSupabaseAnonKey() {
  return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
}

export function createClient() {
  const url = getSupabaseUrl();
  const key = getSupabaseAnonKey();
  
  // Return a mock client during build if env vars are not available
  if (!url || !key) {
    console.warn('Supabase environment variables not configured');
    return null as unknown as ReturnType<typeof createBrowserClient>;
  }
  
  return createBrowserClient(url, key);
}

// Singleton instance for client-side usage
let client: ReturnType<typeof createBrowserClient> | null = null;

export function getSupabaseClient() {
  if (!client) {
    client = createClient();
  }
  return client;
}
