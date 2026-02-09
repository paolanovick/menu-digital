import { useState } from "react";
import { CartContext } from "./CartContext";

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const addToCart = (product) => {
    setItems((prev) => {
      const existing = prev.find((i) => i._id === product._id);
      if (existing) {
        return prev.map((i) =>
          i._id === product._id ? { ...i, cantidad: i.cantidad + 1 } : i,
        );
      }
      return [...prev, { ...product, cantidad: 1 }];
    });
  };

  const removeFromCart = (id) =>
    setItems((prev) => prev.filter((i) => i._id !== id));

  const updateQuantity = (id, cantidad) => {
    if (cantidad <= 0) {
      removeFromCart(id);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i._id === id ? { ...i, cantidad } : i)),
    );
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((a, i) => a + i.cantidad, 0);
  const totalPrecio = items.reduce((a, i) => a + i.precio * i.cantidad, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrecio,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
