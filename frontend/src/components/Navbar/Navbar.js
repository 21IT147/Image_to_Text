import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { UserIdContext } from '../userIdContext';

function Navbar() {
  const { userId } = useContext(UserIdContext); 

  return (
    <nav className="navbar">
      <div className="logo">KS</div>
      <ul className="menu">
      <li><Link to="/about-us" className="nav-link">About-Project</Link></li>
        <li><Link to="/" className="nav-link">Home</Link></li>
        {userId ? ( 
          <>
            <li><Link to="/profile" className="nav-link">Profile</Link></li>
            <li><Link to="/upload" className="nav-link">Image Upload</Link></li>
          </>
        ) : (
          <li><Link to="/login" className="nav-link">Login</Link></li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
