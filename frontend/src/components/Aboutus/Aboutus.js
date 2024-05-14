import React from 'react';
import './Aboutus.css';

function AboutUs() {
  return (
    <div className="about-us">
  <h2>About Project</h2>
  
  <ul>
    <h4>Myself Keval Sheth</h4>
    <li>This website is about uploading images, which will be uploaded using Cloudinary and stored in MongoDB.</li>
    <li>You need to login or signup, and then you can see the image upload option on the navbar.</li>
    <li>You can upload images, but there is an issue. Due to re-rendering, you might get logged out. If this happens, please log in again to see your images on the screen.</li>
    <li>You can also view your uploaded images on the home screen after logging in.</li>
    <li>You can view your name, email, and the number of images uploaded by you on the profile screen.</li>
    <li>You can also logout from the profile screen.</li>
  </ul>
</div>

  );
}

export default AboutUs;
