import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import VideoPlayer from './VideoPlayer';
import { db } from '../firebase/config';
import { collection, query, where, getDocs } from 'firebase/firestore';

const ContentDetails = () => {
  const { type, slug } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState(null);
  const [similarContent, setSimilarContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('resume');

  // Récupérer le contenu spécifique
useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      try {
        const collectionName = type === 'movie' ? 'movies' : 'series';
        
        // D'abord, chercher le document par son slug
        const q = query(
          collection(db, collectionName),
          where('slug', '==', slug)
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          // Prendre le premier document correspondant au slug
          const docData = querySnapshot.docs[0];
          const contentData = { id: docData.id, ...docData.data() };
          setContent(contentData);

          // Récupérer le contenu similaire
          if (contentData.genres && contentData.genres.length > 0) {
            const similarQuery = query(
              collection(db, collectionName),
              where('genres', 'array-contains', contentData.genres[0]),
              where('slug', '!=', slug) // Exclure le contenu actuel
            );
            const similarSnap = await getDocs(similarQuery);
            const similarData = similarSnap.docs
              .map(doc => ({ id: doc.id, ...doc.data() }))
              .slice(0, 6);
            setSimilarContent(similarData);
          }
        } else {
          setError('Contenu non trouvé');
        }
      } catch (err) {
        setError(`Erreur lors du chargement : ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchContent();
    }
  }, [slug, type]);

  const handleSimilarClick = (item) => {
    if (item && item.type && item.slug) {
      navigate(`/${item.type}/${item.slug}`);
      window.scrollTo(0, 0);
    }
  };

  // Helper pour afficher la durée/période
  const getDurationInfo = () => {
    if (!content) return '';

    if (content.type === 'movie') {
      const year = content.releaseDate ? new Date(content.releaseDate).getFullYear() : '';
      return `${year} | ${content.duration || ''} | ${content.maturityRating || ''}`;
    }
    
    const status = content.endYear ? ` - ${content.endYear}` : ' - En cours';
    return `${content.startYear || ''}${status} | ${content.seasons || 0} saisons | ${content.maturityRating || ''}`;
  };

  // Helper pour le status
  const getStatusClass = () => {
    if (!content?.type || !content?.status) return '';

    if (content.type === 'movie') {
      return content.maturityRating ? content.maturityRating.toLowerCase() : '';
    }
    return content.status?.toLowerCase() === 'terminée' ? 'completed' : 'ongoing';
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">Chargement...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  if (!content) {
    return <div className="error-message">Contenu non trouvé.</div>;
  }

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