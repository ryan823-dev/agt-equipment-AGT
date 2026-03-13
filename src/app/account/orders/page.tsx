'use client';

import { Package, Clock, Truck, CheckCircle, XCircle } from 'lucide-react';

// Mock orders - will be replaced with real data from Supabase
const mockOrders = [];

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
        <p className="text-gray-600 mt-1">View and track your orders.</p>
      </div>

      {mockOrders.length === 0 ? (
        <div className="bg-white rounded-lg border p-12 text-center">
          <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
          <p className="text-gray-500 mb-6">When you place orders, they&apos;ll appear here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Order cards will go here */}
        </div>
      )}
    </div>
  );
}
