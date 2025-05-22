import { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface CartContextProps {
  cart: { [key: number]: number };
  addToCart: (productId: number) => void;
  removeFromCart: (productId: number) => void;
}

export const CartContext = createContext<CartContextProps>({
  cart: {},
  addToCart: () => {},
  removeFromCart: () => {}
});

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  // Inicializa o estado do cart com os dados do localStorage (se houver)
  const [cart, setCart] = useState<{ [key: number]: number }>(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : {};
  });

  // Salva as atualizações do cart no localStorage sempre que ele for alterado
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (productId: number) => {
    setCart(prevCart => ({
      ...prevCart,
      [productId]: prevCart[productId] ? prevCart[productId] + 1 : 1
    }));
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => {
      const quantity = prevCart[productId];
      if (!quantity) return prevCart;
      if (quantity === 1) {
        const { [productId]: _, ...newCart } = prevCart;
        return newCart;
      }
      return {
        ...prevCart,
        [productId]: quantity - 1
      };
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};