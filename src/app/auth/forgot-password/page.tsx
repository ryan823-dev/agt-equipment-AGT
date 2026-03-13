import { ForgotPasswordForm } from '@/components/auth/ForgotPasswordForm';

export const metadata = {
  title: 'Reset Password',
  description: 'Reset your AGT Equipment account password.',
};

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <ForgotPasswordForm />
    </div>
  );
}
