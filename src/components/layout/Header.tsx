'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Phone, ChevronDown, ChevronRight, ShoppingCart } from 'lucide-react';
import { UserMenu } from '@/components/auth/UserMenu';

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
  const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(null);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const toggleMobileItem = (name: string) => {
    setExpandedMobileItem(expandedMobileItem === name ? null : name);
  };

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
        <div className="hidden lg:flex lg:items-center lg:space-x-2">
          <Button variant="ghost" size="icon" asChild>
            <a href="tel:+19498987669">
              <Phone className="h-5 w-5" />
            </a>
          </Button>
          <Link href="/cart" className="relative p-2 text-gray-600 hover:text-gray-900">
            <ShoppingCart className="h-5 w-5" />
          </Link>
          <UserMenu />
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="lg:hidden -mr-2 flex items-center justify-center p-2 rounded-md hover:bg-gray-100 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </nav>

      {/* Mobile Menu - Slide-in Drawer */}
      <div
        className={`lg:hidden fixed inset-0 z-40 transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Drawer */}
        <div
          className={`absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white shadow-2xl transform transition-transform duration-300 ease-out ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <Link
              href="/"
              className="flex items-center space-x-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="text-2xl font-bold text-primary">AGT</span>
              <span className="text-lg font-semibold">Equipment</span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-md hover:bg-gray-100 transition-colors"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Drawer Content */}
          <div className="overflow-y-auto h-[calc(100%-140px)] pb-4">
            <nav className="px-2 py-2">
              {navigation.map((item) => (
                <div key={item.name} className="border-b border-gray-100 last:border-b-0">
                  {item.children ? (
                    <>
                      <button
                        onClick={() => toggleMobileItem(item.name)}
                        className="flex items-center justify-between w-full px-4 py-3 text-left font-medium text-gray-900 hover:bg-gray-50 transition-colors"
                      >
                        <span>{item.name}</span>
                        <ChevronRight
                          className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
                            expandedMobileItem === item.name ? 'rotate-90' : ''
                          }`}
                        />
                      </button>
                      <div
                        className={`overflow-hidden transition-all duration-200 ${
                          expandedMobileItem === item.name ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <div className="pl-4 pb-2">
                          {item.children.map((child) => (
                            <Link
                              key={child.name}
                              href={child.href}
                              className="block px-4 py-2.5 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className="block px-4 py-3 font-medium text-gray-900 hover:bg-gray-50 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
          </div>

          {/* Drawer Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t space-y-3">
            <div className="flex items-center justify-center gap-4 mb-3">
              <Link
                href="/cart"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="text-sm font-medium">Cart</span>
              </Link>
            </div>
            <a
              href="tel:+19498987669"
              className="flex items-center justify-center gap-2 py-2 text-blue-600 font-medium"
            >
              <Phone className="h-5 w-5" />
              <span>(949) 898-7669</span>
            </a>
            <div className="flex gap-2">
              <Button variant="outline" asChild className="flex-1">
                <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                  Sign In
                </Link>
              </Button>
              <Button asChild className="flex-1">
                <Link href="/auth/register" onClick={() => setMobileMenuOpen(false)}>
                  Sign Up
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
