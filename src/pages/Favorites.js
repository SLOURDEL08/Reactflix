import React from 'react';
import ContentGrid from '../components/ContentGrid';
import { useContentData } from '../hooks/useContentData';
import useFavorites from '../hooks/useFavorites';
import { useAuth } from '../contexts/AuthContext';

const Favorites = () => {
  const { user } = useAuth();
  const { content: allMovies, loading: moviesLoading } = useContentData('movie');
  const { content: allSeries, loading: seriesLoading } = useContentData('serie');
  const { favorites, toggleFavorite, loading: favoritesLoading } = useFavorites();

  // Attendre que toutes les données soient chargées
  if (moviesLoading || seriesLoading || favoritesLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">Chargement de vos favoris...</div>
      </div>
    );
  }

  // Rediriger si non connecté
  if (!user) {
    return (
      <div className="favorites-page">
        <div className="auth-message">
          Veuillez vous connecter pour voir vos favoris.
        </div>
      </div>
    );
  }

  // Filtrer les films et séries favoris
  const favoriteMovies = allMovies.filter(movie => favorites.includes(movie.id));
  const favoriteSeries = allSeries.filter(serie => favorites.includes(serie.id));

  return (
    <div className="favorites-page">
      <h1>Films et Séries Favoris</h1>
      {favoriteMovies.length === 0 && favoriteSeries.length === 0 ? (
        <div className="no-favorites">
          <p>Vous n'avez pas encore de favoris.</p>
          <p>Ajoutez des films et séries à vos favoris pour les retrouver ici !</p>
        </div>
      ) : (
        <>
          {favoriteMovies.length > 0 && (
            <ContentGrid
              title="Films Favoris"
              items={favoriteMovies}
              selectedId={null}
              onItemClick={() => {}}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
            />
          )}
          {favoriteSeries.length > 0 && (
            <ContentGrid
              title="Séries Favoris"
              items={favoriteSeries}
              selectedId={null}
              onItemClick={() => {}}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Favorites;