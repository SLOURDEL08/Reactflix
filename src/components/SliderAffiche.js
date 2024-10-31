import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const SliderAffiche = ({ items, itemType = 'movie', selectedItemId = null }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentWallpaper, setCurrentWallpaper] = useState(1);
  const sliderRef = useRef(null);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      if (!selectedItemId) { // Ne pas faire défiler automatiquement si un film est sélectionné
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
      }
    }, 6000);

    const wallpaperInterval = setInterval(() => {
      setCurrentWallpaper((prev) => prev === 1 ? 2 : 1);
    }, 3000);

    return () => {
      clearInterval(slideInterval);
      clearInterval(wallpaperInterval);
    };
  }, [items.length, selectedItemId]);

  // Mettre à jour l'index quand un nouveau film est sélectionné
  useEffect(() => {
    if (selectedItemId) {
      const newIndex = items.findIndex(item => item.id === selectedItemId);
      if (newIndex !== -1) {
        setCurrentIndex(newIndex);
      }
    }
  }, [selectedItemId, items]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  return (
    <div className="slider-affiche" ref={sliderRef}>
      {items.map((item, index) => (
        <div
          key={item.id}
          className={`slider-item ${index === currentIndex ? 'active' : ''}`}
          style={{
            backgroundImage: `url(${currentWallpaper === 1 ? item.wallpaper1 : item.wallpaper2})`,
            transition: 'background-image 1s ease-in-out'
          }}
        >
          <div className="slider-content">
            <img
              src={item.titleImage}
              alt={item.title}
              className="slider-title-image"
            />
            <p className='text-limit-3'>{item.description}</p>
            <div className="slider-info">
              <span>
                <img
                  className="notes-icon"
                  alt="icon notes"
                  src="/images/imdb.png"
                />
                {item.rating}
              </span>
              <span>{item.duration || `${item.seasons} saisons`}</span>
            </div>
            <div className="ctn-btns">
              <button className="dyn-btn">
                Lecture
              </button>
              <Link to={`/${itemType}/${item.id}`} className="dyn-btn">
                Détails
              </Link>
            </div>
          </div>
        </div>
      ))}
      <button className="slider-nav prev" onClick={handlePrev}>
        <img src='/images/arrowleft.png' alt='Précédent' className='slid-icon' />
      </button>
      <button className="slider-nav next" onClick={handleNext}>
        <img src='/images/arrowright.png' alt='Suivant' className='slid-icon' />
      </button>
      <div className="slider-dots">
        {items.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};
 export default SliderAffiche;