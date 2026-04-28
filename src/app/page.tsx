'use client';

import { useState, useEffect } from 'react';
import Script from 'next/script';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Truck,
  Wrench,
  ArrowRight,
  CheckCircle2,
  Phone,
  MapPin,
  Shield,
  Cog,
  Bot,
  Send,
  ChevronRight,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { HeroAIAssistant } from '@/components/ai-assistant/HeroAIAssistant';
import { FloatingAssistantButton } from '@/components/ai-assistant/FloatingAssistantButton';
import { products } from '@/data/products';
import { solutions } from '@/data/solutions';
import { homepageFAQ } from '@/data/faq';

// Category cards with sub-links
const categories = [
  {
    title: 'Mini Excavators',
    description: '1-4 ton compact excavators for construction, landscaping, and property maintenance.',
    href: '/mini-excavators/',
    icon: Cog,
    image: 'https://images.unsplash.com/photo-1580901368919-7738efb0f87e?w=600&h=800&fit=crop',
    subLinks: [
      { name: '1 Ton Mini Excavators', href: '/mini-excavators/1-ton/' },
      { name: '1-2 Ton Models', href: '/mini-excavators/1-2-ton/' },
      { name: '3-4 Ton Models', href: '/mini-excavators/3-4-ton/' },
    ],
  },
  {
    title: 'Mini Skid Steers',
    description: 'Stand-on and track loaders for landscaping, construction, and property maintenance.',
    href: '/mini-skid-steers/',
    icon: Truck,
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=800&fit=crop',
    subLinks: [
      { name: 'Track Loaders', href: '/mini-skid-steers/track/' },
      { name: 'Stand-On Models', href: '/mini-skid-steers/stand-on/' },
      { name: 'Landscaping Use', href: '/solutions/landscaping-mini-excavator/' },
    ],
  },
  {
    title: 'Attachments',
    description: 'Buckets, augers, brush cutters, hydraulic thumbs, and more for your equipment.',
    href: '/attachments/',
    icon: Wrench,
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&h=800&fit=crop',
    subLinks: [
      { name: 'Hydraulic Thumbs', href: '/attachments/thumbs/' },
      { name: 'Buckets', href: '/attachments/buckets/' },
      { name: 'Brush Cutters', href: '/attachments/brush-cutters/' },
    ],
  },
  {
    title: 'Parts',
    description: 'Genuine and aftermarket replacement parts for AGT mini excavators and skid steers.',
    href: '/parts/',
    icon: Wrench,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=800&fit=crop',
    subLinks: [
      { name: 'Hydraulic Parts', href: '/parts/hydraulic-parts/' },
      { name: 'Filters', href: '/parts/filters/' },
      { name: 'Parts by Model', href: '/parts/by-model/' },
    ],
  },
];

const trustSignals = [
  {
    icon: Shield,
    title: '1-Year Warranty',
    description: 'All machines covered',
  },
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'Continental US',
  },
  {
    icon: MapPin,
    title: 'US Warehouses',
    description: 'CA & IL locations',
  },
  {
    icon: Phone,
    title: 'Expert Support',
    description: 'Technical assistance',
  },
];

// Application/Solution cards
const applications = [
  {
    title: 'Farm Use',
    description: 'Drainage, fence installation, and general farm maintenance.',
    href: '/solutions/farm-use-mini-excavators',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=300&fit=crop',
  },
  {
    title: 'Landscaping',
    description: 'Grading, planting, hardscape installation.',
    href: '/solutions/landscaping-mini-excavator/',
    image: 'https://images.unsplash.com/photo-1558904541-efa843a96f01?w=400&h=300&fit=crop',
  },
  {
    title: 'Backyard Access',
    description: 'Compact machines that fit through standard gates.',
    href: '/mini-excavators/1-ton/',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
  },
  {
    title: 'Trenching',
    description: 'Utility trenches, irrigation lines, and drainage.',
    href: '/solutions/utility-trenching/',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop',
  },
  {
    title: 'Property Maintenance',
    description: 'Land clearing, brush removal, snow removal.',
    href: '/solutions/land-clearing-brush-removal',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop',
  },
  {
    title: 'Light Demolition',
    description: 'Concrete breaking, shed removal, site clearing.',
    href: '/solutions/light-demolition-mini-excavator',
    image: 'https://images.unsplash.com/photo-1590496793929-36417d3117de?w=400&h=300&fit=crop',
  },
];

// Get featured products (first 6 mini excavators)
const getFeaturedProducts = () => {
  return products
    .filter(p => p.categorySlug === 'mini-excavators' || p.categorySlug === 'skid-steers')
    .slice(0, 6);
};

