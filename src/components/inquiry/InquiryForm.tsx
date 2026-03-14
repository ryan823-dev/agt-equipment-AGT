'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/contexts/AuthContext';
import { useCart } from '@/lib/contexts/CartContext';
import { InquiryType, InquiryFormData } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Package, Users, Wrench, Plus, X } from 'lucide-react';

interface InquiryFormProps {
  productId?: string;
  productName?: string;
  onSuccess?: () => void;
}

const inquiryTypes: { value: InquiryType; label: string; icon: typeof Package; description: string }[] = [
  {
    value: 'single',
    label: 'Single Product',
    icon: Package,
    description: 'Get a quote for a specific product',
  },
  {
    value: 'bulk',
    label: 'Bulk Order',
    icon: Users,
    description: 'Request pricing for large quantities',
  },
  {
    value: 'custom',
    label: 'Custom Solution',
    icon: Wrench,
    description: 'Need modifications or special requirements',
  },
];

export default function InquiryForm({ productId, productName, onSuccess }: InquiryFormProps) {
  const { user, profile } = useAuth();
  const { items } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<InquiryFormData>({
    contact_name: profile?.full_name || '',
    contact_email: user?.email || '',
    contact_phone: profile?.phone || undefined,
    company_name: profile?.company_name || undefined,
    type: 'single',
    message: '',
    use_case: '',
    preferred_timeline: '',
    items: productId
      ? [{ product_id: productId, product_name: productName || '', quantity: 1, notes: '' }]
      : items.length > 0
      ? items.map((item) => ({
          product_id: item.product_id,
          product_name: item.product.name,
          quantity: item.quantity,
          notes: '',
        }))
      : [{ product_name: '', quantity: 1, notes: '' }],
  });

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.contact_name.trim()) {
      newErrors.contact_name = 'Contact name is required';
    }
    if (!formData.contact_email.trim()) {
      newErrors.contact_email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contact_email)) {
      newErrors.contact_email = 'Invalid email format';
    }

    // Validate at least one item
    if (formData.items.length === 0 || !formData.items[0].product_name) {
      newErrors.items = 'At least one product is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        onSuccess?.();
      } else {
        setErrors({ submit: data.error || 'Failed to submit inquiry' });
      }
    } catch (error) {
      setErrors({ submit: 'An unexpected error occurred' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { product_name: '', quantity: 1, notes: '' }],
    });
  };

  const removeItem = (index: number) => {
    if (formData.items.length > 1) {
      setFormData({
        ...formData,
        items: formData.items.filter((_, i) => i !== index),
      });
    }
  };

  const updateItem = (index: number, field: string, value: string | number) => {
    const newItems = [...formData.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setFormData({ ...formData, items: newItems });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Inquiry Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          What type of inquiry is this?
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {inquiryTypes.map((type) => {
            const Icon = type.icon;
            return (
              <button
                key={type.value}
                type="button"
                onClick={() => setFormData({ ...formData, type: type.value })}
                className={`p-4 rounded-lg border-2 text-left transition-colors ${
                  formData.type === type.value
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Icon className={`h-5 w-5 mb-2 ${
                  formData.type === type.value ? 'text-blue-600' : 'text-gray-400'
                }`} />
                <p className="font-medium text-gray-900">{type.label}</p>
                <p className="text-xs text-gray-500 mt-1">{type.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Contact Information */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contact Name *
          </label>
          <Input
            value={formData.contact_name}
            onChange={(e) => setFormData({ ...formData, contact_name: e.target.value })}
            className={errors.contact_name ? 'border-red-500' : ''}
          />
          {errors.contact_name && (
            <p className="text-red-500 text-xs mt-1">{errors.contact_name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email *
          </label>
          <Input
            type="email"
            value={formData.contact_email}
            onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })}
            className={errors.contact_email ? 'border-red-500' : ''}
          />
          {errors.contact_email && (
            <p className="text-red-500 text-xs mt-1">{errors.contact_email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone (Optional)
          </label>
          <Input
            type="tel"
            value={formData.contact_phone || ''}
            onChange={(e) => setFormData({ ...formData, contact_phone: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Company Name (Optional)
          </label>
          <Input
            value={formData.company_name || ''}
            onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
          />
        </div>
      </div>

      {/* Products */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-medium text-gray-700">
            Products of Interest *
          </label>
          <Button type="button" variant="outline" size="sm" onClick={addItem}>
            <Plus className="h-4 w-4 mr-1" />
            Add Product
          </Button>
        </div>

        <div className="space-y-3">
          {formData.items.map((item, index) => (
            <div key={index} className="flex gap-3 items-start p-3 border rounded-lg">
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-1">
                  <label className="block text-xs text-gray-500 mb-1">Product Name</label>
                  <Input
                    value={item.product_name}
                    onChange={(e) => updateItem(index, 'product_name', e.target.value)}
                    placeholder="Product name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Quantity</label>
                  <Input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value) || 1)}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Notes</label>
                  <Input
                    value={item.notes || ''}
                    onChange={(e) => updateItem(index, 'notes', e.target.value)}
                    placeholder="Optional"
                  />
                </div>
              </div>
              {formData.items.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeItem(index)}
                  className="text-red-500 hover:text-red-600"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
        {errors.items && (
          <p className="text-red-500 text-xs mt-1">{errors.items}</p>
        )}
      </div>

      {/* Additional Information */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Message (Optional)
        </label>
        <textarea
          value={formData.message || ''}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Tell us more about your requirements..."
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Use Case (Optional)
          </label>
          <Input
            value={formData.use_case || ''}
            onChange={(e) => setFormData({ ...formData, use_case: e.target.value })}
            placeholder="How will you use this equipment?"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Preferred Timeline (Optional)
          </label>
          <select
            value={formData.preferred_timeline || ''}
            onChange={(e) => setFormData({ ...formData, preferred_timeline: e.target.value })}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select timeline</option>
            <option value="asap">As soon as possible</option>
            <option value="1-2-weeks">1-2 weeks</option>
            <option value="1-month">Within a month</option>
            <option value="flexible">Flexible</option>
          </select>
        </div>
      </div>

      {/* Error Message */}
      {errors.submit && (
        <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
          {errors.submit}
        </div>
      )}

      {/* Submit Button */}
      <Button type="submit" disabled={isSubmitting} size="lg" className="w-full">
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Submitting...
          </>
        ) : (
          'Submit Inquiry'
        )}
      </Button>

      <p className="text-xs text-gray-500 text-center">
        Our team will review your inquiry and get back to you within 24 hours.
      </p>
    </form>
  );
}