import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { movies, series } from "../content";
import VideoPlayer from "../components/VideoPlayer";

const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

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
    const allContent = createUniqueContent();
    setSelectedContent(allContent[0]);

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
      <div className="category-series" key={`genre-${genre}`}>
        <h2>{genre}</h2>
        <div className="carousel-category">
          {content.map((item) => (
            <div 
              key={item.uniqueId} 
              className={`content-container ${item.uniqueId === selectedContent.uniqueId ? 'selected' : ''}`}
              onClick={() => handleContentClick(item)}
            >
              <img
                className="carousel-items"
                alt={item.title}
                src={item.poster}
              />
              <div className="media-info-container">
                <h3 className="media-title">{item.title}</h3>
                <div className="media-stats">
                  <div className="rating-badge">
                    <span className="rating-icon">⭐</span>
                    <span className="rating-value">{item.rating}</span>
                  </div>
                  <div className="season-info">
                    {item.type === 'movie' ? item.duration : `${item.seasons} saisons`}
                  </div>
                  <div className={`status-badge ${
                    item.type === 'movie' 
                      ? item.maturityRating.toLowerCase()
                      : item.status.toLowerCase() === 'terminée' ? 'completed' : 'ongoing'
                  }`}>
                    {item.type === 'movie' ? item.maturityRating : item.status}
                  </div>
                </div>
              </div>
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