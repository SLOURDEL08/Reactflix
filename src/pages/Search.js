import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useContentData } from '../hooks/useContentData';
import '../App.css';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { content: allContent } = useContentData('all');

  // Fonction de recherche sécurisée
  const searchResults = useMemo(() => {
    if (!searchTerm.trim()) return [];

    const term = searchTerm.toLowerCase();
    return allContent.filter(item => {
      if (!item || !item.title) return false;
      
      return (
        item.title.toLowerCase().includes(term) ||
        (item.description && item.description.toLowerCase().includes(term)) ||
        (item.genres && item.genres.some(genre => 
          genre.toLowerCase().includes(term)
        ))
      );
    });
  }, [searchTerm, allContent]);

  return (
    <div className="search-page">
      <h1 className="search-title">Rechercher</h1>
      <div className="search-bar-container">
        <input
          type="text"
          className="search-bar"
          placeholder="Rechercher un titre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {searchResults.length > 0 && (
        <div className="search-results">
          {searchResults.map((item) => (
            <Link 
              to={`/${item.type}/${item.slug}`} 
              key={`${item.type}-${item.id}`} 
              className="search-result-item"
            >
              <img 
                src={item.poster} 
                alt={item.title} 
                className="search-result-image" 
              />
              <div className="search-result-info">
                <h3 className="search-result-title">{item.title}</h3>
                <p className="search-result-year">
                  {item.type === 'movie' 
                    ? new Date(item.releaseDate).getFullYear()
                    : item.startYear}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {searchTerm && searchResults.length === 0 && (
        <p className="no-results">Aucun résultat trouvé pour "{searchTerm}"</p>
      )}
    </div>
  );
};

export default Search;