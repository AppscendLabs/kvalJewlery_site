"use client";

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { toast } from 'sonner';

export default function Contact() {
  const { addInquiry } = useStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !message) {
      toast.error('Please fill in all required fields');
      return;
    }

    addInquiry({ name, email, phone, message });

    toast.success('Your inquiry has been sent! We\'ll get back to you soon.');
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-950 py-12 text-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-5xl font-bold">Get In Touch</h1>
          <p className="text-lg text-gray-400">
            Have questions or want to discuss a custom engagement ring? We&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Form */}
          <Card className="border-gray-800 bg-gradient-to-br from-gray-900 to-black p-8">
            <h2 className="mb-6 text-2xl font-bold text-white">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-gray-300">
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="John Smith"
                  className="border-gray-700 bg-gray-950 text-white"
                  required
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-gray-300">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="border-gray-700 bg-gray-950 text-white"
                  required
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-gray-300">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="(555) 123-4567"
                  className="border-gray-700 bg-gray-950 text-white"
                />
              </div>

              <div>
                <Label htmlFor="message" className="text-gray-300">
                  Message <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Tell us about your custom jewelry ideas or any questions you have..."
                  rows={6}
                  className="border-gray-700 bg-gray-950 text-white"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 text-black hover:from-yellow-600 hover:to-amber-700"
              >
                <Send className="mr-2 size-4" />
                Send Inquiry
              </Button>
            </form>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="border-gray-800 bg-gradient-to-br from-gray-900 to-black p-8">
              <h2 className="mb-6 text-2xl font-bold text-white">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-yellow-500/10 ring-1 ring-yellow-500/20">
                    <Mail className="size-6 text-yellow-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Email</h3>
                    <p className="text-gray-400">info@kvaljewelers.com</p>
                    <p className="text-sm text-gray-500">We&apos;ll respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-yellow-500/10 ring-1 ring-yellow-500/20">
                    <Phone className="size-6 text-yellow-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Phone</h3>
                    <p className="text-gray-400">(555) 123-4567</p>
                    <p className="text-sm text-gray-500">Mon-Fri, 10am-6pm MST</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-yellow-500/10 ring-1 ring-yellow-500/20">
                    <MapPin className="size-6 text-yellow-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Locations</h3>
                    <p className="text-gray-400">
                      📍 Boise, Idaho
                      <br />
                      📍 Meridian, Idaho
                      <br />
                      📍 Nampa, Idaho
                      <br />
                      📍 Caldwell, Idaho
                    </p>
                    <p className="mt-2 text-sm text-yellow-500">📦 Nationwide Insured Shipping</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="border-yellow-500/30 bg-gradient-to-br from-yellow-500 to-amber-600 p-8 text-black">
              <h2 className="mb-4 text-2xl font-bold">Custom Engagement Rings</h2>
              <p className="mb-6 text-black/80">
                Bring your vision to life with our custom engagement ring design service.
                Work directly with our expert jewelers to create a unique piece that perfectly captures your love story.
              </p>
              <ul className="space-y-2 text-black/80">
                <li>• Free design consultation</li>
                <li>• GIA certified diamonds</li>
                <li>• 3D CAD rendering previews</li>
                <li>• Expert craftsmanship guaranteed</li>
                <li>• Lifetime authenticity warranty</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
