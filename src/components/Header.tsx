"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { ShoppingCart, Menu, User } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { Button } from './ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';

export const Header: React.FC = () => {
  const { cart, isAdmin } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-black/90 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-yellow-500 to-amber-600">
              <span className="text-xl font-bold text-black">K</span>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-lg font-bold tracking-tight text-white">K.Val Jewelers</span>
              <span className="text-xs text-yellow-500">💎 Idaho Gold & Diamond Dealer</span>
            </div>
          </Link>

          {/* Centered Desktop Navigation */}
          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
            <Link
              href="/"
              className={`relative py-1 text-gray-300 transition-colors hover:text-yellow-500 ${
                isActive('/') ? 'text-yellow-500' : ''
              }`}
            >
              Home
              {isActive('/') && (
                <span className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-yellow-500"></span>
              )}
            </Link>
            <Link
              href="/shop"
              className={`relative py-1 text-gray-300 transition-colors hover:text-yellow-500 ${
                isActive('/shop') ? 'text-yellow-500' : ''
              }`}
            >
              Shop
              {isActive('/shop') && (
                <span className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-yellow-500"></span>
              )}
            </Link>
            <Link
              href="/contact"
              className={`relative py-1 text-gray-300 transition-colors hover:text-yellow-500 ${
                isActive('/contact') ? 'text-yellow-500' : ''
              }`}
            >
              Contact
              {isActive('/contact') && (
                <span className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-yellow-500"></span>
              )}
            </Link>
            {isAdmin && (
              <Link
                href="/admin"
                className={`relative py-1 text-gray-300 transition-colors hover:text-yellow-500 ${
                  isActive('/admin') ? 'text-yellow-500' : ''
                }`}
              >
                <User className="inline size-4" /> Admin
                {isActive('/admin') && (
                  <span className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-yellow-500"></span>
                )}
              </Link>
            )}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className={`relative text-gray-300 hover:bg-gray-900 hover:text-yellow-500 ${
                isActive('/cart') ? 'text-yellow-500' : ''
              }`}
              onClick={() => router.push('/cart')}
            >
              <ShoppingCart className="size-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-yellow-500 text-xs font-bold text-black">
                  {cartItemsCount}
                </span>
              )}
            </Button>

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="text-gray-300 hover:bg-gray-900 hover:text-yellow-500">
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent className="border-gray-800 bg-black text-white">
                <SheetHeader className="px-6 pb-2 pt-6">
                  <SheetTitle className="text-lg text-white">Menu</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-1 px-6 pt-4">
                  <Link
                    href="/"
                    className={`rounded-lg px-3 py-3 text-base transition-colors hover:bg-gray-900 hover:text-yellow-500 ${
                      isActive('/') ? 'bg-gray-900 text-yellow-500 font-semibold' : 'text-gray-300'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Home
                  </Link>
                  <Link
                    href="/shop"
                    className={`rounded-lg px-3 py-3 text-base transition-colors hover:bg-gray-900 hover:text-yellow-500 ${
                      isActive('/shop') ? 'bg-gray-900 text-yellow-500 font-semibold' : 'text-gray-300'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Shop
                  </Link>
                  <Link
                    href="/contact"
                    className={`rounded-lg px-3 py-3 text-base transition-colors hover:bg-gray-900 hover:text-yellow-500 ${
                      isActive('/contact') ? 'bg-gray-900 text-yellow-500 font-semibold' : 'text-gray-300'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Contact
                  </Link>
                  <Link
                    href="/cart"
                    className={`rounded-lg px-3 py-3 text-base transition-colors hover:bg-gray-900 hover:text-yellow-500 ${
                      isActive('/cart') ? 'bg-gray-900 text-yellow-500 font-semibold' : 'text-gray-300'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Cart
                  </Link>
                  {isAdmin && (
                    <Link
                      href="/admin"
                      className={`rounded-lg px-3 py-3 text-base transition-colors hover:bg-gray-900 hover:text-yellow-500 ${
                        isActive('/admin') ? 'bg-gray-900 text-yellow-500 font-semibold' : 'text-gray-300'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Admin Portal
                    </Link>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};
