const express = require('express');
const { body, validationResult } = require('express-validator'); //Input validation
const router = express.Router();
const Job = require('../Models/Job');

// @route   GET /api/jobs
// @desc    Get all jobs
// @access  Public
router.get('/', async (req, res) => {
    try {
        const jobs = await Job.find();
        res.json(jobs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @route   POST /api/jobs
// @desc    Create a new job
// @access  Public
router.post(
    '/',
    [
        body('title').not().isEmpty().withMessage('Title is required'),
        body('company').not().isEmpty().withMessage('company name is required'),
        body('location').not().isEmpty().withMessage('location is required'),
        body('description').not().isEmpty().withMessage('description is required')
    ],

    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, company, location, description } = req.body;

        try {
            const job = new Job ({ title, company, location, description });
            const newJob = await job.save();
            res.status(201).json(newJob);
        } catch(err){
            res.status(400).json({ message: err.message });
        }
    }
   );

// @route   GET /api/jobs/:id
// @desc    Get a single job by ID
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ message: 'Job not found' });
        res.json(job);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @route   PUT /api/jobs/:id
// @desc    Update a job by ID
// @access  Public
router.put('/:id', async (req, res) => {
    try {
        const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedJob) return res.status(404).json({ message: 'Job not found' });

        res.json(updatedJob);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// @route   DELETE /api/jobs/:id
// @desc    Delete a job by ID
// @access  Public
router.delete('/:id', async (req, res) => {
   try{
    const deletedJob = await Job.findByIdAndDelete(req.params.id);
    if(!deletedJob) return res.status(404).json({ message: 'Job not found' });

    res.json({ message: 'Job deleted successfully' });
   } catch (err) {
    res.status(500).json({ message: err.message });
   }
});

module.exports = router;
