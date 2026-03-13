'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/contexts/AuthContext';
import { getSupabaseClient } from '@/lib/supabase/client';
import { Address, AddressFormData } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Plus, Edit2, Trash2, Loader2 } from 'lucide-react';

export default function AddressesPage() {
  const { user } = useAuth();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<AddressFormData>({
    type: 'shipping',
    is_default: false,
    first_name: '',
    last_name: '',
    address_line1: '',
    city: '',
    state: '',
    postal_code: '',
    country: 'US',
  });

  const supabase = getSupabaseClient();

  useEffect(() => {
    if (user) {
      fetchAddresses();
    }
  }, [user]);

  const fetchAddresses = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('addresses')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setAddresses(data as Address[]);
    }
    setIsLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);

    if (editingId) {
      // Update existing address
      const { error } = await supabase
        .from('addresses')
        .update(formData)
        .eq('id', editingId);

      if (!error) {
        setEditingId(null);
        resetForm();
        fetchAddresses();
      }
    } else {
      // Create new address
      const { error } = await supabase.from('addresses').insert({
        ...formData,
        user_id: user.id,
      });

      if (!error) {
        setIsAdding(false);
        resetForm();
        fetchAddresses();
      }
    }

    setIsLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this address?')) return;

    const { error } = await supabase.from('addresses').delete().eq('id', id);

    if (!error) {
      setAddresses(addresses.filter((a) => a.id !== id));
    }
  };

  const handleEdit = (address: Address) => {
    setEditingId(address.id);
    setFormData({
      type: address.type,
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
    });
    setIsAdding(true);
  };

  const resetForm = () => {
    setFormData({
      type: 'shipping',
      is_default: false,
      first_name: '',
      last_name: '',
      address_line1: '',
      city: '',
      state: '',
      postal_code: '',
      country: 'US',
    });
  };

  if (isLoading && addresses.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Addresses</h1>
          <p className="text-gray-600 mt-1">Manage your shipping and billing addresses.</p>
        </div>
        {!isAdding && (
          <Button onClick={() => setIsAdding(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Address
          </Button>
        )}
      </div>

      {isAdding && (
        <Card>
          <CardHeader>
            <CardTitle>{editingId ? 'Edit Address' : 'Add New Address'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">First Name</label>
                  <Input
                    value={formData.first_name}
                    onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Last Name</label>
                  <Input
                    value={formData.last_name}
                    onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm font-medium">Company (Optional)</label>
                  <Input
                    value={formData.company || ''}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm font-medium">Address Line 1</label>
                  <Input
                    value={formData.address_line1}
                    onChange={(e) => setFormData({ ...formData, address_line1: e.target.value })}
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm font-medium">Address Line 2 (Optional)</label>
                  <Input
                    value={formData.address_line2 || ''}
                    onChange={(e) => setFormData({ ...formData, address_line2: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">City</label>
                  <Input
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">State</label>
                  <Input
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Postal Code</label>
                  <Input
                    value={formData.postal_code}
                    onChange={(e) => setFormData({ ...formData, postal_code: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Phone (Optional)</label>
                  <Input
                    type="tel"
                    value={formData.phone || ''}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="type"
                    checked={formData.type === 'shipping'}
                    onChange={() => setFormData({ ...formData, type: 'shipping' })}
                  />
                  Shipping
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="type"
                    checked={formData.type === 'billing'}
                    onChange={() => setFormData({ ...formData, type: 'billing' })}
                  />
                  Billing
                </label>
                <label className="flex items-center gap-2 ml-auto">
                  <input
                    type="checkbox"
                    checked={formData.is_default}
                    onChange={(e) => setFormData({ ...formData, is_default: e.target.checked })}
                  />
                  Default
                </label>
              </div>

              <div className="flex gap-2">
                <Button type="submit" disabled={isLoading}>
                  {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  {editingId ? 'Update Address' : 'Save Address'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsAdding(false);
                    setEditingId(null);
                    resetForm();
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {addresses.length === 0 && !isAdding ? (
        <div className="bg-white rounded-lg border p-12 text-center">
          <MapPin className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No addresses saved</h3>
          <p className="text-gray-500 mb-6">Add a shipping or billing address for faster checkout.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((address) => (
            <Card key={address.id}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
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
                    <p className="text-sm text-gray-600">{address.country}</p>
                    {address.phone && (
                      <p className="text-sm text-gray-600 mt-1">{address.phone}</p>
                    )}
                    <p className="text-xs text-gray-400 mt-2 capitalize">{address.type}</p>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(address)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(address.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
