import React, { useState, useEffect } from 'react';
import Photo from '../Photo/Photo';
import './Gallery.scss';

function Gallery({ category }) {
  const [sourceImages, setSourceImages] = useState([]); // Holds the full list from the API
  const [loadedImages, setLoadedImages] = useState([]); // Holds images as they finish loading
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = 'https://photography-docker.onrender.com/api';

  useEffect(() => {
    const fetchImages = async () => {
      setIsLoading(true);
      setError(null);
      setSourceImages([]); // Reset on category change
      setLoadedImages([]); // Reset on category change

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
        setSourceImages(data); // Store the full list of image data

        if (data.length === 0) {
          setIsLoading(false); // No images to load
          return;
        }

        // Progressively load images and add them to the display list
        data.forEach(imageInfo => {
          const img = new Image();
          img.src = imageInfo.url.replace('.avif', '.jpg'); // Use a common format for preloading
          img.onload = () => {
            // Add the fully loaded image to the state that gets rendered,
            // but only if it's not already present to prevent duplicates.
            setLoadedImages(prev => {
              if (!prev.some(loadedImg => loadedImg.id === imageInfo.id)) {
                return [...prev, imageInfo];
              }
              return prev; // Return the current state if the image is already there
            });
          };
          img.onerror = () => {
            console.error(`Failed to preload image: ${imageInfo.url}`);
          };
        });

        // The main loading is done; visual loading happens as images appear
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
    return <div className="gallery-loader-container"><p className="gallery-status">Loading images...</p></div>;
  }

  if (error) return <p className="gallery-status error">{error}</p>;
  if (sourceImages.length === 0) return <p className="gallery-status">No images found{category ? ` in "${category}"` : ''}.</p>;

  return (
    <div className="gallery-grid loaded">
      {loadedImages.map(image => (
        <Photo
          key={image.id}
          id={image.id}
          src={image.url} // Ensure this is the correct property name from your API
          alt={image.description || image.filename || `Photo ${image.id}`}
          title={image.title || ''}
        />
      ))}
    </div>
  );
}

export default Gallery;
