import React, { useState, useEffect } from 'react';
import Photo from '../Photo/Photo';
import './Gallery.scss';

function Gallery({ category }) {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Define your backend base URL here
  const API_BASE_URL = 'https://photography2025server.onrender.com/api';

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    // Construct the full API URL with optional category query
    const apiUrl = category
      ? `${API_BASE_URL}/gallery?category=${encodeURIComponent(category)}`
      : `${API_BASE_URL}/gallery`;

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          return response.text().then(text => {
            console.error(`Server responded with non-OK status ${response.status} for ${apiUrl}. Body:`, text);
            throw new Error(`HTTP error! status: ${response.status}, response: ${text.substring(0, 100)}...`);
          });
        }
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.toLowerCase().includes("application/json")) {
          return response.json();
        } else {
          return response.text().then(text => {
            console.error(`Server responded with OK status for ${apiUrl} but non-JSON content-type ('${contentType}'). Body:`, text);
            throw new Error(`Expected JSON from ${apiUrl}, but got ${contentType || 'unknown content type'}. Response: ${text.substring(0,100)}...`);
          });
        }
      })
      .then(data => {
        setImages(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch images for gallery:", err);
        setError(`Could not load images for ${category || 'gallery'}.`);
        setIsLoading(false);
      });
  }, [category]);

  if (isLoading) return <p className="gallery-status">Loading images...</p>;
  if (error) return <p className="gallery-status error">{error}</p>;
  if (images.length === 0) return <p className="gallery-status">No images found{category ? ` in ${category}` : ''}.</p>;

  return (
    <div className="gallery-grid">
      {images.map(image => (
        <Photo
          key={image.id}
          id={image.id}
          src={image.url}
          alt={image.description}
          title={image.title}
        />
      ))}
    </div>
  );
}

export default Gallery;
