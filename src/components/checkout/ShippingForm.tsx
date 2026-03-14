'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/contexts/AuthContext';
import { useCheckout } from '@/lib/contexts/CheckoutContext';
import { getSupabaseClient } from '@/lib/supabase/client';
import { Address, AddressFormData } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, MapPin, Plus } from 'lucide-react';

const countries = [
  { code: 'US', name: 'United States' },
  { code: 'CA', name: 'Canada' },
  { code: 'MX', name: 'Mexico' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'AU', name: 'Australia' },
  { code: 'DE', name: 'Germany' },
  { code: 'FR', name: 'France' },
];

export default function ShippingForm() {
  const { user, isAuthenticated } = useAuth();
  const { shippingAddress, setShippingAddress, setSameAsShipping, nextStep } = useCheckout();
  const [savedAddresses, setSavedAddresses] = useState<Address[]>([]);
  const [isLoadingAddresses, setIsLoadingAddresses] = useState(false);
  const [showNewForm, setShowNewForm] = useState(!isAuthenticated);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<AddressFormData>(
    shippingAddress || {
      type: 'shipping',
      is_default: false,
      first_name: '',
      last_name: '',
      address_line1: '',
      city: '',
      state: '',
      postal_code: '',
      country: 'US',
    }
  );

  const supabase = getSupabaseClient();

  // Fetch saved addresses for logged-in users
  useEffect(() => {
    if (isAuthenticated && user) {
      setIsLoadingAddresses(true);
      supabase
        .from('addresses')
        .select('*')
        .eq('user_id', user.id)
        .eq('type', 'shipping')
        .order('is_default', { ascending: false })
        .then(({ data, error }: { data: Address[] | null; error: { message: string } | null }) => {
          if (!error && data && data.length > 0) {
            setSavedAddresses(data as Address[]);
            // Auto-select default address
            const defaultAddr = data.find((a: Address) => a.is_default);
            if (defaultAddr && !shippingAddress) {
              selectAddress(defaultAddr);
              setShowNewForm(false);
            }
          }
          setIsLoadingAddresses(false);
        });
    }
  }, [isAuthenticated, user]);

  const selectAddress = (address: Address) => {
    const addrData: AddressFormData = {
      type: 'shipping',
      is_default: address.is_default,
      first_name: address.first_name || '',
      last_name: address.last_name || '',
      company: address.company || undefined,
      address_line1: address.address_line1,
      address_line2: address.address_line2 || undefined,
      city: address.city,
      state: address.state,
      postal_code: address.postal_code,
      country: address.country,
      phone: address.phone || undefined,
    };
    setFormData(addrData);
    setShippingAddress(addrData);
    setShowNewForm(false);
    setErrors({});
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.first_name.trim()) {
      newErrors.first_name = 'First name is required';
    }
    if (!formData.last_name.trim()) {
      newErrors.last_name = 'Last name is required';
    }
    if (!formData.address_line1.trim()) {
      newErrors.address_line1 = 'Address is required';
    }
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }
    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }
    if (!formData.postal_code.trim()) {
      newErrors.postal_code = 'Postal code is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Save address to profile if logged in and new
    if (isAuthenticated && user && showNewForm) {
      await supabase.from('addresses').insert({
        ...formData,
        user_id: user.id,
      });
    }

    setShippingAddress(formData);
    setSameAsShipping(true);
    setIsSubmitting(false);
    nextStep();
  };

  if (isLoadingAddresses) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Shipping Address</h2>
        <p className="text-sm text-gray-600 mt-1">
          Where should we deliver your order?
        </p>
      </div>

      {/* Saved Addresses */}
      {savedAddresses.length > 0 && !showNewForm && (
        <div className="space-y-3">
          {savedAddresses.map((address) => (
            <button
              key={address.id}
              onClick={() => selectAddress(address)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${
                shippingAddress?.address_line1 === address.address_line1
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">
                      {address.first_name} {address.last_name}
                    </span>
                    {address.is_default && (
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                        Default
                      </span>
                    )}
                  </div>
                  {address.company && (
                    <p className="text-sm text-gray-600">{address.company}</p>
                  )}
                  <p className="text-sm text-gray-600">
                    {address.address_line1}
                    {address.address_line2 && `, ${address.address_line2}`}
                  </p>
                  <p className="text-sm text-gray-600">
                    {address.city}, {address.state} {address.postal_code}
                  </p>
                </div>
              </div>
            </button>
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={() => setShowNewForm(true)}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Address
          </Button>
        </div>
      )}

      {/* New Address Form */}
      {(showNewForm || savedAddresses.length === 0) && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name *
              </label>
              <Input
                value={formData.first_name}
                onChange={(e) =>
                  setFormData({ ...formData, first_name: e.target.value })
                }
                className={errors.first_name ? 'border-red-500' : ''}
              />
              {errors.first_name && (
                <p className="text-red-500 text-xs mt-1">{errors.first_name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name *
              </label>
              <Input
                value={formData.last_name}
                onChange={(e) =>
                  setFormData({ ...formData, last_name: e.target.value })
                }
                className={errors.last_name ? 'border-red-500' : ''}
              />
              {errors.last_name && (
                <p className="text-red-500 text-xs mt-1">{errors.last_name}</p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company (Optional)
              </label>
              <Input
                value={formData.company || ''}
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address Line 1 *
              </label>
              <Input
                value={formData.address_line1}
                onChange={(e) =>
                  setFormData({ ...formData, address_line1: e.target.value })
                }
                placeholder="Street address"
                className={errors.address_line1 ? 'border-red-500' : ''}
              />
              {errors.address_line1 && (
                <p className="text-red-500 text-xs mt-1">{errors.address_line1}</p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address Line 2 (Optional)
              </label>
              <Input
                value={formData.address_line2 || ''}
                onChange={(e) =>
                  setFormData({ ...formData, address_line2: e.target.value })
                }
                placeholder="Apartment, suite, unit, etc."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City *
              </label>
              <Input
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                className={errors.city ? 'border-red-500' : ''}
              />
              {errors.city && (
                <p className="text-red-500 text-xs mt-1">{errors.city}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State / Province *
              </label>
              <Input
                value={formData.state}
                onChange={(e) =>
                  setFormData({ ...formData, state: e.target.value })
                }
                className={errors.state ? 'border-red-500' : ''}
              />
              {errors.state && (
                <p className="text-red-500 text-xs mt-1">{errors.state}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Postal Code *
              </label>
              <Input
                value={formData.postal_code}
                onChange={(e) =>
                  setFormData({ ...formData, postal_code: e.target.value })
                }
                className={errors.postal_code ? 'border-red-500' : ''}
              />
              {errors.postal_code && (
                <p className="text-red-500 text-xs mt-1">{errors.postal_code}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone (Optional)
              </label>
              <Input
                type="tel"
                value={formData.phone || ''}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country
              </label>
              <select
                value={formData.country}
                onChange={(e) =>
                  setFormData({ ...formData, country: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {countries.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            {savedAddresses.length > 0 && (
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowNewForm(false)}
              >
                Cancel
              </Button>
            )}
            <Button type="submit" disabled={isSubmitting} className="flex-1">
              {isSubmitting && (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              )}
              Continue to Payment
            </Button>
          </div>
        </form>
      )}

      {/* Show continue button if address selected */}
      {savedAddresses.length > 0 && !showNewForm && shippingAddress && (
        <Button onClick={nextStep} className="w-full">
          Continue to Payment
        </Button>
      )}
    </div>
  );
}