"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Sparkles, ShieldCheck, Package, Diamond } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useStore } from '@/context/StoreContext';
import { ImageWithFallback } from '@/components/ImageWithFallback';

export default function Landing() {
  const { products } = useStore();
  const router = useRouter();
  const featuredProducts = products.filter(p => p.featured).slice(0, 3);

  return (
    <div className="flex flex-col bg-black text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(217,119,6,0.1),transparent_50%)]"></div>
        <div className="container relative mx-auto px-4 py-20 md:py-32">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="space-y-6">
              <div className="inline-block rounded-full border border-yellow-500/20 bg-yellow-500/10 px-4 py-2">
                <span className="text-sm font-semibold text-yellow-500">💎 Idaho&apos;s Premier Jeweler</span>
              </div>
              <h1 className="text-5xl font-bold leading-tight tracking-tight md:text-7xl">
                K.Val Jewelers
              </h1>
              <p className="text-2xl font-semibold bg-gradient-to-r from-yellow-500 to-amber-600 bg-clip-text text-transparent">
                Gold & Diamond Specialists
              </p>
              <p className="text-lg text-gray-400">
                From stunning engagement rings to exquisite gold chains, we craft dreams into reality.
                Serving Boise, Meridian, Nampa, and Caldwell with nationwide insured shipping.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-yellow-500 to-amber-600 text-black hover:from-yellow-600 hover:to-amber-700"
                  onClick={() => router.push('/shop')}
                >
                  Explore Collection
                  <ArrowRight className="ml-2 size-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-700 bg-transparent text-white hover:bg-gray-900"
                  onClick={() => router.push('/contact')}
                >
                  Custom Engagement Rings
                </Button>
              </div>
              <div className="flex flex-wrap gap-6 pt-4 text-sm text-gray-400">
                <div>📍 Boise</div>
                <div>📍 Meridian</div>
                <div>📍 Nampa</div>
                <div>📍 Caldwell</div>
                <div className="text-yellow-500">📦 Nationwide Shipping</div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 to-black shadow-2xl ring-1 ring-yellow-500/20">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1679019937997-2272d4a840ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkJTIwamV3ZWxyeSUyMGNyYWZ0c21hbiUyMHdvcmtzaG9wfGVufDF8fHx8MTc3MDc4MDAxOHww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Jewelry Craftsmanship"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 rounded-2xl border border-yellow-500/20 bg-black/90 p-6 shadow-xl backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <Diamond className="size-8 text-yellow-500" />
                  <div>
                    <p className="text-2xl font-bold text-white">GIA</p>
                    <p className="text-sm text-gray-400">Certified Diamonds</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-gradient-to-b from-black to-gray-950 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-white">Featured Pieces</h2>
            <p className="text-lg text-gray-400">Handpicked selections from our exclusive collection</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {featuredProducts.map(product => (
              <Card key={product.id} className="group overflow-hidden border-gray-800 bg-gradient-to-br from-gray-900 to-black transition-all hover:border-yellow-500/50 hover:shadow-2xl hover:shadow-yellow-500/10">
                <div className="aspect-square overflow-hidden bg-gray-950">
                  <ImageWithFallback
                    src={product.imageUrl}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-semibold text-white">{product.name}</h3>
                  <p className="mb-4 text-sm text-gray-400">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-yellow-500">${product.price.toLocaleString()}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-yellow-500/50 text-yellow-500 hover:bg-yellow-500 hover:text-black"
                      onClick={() => router.push('/shop')}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button
              size="lg"
              variant="outline"
              className="border-gray-700 bg-transparent text-white hover:bg-gray-900"
              onClick={() => router.push('/shop')}
            >
              View All Products
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-y border-gray-800 bg-black py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-yellow-500/10 ring-1 ring-yellow-500/20">
                <ShieldCheck className="size-8 text-yellow-500" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-white">GIA Certified</h3>
              <p className="text-gray-400">
                Every diamond is certified and authenticated for quality and authenticity.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-yellow-500/10 ring-1 ring-yellow-500/20">
                <Sparkles className="size-8 text-yellow-500" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-white">Custom Design</h3>
              <p className="text-gray-400">
                Bespoke engagement rings and jewelry tailored to your exact specifications.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-yellow-500/10 ring-1 ring-yellow-500/20">
                <Package className="size-8 text-yellow-500" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-white">Insured Shipping</h3>
              <p className="text-gray-400">
                Fully insured nationwide delivery with tracking and signature confirmation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-yellow-500 via-amber-600 to-yellow-700 py-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLW9wYWNpdHk9IjAuMDUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
        <div className="container relative mx-auto px-4 text-center">
          <h2 className="mb-4 text-4xl font-bold text-black md:text-5xl">Design Your Dream Ring</h2>
          <p className="mb-8 text-xl text-black/80">
            Work with our expert jewelers to create a one-of-a-kind engagement ring
          </p>
          <Button
            size="lg"
            className="bg-black text-yellow-500 hover:bg-gray-900"
            onClick={() => router.push('/contact')}
          >
            Start Custom Design
            <ArrowRight className="ml-2 size-4" />
          </Button>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-black/70">
            <div className="flex items-center gap-2">
              <ShieldCheck className="size-4" />
              <span>Lifetime Warranty</span>
            </div>
            <div className="flex items-center gap-2">
              <Diamond className="size-4" />
              <span>Free Consultation</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="size-4" />
              <span>Expert Craftsmen</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
