import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useContentData } from '../hooks/useContentData';
import '../App.css';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { content: allContent, loading, error } = useContentData('all');

  // Affiche soit les résultats de recherche, soit tout le contenu
  const displayContent = useMemo(() => {
    if (!allContent) return [];

    if (!searchTerm.trim()) {
      return allContent; // Retourne tout le contenu si pas de recherche
    }

    // Logique de recherche existante
    const term = searchTerm.toLowerCase();
    return allContent.filter(item => {
      if (!item) return false;
      
      const matchTitle = item.title?.toLowerCase().includes(term);
      const matchDescription = item.description?.toLowerCase().includes(term);
      const matchGenres = item.genres?.some(genre => 
        genre.toLowerCase().includes(term)
      );

      return matchTitle || matchDescription || matchGenres;
    });
  }, [searchTerm, allContent]);

  // Format de date sécurisé
  const getYear = (item) => {
    if (!item) return '';
    
    try {
      if (item.type === 'movie') {
        return item.releaseDate ? new Date(item.releaseDate).getFullYear() : '';
      }
      return item.startYear || '';
    } catch (err) {
      console.error('Erreur de formatage de date:', err);
      return '';
    }
  };

  if (loading) {
    return (
      <div className="search-page">
        <div className="loading-container">
          <div className="loading-spinner">Chargement...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="search-page">
        <div className="error-container">
          <div className="error-message">
            Une erreur est survenue: {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="search-page">
      <h1 className="search-title">Rechercher</h1>
      <div className="search-bar-container">
        <div className="search-input-wrapper">
          <input
            type="text"
            className="search-bar"
            placeholder="Rechercher un titre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button 
              className="clear-search"
              onClick={() => setSearchTerm('')}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <div className="search-results-container">
        {displayContent.length > 0 ? (
          <div className={`search-results-grid ${!searchTerm ? 'default-view' : ''}`}>
            {displayContent.map((item) => (
              <Link 
                to={`/${item.type}/${item.slug}`} 
                key={`${item.type}-${item.id}`} 
                className="search-result-item"
              >
                <div className="search-result-image-container">
                  <img 
                    src={item.poster} 
                    alt={item.title} 
                    className="search-result-image" 
                    loading="lazy"
                  />
                  <div className="search-result-overlay">
                    <div className="search-result-details">
                      <p className="search-result-rating">⭐ {item.rating}</p>
                      <p className="search-result-genres">
                        {item.genres?.join(' • ')}
                      </p>
                    </div>
                  </div>
                </div>
              
              </Link>
            ))}
          </div>
        ) : (
          searchTerm && (
            <div className="no-results">
              <p>Aucun résultat trouvé pour "{searchTerm}"</p>
              <p className="no-results-suggestion">
                Essayez de modifier votre recherche ou explorez nos catégories
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Search;