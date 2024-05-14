import React, { useState, useEffect, useContext } from 'react';
import "./ImageUpload.css";
import { UserIdContext } from '../userIdContext'; // Import UserIdContext

function ImageUpload() {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [userImages, setUserImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { userId } = useContext(UserIdContext); // Access userId from UserIdContext

  const fetchUserImages = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/v1/image/all', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId }) 
      });

      if (response.ok) {
        const data = await response.json();
        setUserImages(data.imagesUrls);
        setLoading(false);
      } else {
        // throw new Error('Please Login again');
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserImages();
  }, [userId]); // Fetch images when userId changes

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(selectedImage);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleImageUpload = async () => {
    try {
      if (!image) {
        console.error('No image selected');
        return;
      }
      const formData = new FormData();
      formData.append('image', image);
      formData.append('userId', userId);
      const response = await fetch('http://localhost:5000/api/v1/image/upload', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        console.log('Image uploaded successfully');
        fetchUserImages();
        setImage(null);
        setPreviewUrl(null);
      } else {
        throw new Error('Image upload failed');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div className="image-upload-container">
      <form className="image-upload-form">
        <div className="file-input-container">
          <input 
            type="file" 
            className="hidden-input" 
            onChange={handleImageChange} 
          />
          <button 
            className="image-upload-input"
            onClick={(e) => e.target.previousSibling.click()}
          >
            Choose Image
          </button>
          {previewUrl && (
            <div className="image-preview-container">
              <img src={previewUrl} alt="Preview" className="image-preview" />
            </div>
          )}
        </div>
        <button 
          className="image-upload-button" 
          onClick={handleImageUpload}
        >
          Upload Image
        </button>
      </form>
      {loading && <p>Please Login again</p>}
      {error && <p>Error: {error}</p>}
      <div className="user-images-container">
        {userImages && userImages.map((imageUrl, index) => (
          <div key={index} className="image-card">
            <img src={imageUrl} alt={`Image ${index}`} className="image" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageUpload;
