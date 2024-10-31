import React, { useState, useEffect, useRef, useMemo } from 'react';
import { series } from "../content";
import SliderAffiche from '../components/SliderAffiche';
import FilterBar from '../components/filters/FilterBar';

const SELECTED_GENRES = ["Drame", "Action", "Crime", "Aventure"];

const Series = () => {
  const [seriesByGenre, setSeriesByGenre] = useState({});
  const [selectedSeriesId, setSelectedSeriesId] = useState(null);
  const [filters, setFilters] = useState({
    genres: [],
    rating: [],
    language: [],
    status: [],
    seasons: []
  });
  const topRef = useRef(null);

  // Featured series avec gestion de la série sélectionnée
  const featuredSeries = useMemo(() => {
    const topSeries = [...series]
      .filter(serie => serie.genres.some(genre => SELECTED_GENRES.includes(genre)))
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 5);

    if (selectedSeriesId) {
      const selectedSerie = series.find(s => s.id === selectedSeriesId);
      if (selectedSerie && !topSeries.find(s => s.id === selectedSeriesId)) {
        topSeries.pop();
        topSeries.unshift(selectedSerie);
      }
    }

    return topSeries;
  }, [selectedSeriesId]);

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

  // Effet pour filtrer les séries
  useEffect(() => {
    const filteredSeries = series.filter(serie => {
      // Filtre par genre
      if (filters.genres.length && !filters.genres.some(genre => serie.genres.includes(genre))) {
        return false;
      }

      // Filtre par note
      if (filters.rating.length) {
        const ratingMatch = filters.rating.some(range => {
          switch (range) {
            case "9+": return serie.rating >= 9;
            case "8-9": return serie.rating >= 8 && serie.rating < 9;
            case "7-8": return serie.rating >= 7 && serie.rating < 8;
            case "6-7": return serie.rating >= 6 && serie.rating < 7;
            default: return false;
          }
        });
        if (!ratingMatch) return false;
      }

      // Filtre par langue
      if (filters.language.length && !filters.language.includes(serie.language)) {
        return false;
      }

      // Filtre par statut
      if (filters.status.length) {
        const statusMatch = filters.status.includes(serie.status);
        if (!statusMatch) return false;
      }

      // Filtre par nombre de saisons
      if (filters.seasons.length) {
        const seasonsMatch = filters.seasons.some(range => {
          switch (range) {
            case "1-3": return serie.seasons <= 3;
            case "4-6": return serie.seasons > 3 && serie.seasons <= 6;
            case "7+": return serie.seasons > 6;
            default: return false;
          }
        });
        if (!seasonsMatch) return false;
      }

      return true;
    });

    // Grouper par genre
    const grouped = {};
    SELECTED_GENRES.forEach(genre => {
      const seriesInGenre = filteredSeries.filter(serie => 
        serie.genres.includes(genre)
      );
      if (seriesInGenre.length > 0) {
        grouped[genre] = seriesInGenre;
      }
    });

    setSeriesByGenre(grouped);
  }, [filters]);

  const handleSeriesClick = (serie) => {
    setSelectedSeriesId(serie.id);
    topRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className='series-page'>
      <div ref={topRef}>
        <SliderAffiche
          items={featuredSeries}
          itemType="series"
          selectedItemId={selectedSeriesId}
        />
      </div>
      <div className="series-container">
        <div className="series-header">
          <h1 className="series-title">Parcourez nos <b className='reded'><i class="fi page tv fi-rr-screen"> </i>Séries</b></h1>
          <FilterBar
            type="series"
            filters={filters}
            onFilterChange={handleFilterChange}
            data={series}
          />
        </div>

        {SELECTED_GENRES.map(genre => {
          const seriesList = seriesByGenre[genre];
          if (!seriesList?.length) return null;

          return (
            <div className="category-series" key={genre}>
              <h2>{genre}</h2>
              <div className="carousel-category">
               {seriesList.map((serie) => (
  <div 
    key={serie.id} 
    className={`content-container ${serie.id === selectedSeriesId ? 'selected' : ''}`}
    onClick={() => handleSeriesClick(serie)}
  >
    <img
      className="carousel-items"
      alt={serie.title}
      src={serie.poster}
    />
    <div className="media-info-container">
      <h3 className="media-title">{serie.title}</h3>
      <div className="media-stats">
        <div className="rating-badge">
          <span className="rating-icon">⭐</span>
          <span className="rating-value">{serie.rating}</span>
        </div>
        <div className="season-info">
          {serie.seasons} saisons
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

export default Series;