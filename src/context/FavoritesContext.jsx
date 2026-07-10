import React, { createContext, useContext, useEffect, useState } from "react";

const FavoritesContext = createContext(null);
const STORAGE_KEY = "pinky_favorites";

export function FavoritesProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore storage errors */
    }
  }, [items]);

  const addFavorite = (perfume) => {
    setItems((prev) => {
      if (prev.find((p) => p.id === perfume.id)) return prev;
      return [...prev, perfume];
    });
  };

  const removeFavorite = (id) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  };

  const toggleFavorite = (perfume) => {
    setItems((prev) => {
      if (prev.find((p) => p.id === perfume.id)) return prev.filter((p) => p.id !== perfume.id);
      return [...prev, perfume];
    });
  };

  const isFavorite = (id) => items.some((p) => p.id === id);

  const favoritesCount = items.length;

  const value = {
    items,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    favoritesCount,
  };

  return (
    <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
  );
}

export const useFavorites = () => {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used inside a <FavoritesProvider>");
  return ctx;
};
