import React, { useState, useEffect, useRef, useMemo } from 'react';
import { movies } from "../content";
import SliderAffiche from '../components/SliderAffiche';
import FilterBar from '../components/filters/FilterBar';

const SELECTED_GENRES = ["Drame", "Action", "Crime", "Aventure"];

const Movies = () => {
  const [moviesByGenre, setMoviesByGenre] = useState({});
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [filters, setFilters] = useState({
    genres: [],
    rating: [],
    language: [],
    releaseDate: [],
    maturityRating: []
  });
  const topRef = useRef(null);

  // Featured movies avec gestion du film sélectionné
  const featuredMovies = useMemo(() => {
    const topMovies = [...movies]
      .filter(movie => movie.genres.some(genre => SELECTED_GENRES.includes(genre)))
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 5);

    if (selectedMovieId) {
      const selectedMovie = movies.find(m => m.id === selectedMovieId);
      if (selectedMovie && !topMovies.find(m => m.id === selectedMovieId)) {
        topMovies.pop();
        topMovies.unshift(selectedMovie);
      }
    }

    return topMovies;
  }, [selectedMovieId]);

  // Fonction de gestion des filtres
  const handleFilterChange = (filterKey, value, isReset) => {
    setFilters(prev => ({
      ...prev,
      [filterKey]: isReset ? [] : 
        prev[filterKey].includes(value[0])
          ? prev[filterKey].filter(v => v !== value[0])
          : [...prev[filterKey], ...value]
    }));
  };

  // Effet pour filtrer les films
  useEffect(() => {
    const filteredMovies = movies.filter(movie => {
      // Filtre par genre
      if (filters.genres.length && !filters.genres.some(genre => movie.genres.includes(genre))) {
        return false;
      }

      // Filtre par note
      if (filters.rating.length) {
        const ratingMatch = filters.rating.some(range => {
          switch (range) {
            case "9+": return movie.rating >= 9;
            case "8-9": return movie.rating >= 8 && movie.rating < 9;
            case "7-8": return movie.rating >= 7 && movie.rating < 8;
            case "6-7": return movie.rating >= 6 && movie.rating < 7;
            default: return false;
          }
        });
        if (!ratingMatch) return false;
      }

      // Filtre par langue
      if (filters.language.length && !filters.language.includes(movie.language)) {
        return false;
      }

      // Filtre par année
      if (filters.releaseDate.length) {
        const movieYear = new Date(movie.releaseDate).getFullYear().toString();
        if (!filters.releaseDate.includes(movieYear)) return false;
      }

      // Filtre par classification
      if (filters.maturityRating.length && !filters.maturityRating.includes(movie.maturityRating)) {
        return false;
      }

      return true;
    });

    // Grouper par genre
    const grouped = {};
    SELECTED_GENRES.forEach(genre => {
      const moviesInGenre = filteredMovies.filter(movie => 
        movie.genres.includes(genre)
      );
      if (moviesInGenre.length > 0) {
        grouped[genre] = moviesInGenre;
      }
    });

    setMoviesByGenre(grouped);
  }, [filters]);

  const handleMovieClick = (movie) => {
    setSelectedMovieId(movie.id);
    topRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className='movies-page'>
      <div ref={topRef}>
        <SliderAffiche
          items={featuredMovies}
          itemType="movie"
          selectedItemId={selectedMovieId}
        />
      </div>
      <div className="movies-container">
        <div className="movies-header">
          <h1 className="movies-title">Notre sélection de <b className='reded'>Films</b></h1>
          <FilterBar
            type="movie"
            filters={filters}
            onFilterChange={handleFilterChange}
            data={movies}
          />
        </div>

        {SELECTED_GENRES.map(genre => {
          const moviesList = moviesByGenre[genre];
          if (!moviesList?.length) return null;

          return (
            <div className="category-movies" key={genre}>
              <h2>{genre}</h2>
              <div className="carousel-category">
                {moviesList.map((movie) => (
                  <div 
                    key={movie.id} 
                    className={`series-container ${movie.id === selectedMovieId ? 'selected' : ''}`}
                    onClick={() => handleMovieClick(movie)}
                  >
                    <img
                      className="carousel-items"
                      alt={movie.title}
                      src={movie.poster}
                    />
                    <div className="media-info-container">
                      <h3 className="media-title">{movie.title}</h3>
                      <div className="media-stats">
                        <div className="rating-badge">
                          <span className="rating-icon">⭐</span>
                          <span className="rating-value">{movie.rating}</span>
                        </div>
                        <div className="season-info">
                          {movie.duration}
                        </div>
                        <div className={`status-badge ${movie.maturityRating.toLowerCase()}`}>
                          {movie.maturityRating}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Movies;