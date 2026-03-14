import { Suspense } from 'react';
import CheckoutSuccessContent from './CheckoutSuccessContent';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="container py-12 flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    }>
      <CheckoutSuccessContent />
    </Suspense>
  );
}