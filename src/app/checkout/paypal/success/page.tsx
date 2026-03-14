import { Suspense } from 'react';
import PayPalSuccessContent from './PayPalSuccessContent';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default function PayPalSuccessPage() {
  return (
    <Suspense fallback={
      <div className="container py-12 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <h1 className="text-xl font-semibold text-gray-900">Loading...</h1>
      </div>
    }>
      <PayPalSuccessContent />
    </Suspense>
  );
}