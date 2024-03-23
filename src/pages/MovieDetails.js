import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../App.css";
import VideoPlayer from "../components/VideoPlayer";
import data from "../data.json";

const MovieDetails = () => {
  const { id } = useParams();
  const film = data.films.find((film) => film.id === parseInt(id));
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("resume");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  if (!film) {
    return <div>Le film demandé n'existe pas.</div>;
  }

  // Filtrer les films de la même catégorie que le film actuellement sélectionné
  const filmsSameCategory = data.films.filter(
    (item) =>
      item.id !== film.id && item.categories.includes(film.categories[0])
  );

  const handleFilmClick = (selectedFilm) => {
    // Rediriger vers la page de détails du film sélectionné
    navigate(`/movie/${selectedFilm.id}`); // Utiliser navigate au lieu de navigate.push
  };

  return (
    <div className="MovieDetails-page">
      <div className="player-section">
        <VideoPlayer
          src={film.videoSrc}
          autoplay={true}
          loop={true}
          muted={true}
          showOverlay={true}
          title={film.title}
          description={film.description} // Passez le titre du film comme prop
        />
      </div>
      <div className="details-section">
        <div className="top-detailssection">
          <div className="top-detailssection-img">
            <img src={film.imageTitle} alt={film.title} />
            <span>2018 | 4 saisons | +18</span>
          </div>
          <div className="notes-details">
            <div className="imb-note">
              <img
                className="icon-detailnote"
                alt="icon notes"
                src="/images/imdb.png"
              />
              <p>{film.rating}</p>
            </div>
            <div className="imb-note">
              <p>
                + de <b className="viewbold">{film.views}</b> visionnage
              </p>
            </div>
          </div>
        </div>
        <div className="mid-details">
          <div className="tabs-details">
            <div className="top-tabs">
              <span
                className={activeTab === "resume" ? "active" : ""}
                onClick={() => handleTabClick("resume")}
              >
                RESUME
              </span>
              <span
                className={activeTab === "episodes" ? "active" : ""}
                onClick={() => handleTabClick("episodes")}
              >
                EPISODES
              </span>
              <span
                className={activeTab === "voirplus" ? "active" : ""}
                onClick={() => handleTabClick("voirplus")}
              >
                VOIR PLUS
              </span>
            </div>
            <div className="content-tabs">
              {activeTab === "resume" && (
                <div>
                  <p>{film.description}</p>

                  <div className="resume-champ">
                    <span>Acteurs</span>
                    <span>{film.acteurs}</span>
                  </div>
                  <div className="resume-champ">
                    <span>Réalisateurs</span>
                    <span>{film.realisateur}</span>
                  </div>
                </div>
              )}

              {activeTab === "episodes" && (
                <div>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Phasellus sed mauris auctor, lacinia mi eget, dictum leo.
                    Vestibulum sed mollis nulla. Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit. Proin maximus sem eget metus
                    sagittis hendrerit.
                  </p>

                  <div className="resume-champ">
                    <span>Acteurs :</span>
                    <span>Millie Boby Brown | Finn Wolfhard</span>
                  </div>
                  <div className="resume-champ">
                    <span>Réalisateurs :</span>
                    <span>Ellie Boby Brown | Finn Wolfhard</span>
                  </div>
                  <div className="resume-champ">
                    <span>Catégories :</span>
                    <span>Millie Boby Brown | Finn Wolfhard</span>
                  </div>
                </div>
              )}

              {activeTab === "voirplus" && (
                <div>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Phasellus sed mauris auctor, lacinia mi eget, dictum leo.
                    Vestibulum sed mollis nulla. Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit. Proin maximus sem eget metus
                    sagittis hendrerit.
                  </p>

                  <div className="resume-champ">
                    <span>Acteurs :</span>
                    <span>Seb Boby Brown | Finn Wolfhard</span>
                  </div>
                  <div className="resume-champ">
                    <span>Réalisateurs :</span>
                    <span>Millie Boby Brown | Finn Wolfhard</span>
                  </div>
                </div>
              )}
            </div>
            <div className="category-films">
              <h1>Films de la même catégorie</h1>
              <div className="carousel-category">
                {filmsSameCategory.map((film) => (
                  <div
                    key={film.id}
                    className="film-container"
                    onClick={() => handleFilmClick(film)}
                  >
                    <img
                      className="carousel-items moviepage"
                      alt={film.title}
                      src={film.imageFlyer}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
