const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const Job = require('../Models/Job');
const User = require('../Models/User');
const verifyToken = require('../middleware/auth');
const authorizeRoles = require('../middleware/authorizeRoles');

// ─── GET All Jobs with Optional Filters ───────────────────────────────
router.get('/', async (req, res) => {
  const { title, company, location } = req.query;

  let filter = {};
  if (title) filter.title = { $regex: title, $options: 'i' };
  if (company) filter.company = { $regex: company, $options: 'i' };
  if (location) filter.location = { $regex: location, $options: 'i' };

  try {
    const jobs = await Job.find(filter);
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ─── POST Create Job (Only Verified Employers) ────────────────────────
router.post(
  '/',
  verifyToken,
  authorizeRoles('employer'),
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('company').not().isEmpty().withMessage('Company name is required'),
    body('location').not().isEmpty().withMessage('Location is required'),
    body('description').not().isEmpty().withMessage('Description is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const employer = await User.findById(req.user.userId);

      if (!employer || employer.role !== 'employer') {
        return res.status(403).json({ message: 'Unauthorized: Only employers can post jobs.' });
      }

      if (!employer.isVerified) {
        return res.status(403).json({ message: 'Your account must be verified by the admin to post jobs.' });
      }

      const { title, company, location, description } = req.body;

      const job = new Job({
        title,
        company,
        location,
        description,
        createdBy: req.user.userId,
      });

      const newJob = await job.save();
      res.status(201).json(newJob);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
);

// ─── GET Jobs Created by Logged-In Employer ────────────────────────────
router.get('/employer/my-jobs', verifyToken, authorizeRoles('employer'), async (req, res) => {
  try {
    const jobs = await Job.find({ createdBy: req.user.userId });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: 'Server error while fetching employer jobs' });
  }
});

// ─── GET Single Job by ID ─────────────────────────────────────────────
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ─── PUT Update Job (Employer) ──────────────────────────────────────
router.put('/:id', verifyToken, authorizeRoles('admin', 'employer'), async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    // Check if user is allowed to update this job
    if (
      req.user.role === 'employer' &&
      job.createdBy.toString() !== req.user.userId
    ) {
      return res.status(403).json({ message: 'Not authorized to update this job' });
    }

    // Admin can update any job, employer can only update their own
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(updatedJob);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// ─── DELETE Job (Admin Only) ──────────────────────────────────────────
router.delete('/:id', verifyToken, authorizeRoles('admin'), async (req, res) => {
  try {
    const deletedJob = await Job.findByIdAndDelete(req.params.id);
    if (!deletedJob) return res.status(404).json({ message: 'Job not found' });

    res.json({ message: 'Job deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
