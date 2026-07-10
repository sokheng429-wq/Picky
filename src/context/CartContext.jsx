import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "pinky_cart";

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [toast, setToast] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore storage errors (e.g. private browsing) */
    }
  }, [items]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  const addToCart = (perfume, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === perfume.id);
      if (existing) {
        return prev.map((i) =>
          i.id === perfume.id ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [...prev, { ...perfume, qty }];
    });
    setToast(`${perfume.name} added to your bag 💖`);
  };

  const removeFromCart = (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQty = (id, qty) => {
    if (qty < 1) return;
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)));
  };

  const clearCart = () => setItems([]);

  const cartCount = items.reduce((sum, i) => sum + i.qty, 0);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  const value = {
    items,
    addToCart,
    removeFromCart,
    updateQty,
    clearCart,
    cartCount,
    subtotal,
    toast,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
      {toast && <div className="cart-toast">{toast}</div>}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used inside a <CartProvider>");
  }
  return ctx;
};
