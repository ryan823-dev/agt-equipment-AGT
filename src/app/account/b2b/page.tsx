'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/contexts/AuthContext';
import { getSupabaseClient } from '@/lib/supabase/client';
import { B2BAccount, BusinessType, B2BStatus } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Loader2,
  Building2,
  CheckCircle,
  Clock,
  XCircle,
  CreditCard,
  Percent,
  ArrowRight,
} from 'lucide-react';

const businessTypes: { value: BusinessType; label: string }[] = [
  { value: 'contractor', label: 'Contractor' },
  { value: 'dealer', label: 'Dealer / Reseller' },
  { value: 'rental', label: 'Rental Company' },
  { value: 'other', label: 'Other' },
];

const statusConfig: Record<B2BStatus, { label: string; icon: typeof Clock; color: string; description: string }> = {
  pending: {
    label: 'Application Pending',
    icon: Clock,
    color: 'text-yellow-600 bg-yellow-50',
    description: 'Your application is being reviewed.',
  },
  approved: {
    label: 'Approved',
    icon: CheckCircle,
    color: 'text-green-600 bg-green-50',
    description: 'Your B2B account is approved!',
  },
  suspended: {
    label: 'Suspended',
    icon: XCircle,
    color: 'text-red-600 bg-red-50',
    description: 'Please contact support for assistance.',
  },
};

export default function B2BPage() {
  const router = useRouter();
  const { user, isAuthenticated, profile } = useAuth();
  const [b2bAccount, setB2bAccount] = useState<B2BAccount | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    company_name: '',
    business_type: 'contractor' as BusinessType,
    tax_id: '',
    website: '',
  });

  const supabase = getSupabaseClient();

  const fetchB2BAccount = useCallback(async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('b2b_accounts')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (!error && data) {
      setB2bAccount(data as B2BAccount);
    }
    setIsLoading(false);
  }, [user, supabase]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }

    fetchB2BAccount();
  }, [isAuthenticated, router, fetchB2BAccount]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.company_name.trim()) {
      newErrors.company_name = 'Company name is required';
    }
    if (!formData.business_type) {
      newErrors.business_type = 'Business type is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm() || !user) return;

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('b2b_accounts').insert({
        user_id: user.id,
        company_name: formData.company_name,
        business_type: formData.business_type,
        tax_id: formData.tax_id || null,
        website: formData.website || null,
        status: 'pending',
      });

      if (error) {
        setErrors({ submit: error.message });
      } else {
        fetchB2BAccount();
      }
    } catch (err) {
      setErrors({ submit: 'An unexpected error occurred' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  // Show account status if B2B account exists
  if (b2bAccount) {
    const status = statusConfig[b2bAccount.status];
    const StatusIcon = status.icon;

    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">B2B Account</h1>
          <p className="text-gray-600 mt-1">Manage your wholesale account.</p>
        </div>

        {/* Status Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className={`p-3 rounded-full ${status.color}`}>
                <StatusIcon className="h-6 w-6" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">{status.label}</p>
                <p className="text-sm text-gray-600">{status.description}</p>
              </div>
            </div>

            {b2bAccount.status === 'approved' && (
              <>
                <div className="border-t pt-4 mt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Percent className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Discount Tier</span>
                    </div>
                    <span className="font-medium capitalize">{b2bAccount.discount_tier}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Percent className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Default Discount</span>
                    </div>
                    <span className="font-medium">{b2bAccount.default_discount_percent}%</span>
                  </div>
                  {b2bAccount.payment_terms && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">Payment Terms</span>
                      </div>
                      <span className="font-medium uppercase">{b2bAccount.payment_terms}</span>
                    </div>
                  )}
                  {b2bAccount.credit_limit > 0 && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">Credit Limit</span>
                      </div>
                      <span className="font-medium">${b2bAccount.credit_limit.toLocaleString()}</span>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t">
                  <Button asChild>
                    <a href="/inquiry">Request Quote for Bulk Order</a>
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Company Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Company Information</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-3">
              <div>
                <dt className="text-sm text-gray-500">Company Name</dt>
                <dd className="font-medium">{b2bAccount.company_name}</dd>
              </div>
              {b2bAccount.business_type && (
                <div>
                  <dt className="text-sm text-gray-500">Business Type</dt>
                  <dd className="font-medium capitalize">{b2bAccount.business_type}</dd>
                </div>
              )}
              {b2bAccount.website && (
                <div>
                  <dt className="text-sm text-gray-500">Website</dt>
                  <dd className="font-medium">
                    <a href={b2bAccount.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {b2bAccount.website}
                    </a>
                  </dd>
                </div>
              )}
            </dl>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show application form
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Apply for B2B Account</h1>
        <p className="text-gray-600 mt-1">
          Get wholesale pricing, credit terms, and dedicated support for your business.
        </p>
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Percent className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="font-medium">Volume Discounts</p>
            <p className="text-sm text-gray-500">Up to 20% off</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <CreditCard className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="font-medium">Credit Terms</p>
            <p className="text-sm text-gray-500">Net 30 available</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Building2 className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="font-medium">Dedicated Support</p>
            <p className="text-sm text-gray-500">Priority service</p>
          </CardContent>
        </Card>
      </div>

      {/* Application Form */}
      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Name *
              </label>
              <Input
                value={formData.company_name}
                onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                className={errors.company_name ? 'border-red-500' : ''}
              />
              {errors.company_name && (
                <p className="text-red-500 text-xs mt-1">{errors.company_name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Business Type *
              </label>
              <select
                value={formData.business_type}
                onChange={(e) => setFormData({ ...formData, business_type: e.target.value as BusinessType })}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {businessTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tax ID / EIN (Optional)
              </label>
              <Input
                value={formData.tax_id}
                onChange={(e) => setFormData({ ...formData, tax_id: e.target.value })}
                placeholder="XX-XXXXXXX"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Website (Optional)
              </label>
              <Input
                type="url"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                placeholder="https://example.com"
              />
            </div>

            {errors.submit && (
              <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                {errors.submit}
              </div>
            )}

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Submit Application
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>

            <p className="text-xs text-gray-500 text-center">
              Applications are typically reviewed within 1-2 business days.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
