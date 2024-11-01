// hooks/useFavorites.js
import { useState, useEffect } from 'react';

const useFavorites = () => {
  // État pour les favoris
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  // Fonction pour basculer les favoris
  const toggleFavorite = (contentId) => {
    setFavorites((prev) => {
      if (prev.includes(contentId)) {
        return prev.filter(id => id !== contentId);
      } else {
        return [...prev, contentId];
      }
    });
  };

  // Mettre à jour le stockage local des favoris
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  return { favorites, toggleFavorite };
};

export default useFavorites;
