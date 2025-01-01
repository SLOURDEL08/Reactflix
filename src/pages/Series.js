import React, { useState, useRef, useMemo } from 'react';
import { useContentData } from '../hooks/useContentData';
import SliderAffiche from '../components/SliderAffiche';
import FilterBar from '../components/filters/FilterBar';
import ContentGrid from '../components/ContentGrid';
import useFavorites from '../hooks/useFavorites';

const SELECTED_GENRES = ["Drame", "Action", "Crime", "Aventure", "Thriller", "Comedie","Horreur","Enfant"];

const Series = () => {
 const { content: allSeries, loading, error } = useContentData('serie');
 const [selectedSeriesId, setSelectedSeriesId] = useState(null);
 const [filters, setFilters] = useState({
   genres: [],
   rating: [],
   language: [],
   status: [],
   seasons: []
 });
 const [selectedGenre, setSelectedGenre] = useState(null);
 const { favorites, toggleFavorite, loading: favoritesLoading } = useFavorites();
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
     setSelectedGenre(null);
     setFilters(prev => ({ ...prev, genres: [] }));
   } else {
     setSelectedGenre(genre);
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

 // Gestion du chargement
 if (loading || favoritesLoading) {
   return (
     <div className="loading-container">
       <div className="loading-spinner">Chargement des séries...</div>
     </div>
   );
 }

 // Gestion des erreurs
 if (error) {
   return (
     <div className="error-container">
       <div className="error-message">
         Une erreur est survenue lors du chargement des séries: {error}
       </div>
     </div>
   );
 }

 // Si pas de séries trouvées
 if (!allSeries?.length) {
   return (
     <div className="no-content-container">
       <div className="no-content-message">
         Aucune série disponible pour le moment.
       </div>
     </div>
   );
 }

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

       {selectedGenre ? (
         <div className="content-section">
           <ContentGrid
             title={selectedGenre}
             items={filteredSeriesByGenre}
             selectedId={selectedSeriesId}
             onItemClick={setSelectedSeriesId}
             contentType="series"
             favorites={favorites}
             onToggleFavorite={toggleFavorite}
           />
         </div>
       ) : (
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
                 title={`${genre}`}
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