import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | AGT Equipment',
  description: 'Terms and conditions for using AGT Equipment website and purchasing our products.',
};

export default function TermsOfServicePage() {
  return (
    <div className="py-16 bg-white">
      <div className="container max-w-4xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-8">Terms of Service</h1>

        <div className="prose prose-slate max-w-none">
          <p className="text-slate-600 mb-6">
            <strong>Last Updated:</strong> October 8, 2025
          </p>

          <p className="text-slate-600 mb-6">
            Welcome to AGT Industrial! By accessing our website at www.agtequipment.com or purchasing products from us, you agree to abide by these Terms of Service. Please read these terms carefully before using our services.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">1. Use of Service</h2>
          <p className="text-slate-600 mb-4">
            You agree to use our website and services only for lawful purposes and in accordance with these Terms. You may not use our website in any way that violates any applicable federal, state, local, or international law or regulation.
          </p>
          <p className="text-slate-600 mb-4">
            You are responsible for ensuring that all persons who access our website through your internet connection are aware of these terms and comply with them.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">2. Privacy and Security</h2>
          <p className="text-slate-600 mb-4">
            Your use of our website is also governed by our Privacy Policy. By using our website, you consent to the collection and use of your information as described in our Privacy Policy.
          </p>
          <p className="text-slate-600 mb-4">
            We employ industry-standard security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">3. Product Information</h2>
          <p className="text-slate-600 mb-4">
            We make every effort to display our products and their specifications accurately. However, we do not guarantee that product descriptions, colors, images, or other content is accurate, complete, reliable, current, or error-free.
          </p>
          <p className="text-slate-600 mb-4">
            Prices for products are subject to change without notice. We reserve the right to modify or discontinue any product at any time.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">4. Ordering and Payment</h2>
          <p className="text-slate-600 mb-4">
            All orders are subject to acceptance and availability. We reserve the right to refuse or cancel any order for any reason at any time.
          </p>
          <p className="text-slate-600 mb-4">
            You agree to provide accurate and complete payment information. All payments are processed through secure third-party payment processors.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">5. Shipping and Delivery</h2>
          <p className="text-slate-600 mb-4">
            We offer free shipping to the continental United States. Shipping to Alaska, Hawaii, and international destinations may incur additional charges.
          </p>
          <p className="text-slate-600 mb-4">
            Delivery times are estimates and are not guaranteed. We are not responsible for delays caused by shipping carriers, customs, or other factors beyond our control.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">6. Warranty and Returns</h2>
          <p className="text-slate-600 mb-4">
            All equipment sold by AGT Industrial includes a 1-year warranty covering defects in materials and workmanship. For complete warranty terms, please see our Warranty Information page.
          </p>
          <p className="text-slate-600 mb-4">
            Returns are accepted within 30 days of delivery for unused items in original packaging. Return shipping costs are the responsibility of the customer unless the return is due to our error.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">7. Third-Party Links</h2>
          <p className="text-slate-600 mb-4">
            Our website may contain links to third-party websites or services that are not owned or controlled by AGT Industrial. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">8. User Comments and Feedback</h2>
          <p className="text-slate-600 mb-4">
            If you send us creative ideas, suggestions, proposals, or other materials (collectively, &apos;comments&apos;), you agree that we may use your comments in any way without compensation to you.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">9. Limitation of Liability</h2>
          <p className="text-slate-600 mb-4">
            To the fullest extent permitted by applicable law, AGT Industrial shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses.
          </p>
          <p className="text-slate-600 mb-4">
            In no event shall our aggregate liability exceed the amount you paid us for the product or service giving rise to the claim.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">10. Indemnification</h2>
          <p className="text-slate-600 mb-4">
            You agree to defend, indemnify, and hold harmless AGT Industrial and its affiliates, officers, directors, employees, and agents from any claim, demand, suit, or proceeding arising out of your use of our website or violation of these Terms.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">11. Termination</h2>
          <p className="text-slate-600 mb-4">
            We may terminate or suspend your access to our website immediately, without prior notice or liability, for any reason, including without limitation if you breach these Terms.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">12. Governing Law</h2>
          <p className="text-slate-600 mb-4">
            These Terms shall be governed by and construed in accordance with the laws of the United States and the State of California, without regard to its conflict of law provisions.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">13. Changes to Terms</h2>
          <p className="text-slate-600 mb-4">
            We reserve the right to modify these terms at any time. We will notify users of any material changes by posting the new Terms on this page. Your continued use of our website after any changes constitutes acceptance of the new terms.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">14. Contact Information</h2>
          <p className="text-slate-600 mb-4">
            For questions about these Terms of Service, please contact us:
          </p>
          <ul className="list-disc list-inside text-slate-600 mb-4">
            <li>Email: info@agrotkindustrial.com</li>
            <li>Phone: +1 (949) 898-7669</li>
            <li>Address: 2602 Halladay Street, Santa Ana, CA 92707</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
