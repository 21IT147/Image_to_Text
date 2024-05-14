import React, { useState, useEffect, useContext } from 'react';
import './UserProfile.css';
import { UserIdContext } from '../userIdContext'; 
import { useNavigate } from 'react-router-dom'; 

function UserProfile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userId, updateUserId } = useContext(UserIdContext);
  const navigate = useNavigate(); 
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/v1/user/details', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ userId })
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user details');
        }
        const userData = await response.json();
        setUserData(userData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]); // Include userId in the dependency array to fetch data when userId changes

  const handleLogout = () => {
    // Clear userId from context
    updateUserId(null);
    navigate('/login');
  };

  if (loading) {
    return <p className="loading-message">Loading...</p>;
  }

  if (error) {
    return <p className="error-message">Error: {error}</p>;
  }

  return (
    <div className="user-profile-container">
      <div>
        <h2 className="profile-heading">User Profile</h2>
        <div className="profile-details">
          <p className="detail">Name: {userData.name}</p>
          <p className="detail">Email: {userData.email}</p>
          <p className="detail">Number of Image URLs: {userData.numberOfImages}</p>
        </div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default UserProfile;
