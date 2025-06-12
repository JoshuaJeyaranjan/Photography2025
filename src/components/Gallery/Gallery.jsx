import React, { useState, useEffect } from 'react';
import Photo from '../Photo/Photo';
import './Gallery.scss';

function Gallery({ category }) {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = 'https://photography2025server.onrender.com/api';

  useEffect(() => {
    const fetchImages = async () => {
      setIsLoading(true);
      setError(null);

      const apiUrl = category
        ? `${API_BASE_URL}/gallery?category=${encodeURIComponent(category)}`
        : `${API_BASE_URL}/gallery`;

      try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
          const errorText = await response.text();
          console.error(`Error fetching from ${apiUrl}:`, errorText);
          throw new Error(`HTTP ${response.status}: ${errorText}`);
        }

        const contentType = response.headers.get('content-type') || '';
        if (!contentType.includes('application/json')) {
          const text = await response.text();
          throw new Error(`Expected JSON, got ${contentType}: ${text}`);
        }

        const data = await response.json();
        setImages(data);
      } catch (err) {
        console.error('Failed to fetch gallery images:', err);
        setError(`Could not load images${category ? ` for "${category}"` : ''}.`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [category]);

  if (isLoading) return <p className="gallery-status">Loading images...</p>;
  if (error) return <p className="gallery-status error">{error}</p>;
  if (images.length === 0) return <p className="gallery-status">No images found{category ? ` in "${category}"` : ''}.</p>;

  return (
    <div className="gallery-grid">
      {images.map(image => (
        <Photo
          key={image.id}
          id={image.id}
          src={image.url}
          alt={image.description || image.filename || `Photo ${image.id}`}
          title={image.title || ''}
        />
      ))}
    </div>
  );
}

export default Gallery;
