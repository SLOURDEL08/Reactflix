import React from 'react';
import { FilterDropdown } from './FilterDropdown';
import '../../App.css';

const FilterBar = ({ 
 type,
 filters,
 onFilterChange,
 data
}) => {
 // Fonction pour compter les occurrences avec vérification de données
 const countItems = (property, value) => {
   return data?.filter(item => {
     if (!item || !item[property]) return false;
     if (Array.isArray(item[property])) {
       return item[property].includes(value);
     }
     return item[property] === value;
   }).length || 0;
 };

 // Configuration des filtres communs
 const commonFilters = {

   rating: {
     label: "Note IMDb",
     icon: <img src='./images/star-sharp-half-stroke.png' alt='' width={18} height={18} />,
     options: [
       { value: "9+", label: "9+ ★★★★★", count: data?.filter(item => Number(item.rating) >= 9).length || 0 },
       { value: "8-9", label: "8-9 ★★★★☆", count: data?.filter(item => Number(item.rating) >= 8 && Number(item.rating) < 9).length || 0 },
       { value: "7-8", label: "7-8 ★★★☆☆", count: data?.filter(item => Number(item.rating) >= 7 && Number(item.rating) < 8).length || 0 },
       { value: "6-7", label: "6-7 ★★☆☆☆", count: data?.filter(item => Number(item.rating) >= 6 && Number(item.rating) < 7).length || 0 }
     ]
   },
   language: {
     label: "Langue",
     icon: <img src='./images/europe-flag.png' alt='' width={18} height={18} />,
     options: data ? [...new Set(data.map(item => item.language).filter(Boolean))].map(lang => ({
       value: lang,
       label: lang,
       count: countItems('language', lang)
     })) : []
   }
 };

 // Filtres spécifiques aux films avec vérification des données
 const movieFilters = {
   ...commonFilters,
   releaseDate: {
     label: "Année",
     icon: <img src='./images/time-quarter-past.png' alt='' width={18} height={18} />,
     options: data ? [...new Set(data
       .map(movie => movie.releaseDate ? new Date(movie.releaseDate).getFullYear() : null)
       .filter(Boolean)
     )].sort().reverse().map(year => ({
       value: year.toString(),
       label: year.toString(),
       count: data.filter(movie => movie.releaseDate && 
         new Date(movie.releaseDate).getFullYear() === year
       ).length
     })) : []
   },
   maturityRating: {
     label: "Classification",
     icon: <img src='./images/age-restriction-eighteen.png' alt='' width={18} height={18} />,
     options: data ? [...new Set(data.map(movie => movie.maturityRating).filter(Boolean))].map(rating => ({
       value: rating,
       label: rating,
       count: countItems('maturityRating', rating)
     })) : []
   }
 };

 // Filtres spécifiques aux séries avec vérification des données
 const seriesFilters = {
   ...commonFilters,
   status: {
     label: "Statut",
     icon: <i className="fi fi-rr-tags"></i>,
     options: data ? [
       { 
         value: "En cours", 
         label: "En cours", 
         count: data.filter(s => s.status === "En cours").length 
       },
       { 
         value: "Terminée", 
         label: "Terminée", 
         count: data.filter(s => s.status === "Terminée").length 
       }
     ] : []
   },
   seasons: {
     label: "Saisons",
     icon: <i className="fi fi-rr-folder-open"></i>,
     options: data ? [
       { 
         value: "1-3", 
         label: "1-3 saisons", 
         count: data.filter(s => Number(s.seasons) <= 3).length 
       },
       { 
         value: "4-6", 
         label: "4-6 saisons", 
         count: data.filter(s => Number(s.seasons) > 3 && Number(s.seasons) <= 6).length 
       },
       { 
         value: "7+", 
         label: "7+ saisons", 
         count: data.filter(s => Number(s.seasons) > 6).length 
       }
     ] : []
   }
 };

 const activeFilters = type === 'movie' ? movieFilters : seriesFilters;

 // Handler pour les changements de filtres
 const handleFilterChange = (key, value) => {
   const newFilters = {
     ...filters,
     [key]: value
   };
   onFilterChange(newFilters);
 };

 return (
   <div className="sorting-controls">
     {Object.entries(activeFilters).map(([key, filterConfig]) => (
       <FilterDropdown
         key={key}
         label={filterConfig.label}
         icon={filterConfig.icon}
         options={filterConfig.options}
         selected={filters[key] || []}
         onChange={(value, isReset) => handleFilterChange(key, isReset ? [] : value)}
       />
     ))}
   </div>
 );
};

export default FilterBar;