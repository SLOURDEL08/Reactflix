import React, { useState } from "react";
import "../App.css";

const VideoPlayer = ({
  src,
  autoplay,
  loop,
  muted,
  showOverlay,
  title,
  description,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
    const video = document.getElementById("video");
    video.play();
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.mozRequestFullScreen) {
      /* Firefox */
      video.mozRequestFullScreen();
    } else if (video.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) {
      /* IE/Edge */
      video.msRequestFullscreen();
    }
  };

  return (
    <div className="video-container" onClick={() => setIsPlaying(true)}>
      <video
        id="video"
        src={src}
        autoPlay={autoplay}
        loop={loop}
        muted={muted}
        onClick={(e) => e.stopPropagation()}
      />
      {showOverlay && !isPlaying && (
        <div className="overlay">
          <button className="play-button" onClick={handlePlay}>
            <img src="/images/playvideo.png" alt="Play" />
          </button>
          <div className="description-overlay">
            <span>Résumé</span>
            <span>{title}</span> {/* Utilisation du titre dynamique ici */}
            <p className="desc-filmoverlay">{description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
