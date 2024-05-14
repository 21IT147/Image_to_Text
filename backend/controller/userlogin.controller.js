import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  console.log(email,password)

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare the plain-text password with the hashed password stored in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log(isPasswordValid)
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, 'KEVAL_SHETH', { expiresIn: '30d' });

    res.status(200).json({ userId: user._id, token });
  } catch (error) {
    console.error("Error in userLogin controller:", error);
    res.status(500).json({ message: "Failed to login" });
  }
};

export default userLogin;
