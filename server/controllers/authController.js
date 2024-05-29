import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const register = async (req, res) => {
  const { fullName, email, password } = req.body;
  const user = new User({ fullName, email, password });
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ fullName, email, password: hashedPassword });
    await user.save();

    // generate JWT token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

    res.status(201).send("User registered with token ", token);
  } catch (error) {
    res.status(400).send("Error registering user.");
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send("User not found.");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send("Invalid password.");

    // generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).send("Server error.");
  }
};

const authUser = async (req, res) => {
  try {
    const { Authorization } = req.headers;
    const token = Authorization.split(' ')[1];

    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(id);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(200).send('User not found');
    }
  } catch (error) {
    res.status(500).send(`Error during user authentication. ${error.message}`);
  }
}

export {
  register,
  login,
  authUser
};
