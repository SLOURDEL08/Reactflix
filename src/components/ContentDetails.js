import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useContentData } from '../hooks/useContentData';
import VideoPlayer from './VideoPlayer';

const ContentDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { getBySlug, getByGenre } = useContentData('all');
  const [activeTab, setActiveTab] = useState('resume');

  const content = getBySlug(slug);

  // Vérification de sécurité pour le contenu
  if (!content) {
    return <div className="error-message">Contenu non trouvé.</div>;
  }

  // Vérification de sécurité pour les contenus similaires
  const similarContent = content.genres && content.genres[0] 
    ? getByGenre(content.genres[0])
      .filter(item => item && item.id !== content.id && item.type === content.type)
      .slice(0, 6)
    : [];

  const handleSimilarClick = (item) => {
    if (item && item.type && item.slug) {
      navigate(`/${item.type}/${item.slug}`);
      window.scrollTo(0, 0);
    }
  };

  // Helper pour afficher la durée/période selon le type avec vérification
  const getDurationInfo = () => {
    if (!content.type) return '';

    if (content.type === 'movie') {
      const year = content.releaseDate ? new Date(content.releaseDate).getFullYear() : '';
      return `${year} | ${content.duration || ''} | ${content.maturityRating || ''}`;
    }
    
    const status = content.endYear ? ` - ${content.endYear}` : ' - En cours';
    return `${content.startYear || ''}${status} | ${content.seasons || 0} saisons | ${content.maturityRating || ''}`;
  };

  // Helper pour vérifier si une propriété est valide
  const getStatusClass = () => {
    if (!content.type || !content.status) return '';

    if (content.type === 'movie') {
      return content.maturityRating ? content.maturityRating.toLowerCase() : '';
    }
    return content.status.toLowerCase() === 'terminée' ? 'completed' : 'ongoing';
  };

  return (
    <div className="MovieDetails-page">
      <div className="player-section">
        <VideoPlayer
          src={content.videoSrc || ''}
          autoplay={true}
          loop={true}
          muted={true}
          showOverlay={true}
          title={content.title || ''}
          description={content.description || ''}
        />
      </div>
      <div className="details-section">
        <div className="top-detailssection">
          <div className="top-detailssection-img">
            <img src={content.titleImage} alt={content.title || ''} />
            <span>{getDurationInfo()}</span>
          </div>
          <div className="notes-details">
            <div className="imb-note">
              <img
                className="icon-detailnote"
                alt="icon notes"
                src="/images/imdb.png"
              />
              <p>{content.rating || 'N/A'}</p>
            </div>
            <div className="imb-note">
              <p>
                + de <b className="viewbold">{Math.floor(Math.random() * 1000000)}K</b> visionnages
              </p>
            </div>
          </div>
        </div>
        <div className="mid-details">
          <div className="tabs-details">
            <div className="top-tabs">
              <span
                className={activeTab === "resume" ? "active" : ""}
                onClick={() => setActiveTab("resume")}
              >
                RÉSUMÉ
              </span>
              <span
                className={activeTab === "details" ? "active" : ""}
                onClick={() => setActiveTab("details")}
              >
                DÉTAILS
              </span>
              <span
                className={activeTab === "more" ? "active" : ""}
                onClick={() => setActiveTab("more")}
              >
                PLUS D'INFOS
              </span>
            </div>
            <div className="content-tabs">
              {activeTab === "resume" && (
                <div>
                  <p>{content.description || ''}</p>
                  <div className="resume-champ">
                    <span>Casting</span>
                    <span>{content.cast ? content.cast.join(" | ") : ''}</span>
                  </div>
                  <div className="resume-champ">
                    <span>{content.type === 'movie' ? 'Réalisateur' : 'Créateur'}</span>
                    <span>{content.type === 'movie' ? content.director : content.creator}</span>
                  </div>
                  <div className="resume-champ">
                    <span>Genres</span>
                    <span>{content.genres ? content.genres.join(" | ") : ''}</span>
                  </div>
                </div>
              )}

              {activeTab === "details" && (
                <div>
                  {content.type === 'movie' ? (
                    <>
                      <div className="resume-champ">
                        <span>Production</span>
                        <span>{content.productionCompany || ''}</span>
                      </div>
                      <div className="resume-champ">
                        <span>Date de sortie</span>
                        <span>{content.releaseDate ? new Date(content.releaseDate).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        }) : ''}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="resume-champ">
                        <span>Nombre de saisons</span>
                        <span>{content.seasons || 0}</span>
                      </div>
                      <div className="resume-champ">
                        <span>Épisodes</span>
                        <span>{content.episodes || 0}</span>
                      </div>
                      <div className="resume-champ">
                        <span>Network</span>
                        <span>{content.network || ''}</span>
                      </div>
                      <div className="resume-champ">
                        <span>Statut</span>
                        <span>{content.status || ''}</span>
                      </div>
                    </>
                  )}
                  <div className="resume-champ">
                    <span>Classification</span>
                    <span>{content.maturityRating || ''}</span>
                  </div>
                  <div className="resume-champ">
                    <span>Langue</span>
                    <span>{content.language || ''}</span>
                  </div>
                </div>
              )}

              {activeTab === "more" && (
                <div>
                  <p>Découvrez plus de contenus similaires dans nos catégories {content.genres ? content.genres.join(", ") : ''}.</p>
                  <div className="resume-champ">
                    <span>Note IMDb</span>
                    <span>⭐ {content.rating || 'N/A'}/10</span>
                  </div>
                  <div className="resume-champ">
                    <span>{content.type === 'movie' ? 'Durée' : 'Durée par épisode'}</span>
                    <span>{content.type === 'movie' ? content.duration : content.episodeLength}</span>
                  </div>
                </div>
              )}
            </div>
            
            {similarContent.length > 0 && (
              <div className="similar-content">
                <h2>{content.type === 'movie' ? 'Films similaires' : 'Séries similaires'}</h2>
                <div className="carousel-category">
                  {similarContent.map((item) => item && (
                    <div 
                      key={item.id} 
                      className="content-container"
                      onClick={() => handleSimilarClick(item)}
                    >
                      <img
                        className="carousel-items"
                        alt={item.title || ''}
                        src={item.poster}
                      />
                      <div className="media-info-container">
                        <h3 className="media-title">{item.title || ''}</h3>
                        <div className="media-stats">
                          <div className="rating-badge">
                            <span className="rating-icon">⭐</span>
                            <span className="rating-value">{item.rating || 'N/A'}</span>
                          </div>
                          <div className="season-info">
                            {content.type === 'movie' ? item.duration : `${item.seasons} saisons`}
                          </div>
                          <div className={`status-badge ${getStatusClass()}`}>
                            {content.type === 'movie' ? item.maturityRating : item.status}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentDetails;