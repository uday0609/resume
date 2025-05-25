const express = require('express');
const { body, validationResult } = require('express-validator');
const JobModel = require('../modules/jobModel');  // ✅ Ensure correct path
const router = express.Router();

router.post('/create', [
  body('jobTitle').notEmpty().withMessage('Job title is required'),
  body('jobDescription').notEmpty().withMessage('Job description is required'),
  body('requiredSkills').isArray({ min: 1 }).withMessage('Required skills must be a non-empty array'),
  body('experience').notEmpty().withMessage('Experience is required'),
  body('companyName').notEmpty().withMessage('Company name is required'),
  body('jobLocation').notEmpty().withMessage('Job location is required'),
  body('jobType').notEmpty().withMessage('Job Type is required'),
  body('applicationDeadline').notEmpty().withMessage('Application deadline is required'),
  body('numberOfOpenings').notEmpty().withMessage('Number of openings is required'),
  body('maxApplications').notEmpty().withMessage('Maximum application field is required')  
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
    jobLocation,
    jobType,
    applicationDeadline,
    numberOfOpenings,
    maxApplications
  } = req.body;

  try {
    const job = await JobModel.createJob(
      jobTitle,
      jobDescription,
      requiredSkills,
      experience,
      companyName,
      jobLocation,
      jobType,
      applicationDeadline,
      numberOfOpenings,
      maxApplications
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
    const job = await JobModel.getJobById(job_id);
    if (!job) return res.status(404).json({ error: 'Job not found' });
    res.status(200).json(job);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching job.', details: err.message });
  }
});

// Update a job description
router.put('/:job_id', [

  // ✅ Validation Rules
  body('job_title').notEmpty().withMessage('Job title is required'),
  body('job_description').notEmpty().withMessage('Job description is required'),
  body('required_skills').notEmpty().withMessage('Required skills are required'),
  body('experience_required').optional().isInt().withMessage('Experience must be an integer'),
  body('company_name').notEmpty().withMessage('Company name is required'),
  body('location').notEmpty().withMessage('Location is required'),
  body('job_type').isArray({ min: 1 }).withMessage('Job Type must be an array with at least one type'),
  body('deadline').optional().isISO8601().withMessage('Deadline must be a valid date'),
  body('openings').notEmpty().isInt().withMessage('Number of openings must be an integer'),
  body('max_applications').notEmpty().isInt().withMessage('Maximum applications must be an integer')

], async (req, res) => {
  console.log("✅ Received PUT /jobs/:job_id");
  console.log("📦 req.body:", req.body);

  // ✅ Check validation result
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(err => err.msg);
    return res.status(400).json({ error: 'Validation Failed', messages: errorMessages });
  }

  // ✅ Extract params and body
  const { job_id } = req.params;
  const {
    job_title,
    job_description,
    required_skills,
    experience_required,
    company_name,
    location,
    job_type,            // Must be an array
    deadline,            // This is optional ISO date
    openings,
    max_applications     // ✅ Fixed this name
  } = req.body;

  // ✅ Debug incoming request
  console.log("🟡 Incoming Job Update Request:");
  console.log("Params job_id:", job_id);
  console.log("Body:", req.body);

  try {
    const updatedJob = await JobModel.updateJob(
      job_id,
      job_title,
      job_description,
      required_skills,
      experience_required,
      company_name,
      location,
      job_type,
      deadline,              // ✅ passed directly
      openings,
      max_applications       // ✅ now correct
    );

    if (!updatedJob) {
      console.warn("⚠️ Job not found or no fields changed in DB");
      return res.status(404).json({ error: 'Job not found or no updates applied' });
    }

    console.log("✅ Job updated in DB:", updatedJob);

    res.status(200).json({
      message: "Job Updated Successfully",
      job: updatedJob
    });

  } catch (err) {
    console.error("❌ Error updating job:", err);
    res.status(500).json({
      error: 'Error updating job description.',
      details: err.message
    });
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