import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useContentData } from '../hooks/useContentData';
import VideoPlayer from "../components/VideoPlayer";
import ContentGrid from "../components/ContentGrid";
import useFavorites from '../hooks/useFavorites'; // Importez le hook

const VISIBLE_GENRES_COUNT = 3;

const Home = () => {
  const { content: allContent, getAllGenres } = useContentData('all');
  const [selectedContent, setSelectedContent] = useState(null);
  const [contentByGenre, setContentByGenre] = useState({});
  
  // Utilisation du hook pour gérer les favoris
  const { favorites, toggleFavorite } = useFavorites(); 

  const [isFullscreen, setIsFullscreen] = useState(false);

  // Initialisation du contenu par genre au chargement
  useEffect(() => {
    if (!allContent?.length) return;

    // Sélectionner le contenu initial
    if (!selectedContent) {
      setSelectedContent(allContent[0]);
    }

    // Grouper et trier le contenu par genre
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

  // Affiche les détails du contenu sélectionné
  const handleContentClick = (content) => {
    if (content) setSelectedContent(content);
  };

  // Gestion du plein écran pour la lecture de vidéo
  const handlePlayClick = () => setIsFullscreen(true);
  const handleExitFullscreen = () => setIsFullscreen(false);

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
              <span>{selectedContent.rating}</span>
            </div>
            <div>
              <span>
                <b className="viewbold">{Math.floor(Math.random() * 1000000) + "K"}</b> de visionnage
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
        {/* Section des contenus favoris */}
        <ContentGrid
          title="Contenus Favoris"
          items={allContent.filter(content => favorites.includes(content.id))}
          selectedId={selectedContent?.id}
          onItemClick={handleContentClick}
          contentType="all"
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
        />
        
        {/* Affichage des contenus groupés par genre */}
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
