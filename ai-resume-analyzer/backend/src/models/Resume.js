const mongoose = require('mongoose');

const analysisSchema = new mongoose.Schema({
  overallScore: { type: Number, default: 0 },
  atsScore: { type: Number, default: 0 },
  grammarScore: { type: Number, default: 0 },
  formattingScore: { type: Number, default: 0 },
  readabilityScore: { type: Number, default: 0 },
  structureScore: { type: Number, default: 0 },
  professionalismScore: { type: Number, default: 0 },
  keywordMatch: { type: Number, default: 0 },
  summary: { type: String, default: '' },
  strengths: [{ type: String }],
  weaknesses: [{ type: String }],
  keywordsFound: [{ type: String }],
  keywordsMissing: [{ type: String }],
  skillsDetected: [{ type: String }],
  recommendedSkills: [{ type: String }],
  projectsFeedback: [{ type: String }],
  experienceFeedback: [{ type: String }],
  educationFeedback: [{ type: String }],
  formattingSuggestions: [{ type: String }],
  grammarSuggestions: [{ type: String }],
  bulletPointImprovements: [{ type: String }],
  recruiterPerspective: { type: String, default: '' },
  finalVerdict: { type: String, default: '' },
  priorityFixes: [{ type: String }],
  aiRewriteSuggestions: [{ type: String }],
  improvedResumeTips: [{ type: String }],
  interviewReadiness: { type: String, default: '' },
}, { _id: false });

const resumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  originalName: {
    type: String,
    required: true,
  },
  filename: {
    type: String,
    required: true,
  },
  filePath: {
    type: String,
    required: true,
  },
  fileSize: {
    type: Number,
    required: true,
  },
  mimeType: {
    type: String,
    required: true,
  },
  analysis: {
    type: analysisSchema,
    default: null,
  },
  status: {
    type: String,
    enum: ['pending', 'analyzing', 'completed', 'failed'],
    default: 'pending',
  },
}, {
  timestamps: true,
});

resumeSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('Resume', resumeSchema);
