import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import VideoPlayer from "../components/VideoPlayer";
import data from "../data.json";

const Home = () => {
  const [selectedFilm, setSelectedFilm] = useState(data.films[0]);
  const [filmsByCategory, setFilmsByCategory] = useState({});

  useEffect(() => {
    setSelectedFilm(data.films[0]);

    const groupedFilms = {};
    data.categories.forEach((category) => {
      groupedFilms[category] = data.films.filter((film) =>
        film.categories.includes(category)
      );
    });
    setFilmsByCategory(groupedFilms);
  }, []);

  const handleFilmClick = (film) => {
    setSelectedFilm(film);
  };

  return (
    <div className="Homepage">
      <div className="top-screen">
        {selectedFilm && (
          <div className="details-product">
            <div className="film-info">
              <img
                src={selectedFilm.imageTitle}
                alt={selectedFilm.title}
                className={`film-title`}
              />
            </div>
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
              <Link className="dyn-btn" to="">
                Play
              </Link>
              <Link className="dyn-btn" to={`/movie/${selectedFilm.id}`}>
                Détails
              </Link>
            </div>
          </div>
        )}
        <div className="video-overlay">
          {selectedFilm && (
            <VideoPlayer
              src={selectedFilm.videoSrc}
              autoplay
              loop
              muted
              showOverlay={false}
            />
          )}
        </div>
      </div>
      <div className="bot-screen">
        {["Action", "Thriller", "Crime"].map((category) => (
          <div className="category-films" key={category}>
            <h1>{category}</h1>
            <div key={category} className="carousel-category">
              {filmsByCategory[category]?.map((film) => (
                <div key={film.id} className="film-container">
                  <img
                    className={`carousel-items ${
                      film === selectedFilm ? "active" : ""
                    }`}
                    alt={film.title}
                    src={film.imageFlyer}
                    onClick={() => handleFilmClick(film)}
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
