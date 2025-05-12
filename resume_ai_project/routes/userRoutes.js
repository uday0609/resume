const express = require('express');
const { body, param, validationResult } = require('express-validator');
const UserModel = require('../modules/userModel');

const router = express.Router();

// Middleware for handling validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// ✅ Create a new user (Signup)
router.post(
  '/signup',
  [
    body('username').trim().notEmpty().withMessage('Username is required'),
    body('email').trim().isEmail().withMessage('Email is invalid'),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long'),
  ],
  handleValidationErrors,
  async (req, res) => {
    const { username, email, password } = req.body;
    try {
      const existingUser = await UserModel.getUserByEmail(email);
      if (existingUser) {
        return res.status(409).json({ error: 'Email is already registered.' });
      }

      const user = await UserModel.registerUser(username, email, password);
      res.status(201).json({ message: 'User registered successfully.', user });
    } catch (err) {
      console.error('Error creating user:', err);
      res.status(500).json({ error: 'Error creating user.', details: err.message });
    }
  }
);

// ✅ Login user
router.post(
  '/login',
  [
    body('email').trim().isEmail().withMessage('Email is invalid'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  handleValidationErrors,
  async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await UserModel.loginUser(email, password);
      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password.' });
      }

      res.status(200).json({ message: 'Login successful.', user });
    } catch (err) {
      console.error('Error logging in user:', err);
      res.status(500).json({ error: 'Error logging in user.', details: err.message });
    }
  }
);

// ✅ Get all users
router.get('/', async (req, res) => {
  try {
    const users = await UserModel.getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Error fetching users.', details: err.message });
  }
});

// ✅ Get user by ID
router.get(
  '/:user_id',
  [param('user_id').isInt().withMessage('Invalid user ID format.')],
  handleValidationErrors,
  async (req, res) => {
    const { user_id } = req.params;
    try {
      const user = await UserModel.getUserById(user_id);
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }
      res.status(200).json(user);
    } catch (err) {
      console.error('Error fetching user:', err);
      res.status(500).json({ error: 'Error fetching user.', details: err.message });
    }
  }
);

// ✅ Update user details
router.put(
  '/:user_id',
  [
    param('user_id').isInt().withMessage('Invalid user ID format.'),
    body('username').trim().notEmpty().withMessage('Username is required'),
    body('email').trim().isEmail().withMessage('Email is invalid'),
  ],
  handleValidationErrors,
  async (req, res) => {
    const { user_id } = req.params;
    const { username, email } = req.body;
    try {
      const updatedUser = await UserModel.updateUser(user_id, username, email);
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found for update.' });
      }
      res.status(200).json({ message: 'User updated successfully.', user: updatedUser });
    } catch (err) {
      console.error('Error updating user:', err);
      res.status(500).json({ error: 'Error updating user.', details: err.message });
    }
  }
);

// ✅ Delete user
router.delete(
  '/:user_id',
  [param('user_id').isInt().withMessage('Invalid user ID format.')],
  handleValidationErrors,
  async (req, res) => {
    const { user_id } = req.params;
    try {
      const deletedUser = await UserModel.deleteUser(user_id);
      if (!deletedUser) {
        return res.status(404).json({ error: 'User not found.' });
      }
      res.status(200).json({ message: 'User deleted successfully.' });
    } catch (err) {
      console.error('Error deleting user:', err);
      res.status(500).json({ error: 'Error deleting user.', details: err.message });
    }
  }
);

module.exports = router;