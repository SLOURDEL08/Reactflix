import React, { useState, useEffect } from 'react';
import ContentGrid from '../components/ContentGrid'; 
import { useContentData } from '../hooks/useContentData'; // Assurez-vous que cette fonction est importée

const Favorites = () => {
  const { content: allMovies } = useContentData('movie'); // Récupérer tous les films
  const { content: allSeries } = useContentData('series'); // Récupérer toutes les séries
  const [favorites, setFavorites] = useState(() => {
    // Récupérer les favoris depuis le stockage local
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  // Filtrer les films et séries favoris à partir des listes complètes
  const favoriteMovies = allMovies.filter(movie => favorites.includes(movie.id));
  const favoriteSeries = allSeries.filter(series => favorites.includes(series.id));

  const handleRemoveFavorite = (item) => {
    const updatedFavorites = favorites.filter(favId => favId !== item.id);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div className="favorites-page">
      <h1>Films et Séries Favoris</h1>
      {favoriteMovies.length === 0 && favoriteSeries.length === 0 ? (
        <p>Aucun favori trouvé.</p>
      ) : (
        <>
          {favoriteMovies.length > 0 && (
            <ContentGrid
              title="Films Favoris"
              items={favoriteMovies} // Utilisation de la liste filtrée des films favoris
              selectedId={null} // Ou vous pouvez gérer une sélection si nécessaire
              onItemClick={() => {}} // Vous pouvez ajouter une logique si vous souhaitez gérer le clic
              favorites={favorites} // Passer les ID de favoris
              onToggleFavorite={handleRemoveFavorite} // Passer la fonction pour enlever un favori
            />
          )}
          {favoriteSeries.length > 0 && (
            <ContentGrid
              title="Séries Favoris"
              items={favoriteSeries} // Utilisation de la liste filtrée des séries favoris
              selectedId={null} // Ou vous pouvez gérer une sélection si nécessaire
              onItemClick={() => {}} // Vous pouvez ajouter une logique si vous souhaitez gérer le clic
              favorites={favorites} // Passer les ID de favoris
              onToggleFavorite={handleRemoveFavorite} // Passer la fonction pour enlever un favori
            />
          )}
        </>
      )}
    </div>
  );
};

export default Favorites;
