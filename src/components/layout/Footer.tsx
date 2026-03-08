import Link from 'next/link';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';

const footerLinks = {
  products: [
    { name: 'Mini Excavators', href: '/mini-excavators/' },
    { name: 'Mini Skid Steers', href: '/mini-skid-steers/' },
    { name: 'Attachments', href: '/attachments/' },
    { name: 'Parts', href: '/parts/' },
  ],
  support: [
    { name: 'Manuals', href: '/support/manuals/' },
    { name: 'Parts Compatibility', href: '/support/compatibility/' },
    { name: 'Maintenance', href: '/support/maintenance/' },
    { name: 'Shipping & Delivery', href: '/support/shipping-delivery/' },
  ],
  company: [
    { name: 'About Us', href: '/about/' },
    { name: 'Contact', href: '/contact/' },
    { name: 'Blog', href: '/knowledge/' },
    { name: 'Warranty', href: '/support/warranty/' },
  ],
};

const socialLinks = [
  { name: 'Facebook', href: 'https://facebook.com/agtequipment', icon: Facebook },
  { name: 'Instagram', href: 'https://instagram.com/agtequipment', icon: Instagram },
  { name: 'LinkedIn', href: 'https://linkedin.com/company/agtequipment', icon: Linkedin },
  { name: 'YouTube', href: 'https://youtube.com/@agtequipment', icon: Youtube },
];

export function Footer() {
  return (
    <footer className="border-t bg-slate-900 text-slate-300">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-white">AGT</span>
              <span className="text-lg font-semibold text-white">Equipment</span>
            </Link>
            <p className="mt-4 text-sm text-slate-400">
              Factory direct mini excavators and mini skid steers.
              US warehouses in California and Illinois. Free shipping and 1-year warranty.
            </p>
            <div className="mt-6 space-y-2 text-sm">
              <a href="tel:+19498987669" className="flex items-center text-slate-400 hover:text-white transition-colors">
                <Phone className="mr-2 h-4 w-4" />
                +1 (949) 898-7669
              </a>
              <a href="mailto:support@agtequipment.com" className="flex items-center text-slate-400 hover:text-white transition-colors">
                <Mail className="mr-2 h-4 w-4" />
                support@agtequipment.com
              </a>
            </div>
            <div className="mt-4 flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold text-white mb-4">Products</h3>
            <ul className="space-y-2">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Warehouses */}
          <div>
            <h3 className="font-semibold text-white mb-4">Warehouses</h3>
            <div className="space-y-3 text-sm text-slate-400">
              <div className="flex items-start">
                <MapPin className="mr-2 h-4 w-4 mt-0.5 flex-shrink-0 text-blue-400" />
                <div>
                  <div className="font-medium text-white">California</div>
                  <div>2602 Halladay Street<br />Santa Ana, CA 92707</div>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="mr-2 h-4 w-4 mt-0.5 flex-shrink-0 text-blue-400" />
                <div>
                  <div className="font-medium text-white">Illinois</div>
                  <div>6200 S Oak Park Ave<br />Chicago, IL 60638</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} AGT Equipment. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-slate-500">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
