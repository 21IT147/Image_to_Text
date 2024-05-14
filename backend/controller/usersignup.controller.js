import bcrypt from 'bcryptjs'; 
import jwt from 'jsonwebtoken'; 
import User from '../models/user.model.js'; 

const userSignup = async (req, res) => {
  const { name, email, password } = req.body; 
  try {
 
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword });

    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, 'KEVAL_SHETH', { expiresIn: '30d' });

    // Return the token in the response
    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    // If an error occurs, return an error response
    console.error("Error in userSignup controller:", error);
    res.status(500).json({ message: "Failed to register user" });
  }
};

export default userSignup;
