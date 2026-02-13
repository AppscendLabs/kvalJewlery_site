import React from 'react';
import Link from 'next/link';
import { Instagram, Facebook, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-gray-800 bg-black py-12 text-gray-300">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-yellow-500 to-amber-600">
                <span className="text-xl font-bold text-black">K</span>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-lg font-bold text-white">K.Val Jewelers</span>
                <span className="text-xs text-yellow-500">💎</span>
              </div>
            </div>
            <p className="text-sm text-gray-400">
              Idaho&apos;s premier gold & diamond dealer. Specializing in custom engagement rings and fine jewelry.
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/shop" className="text-gray-400 transition-colors hover:text-yellow-500">
                  Shop Collection
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 transition-colors hover:text-yellow-500">
                  Custom Rings
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 transition-colors hover:text-yellow-500">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-white">Our Locations</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>📍 Boise</li>
              <li>📍 Meridian</li>
              <li>📍 Nampa</li>
              <li>📍 Caldwell</li>
              <li className="pt-2 text-yellow-500">📦 Nationwide Shipping</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-white">Connect</h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="flex size-10 items-center justify-center rounded-full bg-gray-900 transition-colors hover:bg-yellow-500 hover:text-black"
              >
                <Instagram className="size-5" />
              </a>
              <a
                href="#"
                className="flex size-10 items-center justify-center rounded-full bg-gray-900 transition-colors hover:bg-yellow-500 hover:text-black"
              >
                <Facebook className="size-5" />
              </a>
              <a
                href="mailto:info@kvaljewelers.com"
                className="flex size-10 items-center justify-center rounded-full bg-gray-900 transition-colors hover:bg-yellow-500 hover:text-black"
              >
                <Mail className="size-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
          <p>&copy; 2026 K.Val Jewelers. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
