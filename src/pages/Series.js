import React, { useState, useRef, useMemo } from 'react';
import { useContentData } from '../hooks/useContentData';
import SliderAffiche from '../components/SliderAffiche';
import FilterBar from '../components/filters/FilterBar';
import ContentGrid from '../components/ContentGrid';
import useFavorites from '../hooks/useFavorites';

const SELECTED_GENRES = ["Drame", "Action", "Crime", "Aventure", "Thriller", "Comedie","Horreur","Enfant"];

const Series = () => {
  const { content: allSeries } = useContentData('series');
  const [selectedSeriesId, setSelectedSeriesId] = useState(null);
  const [filters, setFilters] = useState({
    genres: [],
    rating: [],
    language: [],
    status: [],
    seasons: []
  });
  const [selectedGenre, setSelectedGenre] = useState(null);
  const { favorites, toggleFavorite } = useFavorites();
  const topRef = useRef(null);

  const featuredSeries = useMemo(() => {
    if (!allSeries?.length) return [];
    
    const topSeries = [...allSeries]
      .filter(serie => serie?.genres?.some(genre => SELECTED_GENRES.includes(genre)))
      .sort((a, b) => (b?.rating || 0) - (a?.rating || 0))
      .slice(0, 5);

    if (selectedSeriesId) {
      const selectedSerie = allSeries.find(s => s?.id === selectedSeriesId);
      if (selectedSerie && !topSeries.find(s => s?.id === selectedSeriesId)) {
        topSeries.pop();
        topSeries.unshift(selectedSerie);
      }
    }

    return topSeries;
  }, [allSeries, selectedSeriesId]);

  const handleGenreSelect = (genre) => {
    if (selectedGenre === genre) {
      setSelectedGenre(null); // Deselect genre: show all
      setFilters(prev => ({ ...prev, genres: [] }));
    } else {
      setSelectedGenre(genre); // Select genre: show only this genre
      setFilters(prev => ({ ...prev, genres: [genre] }));
    }
  };

  const filteredSeriesByGenre = useMemo(() => {
    if (!allSeries?.length) return [];

    return allSeries.filter(serie => {
      // Filter by selected genre
      if (selectedGenre && !serie.genres?.includes(selectedGenre)) {
        return false;
      }

      // Apply other filters
      if (filters.rating.length) {
        const rating = serie.rating || 0;
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

      if (filters.language.length && !filters.language.includes(serie.language)) {
        return false;
      }

      if (filters.status.length && !filters.status.includes(serie.status)) {
        return false;
      }

      if (filters.seasons.length) {
        const seasons = serie.seasons || 0;
        const seasonsMatch = filters.seasons.some(range => {
          switch (range) {
            case "1-3": return seasons <= 3;
            case "4-6": return seasons > 3 && seasons <= 6;
            case "7+": return seasons > 6;
            default: return false;
          }
        });
        if (!seasonsMatch) return false;
      }

      return true;
    });
  }, [allSeries, filters, selectedGenre]);

  return (
    <div className='series-page'>
      <div className='flex-topcontent'>
        <div className='flex-slide' ref={topRef}>
          <SliderAffiche
            items={featuredSeries}
            itemType="series"
            selectedItemId={selectedSeriesId}
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
      <div className="series-container">
        <div className="series-header">
          <h1 className="title">
         Parcourez nos
            <b className='reded'>
              <i className="fi page fi-rr-tv-retro"></i>
              Séries
            </b>
          </h1>
          <FilterBar
            type="series"
            filters={filters}
            onFilterChange={setFilters}
            data={allSeries}
          />
        </div>

        {/* Render filtered series based on selected genre */}
        {selectedGenre ? (
          <div className="content-section">
            <ContentGrid
              title={selectedGenre} // Use the selected genre as the title
              items={filteredSeriesByGenre}
              selectedId={selectedSeriesId}
              onItemClick={setSelectedSeriesId}
              contentType="series"
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
            />
          </div>
        ) : (
          // If no genre is selected, show all series grouped by genre
          Object.entries(filteredSeriesByGenre.reduce((acc, serie) => {
            serie.genres.forEach(genre => {
              if (!acc[genre]) {
                acc[genre] = [];
              }
              acc[genre].push(serie);
            });
            return acc;
          }, {})).map(([genre, seriesList]) => (
            seriesList.length > 0 && (
              <div className="content-section" key={genre}>
                <ContentGrid
                  title={`${genre}`} // Show genre title with count
                  items={seriesList}
                  selectedId={selectedSeriesId}
                  onItemClick={setSelectedSeriesId}
                  contentType="series"
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

export default Series;
