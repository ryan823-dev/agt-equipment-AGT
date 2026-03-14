'use client';

import { useEffect, useState, useCallback } from 'react';
import { format } from 'date-fns';
import {
  Building2,
  Search,
  ChevronLeft,
  ChevronRight,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  User,
  DollarSign,
  CreditCard,
} from 'lucide-react';

interface B2BAccount {
  id: string;
  user_id: string;
  company_name: string;
  business_type: string | null;
  tax_id: string | null;
  website: string | null;
  status: string;
  verified_at: string | null;
  credit_limit: number;
  credit_used: number;
  payment_terms: string | null;
  discount_tier: string;
  default_discount_percent: number;
  created_at: string;
  user: {
    id: string;
    full_name: string | null;
    email: string;
    phone: string | null;
  } | null;
}

interface B2BResponse {
  accounts: B2BAccount[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  approved: 'bg-green-100 text-green-800',
  suspended: 'bg-red-100 text-red-800',
};

const tierColors: Record<string, string> = {
  bronze: 'bg-orange-100 text-orange-800',
  silver: 'bg-gray-100 text-gray-800',
  gold: 'bg-yellow-100 text-yellow-800',
  platinum: 'bg-purple-100 text-purple-800',
};

export default function AdminB2BPage() {
  const [accounts, setAccounts] = useState<B2BAccount[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAccount, setSelectedAccount] = useState<B2BAccount | null>(null);

  const fetchAccounts = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      params.set('page', pagination.page.toString());
      params.set('limit', pagination.limit.toString());
      if (statusFilter) params.set('status', statusFilter);
      if (searchQuery) params.set('search', searchQuery);

      const response = await fetch(`/api/admin/b2b?${params.toString()}`);
      if (response.ok) {
        const data: B2BResponse = await response.json();
        setAccounts(data.accounts);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error('Error fetching B2B accounts:', error);
    } finally {
      setIsLoading(false);
    }
  }, [pagination.page, pagination.limit, statusFilter, searchQuery]);

  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  const handleStatusChange = async (
    accountId: string,
    newStatus: string,
    updates?: Record<string, unknown>
  ) => {
    try {
      const response = await fetch('/api/admin/b2b', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: accountId, status: newStatus, ...updates }),
      });

      if (response.ok) {
        fetchAccounts();
        setSelectedAccount(null);
      }
    } catch (error) {
      console.error('Error updating B2B account:', error);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">B2B Accounts</h1>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by company name..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPagination({ ...pagination, page: 1 });
              }}
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPagination({ ...pagination, page: 1 });
            }}
            className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
      </div>

      {/* Accounts Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : accounts.length === 0 ? (
          <div className="text-center py-12">
            <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No B2B accounts found</p>
          </div>
        ) : (
          <>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tier
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Credit
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {accounts.map((account) => (
                  <tr key={account.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="font-medium text-gray-900">{account.company_name}</p>
                      {account.business_type && (
                        <p className="text-sm text-gray-500 capitalize">
                          {account.business_type.replace('_', ' ')}
                        </p>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {account.user ? (
                        <>
                          <p className="font-medium text-gray-900">
                            {account.user.full_name || 'N/A'}
                          </p>
                          <p className="text-sm text-gray-500">{account.user.email}</p>
                        </>
                      ) : (
                        <span className="text-gray-400">N/A</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          statusColors[account.status] || 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {account.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          tierColors[account.discount_tier] || 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {account.discount_tier}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm">
                        {formatCurrency(account.credit_used)} / {formatCurrency(account.credit_limit)}
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {format(new Date(account.created_at), 'MMM d, yyyy')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <button
                        onClick={() => setSelectedAccount(account)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button
                    onClick={() => setPagination({ ...pagination, page: pagination.page - 1 })}
                    disabled={pagination.page === 1}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })}
                    disabled={pagination.page === pagination.totalPages}
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing{' '}
                      <span className="font-medium">
                        {(pagination.page - 1) * pagination.limit + 1}
                      </span>{' '}
                      to{' '}
                      <span className="font-medium">
                        {Math.min(pagination.page * pagination.limit, pagination.total)}
                      </span>{' '}
                      of <span className="font-medium">{pagination.total}</span> results
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                      <button
                        onClick={() => setPagination({ ...pagination, page: pagination.page - 1 })}
                        disabled={pagination.page === 1}
                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                        const pageNum = i + 1;
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setPagination({ ...pagination, page: pageNum })}
                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                              pagination.page === pageNum
                                ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                      <button
                        onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })}
                        disabled={pagination.page === pagination.totalPages}
                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Account Detail Modal */}
      {selectedAccount && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto m-4">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">{selectedAccount.company_name}</h2>
                <button
                  onClick={() => setSelectedAccount(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  &times;
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              {/* Status */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Status</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleStatusChange(selectedAccount.id, 'approved')}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-2"
                  >
                    <CheckCircle className="h-4 w-4" />
                    Approve
                  </button>
                  <button
                    onClick={() => handleStatusChange(selectedAccount.id, 'suspended')}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center gap-2"
                  >
                    <XCircle className="h-4 w-4" />
                    Suspend
                  </button>
                </div>
              </div>

              {/* Contact Info */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Contact Information</h3>
                <div className="bg-gray-50 rounded-md p-4 space-y-2">
                  {selectedAccount.user && (
                    <>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <span>{selectedAccount.user.full_name || 'N/A'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400">Email:</span>
                        <span>{selectedAccount.user.email}</span>
                      </div>
                      {selectedAccount.user.phone && (
                        <div className="flex items-center gap-2">
                          <span className="text-gray-400">Phone:</span>
                          <span>{selectedAccount.user.phone}</span>
                        </div>
                      )}
                    </>
                  )}
                  {selectedAccount.website && (
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">Website:</span>
                      <a
                        href={selectedAccount.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {selectedAccount.website}
                      </a>
                    </div>
                  )}
                  {selectedAccount.tax_id && (
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">Tax ID:</span>
                      <span>{selectedAccount.tax_id}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Credit Settings */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Credit Settings</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Credit Limit</label>
                    <input
                      type="number"
                      defaultValue={selectedAccount.credit_limit}
                      className="w-full px-3 py-2 border rounded-md"
                      id="credit-limit"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Payment Terms</label>
                    <select
                      defaultValue={selectedAccount.payment_terms || 'net30'}
                      className="w-full px-3 py-2 border rounded-md"
                      id="payment-terms"
                    >
                      <option value="net15">Net 15</option>
                      <option value="net30">Net 30</option>
                      <option value="net60">Net 60</option>
                    </select>
                  </div>
                </div>
                <button
                  onClick={() => {
                    const creditLimit = parseFloat(
                      (document.getElementById('credit-limit') as HTMLInputElement).value
                    );
                    const paymentTerms = (
                      document.getElementById('payment-terms') as HTMLSelectElement
                    ).value;
                    handleStatusChange(selectedAccount.id, selectedAccount.status, {
                      credit_limit: creditLimit,
                      payment_terms: paymentTerms,
                    });
                  }}
                  className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Save Settings
                </button>
              </div>

              {/* Discount Tier */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Discount Tier</h3>
                <div className="grid grid-cols-4 gap-2">
                  {['bronze', 'silver', 'gold', 'platinum'].map((tier) => (
                    <button
                      key={tier}
                      onClick={() =>
                        handleStatusChange(selectedAccount.id, selectedAccount.status, {
                          discount_tier: tier,
                        })
                      }
                      className={`px-3 py-2 rounded-md text-sm capitalize ${
                        selectedAccount.discount_tier === tier
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {tier}
                    </button>
                  ))}
                </div>
              </div>

              {/* Account Info */}
              <div className="text-sm text-gray-500 space-y-1">
                <p>
                  Created: {format(new Date(selectedAccount.created_at), 'MMMM d, yyyy')}
                </p>
                {selectedAccount.verified_at && (
                  <p>
                    Verified: {format(new Date(selectedAccount.verified_at), 'MMMM d, yyyy')}
                  </p>
                )}
              </div>

              <div className="pt-4 border-t">
                <button
                  onClick={() => setSelectedAccount(null)}
                  className="px-4 py-2 border rounded-md hover:bg-gray-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}