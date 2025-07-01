import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Photo.scss';

const baseUrl = "https://media.joshuajeyphotography.com";

function Photo({ id, filename, folder, alt, title }) {
  const [isLoaded, setIsLoaded] = useState(false);

  const avifSrc = `${baseUrl}/${folder}/${filename}.avif`;
  const webpSrc = `${baseUrl}/${folder}/${filename}.webp`;
  const jpgSrc = `${baseUrl}/${folder}/${filename}.jpg`;

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  useEffect(() => {
    console.log(`Rendering: ${jpgSrc}`);
  }, []);

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
          onLoad={handleImageLoad}
        />
      </picture>
    </Link>
  );
}

export default Photo;