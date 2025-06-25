import React, { useEffect } from 'react';
import './ImageModal.scss';

function ImageModal({ src, alt, onClose }) {
  // Effect to handle the Escape key for closing the modal
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!src) return null;

  return (
    <div className="image-modal-overlay" onClick={onClose}>
      <button className="image-modal-close" onClick={onClose} aria-label="Close image view">&times;</button>
      <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
        <img src={src} alt={alt} className="image-modal-image" />
      </div>
    </div>
  );
}

export default ImageModal;

