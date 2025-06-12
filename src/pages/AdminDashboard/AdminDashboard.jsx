import React, { useState, useEffect } from 'react';
import './AdminDashboard.scss';
import Nav from '../../components/Nav/Nav';
import axios from 'axios';

function AdminDashboard() {
  const [aboutContent, setAboutContent] = useState({
    expertise: '',
    creativeVision: '',
    impact: ''
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [portfolioImages, setPortfolioImages] = useState([]);
  const [draggedImage, setDraggedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saveStatus, setSaveStatus] = useState(null);

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [aboutResponse, portfolioResponse] = await Promise.all([
          axios.get('/api/admin/about'),
          axios.get('/api/admin/portfolio')
        ]);
        
        setAboutContent(aboutResponse.data);
        setPortfolioImages(portfolioResponse.data);
      } catch (err) {
        setError('Failed to load data. Please try again later.');
        console.error('Error fetching data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleTextChange = (section, value) => {
    setAboutContent(prev => ({
      ...prev,
      [section]: value
    }));
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        // Show preview immediately
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);

        // Prepare form data
        const formData = new FormData();
        formData.append('profileImage', file);

        console.log('Uploading profile image:', file.name);

        // Make API request
        const response = await axios.post('/api/admin/profile-image', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        console.log('Profile image upload response:', response.data);

        if (response.data.imagePath) {
          // Update the preview with the actual server path
          setImagePreview(response.data.imagePath);
          setSaveStatus({ type: 'success', message: 'Profile image updated successfully' });
        } else {
          throw new Error('No image path returned from server');
        }
      } catch (err) {
        console.error('Error uploading profile image:', err);
        setSaveStatus({ 
          type: 'error', 
          message: err.response?.data?.error || 'Failed to update profile image. Please try again.' 
        });
        // Reset preview on error
        setImagePreview(null);
      }
    }
  };

  const handlePortfolioImageUpload = async (event) => {
    const files = Array.from(event.target.files);
    
    for (const file of files) {
      try {
        const formData = new FormData();
        formData.append('image', file);
        formData.append('title', file.name.replace(/\.[^/.]+$/, ""));
        formData.append('description', '');

        const response = await axios.post('/api/admin/portfolio', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        setPortfolioImages(prev => [...prev, response.data]);
        setSaveStatus({ type: 'success', message: 'Portfolio image uploaded successfully' });
      } catch (err) {
        setSaveStatus({ type: 'error', message: 'Failed to upload portfolio image' });
        console.error('Error uploading portfolio image:', err);
      }
    }
  };

  const handleDragStart = (e, image) => {
    setDraggedImage(image);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = async (e, targetImage) => {
    e.preventDefault();
    if (draggedImage && targetImage) {
      const newImages = [...portfolioImages];
      const draggedIndex = newImages.findIndex(img => img.id === draggedImage.id);
      const targetIndex = newImages.findIndex(img => img.id === targetImage.id);
      
      newImages.splice(draggedIndex, 1);
      newImages.splice(targetIndex, 0, draggedImage);
      
      setPortfolioImages(newImages);

      try {
        await axios.put('/api/admin/portfolio/reorder', {
          images: newImages.map((img, index) => ({
            id: img.id,
            display_order: index + 1
          }))
        });
        setSaveStatus({ type: 'success', message: 'Portfolio order updated successfully' });
      } catch (err) {
        setSaveStatus({ type: 'error', message: 'Failed to update portfolio order' });
        console.error('Error updating portfolio order:', err);
      }
    }
  };

  const handleImageDelete = async (imageId) => {
    try {
      await axios.delete(`/api/admin/portfolio/${imageId}`);
      setPortfolioImages(prev => prev.filter(img => img.id !== imageId));
      setSaveStatus({ type: 'success', message: 'Portfolio image deleted successfully' });
    } catch (err) {
      setSaveStatus({ type: 'error', message: 'Failed to delete portfolio image' });
      console.error('Error deleting portfolio image:', err);
    }
  };

  const handleImageEdit = async (imageId, field, value) => {
    try {
      const image = portfolioImages.find(img => img.id === imageId);
      const updatedImage = { ...image, [field]: value };
      
      await axios.put(`/api/admin/portfolio/${imageId}`, {
        title: updatedImage.title,
        description: updatedImage.description
      });

      setPortfolioImages(prev => prev.map(img => 
        img.id === imageId ? updatedImage : img
      ));
      setSaveStatus({ type: 'success', message: 'Portfolio image updated successfully' });
    } catch (err) {
      setSaveStatus({ type: 'error', message: 'Failed to update portfolio image' });
      console.error('Error updating portfolio image:', err);
    }
  };

  const handleSave = async () => {
    try {
      await axios.put('/api/admin/about', aboutContent);
      setSaveStatus({ type: 'success', message: 'Changes saved successfully' });
    } catch (err) {
      setSaveStatus({ type: 'error', message: 'Failed to save changes' });
      console.error('Error saving changes:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="admin-dashboard">
        <Nav />
        <div className="admin-content">
          <div className="loading">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-dashboard">
        <Nav />
        <div className="admin-content">
          <div className="error">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <Nav />
      <div className="admin-content">
        <h1>Admin Dashboard</h1>
        
        {saveStatus && (
          <div className={`status-message ${saveStatus.type}`}>
            {saveStatus.message}
          </div>
        )}
        
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
            <div className="upload-instructions">
              <p>Click or drag an image to upload</p>
              <p className="upload-hint">Recommended size: 300x300 pixels</p>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="image-upload-input"
              id="profile-image-upload"
            />
            <label htmlFor="profile-image-upload" className="upload-label">
              Choose Image
            </label>
            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview} alt="Profile Preview" />
                <div className="preview-overlay">
                  <p>Preview</p>
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="admin-section">
          <h2>Portfolio Management</h2>
          <div className="portfolio-upload">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handlePortfolioImageUpload}
              className="image-upload-input"
            />
          </div>
          
          <div className="portfolio-grid">
            {portfolioImages.map((image) => (
              <div
                key={image.id}
                className="portfolio-item"
                draggable
                onDragStart={(e) => handleDragStart(e, image)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, image)}
              >
                <div className="portfolio-image">
                  <img src={image.image_path} alt={image.title} />
                  <button
                    className="delete-button"
                    onClick={() => handleImageDelete(image.id)}
                  >
                    ×
                  </button>
                </div>
                <div className="portfolio-details">
                  <input
                    type="text"
                    value={image.title}
                    onChange={(e) => handleImageEdit(image.id, 'title', e.target.value)}
                    placeholder="Image Title"
                  />
                  <textarea
                    value={image.description}
                    onChange={(e) => handleImageEdit(image.id, 'description', e.target.value)}
                    placeholder="Image Description"
                    rows="2"
                  />
                </div>
              </div>
            ))}
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