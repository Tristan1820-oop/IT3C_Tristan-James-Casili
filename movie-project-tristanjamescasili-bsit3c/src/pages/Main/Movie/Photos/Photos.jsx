import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Photos.css";
import { useUserContext } from "../../../../context/UserContext";

const Photos = () => {
  const { movieId } = useParams();
  const { userId, accessToken } = useUserContext();
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState({
    url: "",
    description: "",
    photoPreview: "",
    editing: false,
    editPhotoId: null,
  });

  const tmdbApiKey = "497329e67f904395b79592a3c245314b";

  const fetchPhotos = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/photos/${movieId}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setPhotos(response.data || []);
    } catch (err) {
      console.error("Error fetching images:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleImport = async () => {
    if (!window.confirm("Are you sure you want to import images from TMDB?")) return;
    const tmdbEndpoint = `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${tmdbApiKey}`;

    try {
      setLoading(true);
      const response = await axios.get(tmdbEndpoint);
      const tmdbImages = response.data.posters || [];

      if (tmdbImages.length === 0) {
        alert("No images found on TMDB.");
        return;
      }

      const imagePayloads = tmdbImages.map((image) => ({
        movieId,
        userId,
        url: `https://image.tmdb.org/t/p/w500${image.file_path}`,
        description: "No description available",
      }));

      await Promise.all(
        imagePayloads.map((payload) =>
          axios.post("/photos", payload, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          })
        )
      );

      alert("Images imported successfully.");
      fetchPhotos();
    } catch (err) {
      console.error("Error importing images:", err);
      alert("Failed to import images from TMDB.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { url, description, editing, editPhotoId } = formState;

    if (!url || !description) return;
    const payload = { userId, movieId, url, description };

    try {
      if (editing) {
        await axios.patch(`/photos/${editPhotoId}`, payload, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });
        alert("Photo updated.");
      } else {
        await axios.post("/photos", payload, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });
        alert("New photo added.");
      }
      resetForm();
      fetchPhotos();
    } catch (error) {
      console.error("Error saving photo:", error);
      alert("Failed to save photo.");
    }
  };

  const handleEdit = (id) => {
    const photo = photos.find((photo) => photo.id === id);
    if (photo) {
      setFormState({
        ...formState,
        url: photo.url,
        description: photo.description,
        photoPreview: photo.url,
        editing: true,
        editPhotoId: id,
      });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this photo?")) return;

    try {
      await axios.delete(`/photos/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      alert("Photo deleted successfully.");
      fetchPhotos();
    } catch (error) {
      console.error("Error deleting photo:", error);
      alert("Failed to delete photo.");
    }
  };

  const resetForm = () => {
    setFormState({
      url: "",
      description: "",
      photoPreview: "",
      editing: false,
      editPhotoId: null,
    });
  };

  useEffect(() => {
    if (movieId) fetchPhotos();
  }, [movieId]);

  useEffect(() => {
    const { url } = formState;
    if (url) {
      setFormState((prev) => ({
        ...prev,
        photoPreview: url.startsWith("http") ? url : URL.createObjectURL(url),
      }));
    }
  }, [formState.url]);

  const { url, description, photoPreview, editing } = formState;

  return (
    <div className="photos">
      <h1>Photos</h1>

      <button onClick={handleImport} disabled={loading}>
        Import from TMDB
      </button>

      <div className="horizontal-container">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="photo-list-container">
            {photos.length > 0 ? (
              <table className="photo-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {photos.map((photo) => (
                    <tr key={photo.id}>
                      <td>{photo.id}</td>
                      <td>{photo.description}</td>
                      <td>
                        <button onClick={() => handleEdit(photo.id)}>Edit</button>
                        <button onClick={() => handleDelete(photo.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No photos available.</p>
            )}
          </div>
        )}

        <div className="photo-form-container">
          <h2>{editing ? "Edit Photo" : "Add Photo"}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Image Preview:</label>
              <img
                src={photoPreview || "https://via.placeholder.com/200x300"}
                alt="Preview"
                className="image-preview"
              />
            </div>
            <div className="form-group">
              <label>Image URL:</label>
              <input
                type="text"
                value={url}
                onChange={(e) => setFormState({ ...formState, url: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Description:</label>
              <input
                type="text"
                value={description}
                onChange={(e) =>
                  setFormState({ ...formState, description: e.target.value })
                }
                required
              />
            </div>
            <button type="submit">{editing ? "Update" : "Add"} Photo</button>
            {editing && <button onClick={resetForm}>Cancel</button>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Photos;