export default function HomePage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const featuredProducts = getFeaturedProducts();

  // Generate FAQ Schema for SEO
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: homepageFAQ.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      {/* FAQ Schema for SEO */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="flex flex-col">
      {/* Hero Section - Modern, balanced layout */}
      <section id="hero-section" className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8 sm:py-12 md:py-16 lg:py-20 overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="container relative z-10">
          <div className="grid lg:grid-cols-5 gap-6 lg:gap-12">
            {/* Left: Hero Content - 3 columns */}
            <div className="lg:col-span-3 text-white">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
                Mini Excavators & Mini Skid Steers{' '}
                <span className="text-blue-400">for Sale</span>
              </h1>

              <p className="mt-4 sm:mt-6 text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
                AGT Equipment sells 1-4 ton mini excavators, mini skid steers, attachments, and parts with Kubota and Rato engine options, free shipping, and US-based support. Machines ship from California and Illinois warehouses with 1-year warranty coverage.
              </p>

              {/* Quick Answer Q&A Block for AEO */}
              <div className="mt-4 sm:mt-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 sm:p-5" data-speakable="quick-answer">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white font-bold text-xs sm:text-sm">Q</span>
                  </div>
                  <div>
                    <h2 className="font-semibold text-white text-base sm:text-lg">What does AGT Equipment sell?</h2>
                    <p className="mt-1.5 sm:mt-2 text-sm sm:text-base text-slate-200 leading-relaxed">
                      AGT Equipment sells 1-4 ton mini excavators, mini skid steers, attachments, and replacement parts. Machines ship from US warehouses in California and Illinois, with Kubota or Rato engine options, free shipping, and 1-year warranty coverage.
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA Buttons - Stack on mobile */}
              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button asChild size="lg" className="bg-blue-500 hover:bg-blue-600 text-white px-6 sm:px-8 h-11 sm:h-12 text-base w-full sm:w-auto">
                  <Link href="/mini-excavators/">
                    Shop Mini Excavators
                    <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" className="bg-green-500 hover:bg-green-600 text-white px-6 sm:px-8 h-11 sm:h-12 text-base w-full sm:w-auto">
                  <Link href="/mini-skid-steers/">
                    Shop Mini Skid Steers
                    <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                  </Link>
                </Button>
              </div>

              {/* Secondary CTAs */}
              <div className="mt-3 sm:mt-4 flex flex-wrap gap-4 sm:gap-6 text-sm">
                <Link href="/attachments/" className="text-slate-300 hover:text-white underline underline-offset-4 transition-colors">
                  View Attachments
                </Link>
                <Link href="/knowledge/how-to-choose-mini-excavator" className="text-slate-300 hover:text-white underline underline-offset-4 transition-colors">
                  Buying Guide
                </Link>
              </div>
            </div>

            {/* Right: AI Assistant Card + Trust Signals - 2 columns */}
            <div className="lg:col-span-2 flex flex-col gap-4 sm:gap-6">
              <HeroAIAssistant />

              {/* Trust Signals - below AI card on right side */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 sm:p-5">
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {trustSignals.map((signal) => (
                    <div key={signal.title} className="flex items-center gap-2 sm:gap-3">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                        <signal.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-400" />
                      </div>
                      <div>
                        <div className="font-medium text-white text-xs sm:text-sm">{signal.title}</div>
                        <div className="text-xs text-slate-400">{signal.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories - Image-focused cards */}
      <section className="py-10 sm:py-12 md:py-16 lg:py-20 bg-white">
        <div className="container">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900">Product Categories</h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
              Explore our range of compact equipment for construction, landscaping, agriculture, and property maintenance.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {categories.map((category) => (
              <Link
                key={category.title}
                href={category.href}
                className="group relative overflow-hidden rounded-xl sm:rounded-2xl aspect-[4/5] bg-gradient-to-br from-slate-600 to-slate-800"
                style={{
                  backgroundImage: `url('${category.image}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:bg-black/70 transition-colors" />

                {/* Content */}
                <div className="absolute inset-0 p-3 sm:p-4 md:p-6 flex flex-col justify-end">
                  <div className="mb-2 sm:mb-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-2 sm:mb-3">
                      <category.icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                    </div>
                    <h3 className="text-sm sm:text-base md:text-xl font-bold text-white">{category.title}</h3>
                  </div>

                  <p className="text-xs sm:text-sm text-white/80 mb-2 sm:mb-4 line-clamp-2 hidden sm:block">{category.description}</p>

                  {/* Sub-links - Hidden on mobile */}
                  <ul className="space-y-1 sm:space-y-1.5 hidden md:block">
                    {category.subLinks.map((link) => (
                      <li key={link.name}>
                        <span className="inline-flex items-center text-sm text-white/90 hover:text-white transition-colors">
                          <ChevronRight className="w-4 h-4 mr-1" />
                          {link.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Equipment - Large product cards */}
      <section className="py-10 sm:py-12 md:py-16 lg:py-20 bg-slate-50">
        <div className="container">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-8 sm:mb-12">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900">Featured Equipment</h2>
              <p className="mt-1 sm:mt-2 text-base sm:text-lg text-slate-600">Top-selling mini excavators and skid steers</p>
            </div>
            <Link
              href="/products/"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm sm:text-base group"
            >
              View All Products
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {featuredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/${product.categorySlug}/${product.subcategorySlug || ''}/${product.slug}/`}
                className="group bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
              >
                {/* Product Image - Larger */}
                <div className="relative aspect-square bg-slate-50 overflow-hidden">
                  {product.images[0] && (
                    <Image
                      src={product.images[0].url}
                      alt={product.name}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                  {/* Category Badge */}
                  <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                    <span className="px-2 sm:px-3 py-1 bg-slate-900/80 text-white text-xs font-medium rounded-full backdrop-blur-sm">
                      {product.category}
                    </span>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4 sm:p-6">
                  <p className="text-xs sm:text-sm text-slate-500 mb-1">{product.sku}</p>
                  <h3 className="font-semibold text-base sm:text-lg text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
                    {product.name}
                  </h3>

                  <div className="mt-3 sm:mt-4 flex items-end justify-between">
                    <div>
                      <span className="text-xl sm:text-2xl font-bold text-blue-600">
                        ${product.price.toLocaleString()}
                      </span>
                    </div>
                    <span className="inline-flex items-center text-xs sm:text-sm font-medium text-slate-600 group-hover:text-blue-600 transition-colors">
                      View Details
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Shop by Application - Image overlay cards */}
      <section className="py-10 sm:py-12 md:py-16 lg:py-20 bg-white">
        <div className="container">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900">Shop by Application</h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">Find equipment for your specific project needs</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            {applications.map((app) => (
              <Link
                key={app.title}
                href={app.href}
                className="group relative overflow-hidden rounded-xl sm:rounded-2xl aspect-[4/3] bg-slate-200"
              >
                <Image
                  src={app.image}
                  alt={app.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, 50vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute inset-0 p-3 sm:p-4 md:p-6 flex flex-col justify-end">
                  <h3 className="text-sm sm:text-base md:text-xl font-bold text-white mb-0.5 sm:mb-1">{app.title}</h3>
                  <p className="text-xs sm:text-sm text-white/80 hidden sm:block">{app.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose AGT - Split layout with stats */}
      <section className="py-10 sm:py-12 md:py-16 lg:py-24 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                Why Choose AGT Equipment?
              </h2>
              <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-6">
                <p className="text-base sm:text-lg text-blue-100 leading-relaxed">
                  Factory-direct compact equipment for contractors, farmers, and property owners. We eliminate middleman markup and pass the savings to you.
                </p>
                <p className="text-base sm:text-lg text-blue-100 leading-relaxed">
                  Fast shipping from California and Illinois warehouses means you get your equipment in days, not weeks. No international freight delays.
                </p>
                <p className="text-base sm:text-lg text-blue-100 leading-relaxed">
                  Every machine includes a 1-year warranty, parts support from our US inventory, and technical assistance from our support team.
                </p>
              </div>

              <div className="mt-8 sm:mt-10">
                <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50 px-6 sm:px-8 h-11 sm:h-12 text-base">
                  <Link href="/about/">
                    Learn More About AGT
                    <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-5">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 text-center border border-white/20">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold">1-4 Ton</div>
                <div className="mt-1 sm:mt-2 text-xs sm:text-sm md:text-base text-blue-100">Equipment Range</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 text-center border border-white/20">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold">2</div>
                <div className="mt-1 sm:mt-2 text-xs sm:text-sm md:text-base text-blue-100">US Warehouses</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 text-center border border-white/20">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold">100+</div>
                <div className="mt-1 sm:mt-2 text-xs sm:text-sm md:text-base text-blue-100">Attachments & Parts</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 text-center border border-white/20">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold">1 Year</div>
                <div className="mt-1 sm:mt-2 text-xs sm:text-sm md:text-base text-blue-100">Warranty Included</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 sm:py-12 md:py-16 lg:py-20 bg-white">
        <div className="container">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-16 text-center relative overflow-hidden">
            {/* Subtle pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }} />
            </div>

            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                Find the Right Equipment for Your Job
              </h2>
              <p className="mt-4 sm:mt-6 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
                Browse our selection of mini excavators and skid steers, or contact our team for personalized recommendations.
              </p>
              <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Button asChild size="lg" className="bg-blue-500 hover:bg-blue-600 text-white px-8 sm:px-10 h-11 sm:h-12 text-base">
                  <Link href="/mini-excavators/">
                    View Mini Excavators
                  </Link>
                </Button>
                <Button asChild size="lg" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-slate-900 px-8 sm:px-10 h-11 sm:h-12 text-base">
                  <Link href="/contact/">
                    Contact Sales
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-10 sm:py-12 md:py-16 lg:py-20 bg-slate-50">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {homepageFAQ.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-sm"
                >
                  <button
                    onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                    className="w-full px-4 sm:px-6 py-4 sm:py-5 text-left flex justify-between items-center hover:bg-slate-50 transition-colors"
                  >
                    <span className="font-semibold text-slate-900 text-base sm:text-lg pr-4">{faq.question}</span>
                    <ChevronRight
                      className={`w-5 h-5 text-slate-400 transition-transform flex-shrink-0 ${
                        openFAQ === index ? 'rotate-90' : ''
                      }`}
                    />
                  </button>
                  {openFAQ === index && (
                    <div className="px-4 sm:px-6 pb-4 sm:pb-5 text-sm sm:text-base text-slate-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Floating AI Button */}
      <FloatingAssistantButton />
    </div>
    </>
  );
}
