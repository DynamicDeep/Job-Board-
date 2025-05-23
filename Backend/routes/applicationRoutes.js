const express = require('express');
const multer = require('multer');
const path = require('path');
const Application = require('../Models/Application');
const Job = require('../Models/Job');
const verifyToken = require('../middleware/auth');
const authorizeRoles = require('../middleware/authorizeRoles');

const router = express.Router();

// Setup multer storage for CV uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// 1. Submit Job Application (Jobseeker only)
router.post(
  '/:jobId',
  verifyToken,
  authorizeRoles('jobseeker'),
  upload.single('cv'),
  async (req, res) => {
    const { coverLetter } = req.body;
    const jobId = req.params.jobId;
    const cvFile = req.file;

    if (!cvFile) {
      return res.status(400).json({ message: 'CV file is required' });
    }

    try {
      const application = new Application({
        jobId,
        applicantId: req.user.userId,
        coverLetter,
        cv: cvFile.path
      });

      const savedApplication = await application.save();
      res.status(201).json(savedApplication);
    } catch (error) {
      console.error('Application submission failed:', error);
      res.status(500).json({ message: 'Server error submitting application' });
    }
  }
);

//2. Employer: View Applications for a Specific Job
router.get(
  '/by-job/:jobId',
  verifyToken,
  authorizeRoles('employer'),
  async (req, res) => {
    try {
      // Ensure job was created by this employer
      const job = await Job.findById(req.params.jobId);
      if (!job || job.createdBy.toString() !== req.user.userId) {
        return res.status(403).json({ message: 'Not authorized to view these applications' });
      }

      const applications = await Application.find({ jobId: req.params.jobId })
      .populate('applicantId', 'firstName lastName email contact location');
      res.json(applications);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

// 3. Admin: View All Applications
router.get(
  '/all',
  verifyToken,
  authorizeRoles('admin'),
  async (req, res) => {
    try {
      const applications = await Application.find();
      res.json(applications);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

//4. Jobseeker: View Applications by Logged-in User
router.get(
  '/user',
  verifyToken,
  authorizeRoles('jobseeker'),
  async (req, res) => {
    try {
      const applications = await Application.find({ applicantId: req.user.userId }).populate('jobId');
      res.json(applications);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

module.exports = router;
