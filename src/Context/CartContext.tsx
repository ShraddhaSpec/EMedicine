// CartContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CartContextProps {
  quantity: number;
  addToCart: ({op} : {op:string}) => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [quantity, setQuantity] = useState<number>(parseInt(localStorage.getItem("CartQty") || "0"));

  const addToCart = ({op} : {op:string}) => {
    
    var CartQTY = parseInt(localStorage.getItem("CartQty") || "0");
    if(op == "add"){
      CartQTY += 1;
      setQuantity((prevQuantity) => prevQuantity + 1);  
    }
    else if(op == "minus"){
      CartQTY -= 1;
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
    
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
