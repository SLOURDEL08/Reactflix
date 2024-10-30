import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { movies, series } from "../content";
import VideoPlayer from "../components/VideoPlayer";

const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

// Fonction pour créer des IDs uniques pour chaque contenu
const createUniqueContent = () => {
  const moviesWithUniqueIds = movies.map(movie => ({
    ...movie,
    uniqueId: `movie-${movie.id}`,
    type: 'movie'
  }));

  const seriesWithUniqueIds = series.map(serie => ({
    ...serie,
    uniqueId: `series-${serie.id}`,
    type: 'series'
  }));

  return [...moviesWithUniqueIds, ...seriesWithUniqueIds];
};

const getAllGenres = () => {
  const movieGenres = new Set(movies.flatMap(movie => movie.genres));
  const serieGenres = new Set(series.flatMap(serie => serie.genres));
  return [...new Set([...movieGenres, ...serieGenres])];
};

const Home = () => {
  const [selectedContent, setSelectedContent] = useState(null);
  const [contentByGenre, setContentByGenre] = useState({});
  const [fadeIn, setFadeIn] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    // Initialiser le contenu sélectionné avec le premier film
    const allContent = createUniqueContent();
    setSelectedContent(allContent[0]);

    // Grouper le contenu par genre avec les IDs uniques
    const genres = getAllGenres();
    const grouped = {};
    genres.forEach(genre => {
      const contentWithGenre = shuffleArray(
        allContent.filter(item => item.genres.includes(genre))
      );
      if (contentWithGenre.length > 0) {
        grouped[genre] = contentWithGenre;
      }
    });
    setContentByGenre(grouped);
  }, []);

  const handleContentClick = (content) => {
    setFadeIn(false);
    setTimeout(() => {
      setSelectedContent(content);
      setFadeIn(true);
    }, 500);
  };

  const handlePlayClick = () => {
    setIsFullscreen(true);
  };

  const handleExitFullscreen = () => {
    setIsFullscreen(false);
  };

  if (!selectedContent) return null;

  return (
    <div className={`Homepage ${isFullscreen ? 'fullscreen-mode' : ''}`}>
      <div className="top-screen">
        <div className={`details-product ${fadeIn ? "fade-in" : "fade-out"} ${isFullscreen ? 'hidden' : ''}`}>
          <div className="film-info">
            <img
              src={selectedContent.titleImage}
              alt={selectedContent.title}
              className="film-title"
            />
          </div>
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
              Lecture
            </button>
            <Link 
              className="dyn-btn" 
              to={`/${selectedContent.type}/${selectedContent.id}`}
            >
              Détails
            </Link>
          </div>
        </div>
        <div className={`video-overlay ${isFullscreen ? 'fullscreen' : ''}`}>
          {selectedContent && (
            <VideoPlayer
              src={selectedContent.videoSrc}
              autoplay
              loop
              muted={!isFullscreen}
              showOverlay={false}
            />
          )}
          {isFullscreen && (
            <button className="exit-fullscreen" onClick={handleExitFullscreen}>
              Quitter le plein écran
            </button>
          )}
        </div>
      </div>
      <div className={`bot-screen ${isFullscreen ? 'hidden' : ''}`}>
        {Object.entries(contentByGenre)
          .slice(0, 3)
          .map(([genre, content]) => (
            <div className="category-films" key={`genre-${genre}`}>
              <h1>{genre}</h1>
              <div className="carousel-category">
                {content.map((item) => (
                  <div key={item.uniqueId} className="film-container">
                    <img
                      className={`carousel-items ${
                        item.uniqueId === selectedContent.uniqueId ? "active" : ""
                      }`}
                      alt={item.title}
                      src={item.poster}
                      onClick={() => handleContentClick(item)}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;