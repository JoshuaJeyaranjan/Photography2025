// src/components/Gallery.js (or wherever your component lives)
import React, { useState, useEffect } from 'react';
import './Gallery.scss'; // Assuming you have some CSS for styling

const Gallery = ({ category }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      setError(null);
      try {
        // Construct the API URL. If no category is provided, it fetches all images.
        // Your backend /api/gallery already handles the category query parameter.
        const apiUrl = category
          ? `http://localhost:3001/api/gallery?category=${encodeURIComponent(category)}`
          : 'http://localhost:3001/api/gallery';

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setImages(data);
      } catch (e) {
        console.error("Failed to fetch images:", e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [category]); // Re-run the effect if the category prop changes

  if (loading) {
    return <p>Loading images...</p>;
  }

  if (error) {
    return <p>Error loading images: {error}</p>;
  }

  if (images.length === 0) {
    return <p>No images found for {category || 'this gallery'}.</p>;
  }

  return (
    <div className="gallery-container">
      <h1>{category ? `${category.charAt(0).toUpperCase() + category.slice(1)} Photography` : 'Gallery'}</h1>
      <div className="image-grid">
        {images.map((image) => (
          <div key={image.id} className="image-item">
            <img src={`http://localhost:3001${image.url}`} alt={image.title || 'Gallery image'} />
            <div className="image-info">
              <h3>{image.title || 'Untitled'}</h3>
              {image.description && <p>{image.description}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
