import cloudinary from 'cloudinary';
import User from '../models/user.model.js';

cloudinary.config({ 
  cloud_name: 'dz9zkvh79', 
  api_key: '743423828677518', 
  api_secret: 'LbOz_tzEuiFiqlkrvj8MNIfoyQY' 
});

const imageUpload = async (req, res, next) => {
  try {
    const imageFile = req.file;
    const userId = req.body.userId; 
    // Check if image file is provided
    if (!imageFile) {
      return res.status(400).json({ message: "Image file not provided" });
    }

    // Upload the image to Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(imageFile.path);
    if (!cloudinaryResponse || !cloudinaryResponse.url) {
      return res.status(500).json({ message: "Failed to upload image to Cloudinary" });
    }

    const imageUrl = cloudinaryResponse.url;

    // Find the user by userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    // Add the image URL to the user's images array
    user.images.push(imageUrl);
    await user.save();

    // Respond with success message and image URL
    res.status(200).json({ imageUrl, message: "Image uploaded successfully" });
  } catch (error) {
    console.error("Error uploading image:", error);
    return res.status(500).json({ message: "Failed to upload image" });
  }
};

export default imageUpload;
