import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Photo.scss';
import useAvifSupport from '../../utils/useAvifSupport';

const baseUrl = "https://media.joshuajeyphotography.com";

function Photo({ id, filename, folder, alt, title }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const avifSupported = useAvifSupport();

  const avifSrc = `${baseUrl}/${folder}/${filename}.avif`;
  const webpSrc = `${baseUrl}/${folder}/${filename}.webp`;
  const jpgSrc = `${baseUrl}/${folder}/${filename}.jpg`;

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <Link to={`/photo/${id}`} className={`photo-item ${isLoaded ? 'loaded' : ''}`}>
      {avifSupported ? (
        <picture>
          <source srcSet={avifSrc} type="image/avif" />
          <source srcSet={webpSrc} type="image/webp" />
          <source srcSet={jpgSrc} type="image/jpeg" />
          <img
            src={jpgSrc}
            alt={alt}
            className="photo-thumbnail"
            loading="lazy"
            onLoad={handleImageLoad}
          />
        </picture>
      ) : (
        <img
          src={jpgSrc}
          alt={alt}
          className="photo-thumbnail"
          loading="lazy"
          onLoad={handleImageLoad}
        />
      )}
    </Link>
  );
}

export default Photo;