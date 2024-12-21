import React from 'react';

const CastCard = ({ name, role, imageUrl, bio }) => {
  return (
    <div className="cast-card">
      <img src={imageUrl} alt={name} className="cast-image" />
      <div className="cast-info">
        <h3 className="cast-name">{name}</h3>
        <p className="cast-role">{role}</p>
        {bio && <p className="cast-bio">{bio}</p>}
      </div>
    </div>
  );
};

export default CastCard;
