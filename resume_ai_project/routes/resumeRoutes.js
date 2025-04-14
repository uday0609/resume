const express = require('express');
const { body, param, validationResult } = require('express-validator');
const ResumeModel = require('../modules/resumeModel');

const router = express.Router();

// Utility to handle async errors
const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

// Centralized validation error handler
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
};

// Validation middleware for resumes
const validateResumes = [
  body('resumes').isArray().withMessage('At least one resume must be provided'),
  body('resumes.*.name').trim().notEmpty().withMessage('Candidate name is required'),
  body('resumes.*.email').trim().isEmail().withMessage('Valid email is required'),
  body('resumes.*.contact_number').trim().notEmpty().withMessage('Contact number is required'),
  body('resumes.*.skills').isArray().withMessage('Skills must be an array'),
  body('resumes.*.experience').trim().notEmpty().withMessage('Experience field is required'),
  body('resumes.*.job_id').isInt().withMessage('Job ID must be a number'),
  body('resumes.*.matching_score').isNumeric().withMessage('Matching Score must be a number'),
];

// Validation middleware for ID
const validateId = [
  param('id').isInt().withMessage('Invalid resume ID format.'),
];

// ✅ Create a new resume
router.post('/post',
  [
    (req, res, next) => {
      console.log('Received Body:', JSON.stringify(req.body, null, 2));
      next();
    },
    ...validateResumes,
    handleValidationErrors,
  ],
  asyncHandler(async (req, res) => {
    const selectedResumes = req.body.resumes;

    const savedResumes = [];
    for (const resume of selectedResumes) {
      const savedResume = await ResumeModel.saveSelectedResume(resume);
      savedResumes.push(savedResume);
    }
    res.status(201).json({ success: true, message: 'Selected resumes saved successfully.', resumes: savedResumes });
  })
);

// ✅ Get all resumes
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const resumes = await ResumeModel.getAllResumes();
    res.status(200).json({ success: true, data: resumes });
  })
);

// ✅ Get resume by ID
router.get(
  '/:id',
  validateId,
  handleValidationErrors,
  asyncHandler(async (req, res) => {
    const resumeId = req.params.id;
    const resume = await ResumeModel.getResumeById(resumeId);
    if (resume) {
      res.status(200).json({ success: true, data: resume });
    } else {
      res.status(404).json({ success: false, error: 'Resume not found.' });
    }
  })
);

// ✅ Update resume
router.put(
  '/update/:id',
  [
    ...validateId,
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('content').trim().notEmpty().withMessage('Content is required'),
    handleValidationErrors,
  ],
  asyncHandler(async (req, res) => {
    const resumeId = req.params.id;
    const updatedResume = await ResumeModel.updateResume(resumeId, req.body);
    if (!updatedResume) {
      return res.status(404).json({ success: false, error: 'Resume not found for update.' });
    }
    res.status(200).json({ success: true, message: 'Resume updated successfully.', resume: updatedResume });
  })
);

// ✅ Delete resume
router.delete(
  '/delete/:id',
  validateId,
  handleValidationErrors,
  asyncHandler(async (req, res) => {
    const resumeId = req.params.id;
    const deletedResume = await ResumeModel.deleteResume(resumeId);
    if (!deletedResume) {
      return res.status(404).json({ success: false, error: 'Resume not found.' });
    }
    res.status(200).json({ success: true, message: 'Resume deleted successfully.' });
  })
);

module.exports = router;