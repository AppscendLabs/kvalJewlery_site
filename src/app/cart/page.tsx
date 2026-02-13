"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/context/StoreContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { ImageWithFallback } from '@/components/ImageWithFallback';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export default function CartPage() {
  const { cart, removeFromCart, updateCartQuantity, createOrder, clearCart } = useStore();
  const router = useRouter();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 25 : 0;
  const total = subtotal + shipping;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    if (!customerName || !customerEmail || !shippingAddress) {
      toast.error('Please fill in all fields');
      return;
    }

    createOrder({
      customerName,
      customerEmail,
      shippingAddress,
    });

    toast.success('Order placed successfully!');
    setCheckoutOpen(false);
    setCustomerName('');
    setCustomerEmail('');
    setShippingAddress('');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-gray-950 py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <ShoppingBag className="mx-auto mb-6 size-24 text-gray-700" />
          <h1 className="mb-4 text-4xl font-bold">Your Cart is Empty</h1>
          <p className="mb-8 text-lg text-gray-400">
            Start shopping to add items to your cart
          </p>
          <Button
            onClick={() => router.push('/shop')}
            className="bg-gradient-to-r from-yellow-500 to-amber-600 text-black hover:from-yellow-600 hover:to-amber-700"
          >
            Browse Collection
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-950 py-12 text-white">
      <div className="container mx-auto px-4">
        <h1 className="mb-8 text-4xl font-bold">Shopping Cart</h1>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card className="border-gray-800 bg-gradient-to-br from-gray-900 to-black p-6">
              {cart.map(item => (
                <div
                  key={item.product.id}
                  className="flex gap-4 border-b border-gray-800 py-6 last:border-b-0"
                >
                  <div className="size-24 shrink-0 overflow-hidden rounded-lg bg-gray-950">
                    <ImageWithFallback
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-white">{item.product.name}</h3>
                      <p className="text-sm text-gray-400 capitalize">{item.product.category}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        className="size-8 border-gray-700 bg-gray-900 text-gray-300 hover:bg-gray-800"
                        onClick={() =>
                          updateCartQuantity(item.product.id, item.quantity - 1)
                        }
                      >
                        <Minus className="size-3" />
                      </Button>
                      <span className="w-8 text-center text-white">{item.quantity}</span>
                      <Button
                        size="icon"
                        variant="outline"
                        className="size-8 border-gray-700 bg-gray-900 text-gray-300 hover:bg-gray-800"
                        onClick={() =>
                          updateCartQuantity(item.product.id, item.quantity + 1)
                        }
                        disabled={item.quantity >= item.product.stock}
                      >
                        <Plus className="size-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="hover:bg-gray-900"
                      onClick={() => removeFromCart(item.product.id)}
                    >
                      <Trash2 className="size-4 text-red-500" />
                    </Button>
                    <span className="font-bold text-yellow-500">
                      ${(item.product.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-24 border-gray-800 bg-gradient-to-br from-gray-900 to-black p-6">
              <h2 className="mb-6 text-2xl font-bold text-white">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="font-semibold text-white">${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Shipping</span>
                  <span className="font-semibold text-white">${shipping}</span>
                </div>
                <div className="border-t border-gray-800 pt-4">
                  <div className="flex justify-between text-xl">
                    <span className="font-bold text-white">Total</span>
                    <span className="font-bold text-yellow-500">${total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <Dialog open={checkoutOpen} onOpenChange={setCheckoutOpen}>
                <DialogTrigger asChild>
                  <Button className="mt-6 w-full bg-gradient-to-r from-yellow-500 to-amber-600 text-black hover:from-yellow-600 hover:to-amber-700">
                    Proceed to Checkout
                  </Button>
                </DialogTrigger>
                <DialogContent className="border-gray-800 bg-gray-900 text-white">
                  <DialogHeader>
                    <DialogTitle className="text-white">Checkout</DialogTitle>
                    <DialogDescription className="text-gray-400">
                      Enter your shipping information to complete your order.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleCheckout} className="space-y-4">
                    <div>
                      <Label htmlFor="name" className="text-gray-300">Full Name</Label>
                      <Input
                        id="name"
                        value={customerName}
                        onChange={e => setCustomerName(e.target.value)}
                        className="border-gray-700 bg-gray-950 text-white"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-gray-300">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={customerEmail}
                        onChange={e => setCustomerEmail(e.target.value)}
                        className="border-gray-700 bg-gray-950 text-white"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="address" className="text-gray-300">Shipping Address</Label>
                      <Input
                        id="address"
                        value={shippingAddress}
                        onChange={e => setShippingAddress(e.target.value)}
                        placeholder="123 Main St, City, State, ZIP"
                        className="border-gray-700 bg-gray-950 text-white"
                        required
                      />
                    </div>
                    <DialogFooter>
                      <Button type="submit" className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 text-black hover:from-yellow-600 hover:to-amber-700">
                        Place Order - ${total.toLocaleString()}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>

              <Button
                variant="outline"
                className="mt-4 w-full border-gray-700 bg-transparent text-gray-300 hover:bg-gray-900"
                onClick={clearCart}
              >
                Clear Cart
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
