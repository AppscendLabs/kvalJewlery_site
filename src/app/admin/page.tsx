"use client";

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Lock, Package, ShoppingBag, Mail, Plus, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export default function Admin() {
  const {
    products,
    orders,
    inquiries,
    isAdmin,
    login,
    logout,
    updateProduct,
    deleteProduct,
    addProduct,
    updateOrderStatus,
    updateInquiryStatus,
  } = useStore();

  const [password, setPassword] = useState('');
  const [newProductOpen, setNewProductOpen] = useState(false);

  // New product form state
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newCategory, setNewCategory] = useState<'chain' | 'ring' | 'bracelet' | 'other'>('chain');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newStock, setNewStock] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      toast.success('Logged in successfully');
      setPassword('');
    } else {
      toast.error('Invalid password');
    }
  };

  const handleAddProduct = () => {
    if (!newName || !newPrice || !newStock) {
      toast.error('Please fill in all required fields');
      return;
    }

    addProduct({
      name: newName,
      description: newDescription,
      price: parseFloat(newPrice),
      category: newCategory,
      imageUrl: newImageUrl || 'https://images.unsplash.com/photo-1767921804162-9c55a278768d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBnb2xkJTIwY2hhaW4lMjBqZXdlbHJ5fGVufDF8fHx8MTc3MDc4MDAxN3ww&ixlib=rb-4.1.0&q=80&w=1080',
      stock: parseInt(newStock),
    });

    toast.success('Product added successfully');
    setNewProductOpen(false);
    resetNewProductForm();
  };

  const resetNewProductForm = () => {
    setNewName('');
    setNewDescription('');
    setNewPrice('');
    setNewCategory('chain');
    setNewImageUrl('');
    setNewStock('');
  };

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-black to-gray-950">
        <Card className="w-full max-w-md border-gray-800 bg-gradient-to-br from-gray-900 to-black p-8">
          <div className="mb-6 flex justify-center">
            <div className="flex size-16 items-center justify-center rounded-full bg-yellow-500/10 ring-1 ring-yellow-500/20">
              <Lock className="size-8 text-yellow-500" />
            </div>
          </div>
          <h1 className="mb-6 text-center text-2xl font-bold text-white">Admin Portal</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="password" className="text-gray-300">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="border-gray-700 bg-gray-950 text-white"
              />
              <p className="mt-2 text-xs text-gray-500">
                Demo password: admin123
              </p>
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 text-black hover:from-yellow-600 hover:to-amber-700"
            >
              Login
            </Button>
          </form>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-950 py-12 text-white">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-4xl font-bold">Admin Portal</h1>
          <Button variant="outline" onClick={logout} className="border-gray-700 bg-transparent text-gray-300 hover:bg-gray-900">
            Logout
          </Button>
        </div>

        <Tabs defaultValue="inventory" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 border-gray-800 bg-gray-900 lg:w-auto">
            <TabsTrigger value="inventory" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
              <Package className="mr-2 size-4" />
              Inventory
            </TabsTrigger>
            <TabsTrigger value="orders" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
              <ShoppingBag className="mr-2 size-4" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="inquiries" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
              <Mail className="mr-2 size-4" />
              Inquiries
            </TabsTrigger>
          </TabsList>

          {/* Inventory Tab */}
          <TabsContent value="inventory">
            <Card className="border-gray-800 bg-gradient-to-br from-gray-900 to-black p-6">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Product Inventory</h2>
                <Dialog open={newProductOpen} onOpenChange={setNewProductOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-to-r from-yellow-500 to-amber-600 text-black hover:from-yellow-600 hover:to-amber-700">
                      <Plus className="mr-2 size-4" />
                      Add Product
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl border-gray-800 bg-gray-900 text-white">
                    <DialogHeader>
                      <DialogTitle className="text-white">Add New Product</DialogTitle>
                      <DialogDescription className="text-gray-400">
                        Add a new item to your inventory.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="new-name" className="text-gray-300">Product Name</Label>
                        <Input
                          id="new-name"
                          value={newName}
                          onChange={e => setNewName(e.target.value)}
                          className="border-gray-700 bg-gray-950 text-white"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="new-description" className="text-gray-300">Description</Label>
                        <Textarea
                          id="new-description"
                          value={newDescription}
                          onChange={e => setNewDescription(e.target.value)}
                          className="border-gray-700 bg-gray-950 text-white"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="new-price" className="text-gray-300">Price ($)</Label>
                          <Input
                            id="new-price"
                            type="number"
                            value={newPrice}
                            onChange={e => setNewPrice(e.target.value)}
                            className="border-gray-700 bg-gray-950 text-white"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="new-stock" className="text-gray-300">Stock</Label>
                          <Input
                            id="new-stock"
                            type="number"
                            value={newStock}
                            onChange={e => setNewStock(e.target.value)}
                            className="border-gray-700 bg-gray-950 text-white"
                          />
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="new-category" className="text-gray-300">Category</Label>
                        <Select
                          value={newCategory}
                          onValueChange={(value: string) => setNewCategory(value as 'chain' | 'ring' | 'bracelet' | 'other')}
                        >
                          <SelectTrigger className="border-gray-700 bg-gray-950 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="border-gray-700 bg-gray-900 text-white">
                            <SelectItem value="chain">Chain</SelectItem>
                            <SelectItem value="ring">Ring</SelectItem>
                            <SelectItem value="bracelet">Bracelet</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="new-image" className="text-gray-300">Image URL</Label>
                        <Input
                          id="new-image"
                          value={newImageUrl}
                          onChange={e => setNewImageUrl(e.target.value)}
                          placeholder="Optional - defaults to placeholder"
                          className="border-gray-700 bg-gray-950 text-white"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={handleAddProduct} className="bg-yellow-500 text-black hover:bg-yellow-600">Add Product</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-800 hover:bg-gray-900/50">
                      <TableHead className="text-gray-400">Product</TableHead>
                      <TableHead className="text-gray-400">Category</TableHead>
                      <TableHead className="text-gray-400">Price</TableHead>
                      <TableHead className="text-gray-400">Stock</TableHead>
                      <TableHead className="text-gray-400">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map(product => (
                      <TableRow key={product.id} className="border-gray-800 hover:bg-gray-900/50">
                        <TableCell>
                          <div className="font-medium text-white">{product.name}</div>
                          <div className="text-sm text-gray-500">{product.id}</div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize border-gray-700 text-gray-400">
                            {product.category}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-white">${product.price.toLocaleString()}</TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={product.stock}
                            onChange={e =>
                              updateProduct(product.id, {
                                stock: parseInt(e.target.value) || 0,
                              })
                            }
                            className="w-20 border-gray-700 bg-gray-950 text-white"
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-gray-700 bg-gray-900 text-gray-300 hover:bg-gray-800"
                              onClick={() => {
                                const newPrice = prompt('Enter new price:', product.price.toString());
                                if (newPrice) {
                                  updateProduct(product.id, { price: parseFloat(newPrice) });
                                  toast.success('Price updated');
                                }
                              }}
                            >
                              <Pencil className="size-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-gray-700 bg-gray-900 hover:bg-gray-800"
                              onClick={() => {
                                if (confirm('Are you sure you want to delete this product?')) {
                                  deleteProduct(product.id);
                                  toast.success('Product deleted');
                                }
                              }}
                            >
                              <Trash2 className="size-4 text-red-500" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card className="border-gray-800 bg-gradient-to-br from-gray-900 to-black p-6">
              <h2 className="mb-6 text-2xl font-bold text-white">Order Management</h2>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-800 hover:bg-gray-900/50">
                      <TableHead className="text-gray-400">Order ID</TableHead>
                      <TableHead className="text-gray-400">Customer</TableHead>
                      <TableHead className="text-gray-400">Date</TableHead>
                      <TableHead className="text-gray-400">Total</TableHead>
                      <TableHead className="text-gray-400">Status</TableHead>
                      <TableHead className="text-gray-400">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map(order => (
                      <TableRow key={order.id} className="border-gray-800 hover:bg-gray-900/50">
                        <TableCell className="font-medium text-white">{order.id}</TableCell>
                        <TableCell>
                          <div className="text-white">{order.customerName}</div>
                          <div className="text-sm text-gray-500">{order.customerEmail}</div>
                        </TableCell>
                        <TableCell className="text-gray-400">{order.date}</TableCell>
                        <TableCell className="font-semibold text-yellow-500">${order.total.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              order.status === 'delivered'
                                ? 'bg-green-500'
                                : order.status === 'shipped'
                                ? 'bg-blue-500'
                                : order.status === 'processing'
                                ? 'bg-yellow-500 text-black'
                                : 'bg-gray-500'
                            }
                          >
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Select
                            value={order.status}
                            onValueChange={(value: string) => {
                              updateOrderStatus(order.id, value as 'pending' | 'processing' | 'shipped' | 'delivered');
                              toast.success('Order status updated');
                            }}
                          >
                            <SelectTrigger className="w-[140px] border-gray-700 bg-gray-950 text-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="border-gray-700 bg-gray-900 text-white">
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="processing">Processing</SelectItem>
                              <SelectItem value="shipped">Shipped</SelectItem>
                              <SelectItem value="delivered">Delivered</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>

          {/* Inquiries Tab */}
          <TabsContent value="inquiries">
            <Card className="border-gray-800 bg-gradient-to-br from-gray-900 to-black p-6">
              <h2 className="mb-6 text-2xl font-bold text-white">Customer Inquiries</h2>
              {inquiries.length === 0 ? (
                <p className="py-8 text-center text-gray-500">No inquiries yet.</p>
              ) : (
                <div className="space-y-4">
                  {inquiries.map(inquiry => (
                    <Card key={inquiry.id} className="border-gray-800 bg-gray-950 p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="mb-2 flex items-center gap-3">
                            <h3 className="font-semibold text-white">{inquiry.name}</h3>
                            <Badge
                              className={
                                inquiry.status === 'new'
                                  ? 'bg-green-500'
                                  : inquiry.status === 'read'
                                  ? 'bg-blue-500'
                                  : 'bg-gray-500'
                              }
                            >
                              {inquiry.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-400">{inquiry.email}</p>
                          {inquiry.phone && (
                            <p className="text-sm text-gray-400">{inquiry.phone}</p>
                          )}
                          <p className="mt-3 text-gray-300">{inquiry.message}</p>
                          <p className="mt-2 text-xs text-gray-500">
                            {new Date(inquiry.date).toLocaleDateString()}
                          </p>
                        </div>
                        <Select
                          value={inquiry.status}
                          onValueChange={(value: string) => {
                            updateInquiryStatus(inquiry.id, value as 'new' | 'read' | 'replied');
                            toast.success('Inquiry status updated');
                          }}
                        >
                          <SelectTrigger className="w-[120px] border-gray-700 bg-gray-900 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="border-gray-700 bg-gray-900 text-white">
                            <SelectItem value="new">New</SelectItem>
                            <SelectItem value="read">Read</SelectItem>
                            <SelectItem value="replied">Replied</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
