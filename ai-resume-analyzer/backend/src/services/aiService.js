const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');
const path = require('path');
const { PDFParse, VerbosityLevel } = require('pdf-parse');
const mammoth = require('mammoth');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

async function extractTextFromPDF(filePath) {
  const buffer = fs.readFileSync(filePath);
  const parser = new PDFParse({ data: buffer, verbosity: VerbosityLevel.ERRORS });
  const result = await parser.getText();
  return result.text;
}

async function extractTextFromDOCX(filePath) {
  const buffer = fs.readFileSync(filePath);
  const result = await mammoth.extractRawText({ buffer });
  return result.value;
}

async function extractText(filePath, mimeType) {
  if (mimeType === 'application/pdf') {
    return await extractTextFromPDF(filePath);
  }
  if (mimeType === 'application/msword' || mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    return await extractTextFromDOCX(filePath);
  }
  throw new Error('Unsupported file type: ' + mimeType);
}

function buildPrompt(resumeText) {
  return `You are an experienced ATS recruiter and senior resume reviewer with over 15 years of experience evaluating thousands of resumes across multiple industries. Your expertise includes ATS compatibility, resume formatting, grammar, keyword optimization, and overall employability assessment.

Analyze the following resume text thoroughly and provide a detailed structured evaluation.

RESUME TEXT:
${resumeText}

Return ONLY valid JSON with the following structure (no markdown, no code fences, no extra text):

{
  "overallScore": <number 0-100>,
  "atsScore": <number 0-100>,
  "grammarScore": <number 0-100>,
  "formattingScore": <number 0-100>,
  "readabilityScore": <number 0-100>,
  "structureScore": <number 0-100>,
  "professionalismScore": <number 0-100>,
  "keywordMatch": <number 0-100>,
  "summary": "<2-3 sentence executive summary of the resume quality>",
  "strengths": ["<strength>", ...],
  "weaknesses": ["<weakness>", ...],
  "keywordsFound": ["<keyword found>", ...],
  "keywordsMissing": ["<missing keyword>", ...],
  "skillsDetected": ["<skill detected>", ...],
  "recommendedSkills": ["<recommended skill>", ...],
  "projectsFeedback": ["<project feedback>", ...],
  "experienceFeedback": ["<experience feedback>", ...],
  "educationFeedback": ["<education feedback>", ...],
  "formattingSuggestions": ["<formatting suggestion>", ...],
  "grammarSuggestions": ["<grammar suggestion>", ...],
  "bulletPointImprovements": ["<bullet point improvement>", ...],
  "recruiterPerspective": "<recruiter perspective>",
  "finalVerdict": "<2-3 sentence final verdict and recommendation>",
  "priorityFixes": ["<priority fix>", ...],
  "aiRewriteSuggestions": ["<AI rewrite suggestion>", ...],
  "improvedResumeTips": ["<improved resume tip>", ...],
  "interviewReadiness": "<interview readiness assessment>"
}

Evaluation criteria:
- ATS compatibility (parsing, headers, sections, keywords)
- Resume formatting and layout (score 0-100)
- Grammar and professional writing quality (score 0-100)
- Readability and structure (score 0-100)
- Professionalism (score 0-100)
- Keyword relevance and density for target roles
- Technical skills depth and relevance
- Soft skills demonstrated
- Missing or incomplete sections
- Resume structure and flow
- Project descriptions and impact
- Work experience presentation
- Education and certifications
- Bullet point quality and impact
- Overall employability and interview readiness
- Provide specific, actionable rewrite suggestions for bullet points`;
}

function isRetryableError(error) {
  if (!error) return false;
  if (error.status === 429 || error.status === 503) return true;
  const message = (error && (error.message || error.statusText || '')).toLowerCase();
  return !!(
    message.includes('quota exceeded') ||
    message.includes('resource_exhausted') ||
    message.includes('rate limit') ||
    message.includes('429') ||
    message.includes('503') ||
    message.includes('service unavailable') ||
    message.includes('high demand')
  );
}

