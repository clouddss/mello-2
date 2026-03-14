import React, { createContext, useContext, useState, type ReactNode } from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  originalPrice?: number;
}

interface CartContextType {
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  cartItems: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  totalItems: number;
  subtotal: number;
  totalSavings: number;
  shippingProtection: boolean;
  setShippingProtection: (enabled: boolean) => void;
  shippingProtectionCost: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [shippingProtection, setShippingProtection] = useState(true);
  const shippingProtectionCost = 29;

  const addItem = (newItem: CartItem) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === newItem.id);
      if (existingItem) {
        return prev.map(item => 
          item.id === newItem.id 
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        );
      }
      return [...prev, newItem];
    });
    setIsCartOpen(true);
  };

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setCartItems(prev => 
      prev.map(item => item.id === id ? { ...item, quantity } : item)
    );
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const itemsSubtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const subtotal = itemsSubtotal + (shippingProtection && cartItems.length > 0 ? shippingProtectionCost : 0);
  
  const totalSavings = cartItems.reduce((sum, item) => {
    if (item.originalPrice) {
      return sum + ((item.originalPrice - item.price) * item.quantity);
    }
    return sum;
  }, 0);

  return (
    <CartContext.Provider value={{
      isCartOpen,
      setIsCartOpen,
      cartItems,
      addItem,
      removeItem,
      updateQuantity,
      totalItems,
      subtotal,
      totalSavings,
      shippingProtection,
      setShippingProtection,
      shippingProtectionCost
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
