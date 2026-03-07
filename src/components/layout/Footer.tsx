import Link from 'next/link';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';

const footerLinks = {
  products: [
    { name: 'Mini Excavators', href: '/products/mini-excavators' },
    { name: 'Skid Steers', href: '/products/skid-steer' },
    { name: 'Attachments', href: '/products/attachments' },
    { name: 'Parts', href: '/products/parts' },
  ],
  support: [
    { name: 'Shipping Policy', href: '/shipping' },
    { name: 'Return Policy', href: '/returns' },
    { name: 'Warranty', href: '/warranty' },
    { name: 'Financing', href: '/financing' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Blog', href: '/knowledge' },
    { name: 'Dealer Program', href: '/dealer' },
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
    <footer className="border-t bg-muted/30">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-primary">AGT</span>
              <span className="text-lg font-semibold">Equipment</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Factory direct mini excavators and skid steers. 
              US warehouses in California and Illinois.
            </p>
            <div className="mt-6 space-y-2 text-sm">
              <a href="tel:+19498987669" className="flex items-center text-muted-foreground hover:text-foreground">
                <Phone className="mr-2 h-4 w-4" />
                +1 (949) 898-7669
              </a>
              <a href="mailto:info@agrotkindustrial.com" className="flex items-center text-muted-foreground hover:text-foreground">
                <Mail className="mr-2 h-4 w-4" />
                info@agrotkindustrial.com
              </a>
            </div>
            <div className="mt-4 flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold mb-4">Products</h3>
            <ul className="space-y-2">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Warehouses */}
          <div>
            <h3 className="font-semibold mb-4">Warehouses</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start">
                <MapPin className="mr-2 h-4 w-4 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium text-foreground">California</div>
                  <div>2602 Halladay Street<br />Santa Ana, CA 92707</div>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="mr-2 h-4 w-4 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium text-foreground">Illinois</div>
                  <div>6200 S Oak Park Ave<br />Chicago, IL 60638</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} AGT Industrial Inc. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="/privacy" className="hover:text-foreground">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-foreground">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
