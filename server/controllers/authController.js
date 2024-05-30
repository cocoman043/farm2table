import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config.js';

const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the email is already in use
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already in use." });
    }

    const user = new User({ name, email, password });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;
    await user.save();

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const id = user.id;
    const userType = user.userType;

    res.status(201).json({ message: "User registered", id, userType, token });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(400).json({ message: "Error registering user.", error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email not found." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password." });
    }

    // generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const id = user.id;
    const userType = user.userType;

    res.status(200).json({ id, userType, token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

const authUser = async (req, res) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).send('Authorization header is missing');
    }

    const token = authorization.split(' ')[1];

    if (!token) {
      return res.status(401).send('Token is missing');
    }

    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(id);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    res.status(500).send(`Error during user authentication. ${error.message}`);
  }
};

export {
  register,
  login,
  authUser
};
