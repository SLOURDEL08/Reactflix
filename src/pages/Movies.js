import React, { useState, useRef, useMemo } from 'react';
import { useContentData } from '../hooks/useContentData';
import SliderAffiche from '../components/SliderAffiche';
import FilterBar from '../components/filters/FilterBar';
import ContentGrid from '../components/ContentGrid';
import useFavorites from '../hooks/useFavorites';

const SELECTED_GENRES = ["Drame", "Action", "Crime", "Aventure", "Thriller", "Comedie", "Horreur", "Enfant"];

const Movies = () => {
  const { content: allMovies } = useContentData('movie');
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [filters, setFilters] = useState({
    genres: [],
    rating: [],
    language: [],
    releaseDate: [],
    maturityRating: []
  });
  const [selectedGenre, setSelectedGenre] = useState(null);
  const { favorites, toggleFavorite } = useFavorites();
  const topRef = useRef(null);

  const featuredMovies = useMemo(() => {
    if (!allMovies?.length) return [];
    
    const topMovies = [...allMovies]
      .filter(movie => movie?.genres?.some(genre => SELECTED_GENRES.includes(genre)))
      .sort((a, b) => (b?.rating || 0) - (a?.rating || 0))
      .slice(0, 5);

    if (selectedMovieId) {
      const selectedMovie = allMovies.find(m => m?.id === selectedMovieId);
      if (selectedMovie && !topMovies.find(m => m?.id === selectedMovieId)) {
        topMovies.pop();
        topMovies.unshift(selectedMovie);
      }
    }

    return topMovies;
  }, [allMovies, selectedMovieId]);

  const handleGenreSelect = (genre) => {
    if (selectedGenre === genre) {
      setSelectedGenre(null);
      setFilters(prev => ({ ...prev, genres: [] }));
    } else {
      setSelectedGenre(genre);
      setFilters(prev => ({ ...prev, genres: [genre] }));
    }
  };

  const filteredMoviesByGenre = useMemo(() => {
    if (!allMovies?.length) return [];

    return allMovies.filter(movie => {
      // Filter by selected genre
      if (selectedGenre && !movie.genres?.includes(selectedGenre)) {
        return false;
      }

      // Apply other filters
      if (filters.rating.length) {
        const rating = movie.rating || 0;
        const ratingMatch = filters.rating.some(range => {
          switch (range) {
            case "9+": return rating >= 9;
            case "8-9": return rating >= 8 && rating < 9;
            case "7-8": return rating >= 7 && rating < 8;
            case "6-7": return rating >= 6 && rating < 7;
            default: return false;
          }
        });
        if (!ratingMatch) return false;
      }

      if (filters.language.length && !filters.language.includes(movie.language)) {
        return false;
      }

      if (filters.releaseDate.length) {
        const movieYear = movie.releaseDate 
          ? new Date(movie.releaseDate).getFullYear().toString()
          : '';
        if (!filters.releaseDate.includes(movieYear)) return false;
      }

      if (filters.maturityRating.length && !filters.maturityRating.includes(movie.maturityRating)) {
        return false;
      }

      return true;
    });
  }, [allMovies, filters, selectedGenre]);

  return (
    <div className='movies-page'>
      <div className='flex-topcontent'>
        <div className='flex-slide' ref={topRef}>
          <SliderAffiche
            items={featuredMovies}
            itemType="movie"
            selectedItemId={selectedMovieId}
          />
        </div>
        <div className='cate'>
          {SELECTED_GENRES.map(genre => (
            <div 
              key={genre} 
              onClick={() => handleGenreSelect(genre)}
              className={selectedGenre === genre ? 'actifed' : ''}
            >
              <a>
                {genre}
              </a>
            </div>
          ))}
        </div>
      </div>
      <div className="movies-container">
        <div className="movies-header">
          <h1 className="title">
            Notre sélection de
            <b className='reded'>
              <i className="fi page fi-rr-tv-retro"></i>
              Film
            </b>
          </h1>
          <FilterBar
            type="movie"
            filters={filters}
            onFilterChange={setFilters}
            data={allMovies}
          />
        </div>

        {/* Render filtered movies based on selected genre */}
        {selectedGenre ? (
          <div className="content-section">
            <ContentGrid
              title={selectedGenre}
              items={filteredMoviesByGenre}
              selectedId={selectedMovieId}
              onItemClick={setSelectedMovieId}
              contentType="movie"
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
            />
          </div>
        ) : (
          // If no genre is selected, show all movies grouped by genre
          Object.entries(filteredMoviesByGenre.reduce((acc, movie) => {
            movie.genres.forEach(genre => {
              if (!acc[genre]) {
                acc[genre] = [];
              }
              acc[genre].push(movie);
            });
            return acc;
          }, {})).map(([genre, moviesList]) => (
            moviesList.length > 0 && (
              <div className="content-section" key={genre}>
                <ContentGrid
                  title={`${genre}`}
                  items={moviesList}
                  selectedId={selectedMovieId}
                  onItemClick={setSelectedMovieId}
                  contentType="movie"
                  favorites={favorites}
                  onToggleFavorite={toggleFavorite}
                />
              </div>
            )
          ))
        )}
      </div>
    </div>
  );
};

export default Movies;