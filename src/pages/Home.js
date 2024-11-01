import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useContentData } from '../hooks/useContentData';
import VideoPlayer from "../components/VideoPlayer";
import ContentGrid from "../components/ContentGrid";
import useFavorites from '../hooks/useFavorites';

const VISIBLE_GENRES_COUNT = 3;

const Home = () => {
 const { content: allContent, loading, error, getAllGenres } = useContentData('all');
 const [selectedContent, setSelectedContent] = useState(null);
 const [contentByGenre, setContentByGenre] = useState({});
 const { favorites, toggleFavorite, loading: favoritesLoading } = useFavorites();
 const [isFullscreen, setIsFullscreen] = useState(false);

 useEffect(() => {
   if (!allContent?.length) return;

   if (!selectedContent) {
     setSelectedContent(allContent[0]);
   }

   const genres = getAllGenres().slice(0, VISIBLE_GENRES_COUNT);
   const groupedContent = genres.reduce((acc, genre) => {
     const items = allContent.filter(item => 
       Array.isArray(item.genres) && item.genres.includes(genre)
     );
     if (items.length > 0) acc[genre] = items;
     return acc;
   }, {});

   setContentByGenre(groupedContent);
 }, [allContent, getAllGenres, selectedContent]);

 const handleContentClick = (content) => {
   if (content) setSelectedContent(content);
 };

 const handlePlayClick = () => setIsFullscreen(true);
 const handleExitFullscreen = () => setIsFullscreen(false);

 if (loading || favoritesLoading) {
   return (
     <div className="loading-container">
       <div className="loading-spinner">Chargement...</div>
     </div>
   );
 }

 if (error) {
   return (
     <div className="error-container">
       <div className="error-message">Erreur: {error}</div>
     </div>
   );
 }

 if (!selectedContent || !contentByGenre) return null;

 return (
   <div className={`Homepage ${isFullscreen ? 'fullscreen-mode' : ''}`}>
     <div className="top-screen">
       <div className={`details-product ${isFullscreen ? 'hidden' : ''}`}>
         <div className="film-info">
           <img
             src={selectedContent.titleImage}
             alt={selectedContent.title}
             className="film-title"
           />
         </div>
         <p className="descp">{selectedContent.description}</p>
         <div className="notes">
           <div>
             <img
               className="notes-icon"
               alt="icon notes"
               src="/images/imdb.png"
             />
             <span>{selectedContent.rating}/10</span>
           </div>
           <div>
             <span>
               {selectedContent.type === 'movie'
                 ? selectedContent.duration
                 : `${selectedContent.seasons} ${selectedContent.seasons === 1 ? 'saison' : 'saisons'}`
               }
             </span>
           </div>
         </div>
         <div className="ctn-btns">
           <button className="dyn-btn" onClick={handlePlayClick}>
             <img src="./images/jouer.png" alt="" width={20} height={20}/>
             Lecture
           </button>
           <Link 
             className="dyn-btn" 
             to={`/${selectedContent.type}/${selectedContent.slug}`}
           >
             <img src="./images/info.png" alt="" width={20} height={20}/>
             Détails
           </Link>
         </div>
       </div>
       <div className={`video-overlay ${isFullscreen ? 'fullscreen' : ''}`}>
         <VideoPlayer
           src={selectedContent.videoSrc}
           autoplay
           loop
           muted={!isFullscreen}
           showOverlay={false}
         />
         {isFullscreen && (
           <button className="exit-fullscreen" onClick={handleExitFullscreen}>
             <i className="fi fi-rr-cross"></i>
             Quitter le plein écran
           </button>
         )}
       </div>
     </div>
     <div className={`bot-screen ${isFullscreen ? 'hidden' : ''}`}>
       {Object.entries(contentByGenre).map(([genre, content]) => (
         <ContentGrid
           key={genre}
           title={genre}
           items={content}
           selectedId={selectedContent?.id}
           onItemClick={handleContentClick}
           contentType="all"
           favorites={favorites}
           onToggleFavorite={toggleFavorite}
         />
       ))}
     </div>
   </div>
 );
};

export default Home;