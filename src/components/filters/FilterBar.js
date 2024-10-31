import React from 'react';
import { FilterDropdown } from './FilterDropdown';
import '../../App.css'
const FilterBar = ({ 
  type, // 'movie' ou 'series'
  filters,
  onFilterChange,
  data // données complètes pour calculer les comptages
}) => {
  // Fonction pour compter les occurrences
  const countItems = (property, value) => {
    return data.filter(item => {
      if (Array.isArray(item[property])) {
        return item[property].includes(value);
      }
      return item[property] === value;
    }).length;
  };

  // Configuration des filtres communs
  const commonFilters = {
    genres: {
      label: "Genres",
      icon: <img src='./images/categorie.png' alt='' width={18} height={18} />,
      options: [...new Set(data.flatMap(item => item.genres))].map(genre => ({
        value: genre,
        label: genre,
        count: countItems('genres', genre)
      }))
    },
    rating: {
      label: "Note IMDb",
      icon: <img src='./images/star-sharp-half-stroke.png' alt='' width={18} height={18} />,
      options: [
        { value: "9+", label: "9+ ★★★★★", count: data.filter(item => item.rating >= 9).length },
        { value: "8-9", label: "8-9 ★★★★☆", count: data.filter(item => item.rating >= 8 && item.rating < 9).length },
        { value: "7-8", label: "7-8 ★★★☆☆", count: data.filter(item => item.rating >= 7 && item.rating < 8).length },
        { value: "6-7", label: "6-7 ★★☆☆☆", count: data.filter(item => item.rating >= 6 && item.rating < 7).length }
      ]
    },
    language: {
      label: "Langue",
      icon: <img src='./images/europe-flag.png' alt='' width={18} height={18} />,
      options: [...new Set(data.map(item => item.language))].map(lang => ({
        value: lang,
        label: lang,
        count: countItems('language', lang)
      }))
    }
  };

  // Filtres spécifiques aux films
  const movieFilters = {
    ...commonFilters,
    releaseDate: {
      label: "Année",
      icon: <img src='./images/time-quarter-past.png' alt='' width={18} height={18} />,
      options: [...new Set(data.map(movie => 
        new Date(movie.releaseDate).getFullYear()
      ))].sort().reverse().map(year => ({
        value: year.toString(),
        label: year.toString(),
        count: data.filter(movie => 
          new Date(movie.releaseDate).getFullYear() === year
        ).length
      }))
    },
    maturityRating: {
      label: "Classification",
      icon: <img src='./images/age-restriction-eighteen.png' alt='' width={18} height={18} />,
      options: [...new Set(data.map(movie => movie.maturityRating))].map(rating => ({
        value: rating,
        label: rating,
        count: countItems('maturityRating', rating)
      }))
    }
  };

  // Filtres spécifiques aux séries
  const seriesFilters = {
    ...commonFilters,
    status: {
      label: "Statut",
      icon: <i class="fi fi-rr-tags"></i>,
      options: [
        { value: "En cours", label: "En cours", count: data.filter(s => s.endYear === null).length },
        { value: "Terminée", label: "Terminée", count: data.filter(s => s.endYear !== null).length }
      ]
    },
    seasons: {
      label: "Saisons",
      icon: <i class="fi fi-rr-folder-open"></i>,
      options: [
        { value: "1-3", label: "1-3 saisons", count: data.filter(s => s.seasons <= 3).length },
        { value: "4-6", label: "4-6 saisons", count: data.filter(s => s.seasons > 3 && s.seasons <= 6).length },
        { value: "7+", label: "7+ saisons", count: data.filter(s => s.seasons > 6).length }
      ]
    }
  };

  const activeFilters = type === 'movie' ? movieFilters : seriesFilters;

  return (
    <div className="sorting-controls">
      {Object.entries(activeFilters).map(([key, filterConfig]) => (
        <FilterDropdown
          key={key}
          label={filterConfig.label}
          icon={filterConfig.icon}
          options={filterConfig.options}
          selected={filters[key] || []}
          onChange={(value, isReset) => onFilterChange(key, value, isReset)}
        />
      ))}
    </div>
  );
};

export default FilterBar;