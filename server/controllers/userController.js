// import User from '../models/User.js';

const getUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  res.send(user);
};

const getUsers = async (req, res) => {
  const users = await User.find();
  res.send(users);
};

const postUser = async (req, res) => {
  const newUser = new User(req.body);
  await newUser.save();
  res.send(newUser);
};

const putUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(user);
};

const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.send('User deleted successfully');
};

export {
  getUser,
  getUsers,
  postUser,
  putUser,
  deleteUser,
};