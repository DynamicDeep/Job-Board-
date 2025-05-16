const express = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt    = require('jsonwebtoken');
const User   = require('../Models/User');
const verifyToken = require('../middleware/auth');

const router = express.Router();

// 3.1 REGISTER
router.post('/register', [
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 6 }).withMessage('Password ≥ 6 chars'),
  body('contact').notEmpty().withMessage('Contact number is required'),
  body('location').notEmpty().withMessage('Location is required'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) 
    return res.status(400).json({ errors: errors.array() });

  let { firstName, lastName, email, password, contact, location, role } = req.body;

  try {
    // 1) Check if user already exists
    if (await User.findOne({ email })) 
      return res.status(400).json({ message: 'Email already registered' });

    // 2) Validate and sanitize role
    if (!role) role = 'jobseeker'; // default to jobseeker
    if (!['jobseeker', 'employer'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role. Must be jobseeker or employer.' });
    }

    // 3) Hash password and save user
    const hash = await bcrypt.hash(password, 10);
    const user = new User({ firstName, lastName, email, password: hash, contact, location, role });
    await user.save();

    // 4) Issue JWT token with role
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

//  3.2 LOGIN
router.post('/login', [
  body('email').isEmail().withMessage('Valid email required'),
  body('password').exists().withMessage('Password required'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) 
    return res.status(400).json({ errors: errors.array() });

  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !await bcrypt.compare(password, user.password))
      return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// 3.3 GET CURRENT USER
router.get('/me', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update User profile route
router.put('/me', verifyToken, async (req, res) => {
  try{
    const updateFields = (({ firstName, lastName, email, contact, location }) => ({
      firstName,
      lastName,
      email,
      contact,
      location,
    }))(req.body);

    const updatedUser = await User.findByIdAndUpdate(
      req.user.userId,
      updateFields,
      { new: true }
    ).select('-password');

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: 'Error updating user profile' });
  }
});

// 3.4 CHANGE PASSWORD
router.put('/change-password', verifyToken, async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Incorrect current password' });

    const hash = await bcrypt.hash(newPassword, 10);
    user.password = hash;
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});
//

module.exports = router;