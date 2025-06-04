import React, { useState, useEffect } from 'react';
import Photo from '../Photo/Photo';
import './Gallery.scss';

function Gallery({ category }) {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    // Construct the API URL, optionally with a category
    const apiUrl = category ? `/api/gallery?category=${category}` : '/api/gallery';

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) { // Check if response is not OK
          // If not OK, consume response as text to see what was returned
          return response.text().then(text => {
            console.error("Server responded with non-JSON:", text);
            throw new Error(`HTTP error! status: ${response.status}, response: ${text.substring(0, 100)}...`);
          });
        }
        return response.json(); // Attempt to parse as JSON only if response.ok
      })
      .then(data => {
        setImages(data);
        setIsLoading(false);
      })
      .catch(err => {
        // The error from response.json() or the custom error above will be caught here
        console.error("Failed to fetch images for gallery:", err);
        setError(`Could not load images for ${category || 'gallery'}.`);
        setIsLoading(false);
      });
  }, [category]); // Re-fetch if the category changes

  if (isLoading) return <p className="gallery-status">Loading images...</p>;
  if (error) return <p className="gallery-status error">{error}</p>;
  if (images.length === 0) return <p className="gallery-status">No images found{category ? ` in ${category}` : ''}.</p>;

  return (
    <div className="gallery-grid">
      {images.map(image => (
        <Photo key={image.id} id={image.id} src={image.url} alt={image.description} title={image.title} />
      ))}
    </div>
  );
}
export default Gallery;