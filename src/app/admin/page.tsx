'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Package,
  FileText,
  Quote,
  Users,
  Building2,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  DollarSign,
} from 'lucide-react';

interface DashboardStats {
  orders: {
    total: number;
    pending: number;
    processing: number;
    shipped: number;
    delivered: number;
    totalRevenue: number;
    last30Days: number;
    last7Days: number;
    last30DaysRevenue: number;
  };
  inquiries: {
    total: number;
    pending: number;
    quoted: number;
    converted: number;
    single: number;
    bulk: number;
    custom: number;
    last7Days: number;
  };
  quotes: {
    total: number;
    draft: number;
    sent: number;
    accepted: number;
    rejected: number;
    totalValue: number;
  };
  b2b: {
    total: number;
    pending: number;
    approved: number;
    suspended: number;
  };
  users: {
    total: number;
  };
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats');
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Failed to load dashboard data</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>

      {/* Revenue Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(stats.orders.totalRevenue)}
              </p>
            </div>
            <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Last 30 days: {formatCurrency(stats.orders.last30DaysRevenue)}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">{stats.orders.total}</p>
            </div>
            <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Last 7 days: {stats.orders.last7Days} orders
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{stats.users.total}</p>
            </div>
            <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            B2B: {stats.b2b.approved} | B2C: {stats.users.total - stats.b2b.approved}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Quote Value</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(stats.quotes.totalValue)}
              </p>
            </div>
            <div className="h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            {stats.quotes.accepted} accepted of {stats.quotes.total}
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link
          href="/admin/orders?status=pending"
          className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 bg-orange-100 rounded-full flex items-center justify-center">
              <Clock className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Pending Orders</p>
              <p className="text-xl font-bold text-gray-900">{stats.orders.pending}</p>
            </div>
          </div>
        </Link>

        <Link
          href="/admin/inquiries?status=pending"
          className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
              <FileText className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">New Inquiries</p>
              <p className="text-xl font-bold text-gray-900">{stats.inquiries.pending}</p>
            </div>
          </div>
        </Link>

        <Link
          href="/admin/quotes?status=draft"
          className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 bg-yellow-100 rounded-full flex items-center justify-center">
              <Quote className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Draft Quotes</p>
              <p className="text-xl font-bold text-gray-900">{stats.quotes.draft}</p>
            </div>
          </div>
        </Link>

        <Link
          href="/admin/b2b?status=pending"
          className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
              <Building2 className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">B2B Applications</p>
              <p className="text-xl font-bold text-gray-900">{stats.b2b.pending}</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Order Status Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Status</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-orange-500" />
                <span className="text-gray-600">Pending</span>
              </div>
              <span className="font-medium">{stats.orders.pending}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-500" />
                <span className="text-gray-600">Processing</span>
              </div>
              <span className="font-medium">{stats.orders.processing}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5 text-purple-500" />
                <span className="text-gray-600">Shipped</span>
              </div>
              <span className="font-medium">{stats.orders.shipped}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-gray-600">Delivered</span>
              </div>
              <span className="font-medium">{stats.orders.delivered}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Inquiry Types</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Single Product</span>
              <span className="font-medium">{stats.inquiries.single}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Bulk Order</span>
              <span className="font-medium">{stats.inquiries.bulk}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Custom Request</span>
              <span className="font-medium">{stats.inquiries.custom}</span>
            </div>
            <div className="border-t pt-4 mt-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 font-medium">Conversion Rate</span>
                <span className="font-medium text-green-600">
                  {stats.inquiries.total > 0
                    ? `${Math.round((stats.inquiries.converted / stats.inquiries.total) * 100)}%`
                    : '0%'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}