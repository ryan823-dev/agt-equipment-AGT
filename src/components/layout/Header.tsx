'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';

const navigation = [
  {
    name: 'Mini Excavators',
    href: '/mini-excavators/',
    children: [
      { name: '1-Ton', href: '/mini-excavators/1-ton/' },
      { name: '1-2 Ton', href: '/mini-excavators/1-2-ton/' },
      { name: '3-4 Ton', href: '/mini-excavators/3-4-ton/' },
    ],
  },
  {
    name: 'Mini Skid Steers',
    href: '/mini-skid-steers/',
    children: [
      { name: 'Stand-On', href: '/mini-skid-steers/stand-on/' },
      { name: 'Track Loaders', href: '/mini-skid-steers/track/' },
    ],
  },
  { name: 'Attachments', href: '/attachments/' },
  { name: 'Parts', href: '/parts/' },
  {
    name: 'Solutions',
    href: '/solutions/',
    children: [
      { name: 'Farm Use', href: '/solutions/farm-use-mini-excavators/' },
      { name: 'Backyard Access', href: '/solutions/backyard-access-mini-excavators/' },
      { name: 'Landscaping', href: '/solutions/landscaping-mini-skid-steers/' },
    ],
  },
  { name: 'Support', href: '/support/' },
  { name: 'Contact', href: '/contact/' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-primary">AGT</span>
          <span className="hidden sm:inline text-lg font-semibold">Equipment</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:items-center lg:space-x-1">
          {navigation.map((item) => (
            <div
              key={item.name}
              className="relative"
              onMouseEnter={() => item.children && setOpenDropdown(item.name)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                href={item.href}
                className="flex items-center px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.name}
                {item.children && (
                  <ChevronDown className="ml-1 h-4 w-4" />
                )}
              </Link>

              {/* Dropdown */}
              {item.children && openDropdown === item.name && (
                <div className="absolute top-full left-0 w-48 bg-white border rounded-lg shadow-lg py-2">
                  {item.children.map((child) => (
                    <Link
                      key={child.name}
                      href={child.href}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {child.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex lg:items-center lg:space-x-4">
          <Button variant="ghost" size="icon" asChild>
            <a href="tel:+19498987669">
              <Phone className="h-5 w-5" />
            </a>
          </Button>
          <Button asChild>
            <Link href="/contact/">Get Quote</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="lg:hidden -mr-2 flex items-center justify-center p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="sr-only">Open menu</span>
          {mobileMenuOpen ? (
            <X className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="space-y-1 px-4 pb-3 pt-2 border-t">
            {navigation.map((item) => (
              <div key={item.name}>
                <Link
                  href={item.href}
                  className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground"
                  onClick={() => {
                    if (!item.children) {
                      setMobileMenuOpen(false);
                    }
                  }}
                >
                  {item.name}
                </Link>
                {item.children && (
                  <div className="pl-6">
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        className="block px-3 py-2 text-sm text-gray-600 hover:text-foreground"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="mt-4 pt-4 border-t">
              <Button className="w-full" asChild>
                <Link href="/contact/" onClick={() => setMobileMenuOpen(false)}>
                  Get Quote
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
