import User from '../models/user.model.js';

const getImagesUrls = async (req, res) => {
  try {
    const userId = req.body.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const imagesUrls = user.images;
    res.status(200).json({ imagesUrls });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export default getImagesUrls;
