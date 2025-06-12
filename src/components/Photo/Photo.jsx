import React from 'react';
import { Link } from 'react-router-dom';
import './Photo.scss'; // We'll create this SCSS file next

function Photo({ id, src, alt, title }) {
  if (!src) {
    return <div className="photo-placeholder">Image not available</div>;
  }
  return (
    <Link to={`/photo/${id}`} className="photo-link">
      <div className="photo-item">
        <img src={src} alt={alt || title || 'Photograph'} loading="lazy" />
        {/* You could add a title overlay here if desired */}
      </div>
    </Link>
  );
}
export default Photo;