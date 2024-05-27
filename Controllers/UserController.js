const User = require('../Models/Users.js');

// Get all users
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.query();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

// Get user by ID
exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.query().findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// Create new user
exports.createUser = async (req, res, next) => {
  try {
    const newUser = await User.query().insert(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json({ error: err.message });
    } else {
      next(err);
    }
  }
};

// Update user
exports.updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.query().patchAndFetchById(req.params.id, req.body);
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(updatedUser);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json({ error: err.message });
    } else {
      next(err);
    }
  }
};

// Delete user
exports.deleteUser = async (req, res, next) => {
  try {
    const rowsDeleted = await User.query().deleteById(req.params.id);
    if (rowsDeleted === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};