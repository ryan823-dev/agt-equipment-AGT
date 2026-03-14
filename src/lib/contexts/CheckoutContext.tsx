'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { AddressFormData, PaymentMethod } from '@/types';

export interface CheckoutStep {
  id: string;
  name: string;
  status: 'upcoming' | 'current' | 'complete';
}

interface CheckoutContextType {
  currentStep: number;
  steps: CheckoutStep[];
  shippingAddress: AddressFormData | null;
  billingAddress: AddressFormData | null;
  sameAsShipping: boolean;
  shippingMethod: string;
  paymentMethod: PaymentMethod;
  customerNotes: string;
  setShippingAddress: (address: AddressFormData) => void;
  setBillingAddress: (address: AddressFormData) => void;
  setSameAsShipping: (same: boolean) => void;
  setShippingMethod: (method: string) => void;
  setPaymentMethod: (method: PaymentMethod) => void;
  setCustomerNotes: (notes: string) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  resetCheckout: () => void;
}

const defaultSteps: CheckoutStep[] = [
  { id: 'shipping', name: 'Shipping', status: 'current' },
  { id: 'payment', name: 'Payment', status: 'upcoming' },
  { id: 'review', name: 'Review', status: 'upcoming' },
];

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<CheckoutStep[]>(defaultSteps);
  const [shippingAddress, setShippingAddress] = useState<AddressFormData | null>(null);
  const [billingAddress, setBillingAddress] = useState<AddressFormData | null>(null);
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('stripe');
  const [customerNotes, setCustomerNotes] = useState('');

  const updateSteps = (newCurrentStep: number) => {
    const newSteps = steps.map((step, index) => ({
      ...step,
      status:
        index < newCurrentStep
          ? 'complete'
          : index === newCurrentStep
          ? 'current'
          : 'upcoming',
    })) as CheckoutStep[];
    setSteps(newSteps);
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      const newStep = currentStep + 1;
      setCurrentStep(newStep);
      updateSteps(newStep);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      const newStep = currentStep - 1;
      setCurrentStep(newStep);
      updateSteps(newStep);
    }
  };

  const goToStep = (step: number) => {
    if (step >= 0 && step < steps.length) {
      setCurrentStep(step);
      updateSteps(step);
    }
  };

  const resetCheckout = () => {
    setCurrentStep(0);
    setSteps(defaultSteps);
    setShippingAddress(null);
    setBillingAddress(null);
    setSameAsShipping(true);
    setShippingMethod('standard');
    setPaymentMethod('stripe');
    setCustomerNotes('');
  };

  return (
    <CheckoutContext.Provider
      value={{
        currentStep,
        steps,
        shippingAddress,
        billingAddress,
        sameAsShipping,
        shippingMethod,
        paymentMethod,
        customerNotes,
        setShippingAddress,
        setBillingAddress,
        setSameAsShipping,
        setShippingMethod,
        setPaymentMethod,
        setCustomerNotes,
        nextStep,
        prevStep,
        goToStep,
        resetCheckout,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const context = useContext(CheckoutContext);
  if (context === undefined) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }
  return context;
}