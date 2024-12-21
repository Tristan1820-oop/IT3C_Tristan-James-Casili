import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './CastandCrew.css';
import { useUserContext } from '../../../../context/UserContext';

const CastandCrew = () => {
  const { movieId } = useParams();
  const { userId, accessToken } = useUserContext();

  const [media, setMedia] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    imageUrl: '',
    nameText: '',
    characterName: '',
  });
  const [imagePreview, setImagePreview] = useState('');
  const [currentMediaId, setCurrentMediaId] = useState(null);

  const tmdbApiKey = '497329e67f904395b79592a3c245314b';

  const fetchMedia = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`/media/${movieId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json',
        },
      });
      setMedia(response.data || []);
    } catch (error) {
      console.error('Error fetching media:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const importImagesFromTMDb = async () => {
    if (!window.confirm('Do you want to import images from TMDb?')) return;

    const tmdbUrl = `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${tmdbApiKey}`;
    try {
      setIsLoading(true);
      const { data } = await axios.get(tmdbUrl);
      const posters = data.posters || [];

      if (posters.length === 0) {
        alert('No images found on TMDb for this movie.');
        return;
      }

      const imagesToImport = posters.map((poster) => ({
        movieId,
        userId,
        url: `https://image.tmdb.org/t/p/w500${poster.file_path}`,
        description: 'Imported from TMDb',
      }));

      await Promise.all(
        imagesToImport.map((image) =>
          axios.post('/media', image, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
          })
        )
      );

      alert('Images imported successfully.');
      fetchMedia();
    } catch (error) {
      console.error('Error importing images:', error);
      alert('Failed to import images.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { imageUrl, nameText, characterName } = formData;
    if (!imageUrl || !characterName) {
      alert('Please fill in all required fields.');
      return;
    }

    const mediaData = { userId, movieId, nameText, url: imageUrl, characterName };
    try {
      const url = isEditing ? `/media/${currentMediaId}` : '/media';
      const method = isEditing ? 'patch' : 'post';

      await axios({
        method,
        url,
        data: mediaData,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      alert(isEditing ? 'Media updated successfully.' : 'Media added successfully.');
      fetchMedia();
      resetForm();
    } catch (error) {
      console.error('Error saving media:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleEdit = (id) => {
    const mediaItem = media.find((item) => item.id === id);
    if (mediaItem) {
      setCurrentMediaId(id);
      setFormData({
        imageUrl: mediaItem.url,
        nameText: mediaItem.nameText || '',
        characterName: mediaItem.characterName || '',
      });
      setIsEditing(true);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this media?')) return;

    try {
      await axios.delete(`/media/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      alert('Media deleted successfully.');
      fetchMedia();
    } catch (error) {
      console.error('Error deleting media:', error);
      alert('Failed to delete media.');
    }
  };

  const resetForm = () => {
    setCurrentMediaId(null);
    setFormData({ imageUrl: '', nameText: '', characterName: '' });
    setIsEditing(false);
  };

  useEffect(() => {
    fetchMedia();
  }, [movieId]);

  useEffect(() => {
    setImagePreview(formData.imageUrl.startsWith('http') ? formData.imageUrl : '');
  }, [formData.imageUrl]);

  return (
    <div className="cast-and-crew">
      <h1>Cast and Crew</h1>
      {isLoading ? <p>Loading...</p> : null}

      <div className="media-list">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {media.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.description}</td>
                <td>
                  <button onClick={() => handleEdit(item.id)}>Edit</button>
                  <button onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="media-form">
        <h2>{isEditing ? 'Edit Media' : 'Add Media'}</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Image URL:</label>
            <input
              type="text"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={formData.nameText}
              onChange={(e) => setFormData({ ...formData, nameText: e.target.value })}
            />
          </div>
          <div>
            <label>Character Name:</label>
            <input
              type="text"
              value={formData.characterName}
              onChange={(e) => setFormData({ ...formData, characterName: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Preview:</label>
            <img
              src={imagePreview || 'https://via.placeholder.com/200x300?text=No+Image'}
              alt="Preview"
            />
          </div>
          <div>
            <button type="submit">{isEditing ? 'Update' : 'Add'}</button>
            {isEditing && <button type="button" onClick={resetForm}>Cancel</button>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CastandCrew;
