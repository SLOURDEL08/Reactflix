import React from "react";

const VideoPlayer = ({ src }) => {
  return (
    <div className="video-container">
      <video src={src} autoPlay loop muted />
      <div className="overlay"></div>
    </div>
  );
};

export default VideoPlayer;
