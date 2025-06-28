import React, { useState, useEffect } from 'react';
import Photo from '../Photo/Photo';
import './Gallery.scss';

function Gallery({ category }) {
  const [sourceImages, setSourceImages] = useState([]); // Holds full API response
  const [loadedImages, setLoadedImages] = useState([]); // Tracks images that finish preloading
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = 'https://photography-docker.onrender.com/api';
  const BUCKET_BASE_URL = 'https://media.joshuajeyphotography.com';

  useEffect(() => {
    const fetchImages = async () => {
      setIsLoading(true);
      setError(null);
      setSourceImages([]);
      setLoadedImages([]);

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
        setSourceImages(data);

        if (data.length === 0) {
          setIsLoading(false);
          return;
        }

        // Preload JPEG versions of each image
        data.forEach(imageInfo => {
          const img = new Image();
          img.src = `${BUCKET_BASE_URL}/${imageInfo.folder}/${imageInfo.filename}.jpg`;

          img.onload = () => {
            setLoadedImages(prev => {
              if (!prev.some(loaded => loaded.id === imageInfo.id)) {
                return [...prev, imageInfo];
              }
              return prev;
            });
          };

          img.onerror = () => {
            console.error(`Failed to preload image: ${img.src}`);
          };
        });

        setIsLoading(false);
      } catch (err) {
        console.error('Failed to fetch gallery images:', err);
        setError(`Could not load images${category ? ` for "${category}"` : ''}.`);
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [category]);

  if (isLoading) {
    return (
      <div className="gallery-loader-container">
        <p className="gallery-status">Loading images...</p>
      </div>
    );
  }

  if (error) {
    return <p className="gallery-status error">{error}</p>;
  }

  if (sourceImages.length === 0) {
    return <p className="gallery-status">No images found{category ? ` in "${category}"` : ''}.</p>;
  }

  return (
    <div className="gallery-grid loaded">
      {loadedImages.map(image => (
        <Photo
          key={image.id}
          id={image.id}
          filename={image.filename}
          folder={image.folder}
          alt={image.description || image.filename || `Photo ${image.id}`}
          title={image.title || ''}
        />
      ))}
    </div>
  );
}

export default Gallery;