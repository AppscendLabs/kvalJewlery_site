"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'chain' | 'ring' | 'bracelet' | 'other';
  imageUrl: string;
  stock: number;
  featured?: boolean;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  items: Array<{
    productId: string;
    productName: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  date: string;
  shippingAddress: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  date: string;
  status: 'new' | 'read' | 'replied';
}

interface StoreContextType {
  products: Product[];
  orders: Order[];
  cart: CartItem[];
  inquiries: Inquiry[];
  isAdmin: boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  addInquiry: (inquiry: Omit<Inquiry, 'id' | 'date' | 'status'>) => void;
  updateInquiryStatus: (inquiryId: string, status: Inquiry['status']) => void;
  login: (password: string) => boolean;
  logout: () => void;
  createOrder: (orderData: { customerName: string; customerEmail: string; shippingAddress: string }) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Classic Cuban Link Chain',
    description: 'Vintage 14K gold Cuban link chain. Perfect weight and shine. Pre-owned in excellent condition.',
    price: 1299,
    category: 'chain',
    imageUrl: 'https://images.unsplash.com/photo-1762505464962-4c7b93dcc8d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkJTIwY3ViYW4lMjBsaW5rJTIwY2hhaW58ZW58MXx8fHwxNzcwNzgwMDE5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    stock: 1,
    featured: true
  },
  {
    id: '2',
    name: 'Diamond Solitaire Engagement Ring',
    description: '1.5ct round brilliant diamond set in platinum. GIA certified, VS1 clarity, G color. Stunning custom piece.',
    price: 8999,
    category: 'ring',
    imageUrl: 'https://images.unsplash.com/photo-1584568499702-823d980e875f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWFtb25kJTIwc29saXRhaXJlJTIwcmluZyUyMGNsb3NlJTIwdXB8ZW58MXx8fHwxNzcwNzgyNjU1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    stock: 1,
    featured: true
  },
  {
    id: '3',
    name: 'Delicate Gold Necklace',
    description: 'Minimal and elegant 18K gold necklace perfect for everyday wear or layering.',
    price: 449,
    category: 'chain',
    imageUrl: 'https://images.unsplash.com/photo-1625792508300-0e1f913a3a50?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwZ29sZCUyMG5lY2tsYWNlfGVufDF8fHx8MTc3MDc4MDAxOXww&ixlib=rb-4.1.0&q=80&w=1080',
    stock: 3
  },
  {
    id: '4',
    name: 'Halo Diamond Engagement Ring',
    description: 'Custom 2ct center stone surrounded by pave diamonds. 14K white gold setting. Made to order.',
    price: 12999,
    category: 'ring',
    imageUrl: 'https://images.unsplash.com/photo-1742240439165-60790db1ee93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWFtb25kJTIwZW5nYWdlbWVudCUyMHJpbmclMjBsdXh1cnl8ZW58MXx8fHwxNzcwNjY0NDY2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    stock: 0,
    featured: true
  },
  {
    id: '5',
    name: 'Diamond Tennis Bracelet',
    description: 'Classic tennis bracelet with 5ctw diamonds. 14K white gold setting. Timeless elegance.',
    price: 6499,
    category: 'bracelet',
    imageUrl: 'https://images.unsplash.com/photo-1655707063513-a08dad26440e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkJTIwZGlhbW9uZCUyMGJyYWNlbGV0fGVufDF8fHx8MTc3MDc4MjY1NXww&ixlib=rb-4.1.0&q=80&w=1080',
    stock: 2
  },
  {
    id: '6',
    name: 'Herringbone Gold Chain',
    description: 'Premium 18K gold herringbone chain. Smooth, luxurious, and perfectly weighted.',
    price: 1899,
    category: 'chain',
    imageUrl: 'https://images.unsplash.com/photo-1767921804162-9c55a278768d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBnb2xkJTIwY2hhaW4lMjBqZXdlbHJ5fGVufDF8fHx8MTc3MDc4MDAxN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    stock: 1
  }
];

const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-001',
    customerName: 'John Smith',
    customerEmail: 'john@example.com',
    items: [
      { productId: '1', productName: 'Classic Cuban Link Chain', quantity: 1, price: 1299 }
    ],
    total: 1299,
    status: 'processing',
    date: '2026-02-08',
    shippingAddress: '123 Main St, Los Angeles, CA 90001'
  },
  {
    id: 'ORD-002',
    customerName: 'Sarah Johnson',
    customerEmail: 'sarah@example.com',
    items: [
      { productId: '3', productName: 'Delicate Gold Necklace', quantity: 2, price: 349 }
    ],
    total: 698,
    status: 'shipped',
    date: '2026-02-06',
    shippingAddress: '456 Oak Ave, New York, NY 10001'
  },
  {
    id: 'ORD-003',
    customerName: 'Mike Davis',
    customerEmail: 'mike@example.com',
    items: [
      { productId: '5', productName: 'Gold Link Bracelet', quantity: 1, price: 749 }
    ],
    total: 749,
    status: 'pending',
    date: '2026-02-10',
    shippingAddress: '789 Pine Rd, Miami, FL 33101'
  }
];

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    if (typeof window === 'undefined') return INITIAL_PRODUCTS;
    const saved = localStorage.getItem('products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    if (typeof window === 'undefined') return INITIAL_ORDERS;
    const saved = localStorage.getItem('orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [inquiries, setInquiries] = useState<Inquiry[]>(() => {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem('inquiries');
    return saved ? JSON.parse(saved) : [];
  });

  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('isAdmin') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...product,
      id: `PROD-${Date.now()}`
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev =>
      prev.map(product => (product.id === id ? { ...product, ...updates } : product))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev =>
      prev.map(order => (order.id === orderId ? { ...order, status } : order))
    );
  };

  const addInquiry = (inquiry: Omit<Inquiry, 'id' | 'date' | 'status'>) => {
    const newInquiry: Inquiry = {
      ...inquiry,
      id: `INQ-${Date.now()}`,
      date: new Date().toISOString(),
      status: 'new'
    };
    setInquiries(prev => [...prev, newInquiry]);
  };

  const updateInquiryStatus = (inquiryId: string, status: Inquiry['status']) => {
    setInquiries(prev =>
      prev.map(inquiry => (inquiry.id === inquiryId ? { ...inquiry, status } : inquiry))
    );
  };

  const login = (password: string) => {
    if (password === 'admin123') {
      setIsAdmin(true);
      localStorage.setItem('isAdmin', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem('isAdmin');
  };

  const createOrder = (orderData: { customerName: string; customerEmail: string; shippingAddress: string }) => {
    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      ...orderData,
      items: cart.map(item => ({
        productId: item.product.id,
        productName: item.product.name,
        quantity: item.quantity,
        price: item.product.price
      })),
      total: cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
      status: 'pending',
      date: new Date().toISOString().split('T')[0]
    };

    setOrders(prev => [...prev, newOrder]);

    cart.forEach(item => {
      updateProduct(item.product.id, {
        stock: item.product.stock - item.quantity
      });
    });

    clearCart();
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        orders,
        cart,
        inquiries,
        isAdmin,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        addProduct,
        updateProduct,
        deleteProduct,
        updateOrderStatus,
        addInquiry,
        updateInquiryStatus,
        login,
        logout,
        createOrder
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within StoreProvider');
  }
  return context;
};
