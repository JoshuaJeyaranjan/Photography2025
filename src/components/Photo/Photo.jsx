import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Photo.scss';

const baseUrl = "https://media.joshuajeyphotography.com";

export default function Photo({ id, filename, folder, alt, title, onLoaded }) {
  const [isLoaded, setIsLoaded] = useState(false);

  const avifSrc = `${baseUrl}/${folder}/${filename}.avif`;
  const webpSrc = `${baseUrl}/${folder}/${filename}.webp`;
  const jpgSrc = `${baseUrl}/${folder}/${filename}.jpg`;

  const handleImageLoad = (event) => {
    // Only call onLoaded once when the <img> actually loads
    if (!isLoaded) {
      setIsLoaded(true);
      onLoaded?.({ id, filename, folder, alt, title });
    }
  };

  return (
    <Link to={`/photo/${id}`} className={`photo-item ${isLoaded ? 'loaded' : ''}`}>
      <picture>
        <source srcSet={avifSrc} type="image/avif" />
        <source srcSet={webpSrc} type="image/webp" />
        <img
          src={jpgSrc}
          alt={alt}
          className="photo-thumbnail"
          loading="lazy"
          decoding="async"
          onLoad={handleImageLoad}
        />
      </picture>
    </Link>
  );
}
