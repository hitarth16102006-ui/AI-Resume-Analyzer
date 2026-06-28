const Resume = require('../models/Resume');
const AppError = require('../utils/AppError');
const { analyzeResume } = require('../services/aiService');

exports.uploadResume = async (req, res, next) => {
  try {
    if (!req.file) {
      return next(new AppError('Please upload a resume file', 400));
    }

    const resume = await Resume.create({
      userId: req.user._id,
      originalName: req.file.originalname,
      filename: req.file.filename,
      filePath: req.file.path,
      fileSize: req.file.size,
      mimeType: req.file.mimetype,
    });

    res.status(201).json({
      resume: {
        _id: resume._id,
        filename: resume.filename,
        originalName: resume.originalName,
        fileSize: resume.fileSize,
        mimeType: resume.mimeType,
        status: resume.status,
        createdAt: resume.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.analyzeResume = async (req, res, next) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!resume) {
      return next(new AppError('Resume not found', 404));
    }

    resume.status = 'analyzing';
    await resume.save();

    try {
      const analysis = await analyzeResume(resume.filePath, resume.mimeType);

      resume.analysis = {
        overallScore: analysis.overallScore,
        atsScore: analysis.atsScore,
        grammarScore: analysis.grammarScore,
        formattingScore: analysis.formattingScore,
        readabilityScore: analysis.readabilityScore,
        structureScore: analysis.structureScore,
        professionalismScore: analysis.professionalismScore,
        keywordMatch: analysis.keywordMatch,
        summary: analysis.summary,
        strengths: analysis.strengths,
        weaknesses: analysis.weaknesses,
        keywordsFound: analysis.keywordsFound,
        keywordsMissing: analysis.keywordsMissing,
        skillsDetected: analysis.skillsDetected,
        recommendedSkills: analysis.recommendedSkills,
        projectsFeedback: analysis.projectsFeedback,
        experienceFeedback: analysis.experienceFeedback,
        educationFeedback: analysis.educationFeedback,
        formattingSuggestions: analysis.formattingSuggestions,
        grammarSuggestions: analysis.grammarSuggestions,
        bulletPointImprovements: analysis.bulletPointImprovements,
        recruiterPerspective: analysis.recruiterPerspective,
        finalVerdict: analysis.finalVerdict,
        priorityFixes: analysis.priorityFixes,
        aiRewriteSuggestions: analysis.aiRewriteSuggestions,
        improvedResumeTips: analysis.improvedResumeTips,
        interviewReadiness: analysis.interviewReadiness,
      };
      resume.status = 'completed';
      await resume.save();

      res.json({ analysis: resume.analysis });
    } catch (error) {
      resume.status = 'failed';
      await resume.save();
      return next(new AppError(error.message || 'Analysis failed', 500));
    }
  } catch (error) {
    next(error);
  }
};

exports.getResumes = async (req, res, next) => {
  try {
    const resumes = await Resume.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .select('-filePath');

    res.json({ resumes });
  } catch (error) {
    next(error);
  }
};

exports.getResume = async (req, res, next) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id,
    }).select('-filePath');

    if (!resume) {
      return next(new AppError('Resume not found', 404));
    }

    res.json({ resume });
  } catch (error) {
    next(error);
  }
};

exports.deleteResume = async (req, res, next) => {
  try {
    const resume = await Resume.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!resume) {
      return next(new AppError('Resume not found', 404));
    }

    res.json({ message: 'Resume deleted successfully' });
  } catch (error) {
    next(error);
  }
};
