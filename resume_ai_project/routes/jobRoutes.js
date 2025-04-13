const express = require('express');
const { body, validationResult } = require('express-validator');
const JobModel = require('../modules/jobModel');  // ✅ Ensure correct path
const router = express.Router();

router.post('/create', [
  body('jobTitle').notEmpty().withMessage('Job title is required'),
  body('jobDescription').notEmpty().withMessage('Job description is required'),
  body('requiredSkills').notEmpty().withMessage('Required skills are required'),
  body('experience').notEmpty().withMessage('Experience required is required'),
  body('companyName').notEmpty().withMessage('Company name is required'),
  body('jobLocation').notEmpty().withMessage('Job location is required')
], async (req, res) => {
  console.log("REQ.BODY:", req.body);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(err => err.msg);
    return res.status(400).json({ error: 'Validation Failed', messages: errorMessages });
  }

  const {
    jobTitle,
    jobDescription,
    requiredSkills,
    experience,
    companyName,
    jobLocation
  } = req.body;

  try {
    const job = await JobModel.createJob(
      jobTitle,
      jobDescription,
      requiredSkills,
      experience,
      companyName,
      jobLocation
    );
    res.status(201).json(job);
  } catch (err) {
    console.error("Error in /create route:", err);
    res.status(500).json({ error: 'Error creating job description.', details: err.message });
  }
});

// Get all jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await JobModel.getJobDescriptions();
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching jobs.', details: err.message });
  }
});

// Get a single job description
router.get('/:job_id', async (req, res) => {
  const { job_id } = req.params;
  try {
    const job = await JobModel.getJob(job_id);
    if (!job) return res.status(404).json({ error: 'Job not found' });
    res.status(200).json(job);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching job.', details: err.message });
  }
});

// Update a job description
router.put('/:job_id', [
  body('job_title').notEmpty().withMessage('Job title is required'),
  body('job_description').notEmpty().withMessage('Job description is required'),
  body('required_skills').notEmpty().withMessage('Required skills are required'),
  body('experience_required').notEmpty().withMessage('Experience required is required'),
  body('company_name').notEmpty().withMessage('Company name is required'),
  body('location').notEmpty().withMessage('Location is required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(err => err.msg);
    return res.status(400).json({ error: 'Validation Failed', messages: errorMessages });
  }

  const { job_id } = req.params;
  const { job_title, job_description, required_skills, experience_required, company_name, location } = req.body;
  try {
    const job = await JobModel.updateJob(
      job_id,
      job_title,
      job_description,
      required_skills,
      experience_required,
      company_name,
      location
    );
    if (!job) return res.status(404).json({ error: 'Job not found' });
    res.status(200).json(job);
  } catch (err) {
    res.status(500).json({ error: 'Error updating job description.', details: err.message });
  }
});

// Delete a job description
router.delete('/:job_id', async (req, res) => {
  const { job_id } = req.params;
  try {
    const result = await JobModel.deleteJob(job_id);
    if (result.rowCount === 0) return res.status(404).json({ error: 'Job not found' });
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: 'Error deleting job description.', details: err.message });
  }
});

module.exports = router;