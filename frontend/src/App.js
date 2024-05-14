import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import HomeScreen from './components/HomeScreen/HomeScreen';
import UserProfile from './components/UserProfile/UserProfile';
import ImageUpload from './components/ImageUpload/ImageUpload';
import Aboutus from './components/Aboutus/Aboutus';
import { UserIdProvider } from './components/userIdContext';
function App() {
  return (
    <Router>
      <div>
      <UserIdProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about-us" element={<Aboutus />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/upload" element={<ImageUpload />} />
        </Routes>
        </ UserIdProvider>
      </div>
    </Router>
  );
}

export default App;
