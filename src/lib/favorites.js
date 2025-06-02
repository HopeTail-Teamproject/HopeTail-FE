const FAVORITES_KEY = "favorites";

export const getFavorites = () => {
  return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
};

export const isFavorite = (id) => {
  return getFavorites().includes(id);
};

export const toggleFavorite = (id) => {
  const favorites = getFavorites();
  const updated = favorites.includes(id)
    ? favorites.filter((fid) => fid !== id)
    : [...favorites, id];
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
};
