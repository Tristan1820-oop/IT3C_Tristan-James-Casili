import React from 'react';
import VideosCard from './VideosCard';

const VideoGallery = () => {
  return (
    <div className="video-gallery">
      {videos.map((video, index) => (
        <VideosCard
          key={index}
          title={video.title}
          videoUrl={video.videoUrl}
          description={video.description}
          thumbnailUrl={video.thumbnailUrl}
        />
      ))}
    </div>
  );
};

export default VideoGallery;
