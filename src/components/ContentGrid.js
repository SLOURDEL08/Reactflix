import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaRegHeart, FaHeart } from 'react-icons/fa'; // Assurez-vous que react-icons est installé

const ContentGrid = ({
  title,
  items,
  selectedId,
  onItemClick,
  contentType = 'all',
  favorites, // Liste des favoris
  onToggleFavorite // Fonction pour ajouter/enlever des favoris
}) => {
  if (!items?.length) return null;

  const getDurationOrSeasons = (item) => {
    if (item.type === 'movie') {
      return item.duration ? `${item.duration}` : 'Durée inconnue';
    }
    if (item.type === 'serie') {
      return item.seasons && item.seasons > 0 ? `${item.seasons} saisons` : 'Nombre de saisons inconnu';
    }
    return ''; 
  };

  return (
    <div className="content-section">
      {title && <h2 className="content-section-title">{title}</h2>}
      <div className="carousel-category">
        {items.map((item) => (
          <div 
            key={`${item.type}-${item.id}`}
            className={`content-container ${
              item.id === selectedId ? 'selected' : ''
            }`}
            onClick={() => onItemClick(item)}
          >
            <img
              className="carousel-items"
              alt={item.title || ''}
              src={item.poster}
              loading="lazy"
            />
            <div className="media-info-container">
              <h3 className="media-title">{item.title}</h3>
              <div className="media-stats">
                <div className="rating-badge">
                  <span className="rating-icon">⭐</span>
                  <span className="rating-value">{item.rating}</span>
                </div>
                
                {/* Affiche la durée pour les films ou le nombre de saisons pour les séries */}
                <div className="duration-info">
                  {getDurationOrSeasons(item)}
                </div>
              </div>

              {/* Icône de favori */}
              <div 
                className="favorite-icon" 
                onClick={(e) => {
                  e.stopPropagation(); // Empêche l'événement de clic de se propager
                  onToggleFavorite(item.id); // Appelle la fonction pour ajouter/enlever des favoris
                }}
                style={{ cursor: 'pointer', marginTop: '8px' }} // Styles additionnels
              >
                {favorites.includes(item.id) ? (
                  <FaHeart color="red" size={20} />
                ) : (
                  <FaRegHeart size={20} />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

ContentGrid.propTypes = {
  title: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    type: PropTypes.oneOf(['movie', 'serie']).isRequired,
    title: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    rating: PropTypes.number,
    duration: PropTypes.string,
    seasons: PropTypes.number,
    status: PropTypes.string,
    maturityRating: PropTypes.string,
  })).isRequired,
  selectedId: PropTypes.number,
  onItemClick: PropTypes.func.isRequired,
  contentType: PropTypes.oneOf(['all', 'movie', 'serie']),
  favorites: PropTypes.arrayOf(PropTypes.number).isRequired, // Liste des ID de favoris
  onToggleFavorite: PropTypes.func.isRequired, // Fonction pour gérer l'ajout/enlèvement des favoris
};

export default ContentGrid;
