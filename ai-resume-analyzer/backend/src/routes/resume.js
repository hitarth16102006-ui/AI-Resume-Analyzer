const express = require('express');
const router = express.Router();
const resumeController = require('../controllers/resumeController');
const authenticate = require('../middleware/auth');
const upload = require('../middleware/upload');
const { resumeIdValidation } = require('../validators/resume');

router.use(authenticate);

router.post('/upload', upload.single('resume'), resumeController.uploadResume);
router.post('/:id/analyze', resumeIdValidation, resumeController.analyzeResume);
router.get('/', resumeController.getResumes);
router.get('/:id', resumeIdValidation, resumeController.getResume);
router.delete('/:id', resumeIdValidation, resumeController.deleteResume);

module.exports = router;
