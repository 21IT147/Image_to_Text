import User from '../models/user.model.js';

const getUserDetails = async (req, res) => {
  try {
    // Assuming the user ID is provided in the request body
    const userId = req.body.userId; 
    console.log(userId)
    // Find the user by ID in the database
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Extract required details (name, email, and number of image URLs)
    const userDetails = {
      name: user.name,
      email: user.email,
      numberOfImages: user.images.length
    };

    res.status(200).json(userDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export default getUserDetails;
