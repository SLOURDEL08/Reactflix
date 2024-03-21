import React, { useState, useEffect } from "react";
import "../App.css";
import VideoPlayer from "../components/VideoPlayer";
import data from "../data.json";

const Home = () => {
  const [selectedFilm, setSelectedFilm] = useState(data.films[0]); // Initialiser avec le premier film
  const [filmsByCategory, setFilmsByCategory] = useState({}); // Initialiser un objet pour stocker les films par catégorie

  useEffect(() => {
    // Mettre à jour le film sélectionné lors du montage du composant
    setSelectedFilm(data.films[0]);

    // Regrouper les films par catégorie
    const groupedFilms = {};
    data.categories.forEach((category) => {
      groupedFilms[category] = data.films.filter((film) =>
        film.categories.includes(category)
      );
    });
    setFilmsByCategory(groupedFilms);
  }, []); // Déclencher une seule fois au montage

  const handleFilmClick = (film) => {
    setSelectedFilm(film);
  };

  return (
    <div className="Homepage">
      <div className="top-screen">
        {selectedFilm && (
          <div className="details-product">
            <img
              src="/images/N-series.png"
              alt="icon netflix creation"
              className="netflix-badges"
            />
            <img
              src={selectedFilm.imageTitle}
              alt={selectedFilm.title}
              className="film-title"
            />
            <div className="notes">
              <div>
                <img
                  className="notes-icon"
                  alt="icon notes"
                  src="/images/imdb.png"
                />
                <span>{selectedFilm.rating}</span>
              </div>
              <div>
                <span>
                  <b className="viewbold">{selectedFilm.views}</b> de visionnage
                </span>
              </div>
            </div>
            <div className="ctn-btns">
              <button>Play</button>
              <button>Détails</button>
            </div>
          </div>
        )}
        <div className="video-overlay">
          {selectedFilm && <VideoPlayer src={selectedFilm.videoSrc} />}
        </div>
      </div>
      <div className="bot-screen">
        {Object.keys(filmsByCategory).map((category) => (
          <div className="category-films" key={category}>
            <h1>{category}</h1>
            <div key={category} className="carousel-category">
              {filmsByCategory[category].map((film) => (
                <img
                  key={film.id}
                  className={`carousel-items ${
                    film === selectedFilm ? "active" : ""
                  }`}
                  alt={film.title}
                  src={film.imageFlyer}
                  onClick={() => handleFilmClick(film)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
