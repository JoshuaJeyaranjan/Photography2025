import React, { useState } from 'react';
import './AdminDashboard.scss';
import Nav from '../../components/Nav/Nav';

function AdminDashboard() {
  const [aboutContent, setAboutContent] = useState({
    expertise: 'As an experienced portrait photographer, I specialize in capturing the essence of individuals through both creative and classic approaches. My work combines technical excellence with artistic vision to create portraits that tell unique stories.',
    creativeVision: 'I embrace unorthodox and creative approaches to portrait photography, pushing boundaries while maintaining professional quality. Whether you\'re looking for something avant-garde or a timeless classic portrait, I bring your vision to life with attention to detail and artistic flair.',
    impact: 'Beyond photography, I\'m committed to making a positive difference in our community. 10% of all profits from my photography services are donated to homeless charities in Toronto, supporting those in need while pursuing my passion for capturing beautiful moments.'
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleTextChange = (section, value) => {
    setAboutContent(prev => ({
      ...prev,
      [section]: value
    }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    // TODO: Implement save functionality with backend
    console.log('Saving content:', aboutContent);
    console.log('Selected image:', selectedImage);
  };

  return (
    <div className="admin-dashboard">
      <Nav />
      <div className="admin-content">
        <h1>Admin Dashboard</h1>
        
        <section className="admin-section">
          <h2>About Page Content</h2>
          
          <div className="form-group">
            <label>Portrait Photography Expertise</label>
            <textarea
              value={aboutContent.expertise}
              onChange={(e) => handleTextChange('expertise', e.target.value)}
              rows="4"
            />
          </div>

          <div className="form-group">
            <label>Creative Vision</label>
            <textarea
              value={aboutContent.creativeVision}
              onChange={(e) => handleTextChange('creativeVision', e.target.value)}
              rows="4"
            />
          </div>

          <div className="form-group">
            <label>Making an Impact</label>
            <textarea
              value={aboutContent.impact}
              onChange={(e) => handleTextChange('impact', e.target.value)}
              rows="4"
            />
          </div>
        </section>

        <section className="admin-section">
          <h2>Profile Image</h2>
          <div className="image-upload-container">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="image-upload-input"
            />
            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview} alt="Preview" />
              </div>
            )}
          </div>
        </section>

        <button className="save-button" onClick={handleSave}>
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default AdminDashboard;