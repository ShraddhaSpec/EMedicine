// CartContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CartContextProps {
  quantity: number;
  addToCart: () => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [quantity, setQuantity] = useState<number>(1);

  const addToCart = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  return (
    <CartContext.Provider value={{ quantity, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
