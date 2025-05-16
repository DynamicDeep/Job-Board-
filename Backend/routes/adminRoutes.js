const express = require('express');
const router = express.Router();
const User = require('../Models/User');

const verifyToken = require('../middleware/auth');
const authorizeRoles = require('../middleware/authorizeRoles');

// @route GET /api/admin/users
// @desc Get all registered users (excluding passwords)
// @access Admin only
router.get('/users', verifyToken, authorizeRoles('admin'), async (req, res) => {
  try {
    const users = await User.find().select('-password'); // hide passwords
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch users' });
  }
});

// @route PUT /api/admin/promote/:id
// @desc Promote a user to admin
// @access Admin only
router.put('/promote/:id', verifyToken, authorizeRoles('admin'), async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role: 'admin' },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ message: 'User promoted to admin', user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route PUT /api/admin/users/:id
// @desc Admin update user details
// @access Admin only
router.put('/users/:id', verifyToken, authorizeRoles('admin'), async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        contact: req.body.contact,
        location: req.body.location,
      },
      { new: true }
    );

    if (!updatedUser) return res.status(404).json({ message: 'User not found' });

    res.json({ message: 'User updated successfully', user: updatedUser });
  } catch (err) {
    console.error('Admin user update error:', err);
    res.status(500).json({ message: 'Failed to update user' });
  }
});

// @route delete /api/admin/users/:id
// @desc Admin can delete Users
// @access Admin only
router.delete('/users/:id', verifyToken, authorizeRoles('admin'), async (req, res) => {
  try {
    const deleteUser = await User.findByIdAndDelete(req.params.id);
  if (!deleteUser) return res.status(404).json({ message: 'User not found'});

  res.json({ message: 'User deleted successfully', user: deleteUser });
  } catch (err) {
    console.error('Admin user delete error:', err);
    res.status(500).json({ message: 'Failed to delete user'});
  }
})

// @route PUT /api/admin/users/:id
// @desc Admin can Verify Employers
// @access Admin only
router.put('/verify-employer/:id', verifyToken, authorizeRoles('admin'), async(req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found'});

    if(user.role !== 'employer') {
      return res.status(400).json({ message: 'Only employers can be verified' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { isVerified: req.body.isVerified },
      { new: true, runValidators: true }
    )

    res.json(updatedUser);
  } catch (err) {
    console.error('Employer verification error:', err);
    res.status(500).json({ message: 'Failed to update verification status' });
  }
});

module.exports = router;