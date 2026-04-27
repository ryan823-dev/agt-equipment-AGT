import type { Metadata } from 'next';
import { canonicalUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'AGT Industrial Inc. privacy policy - how we collect, use, and protect your personal information.',
  alternates: {
    canonical: canonicalUrl('/privacy/'),
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="py-16 bg-white">
      <div className="container max-w-4xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-8">Privacy Policy</h1>

        <div className="prose prose-slate max-w-none">
          <p className="text-slate-600 mb-6">
            <strong>Last Updated:</strong> October 8, 2025
          </p>

          <p className="text-slate-600 mb-6">
            AGT Industrial Inc. (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting and respecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">1. Information We Collect</h2>

          <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">Contact Details</h3>
          <p className="text-slate-600 mb-4">
            When you contact us or create an account, we may collect your name, email address, phone number, and company name.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">Order Information</h3>
          <p className="text-slate-600 mb-4">
            When you make a purchase, we collect billing address, shipping address, payment information, and order details.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">Usage Data</h3>
          <p className="text-slate-600 mb-4">
            We automatically collect information about how you interact with our website, including IP address, browser type, device information, pages visited, and referring URL.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">2. How We Use Your Information</h2>

          <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">Providing Products and Services</h3>
          <p className="text-slate-600 mb-4">
            We use your information to process orders, ship products, provide customer support, and communicate with you about your purchases.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">Marketing and Advertising</h3>
          <p className="text-slate-600 mb-4">
            With your consent, we may send you promotional emails about new products, special offers, and other information we think you may find interesting.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">Security and Fraud Prevention</h3>
          <p className="text-slate-600 mb-4">
            We use your information to detect and prevent fraud, protect our systems, and ensure the security of our website and customer data.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">3. Cookies and Tracking Technologies</h2>
          <p className="text-slate-600 mb-4">
            We use cookies and similar tracking technologies to collect and track information about your browsing activities. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">4. Third-Party Disclosures</h2>
          <p className="text-slate-600 mb-4">
            We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except to trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">5. Data Security</h2>
          <p className="text-slate-600 mb-4">
            We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">6. Your Rights</h2>

          <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">Right to Access / Know</h3>
          <p className="text-slate-600 mb-4">
            You have the right to request access to the personal information we hold about you.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">Right to Delete</h3>
          <p className="text-slate-600 mb-4">
            You have the right to request that we delete your personal information, subject to certain exceptions.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">Right to Opt-Out</h3>
          <p className="text-slate-600 mb-4">
            You may opt out of receiving marketing communications from us at any time by following the unsubscribe instructions in the communication or contacting us directly.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">7. Contact Us</h2>
          <p className="text-slate-600 mb-4">
            If you have questions about this Privacy Policy or our privacy practices, please contact us:
          </p>
          <ul className="list-disc list-inside text-slate-600 mb-4">
            <li>Email: info@agrotkindustrial.com</li>
            <li>Phone: +1 (949) 898-7669</li>
            <li>Address: 2602 Halladay Street, Santa Ana, CA 92707</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">8. Changes to This Policy</h2>
          <p className="text-slate-600 mb-4">
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last Updated&quot; date.
          </p>
        </div>
      </div>
    </div>
  );
}
