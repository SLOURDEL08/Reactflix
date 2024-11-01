import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const SliderAffiche = ({ items, itemType = 'movie', selectedItemId = null }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentWallpaper, setCurrentWallpaper] = useState(1);
  const sliderRef = useRef(null);

  // Récupérer l'élément actuellement affiché
  const currentItem = items[currentIndex];

  useEffect(() => {
    const slideInterval = setInterval(() => {
      if (!selectedItemId) {
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

  // Ne rendre que l'élément actuel au lieu de mapper tous les éléments
  return (
    <div className="slider-affiche" ref={sliderRef}>
      <div
        key={currentItem.id}
        className="slider-item active"
        style={{
          backgroundImage: `url(${currentWallpaper === 1 ? currentItem.wallpaper1 : currentItem.wallpaper2})`,
          transition: 'background-image 1s ease-in-out'
        }}
      >
        <div className="slider-content">
          <img
            src={currentItem.titleImage}
            alt={currentItem.title}
            className="slider-title-image"
          />
          <p className='text-limit-3'>{currentItem.description}</p>
          <div className="slider-info">
            <span className="rating-info">
              <img
                className="notes-icon"
                alt="icon notes"
                src="/images/imdb.png"
              />
              {currentItem.rating}
            </span>
            <span className="duration-info">
              {itemType === 'movie' ? currentItem.duration : `${currentItem.seasons} saisons`}
            </span>
          </div>
          <div className="ctn-btns">
            <button className="dyn-btn play-btn">
              <img src="./images/jouer.png" alt="" width={20} height={20}/>
              Lecture
            </button>
            <Link 
              to={`/${itemType}/${currentItem.slug}`} 
              className="dyn-btn details-btn"
              onClick={(e) => {
                e.stopPropagation();
                window.scrollTo(0, 0);
              }}
            >
              <img src="./images/info.png" alt="" width={20} height={20}/>
              Détails
            </Link>
          </div>
        </div>
      </div>

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