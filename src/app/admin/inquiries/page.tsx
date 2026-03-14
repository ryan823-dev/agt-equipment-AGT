'use client';

import { useEffect, useState, useCallback } from 'react';
import { format } from 'date-fns';
import {
  FileText,
  Search,
  ChevronLeft,
  ChevronRight,
  Eye,
  MessageSquare,
  Building2,
  User,
  Package,
  Settings,
} from 'lucide-react';

interface InquiryItem {
  id: string;
  product_name: string;
  quantity: number;
  notes: string | null;
}

interface Inquiry {
  id: string;
  inquiry_number: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string | null;
  company_name: string | null;
  type: string;
  status: string;
  message: string | null;
  use_case: string | null;
  preferred_timeline: string | null;
  created_at: string;
  inquiry_items?: InquiryItem[];
  quotes?: Array<{ id: string; quote_number: string; status: string }>;
}

interface InquiriesResponse {
  inquiries: Inquiry[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

const typeColors: Record<string, string> = {
  single: 'bg-blue-100 text-blue-800',
  bulk: 'bg-purple-100 text-purple-800',
  custom: 'bg-orange-100 text-orange-800',
};

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  quoted: 'bg-blue-100 text-blue-800',
  accepted: 'bg-green-100 text-green-800',
  converted: 'bg-green-100 text-green-800',
  expired: 'bg-gray-100 text-gray-800',
};

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  const fetchInquiries = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      params.set('page', pagination.page.toString());
      params.set('limit', pagination.limit.toString());
      if (statusFilter) params.set('status', statusFilter);
      if (typeFilter) params.set('type', typeFilter);
      if (searchQuery) params.set('search', searchQuery);

      const response = await fetch(`/api/admin/inquiries?${params.toString()}`);
      if (response.ok) {
        const data: InquiriesResponse = await response.json();
        setInquiries(data.inquiries);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error('Error fetching inquiries:', error);
    } finally {
      setIsLoading(false);
    }
  }, [pagination.page, pagination.limit, statusFilter, typeFilter, searchQuery]);

  useEffect(() => {
    fetchInquiries();
  }, [fetchInquiries]);

  const handleStatusChange = async (inquiryId: string, newStatus: string) => {
    try {
      const response = await fetch('/api/admin/inquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: inquiryId, status: newStatus }),
      });

      if (response.ok) {
        fetchInquiries();
        if (selectedInquiry?.id === inquiryId) {
          setSelectedInquiry(null);
        }
      }
    } catch (error) {
      console.error('Error updating inquiry:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Inquiries</h1>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by inquiry number, name, email, or company..."
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
            <option value="quoted">Quoted</option>
            <option value="accepted">Accepted</option>
            <option value="converted">Converted</option>
            <option value="expired">Expired</option>
          </select>
          <select
            value={typeFilter}
            onChange={(e) => {
              setTypeFilter(e.target.value);
              setPagination({ ...pagination, page: 1 });
            }}
            className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Types</option>
            <option value="single">Single Product</option>
            <option value="bulk">Bulk Order</option>
            <option value="custom">Custom Request</option>
          </select>
        </div>
      </div>

      {/* Inquiries Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : inquiries.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No inquiries found</p>
          </div>
        ) : (
          <>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Inquiry
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
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
                {inquiries.map((inquiry) => (
                  <tr key={inquiry.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-medium text-blue-600">{inquiry.inquiry_number}</span>
                      {inquiry.company_name && (
                        <p className="text-sm text-gray-500">{inquiry.company_name}</p>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="font-medium text-gray-900">{inquiry.contact_name}</p>
                      <p className="text-sm text-gray-500">{inquiry.contact_email}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          typeColors[inquiry.type] || 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {inquiry.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          statusColors[inquiry.status] || 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {inquiry.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {format(new Date(inquiry.created_at), 'MMM d, yyyy')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <button
                        onClick={() => setSelectedInquiry(inquiry)}
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

      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto m-4">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">{selectedInquiry.inquiry_number}</h2>
                <button
                  onClick={() => setSelectedInquiry(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  &times;
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              {/* Contact Info */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Contact Information</h3>
                <div className="bg-gray-50 rounded-md p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-400" />
                    <span>{selectedInquiry.contact_name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-gray-400" />
                    <span>{selectedInquiry.contact_email}</span>
                  </div>
                  {selectedInquiry.contact_phone && (
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">Tel:</span>
                      <span>{selectedInquiry.contact_phone}</span>
                    </div>
                  )}
                  {selectedInquiry.company_name && (
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-gray-400" />
                      <span>{selectedInquiry.company_name}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Type & Status */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Type</h3>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      typeColors[selectedInquiry.type] || 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {selectedInquiry.type}
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Status</h3>
                  <select
                    value={selectedInquiry.status}
                    onChange={(e) => handleStatusChange(selectedInquiry.id, e.target.value)}
                    className="px-3 py-1 border rounded-md text-sm"
                  >
                    <option value="pending">Pending</option>
                    <option value="quoted">Quoted</option>
                    <option value="accepted">Accepted</option>
                    <option value="converted">Converted</option>
                    <option value="expired">Expired</option>
                  </select>
                </div>
              </div>

              {/* Products */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Requested Products</h3>
                <div className="border rounded-md divide-y">
                  {selectedInquiry.inquiry_items?.map((item) => (
                    <div key={item.id} className="p-3">
                      <div className="flex justify-between">
                        <span className="font-medium">{item.product_name}</span>
                        <span className="text-gray-600">Qty: {item.quantity}</span>
                      </div>
                      {item.notes && <p className="text-sm text-gray-500 mt-1">{item.notes}</p>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Message */}
              {selectedInquiry.message && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Message</h3>
                  <p className="text-gray-900 bg-gray-50 rounded-md p-4">
                    {selectedInquiry.message}
                  </p>
                </div>
              )}

              {/* Use Case & Timeline */}
              <div className="grid grid-cols-2 gap-4">
                {selectedInquiry.use_case && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Use Case</h3>
                    <p className="text-gray-900">{selectedInquiry.use_case}</p>
                  </div>
                )}
                {selectedInquiry.preferred_timeline && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Preferred Timeline</h3>
                    <p className="text-gray-900">{selectedInquiry.preferred_timeline}</p>
                  </div>
                )}
              </div>

              {/* Related Quote */}
              {selectedInquiry.quotes && selectedInquiry.quotes.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Related Quote</h3>
                  <div className="bg-blue-50 rounded-md p-3">
                    <a
                      href={`/admin/quotes`}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      {selectedInquiry.quotes[0].quote_number}
                    </a>
                    <span className="ml-2 text-sm text-gray-500">
                      ({selectedInquiry.quotes[0].status})
                    </span>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t">
                <a
                  href={`/admin/quotes?inquiry=${selectedInquiry.id}`}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-center"
                >
                  Create Quote
                </a>
                <button
                  onClick={() => setSelectedInquiry(null)}
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