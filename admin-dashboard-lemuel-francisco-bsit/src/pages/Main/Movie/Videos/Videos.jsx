import React, { useState } from 'react';
import './Videos.css';

const Videos = () => {
  // Initial list of videos
  const [videos, setVideos] = useState([
    { id: 1, title: 'Avengers: Infinity War (2018)', url: 'https://www.themoviedb.org/movie/299536-avengers-infinity-war/videos?active_nav_item=Clips#play=PARfU2Vi694' },
    { id: 2, title: 'Avengers: Endgame (2019)', url: 'https://www.themoviedb.org/movie/299534-avengers-endgame/videos?active_nav_item=Clips#play=9QbltzIUV6w' },
    { id: 3, title: 'DEADPOOL & WOLVERINE (2024)', url: 'https://www.youtube.com/watch?v=aL2OrIqoGoM' },
    { id: 4, title: 'DeadPool 2', url: 'https://www.youtube.com/watch?v=juubuGyLn30' },
    { id: 5, title: 'Venom: The Last Dance', url: 'https://www.youtube.com/watch?v=WMycZO7SK6s' },
    { id: 6, title: 'Gladiator II', url: 'https://www.youtube.com/watch?v=4rgYUipGJNo' },
    { id: 7, title: 'The Dark Knight (2008)', url: 'https://www.themoviedb.org/movie/155-the-dark-knight/videos?active_nav_item=Clips#play=O4Ytmpb-ReQ' },
    { id: 8, title: 'The Forever Purge (2021)', url: 'https://www.themoviedb.org/movie/602223-the-forever-purge/videos?active_nav_item=Clips#play=Vp_B68vYp1M' },
    { id: 9, title: 'Dune', url: 'https://www.themoviedb.org/movie/438631-dune/videos?active_nav_item=Clips#play=xWByujyT2rI' },
    { id: 10, title: 'Soul', url: 'https://www.youtube.com/watch?v=npMVQr8gdaQ' },

  ]);

  // State for handling new video input fields
  const [newVideo, setNewVideo] = useState({ title: '', url: '' });

  // State for editing a video
  const [editMode, setEditMode] = useState(false);
  const [editVideo, setEditVideo] = useState({ id: null, title: '', url: '' });

  // Handle creating a new video
  const handleCreate = (e) => {
    e.preventDefault();
    if (newVideo.title && newVideo.url) {
      const newVideoItem = { ...newVideo, id: Date.now() }; // Generate a unique ID
      setVideos([...videos, newVideoItem]);
      setNewVideo({ title: '', url: '' }); // Clear the input fields after adding
    }
  };

  // Handle deleting a video
  const handleDelete = (id) => {
    setVideos(videos.filter((video) => video.id !== id));
  };

  // Handle editing a video
  const handleEdit = (video) => {
    setEditMode(true);
    setEditVideo(video);
  };

  // Handle updating a video
  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedVideos = videos.map((video) =>
      video.id === editVideo.id ? { ...editVideo } : video
    );
    setVideos(updatedVideos);
    setEditMode(false);
    setEditVideo({ id: null, title: '', url: '' });
  };

  // Handle input change for new video and edit video
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editMode) {
      setEditVideo({ ...editVideo, [name]: value });
    } else {
      setNewVideo({ ...newVideo, [name]: value });
    }
  };

  return (
    <div className="videos-container">
      <h1>Videos CRUD</h1>

      {/* Create New Video */}
      {!editMode && (
        <form onSubmit={handleCreate}>
          <input
            type="text"
            name="title"
            placeholder="Enter video title"
            value={newVideo.title}
            onChange={handleInputChange}
            required
          />
          <input
            type="url"
            name="url"
            placeholder="Enter video URL"
            value={newVideo.url}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Add Video</button>
        </form>
      )}

      {/* Edit Video */}
      {editMode && (
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            name="title"
            placeholder="Edit video title"
            value={editVideo.title}
            onChange={handleInputChange}
            required
          />
          <input
            type="url"
            name="url"
            placeholder="Edit video URL"
            value={editVideo.url}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Update Video</button>
        </form>
      )}

      {/* Video List */}
      <div className="video-list">
        {videos.map((video) => (
          <div key={video.id} className="video-item">
            <h2>{video.title}</h2>
            <a href={video.url} target="_blank" rel="noopener noreferrer">
              Watch Now
            </a>
            <button onClick={() => handleEdit(video)}>Edit</button>
            <button onClick={() => handleDelete(video.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Videos;
