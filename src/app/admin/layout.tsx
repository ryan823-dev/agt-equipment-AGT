import type { Metadata } from 'next';

// Force dynamic rendering for admin routes
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export { default } from './AdminLayoutContent';
