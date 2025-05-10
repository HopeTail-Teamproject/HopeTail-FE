import React, { createContext, useContext, useState } from "react";

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (pet) => {
    setFavorites((prev) => {
      const exists = prev.find((f) => f.id === pet.id);
      if (exists) {
        return prev.filter((f) => f.id !== pet.id);
      } else {
        return [...prev, pet];
      }
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
