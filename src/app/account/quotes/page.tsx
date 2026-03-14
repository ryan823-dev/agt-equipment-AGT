'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/contexts/AuthContext';
import { getSupabaseClient } from '@/lib/supabase/client';
import { Inquiry, InquiryStatus, Quote } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Loader2,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  DollarSign,
  ArrowRight,
  Plus,
} from 'lucide-react';

const statusConfig: Record<InquiryStatus, { label: string; icon: typeof Clock; color: string }> = {
  pending: { label: 'Pending Review', icon: Clock, color: 'text-yellow-600 bg-yellow-50' },
  quoted: { label: 'Quote Ready', icon: DollarSign, color: 'text-blue-600 bg-blue-50' },
  accepted: { label: 'Accepted', icon: CheckCircle, color: 'text-green-600 bg-green-50' },
  converted: { label: 'Converted to Order', icon: CheckCircle, color: 'text-green-600 bg-green-50' },
  expired: { label: 'Expired', icon: XCircle, color: 'text-gray-600 bg-gray-50' },
};

export default function QuotesPage() {
  const { user, isAuthenticated } = useAuth();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const supabase = getSupabaseClient();

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchInquiries();
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated, user]);

  const fetchInquiries = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('inquiries')
      .select('*, inquiry_items(*), quote:quotes(*)')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setInquiries(data as Inquiry[]);
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="bg-white rounded-lg border p-12 text-center">
        <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Sign in to view quotes</h3>
        <p className="text-gray-500 mb-6">
          Please sign in to view your inquiries and quotes.
        </p>
        <Button asChild>
          <Link href="/auth/login">Sign In</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inquiries & Quotes</h1>
          <p className="text-gray-600 mt-1">Track your quote requests and manage quotes.</p>
        </div>
        <Button asChild>
          <Link href="/inquiry">
            <Plus className="h-4 w-4 mr-2" />
            New Inquiry
          </Link>
        </Button>
      </div>

      {inquiries.length === 0 ? (
        <div className="bg-white rounded-lg border p-12 text-center">
          <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No inquiries yet</h3>
          <p className="text-gray-500 mb-6">
            Request a quote for equipment and it will appear here.
          </p>
          <Button asChild>
            <Link href="/inquiry">
              Request a Quote
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {inquiries.map((inquiry) => {
            const status = statusConfig[inquiry.status];
            const StatusIcon = status.icon;
            const hasQuote = inquiry.quote && Array.isArray(inquiry.quote) && inquiry.quote.length > 0;

            return (
              <Card key={inquiry.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <div>
                      <p className="font-medium text-gray-900">
                        Inquiry #{inquiry.inquiry_number}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(inquiry.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${status.color}`}>
                      <StatusIcon className="h-4 w-4" />
                      <span className="text-sm font-medium">{status.label}</span>
                    </div>
                  </div>

                  {/* Items Summary */}
                  {inquiry.items && inquiry.items.length > 0 && (
                    <div className="border rounded-lg divide-y mb-4">
                      {inquiry.items.slice(0, 3).map((item, index) => (
                        <div key={index} className="p-3 flex justify-between text-sm">
                          <span className="text-gray-600">{item.product_name}</span>
                          <span className="text-gray-900">Qty: {item.quantity}</span>
                        </div>
                      ))}
                      {inquiry.items.length > 3 && (
                        <div className="p-3 text-sm text-gray-500 text-center">
                          +{inquiry.items.length - 3} more items
                        </div>
                      )}
                    </div>
                  )}

                  {/* Quote Info */}
                  {hasQuote && (
                    <div className="bg-blue-50 rounded-lg p-4 mb-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-blue-600 font-medium">Quote Available</p>
                          <p className="text-lg font-bold text-gray-900">
                            ${Array.isArray(inquiry.quote) && inquiry.quote[0]?.total_amount
                              ? inquiry.quote[0].total_amount.toLocaleString()
                              : 'N/A'}
                          </p>
                        </div>
                        <Button size="sm">View Quote</Button>
                      </div>
                    </div>
                  )}

                  {/* Company Info */}
                  {inquiry.company_name && (
                    <p className="text-sm text-gray-500">
                      Company: {inquiry.company_name}
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}