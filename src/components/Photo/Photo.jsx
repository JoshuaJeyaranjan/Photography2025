import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Photo.scss';

const baseUrl = "https://media.joshuajeyphotography.com";

function Photo({ id, filename, folder, alt, title }) {
  const [isLoaded, setIsLoaded] = useState(false);

  const avifSrc = `${baseUrl}/${folder}/${filename}.avif`;
  const jpgSrc = `${baseUrl}/${folder}/${filename}.jpg`;

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <Link to={`/photo/${id}`} className={`photo-item ${isLoaded ? 'loaded' : ''}`}>
      <picture>
        <source srcSet={avifSrc} type="image/avif" />
        <source srcSet={jpgSrc} type="image/jpeg" />
        <source srcSet={`${baseUrl}/${folder}/${filename}.webp`} type="image/webp" />
        <img
        loading='lazy'
          src={jpgSrc}
          alt={alt}
          className="photo-thumbnail"
          onLoad={handleImageLoad}
        />
      </picture>
    </Link>
  );
}

export default Photo;