function parseRetryDelay(error) {
  if (error && error.errorDetails && Array.isArray(error.errorDetails)) {
    for (const detail of error.errorDetails) {
      if (detail && detail['@type'] === 'type.googleapis.com/google.rpc.RetryInfo' && detail.retryDelay) {
        const match = String(detail.retryDelay).match(/^(\d+(?:\.\d+)?)s$/);
        if (match) return Math.ceil(parseFloat(match[1]) * 1000);
      }
    }
  }
  return 5000;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function callGeminiWithRetry(prompt) {
  const maxRetries = 3;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite' });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      const cleaned = text
        .replace(/```json\s*/g, '')
        .replace(/```\s*/g, '')
        .trim();

      let analysis;
      try {
        analysis = JSON.parse(cleaned);
      } catch {
        const start = cleaned.indexOf('{');
        const end = cleaned.lastIndexOf('}');
        if (start !== -1 && end !== -1) {
          analysis = JSON.parse(cleaned.slice(start, end + 1));
        } else {
          throw new Error('Failed to parse Gemini response as JSON');
        }
      }

      return {
        overallScore: Math.min(100, Math.max(0, analysis.overallScore || 0)),
        atsScore: Math.min(100, Math.max(0, analysis.atsScore || 0)),
        grammarScore: Math.min(100, Math.max(0, analysis.grammarScore || 0)),
        formattingScore: Math.min(100, Math.max(0, analysis.formattingScore || 0)),
        readabilityScore: Math.min(100, Math.max(0, analysis.readabilityScore || 0)),
        structureScore: Math.min(100, Math.max(0, analysis.structureScore || 0)),
        professionalismScore: Math.min(100, Math.max(0, analysis.professionalismScore || 0)),
        keywordMatch: Math.min(100, Math.max(0, analysis.keywordMatch || 0)),
        summary: analysis.summary || '',
        strengths: Array.isArray(analysis.strengths) ? analysis.strengths : [],
        weaknesses: Array.isArray(analysis.weaknesses) ? analysis.weaknesses : [],
        keywordsFound: Array.isArray(analysis.keywordsFound) ? analysis.keywordsFound : [],
        keywordsMissing: Array.isArray(analysis.keywordsMissing) ? analysis.keywordsMissing : [],
        skillsDetected: Array.isArray(analysis.skillsDetected) ? analysis.skillsDetected : [],
        recommendedSkills: Array.isArray(analysis.recommendedSkills) ? analysis.recommendedSkills : [],
        projectsFeedback: Array.isArray(analysis.projectsFeedback) ? analysis.projectsFeedback : [],
        experienceFeedback: Array.isArray(analysis.experienceFeedback) ? analysis.experienceFeedback : [],
        educationFeedback: Array.isArray(analysis.educationFeedback) ? analysis.educationFeedback : [],
        formattingSuggestions: Array.isArray(analysis.formattingSuggestions) ? analysis.formattingSuggestions : [],
        grammarSuggestions: Array.isArray(analysis.grammarSuggestions) ? analysis.grammarSuggestions : [],
        bulletPointImprovements: Array.isArray(analysis.bulletPointImprovements) ? analysis.bulletPointImprovements : [],
        recruiterPerspective: analysis.recruiterPerspective || '',
        finalVerdict: analysis.finalVerdict || '',
        priorityFixes: Array.isArray(analysis.priorityFixes) ? analysis.priorityFixes : [],
        aiRewriteSuggestions: Array.isArray(analysis.aiRewriteSuggestions) ? analysis.aiRewriteSuggestions : [],
        improvedResumeTips: Array.isArray(analysis.improvedResumeTips) ? analysis.improvedResumeTips : [],
        interviewReadiness: analysis.interviewReadiness || '',
      };
    } catch (error) {
      if (isRetryableError(error) && attempt < maxRetries) {
        const delay = parseRetryDelay(error);
        console.warn(
          `Gemini API quota exceeded. Retrying in ${delay}ms... (attempt ${attempt + 1}/${maxRetries})`
        );
        await sleep(delay);
        continue;
      }
      throw error;
    }
  }
}

async function analyzeResume(filePath, mimeType) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured');
  }

  const extractedText = await extractText(filePath, mimeType);
  if (!extractedText || extractedText.trim().length === 0) {
    throw new Error('No text could be extracted from the resume');
  }

  const prompt = buildPrompt(extractedText);

  try {
    return await callGeminiWithRetry(prompt);
  } catch (error) {
    console.error('AI analysis error:', error);
    if (isRetryableError(error)) {
      const delay = parseRetryDelay(error);
      const seconds = Math.ceil(delay / 1000);
      throw new Error(
        `Gemini API quota exceeded. Please wait ${seconds} seconds and try again.`
      );
    }
    throw error;
  }
}

module.exports = { analyzeResume };
