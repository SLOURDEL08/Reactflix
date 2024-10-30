import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../App.css";
import VideoPlayer from "../components/VideoPlayer";
import data from "../data.json";

const SerieDetails = () => {
  const { id } = useParams();
  const serie = data.series.find((serie) => serie.id === parseInt(id));
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("resume");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  if (!serie) {
    return <div>La série demandée n'existe pas.</div>;
  }

  // Filtrer les séries de la même catégorie que la série actuellement sélectionnée
  const seriesSameCategory = data.series.filter(
    (item) =>
      item.id !== serie.id && item.categories.includes(serie.categories[0])
  );

  const handleSerieClick = (selectedSerie) => {
    // Rediriger vers la page de détails de la série sélectionnée
    navigate(`/serie/${selectedSerie.id}`);
  };

  return (
    <div className="MovieDetails-page">
      <div className="player-section">
        <VideoPlayer
          src={serie.videoSrc}
          autoplay={true}
          loop={true}
          muted={true}
          showOverlay={true}
          title={serie.title}
          description={serie.description}
        />
      </div>
      <div className="details-section">
        <div className="top-detailssection">
          <div className="top-detailssection-img">
            <img src={serie.imageTitle} alt={serie.title} />
            <span>{serie.releaseYear} | {serie.seasons} saisons | {serie.ageRating}</span>
          </div>
          <div className="notes-details">
            <div className="imb-note">
              <img
                className="icon-detailnote"
                alt="icon notes"
                src="/images/imdb.png"
              />
              <p>{serie.rating}</p>
            </div>
            <div className="imb-note">
              <p>
                + de <b className="viewbold">{serie.views}</b> visionnage
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
                  <p>{serie.description}</p>

                  <div className="resume-champ">
                    <span>Acteurs</span>
                    <span>{serie.acteurs.join(", ")}</span>
                  </div>
                  <div className="resume-champ">
                    <span>Créateur</span>
                    <span>{serie.realisateur}</span>
                  </div>
                </div>
              )}

              {activeTab === "episodes" && (
                <div>
                  <p>
                    Liste des épisodes à implémenter.
                  </p>

                  <div className="resume-champ">
                    <span>Saisons :</span>
                    <span>{serie.seasons}</span>
                  </div>
                  <div className="resume-champ">
                    <span>Épisodes :</span>
                    <span>Nombre total d'épisodes à ajouter</span>
                  </div>
                </div>
              )}

              {activeTab === "voirplus" && (
                <div>
                  <p>
                    Informations supplémentaires sur la série {serie.title}.
                  </p>

                  <div className="resume-champ">
                    <span>Genre :</span>
                    <span>{serie.categories.join(", ")}</span>
                  </div>
                  <div className="resume-champ">
                    <span>Année de sortie :</span>
                    <span>{serie.releaseYear}</span>
                  </div>
                </div>
              )}
            </div>
            <div className="category-films">
              <h1>Séries de la même catégorie</h1>
              <div className="carousel-category">
                {seriesSameCategory.map((serie) => (
                  <div
                    key={serie.id}
                    className="film-container"
                    onClick={() => handleSerieClick(serie)}
                  >
                    <img
                      className="carousel-items moviepage"
                      alt={serie.title}
                      src={serie.imageFlyer}
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

export default SerieDetails;