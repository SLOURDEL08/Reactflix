import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import data from '../data.json';
import '../App.css';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (searchTerm) {
      const results = data.films.filter(film =>
        film.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

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
          {searchResults.map((film) => (
            <Link to={`/movie/${film.id}`} key={film.id} className="search-result-item">
              <img src={film.imageFlyer} alt={film.title} className="search-result-image" />
              <div className="search-result-info">
                <h3 className="search-result-title">{film.title}</h3>
                <p className="search-result-year">{film.year}</p>
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