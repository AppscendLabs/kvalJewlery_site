"use client";

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart } from 'lucide-react';
import { ImageWithFallback } from '@/components/ImageWithFallback';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function Shop() {
  const { products, addToCart } = useStore();
  const [filter, setFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');

  const filteredProducts = products.filter(product => {
    if (filter === 'all') return true;
    return product.category === filter;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    }
  });

  const handleAddToCart = (product: typeof products[0]) => {
    if (product.stock === 0) {
      toast.error('This item is currently out of stock');
      return;
    }
    addToCart(product);
    toast.success('Added to cart!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black py-12 text-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-5xl font-bold">Our Collection</h1>
          <p className="text-lg text-gray-400">
            Browse our curated selection of authentic gold & diamond jewelry
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              onClick={() => setFilter('all')}
              className={filter === 'all' ? 'bg-yellow-500 text-black hover:bg-yellow-600' : 'border-gray-700 bg-transparent text-gray-300 hover:bg-gray-900'}
            >
              All
            </Button>
            <Button
              variant={filter === 'chain' ? 'default' : 'outline'}
              onClick={() => setFilter('chain')}
              className={filter === 'chain' ? 'bg-yellow-500 text-black hover:bg-yellow-600' : 'border-gray-700 bg-transparent text-gray-300 hover:bg-gray-900'}
            >
              Chains
            </Button>
            <Button
              variant={filter === 'ring' ? 'default' : 'outline'}
              onClick={() => setFilter('ring')}
              className={filter === 'ring' ? 'bg-yellow-500 text-black hover:bg-yellow-600' : 'border-gray-700 bg-transparent text-gray-300 hover:bg-gray-900'}
            >
              Rings
            </Button>
            <Button
              variant={filter === 'bracelet' ? 'default' : 'outline'}
              onClick={() => setFilter('bracelet')}
              className={filter === 'bracelet' ? 'bg-yellow-500 text-black hover:bg-yellow-600' : 'border-gray-700 bg-transparent text-gray-300 hover:bg-gray-900'}
            >
              Bracelets
            </Button>
          </div>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px] border-gray-700 bg-gray-900 text-white">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="border-gray-700 bg-gray-900 text-white">
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="name">Name</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Products Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {sortedProducts.map(product => (
            <Card key={product.id} className="group overflow-hidden border-gray-800 bg-gradient-to-br from-gray-900 to-black transition-all hover:border-yellow-500/50 hover:shadow-2xl hover:shadow-yellow-500/10">
              <div className="relative aspect-square overflow-hidden bg-gray-950">
                <ImageWithFallback
                  src={product.imageUrl}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {product.featured && (
                  <Badge className="absolute left-4 top-4 bg-yellow-500 text-black hover:bg-yellow-600">
                    Featured
                  </Badge>
                )}
                {product.stock === 0 && (
                  <Badge className="absolute right-4 top-4 bg-red-500 hover:bg-red-600">
                    Out of Stock
                  </Badge>
                )}
              </div>
              <div className="p-6">
                <div className="mb-2 flex items-start justify-between">
                  <h3 className="text-xl font-semibold text-white">{product.name}</h3>
                  <Badge variant="outline" className="capitalize border-gray-700 text-gray-400">
                    {product.category}
                  </Badge>
                </div>
                <p className="mb-4 line-clamp-2 text-sm text-gray-400">{product.description}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-yellow-500">${product.price.toLocaleString()}</span>
                    <p className="text-xs text-gray-500">Stock: {product.stock}</p>
                  </div>
                  <Button
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stock === 0}
                    className="bg-gradient-to-r from-yellow-500 to-amber-600 text-black hover:from-yellow-600 hover:to-amber-700 disabled:from-gray-700 disabled:to-gray-800 disabled:text-gray-500"
                  >
                    <ShoppingCart className="mr-2 size-4" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {sortedProducts.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-lg text-gray-400">No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
