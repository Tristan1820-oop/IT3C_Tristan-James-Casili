import React from "react";
import './Photos.css';

const Photos = ({ photos }) => {
  return (
    <div className="photos-container">
      {photos.map((photo, index) => (
        <div key={index} className="photo-card">
          <img 
            src={photo.url} 
            alt={`Photo ${index + 1}`} 
            className="photo-image"
          />
        </div>
      ))}
    </div>
  );
};

// Example usage:
const photoData = [
  {
    url: "https://image.tmdb.org/t/p/original/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
  },
  {
    url: "https://image.tmdb.org/t/p/original/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
  },
  {
    url: "https://image.tmdb.org/t/p/original/to0spRl1CMDvyUbOnbb4fTk3VAd.jpg",
  },
  {
    url: "https://image.tmdb.org/t/p/original/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
  },
  {
    url: "https://image.tmdb.org/t/p/original/aosm8NMQ3UyoBVpSxyimorCQykC.jpg",
  },
  {
    url: "https://image.tmdb.org/t/p/original/2cxhvwyEwRlysAmRH4iodkvo0z5.jpg",
  },
  {
    url: "https://image.tmdb.org/t/p/original/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
  },
  {
    url: "https://image.tmdb.org/t/p/original/lB068qa6bQ0QKYKyC2xnYGvYjl7.jpg",
  },{
    url: "https://image.tmdb.org/t/p/original/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
  },{
    url: "https://image.tmdb.org/t/p/original/hm58Jw4Lw8OIeECIq5qyPYhAeRJ.jpg",
  },
];

export default function App() {
  return (
    <div>
      <h1>Photos</h1>
      <Photos photos={photoData} />
    </div>
  );
}
