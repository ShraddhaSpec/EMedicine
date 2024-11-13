// CartContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CartContextProps {
  quantity: number;
  addToCart: () => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [quantity, setQuantity] = useState<number>(parseInt(localStorage.getItem("CartQty") || "0"));

  const addToCart = () => {
    debugger
    setQuantity((prevQuantity) => prevQuantity + 1);
    var CartQTY = parseInt(localStorage.getItem("CartQty") || "0");
    CartQTY += 1;
    localStorage.setItem("CartQty",CartQTY + "");
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
