import { RegisterForm } from '@/components/auth/RegisterForm';

export const metadata = {
  title: 'Create Account',
  description: 'Create an AGT Equipment account to start shopping for mini excavators, skid steers, and attachments.',
};

export default function RegisterPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <RegisterForm />
    </div>
  );
}
