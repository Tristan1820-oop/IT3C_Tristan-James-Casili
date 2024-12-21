import React from 'react';

const PhotosCard = ({ imageUrl, title, description }) => {
  return (
    <div className="photos-card">
      <img src={imageUrl} alt={title} className="photos-image" />
      <div className="photos-info">
        <h3 className="photos-title">{title}</h3>
        {description && <p className="photos-description">{description}</p>}
      </div>
    </div>
  );
};

export default PhotosCard;
