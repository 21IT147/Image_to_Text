import React, { useState, useEffect, useContext } from 'react';
import './HomeScreen.css';
import { UserIdContext } from '../userIdContext'; 

function HomeScreen() {
  const [images, setImages] = useState([]);
  const { userId } = useContext(UserIdContext); 
  const fetchImages = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/v1/image/all', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId }) // Include userID in the request body
      });

      if (response.ok) {
        const data = await response.json();
        setImages(data.imagesUrls); // Set the fetched images to state
      } else {
        throw new Error('Please Login');
      }
    } catch (error) {
      console.error('Please Login');
    }
  };
  useEffect(() => {

    if (userId) {
      fetchImages(); // Fetch images only if userId is available
    }
  }, [userId]); // Include userId in the dependency array to refetch images when userId changes

  return (
    <div className="home-screen">
      {userId ? (
        <>
          <h2>Images</h2>
          <div className="image-cards">
            {images && images.map((image, index) => (
              <div key={index} className="image-card">
                <img src={image} alt="" className="image" />
                <div className="image-details">
                  <h3>{image.title}</h3>
                  <p>{image.description}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p>Please log in to view images</p>
      )}
    </div>
  );
}

export default HomeScreen;
