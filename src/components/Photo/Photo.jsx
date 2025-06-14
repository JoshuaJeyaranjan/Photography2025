import React from 'react';
import { Link } from 'react-router-dom';
import './Photo.scss';

function Photo({ id, src, alt, title }) {
  const jpgFallback = src.endsWith('.avif') ? src.replace('.avif', '.jpg') : src;

  return (
    <Link to={`/photo/${id}`} className="photo-item">
      <picture>
        <source srcSet={src} type="image/avif" />
        <source srcSet={jpgFallback} type="image/jpeg" />
        <img
          src={jpgFallback}
          alt={alt}
          className="photo-thumbnail"
          loading="lazy"
        />
      </picture>
      {title && <div className="photo-title">{title}</div>}
    </Link>
  );
}

export default Photo;
