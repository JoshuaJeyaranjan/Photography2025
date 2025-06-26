import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Photo.scss';

function Photo({ id, src, alt, title }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const jpgFallback = src.endsWith('.avif') ? src.replace('.avif', '.jpg') : src;

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <Link to={`/photo/${id}`} className={`photo-item ${isLoaded ? 'loaded' : ''}`}>
      <picture>
        <source srcSet={src} type="image/avif" />
        <source srcSet={jpgFallback} type="image/jpeg" />
        <img
          src={jpgFallback}
          alt={alt}
          className="photo-thumbnail"
          onLoad={handleImageLoad}
        />
      </picture>
    </Link>
  );
}

export default Photo;
