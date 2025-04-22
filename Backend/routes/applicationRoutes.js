const express = require('express');
const multer = require('multer');
const path = require('path');
const Application = require('../Models/Application');

const router = express.Router();

// Setup multer storage for CV uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // uploads folder in backend root
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// @route   POST /api/applications/:jobId
// @desc    Submit a job application with CV
// @access  Public
router.post('/:jobId', upload.single('cv'), async (req, res) => {
  const { name, email, coverLetter } = req.body;
  const jobId = req.params.jobId;
  const cvFile = req.file;

  if (!cvFile) {
    return res.status(400).json({ message: 'CV file is required' });
  }

  try {
    const application = new Application({
      jobId,
      name,
      email,
      coverLetter,
      cv: cvFile.path
    });

    const savedApplication = await application.save();
    res.status(201).json(savedApplication);
  } catch (error) {
    console.error('Application submission failed:', error);
    res.status(500).json({ message: 'Server error submitting application' });
  }
});

module.exports = router;
