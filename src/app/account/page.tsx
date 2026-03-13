'use client';

import { useAuth } from '@/lib/contexts/AuthContext';
import Link from 'next/link';
import { Package, MapPin, FileText, TrendingUp } from 'lucide-react';

export default function AccountPage() {
  const { user, profile } = useAuth();

  const displayName = profile?.full_name || user?.email?.split('@')[0] || 'User';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {displayName}!</h1>
        <p className="text-gray-600 mt-1">Manage your orders, addresses, and account settings.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link
          href="/account/orders"
          className="bg-white rounded-lg border p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
              <Package className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Orders</p>
              <p className="text-xl font-semibold text-gray-900">0</p>
            </div>
          </div>
        </Link>

        <Link
          href="/account/addresses"
          className="bg-white rounded-lg border p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
              <MapPin className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Addresses</p>
              <p className="text-xl font-semibold text-gray-900">0</p>
            </div>
          </div>
        </Link>

        <Link
          href="/account/quotes"
          className="bg-white rounded-lg border p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
              <FileText className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Quotes</p>
              <p className="text-xl font-semibold text-gray-900">0</p>
            </div>
          </div>
        </Link>

        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Account Type</p>
              <p className="text-xl font-semibold text-gray-900 capitalize">{profile?.customer_type || 'B2C'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg border p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/mini-excavators"
            className="flex items-center gap-3 p-4 rounded-lg border border-dashed hover:border-blue-300 hover:bg-blue-50 transition-colors"
          >
            <Package className="h-5 w-5 text-gray-400" />
            <span className="text-gray-600">Browse Products</span>
          </Link>
          <Link
            href="/inquiry"
            className="flex items-center gap-3 p-4 rounded-lg border border-dashed hover:border-blue-300 hover:bg-blue-50 transition-colors"
          >
            <FileText className="h-5 w-5 text-gray-400" />
            <span className="text-gray-600">Request a Quote</span>
          </Link>
        </div>
      </div>

      {/* Account Info */}
      <div className="bg-white rounded-lg border p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Email</p>
            <p className="text-gray-900 font-medium">{user?.email}</p>
          </div>
          <div>
            <p className="text-gray-500">Full Name</p>
            <p className="text-gray-900 font-medium">{profile?.full_name || 'Not set'}</p>
          </div>
          <div>
            <p className="text-gray-500">Phone</p>
            <p className="text-gray-900 font-medium">{profile?.phone || 'Not set'}</p>
          </div>
          <div>
            <p className="text-gray-500">Company</p>
            <p className="text-gray-900 font-medium">{profile?.company_name || 'Not set'}</p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t">
          <Link
            href="/account/settings"
            className="text-blue-600 hover:underline text-sm font-medium"
          >
            Edit Profile →
          </Link>
        </div>
      </div>
    </div>
  );
}
