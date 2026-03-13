'use client';

import { FileText } from 'lucide-react';

export default function QuotesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Quotes</h1>
        <p className="text-gray-600 mt-1">View and manage your B2B quotes.</p>
      </div>

      <div className="bg-white rounded-lg border p-12 text-center">
        <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No quotes yet</h3>
        <p className="text-gray-500 mb-6">
          Request a quote for bulk orders or custom equipment configurations.
        </p>
      </div>
    </div>
  );
}
