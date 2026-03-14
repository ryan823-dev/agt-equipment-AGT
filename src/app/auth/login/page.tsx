import { Suspense } from 'react';
import { LoginForm } from '@/components/auth/LoginForm';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Sign In',
  description: 'Sign in to your AGT Equipment account to manage orders, track shipments, and access exclusive deals.',
};

export default function LoginPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <Suspense fallback={<div className="text-center">Loading...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
