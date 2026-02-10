import { useState, useEffect } from 'react';
import Photo from '../Photo/Photo';
import './Gallery.scss';

function Gallery({ category }) {
  const [sourceImages, setSourceImages] = useState([]); 
  const [loadedImages, setLoadedImages] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = 'https://photography-docker.onrender.com/api';

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
          throw new Error(`HTTP ${response.status}: ${errorText}`);
        }

        const contentType = response.headers.get('content-type') || '';
        if (!contentType.includes('application/json')) {
          const text = await response.text();
          throw new Error(`Expected JSON, got ${contentType}: ${text}`);
        }

        const data = await response.json();
        setSourceImages(data);
      } catch (err) {
        console.error('Failed to fetch gallery images:', err);
        setError(`Could not load images${category ? ` for "${category}"` : ''}.`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [category]);

  
const handleImageLoaded = (imageData) => {
  setLoadedImages(prev => {
    if (prev.find(img => img.id === imageData.id)) return prev; // avoid duplicates
    return [...prev, imageData];
  });
};

  if (isLoading) {
    return (
      <div className="gallery-loader-container">
        <p className="gallery-status">Loading images...</p>
      </div>
    );
  }

  if (error) return <p className="gallery-status error">{error}</p>;
  if (sourceImages.length === 0) return <p className="gallery-status">No images found{category ? ` in "${category}"` : ''}.</p>;

  return (
    <div className="gallery-grid loaded">
      {loadedImages.map(image => (
        <Photo
          key={image.id}
          {...image}
          onLoaded={() => handleImageLoaded(image)}
        />
      ))}

      {/* Render placeholders for remaining images */}
      {sourceImages
        .filter(img => !loadedImages.includes(img))
        .map(img => (
          <Photo key={img.id} {...img} onLoaded={() => handleImageLoaded(img)} />
        ))}
    </div>
  );
}

export default Gallery;
