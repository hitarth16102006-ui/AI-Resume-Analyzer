import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FiArrowLeft, FiInfo, FiStar,
  FiTarget, FiBook, FiBriefcase, FiEdit3, FiGrid, FiTrendingUp,
  FiMessageSquare, FiShield, FiFileText, FiDownload, FiShare2,
  FiCopy, FiCheck, FiAlertTriangle, FiAward, FiLayers,
  FiThumbsUp, FiCpu,
} from 'react-icons/fi'
import { resumeApi } from '@services/api'
import ScoreMeter from '@components/ui/ScoreMeter'
import ProgressBar from '@components/ui/ProgressBar'
import Badge from '@components/ui/Badge'
import Button from '@components/ui/Button'
import { formatDate } from '@utils/cn'
import { PolarGrid, PolarAngleAxis, PolarRadiusAxis, RadarChart, Radar, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

function getPriorityBadge(priority) {
  const p = (priority || '').toLowerCase()
  if (p === 'high') return { color: 'red', label: 'High Priority' }
  if (p === 'medium') return { color: 'yellow', label: 'Medium Priority' }
  return { color: 'green', label: 'Low Priority' }
}

function ScoreCard({ label, score, icon: Icon }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-xl border border-dark-100 bg-white p-4 shadow-soft card-hover"
    >
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50">
            {Icon && <Icon className="h-4 w-4 text-indigo-600" />}
          </div>
          <span className="text-xs font-medium text-dark-500">{label}</span>
        </div>
        <span className={`text-sm font-bold ${score >= 80 ? 'text-emerald-600' : score >= 60 ? 'text-amber-600' : 'text-rose-600'}`}>
          {score}%
        </span>
      </div>
      <ProgressBar value={score} size="sm" showValue={false} />
    </motion.div>
  )
}

function SectionCard({ title, icon: Icon, color, items }) {
  if (!items || items.length === 0) return null
  const dotColor = color?.replace('bg-', 'text-') || 'text-indigo-500'
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-2xl border border-dark-100 bg-white p-6 shadow-soft card-hover"
    >
      <div className="mb-4 flex items-center gap-3">
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${color} bg-opacity-10`}>
          {Icon && <Icon className={`h-4.5 w-4.5 ${dotColor}`} />}
        </div>
        <h3 className="text-sm font-semibold text-dark-900">{title}</h3>
      </div>
      <ul className="space-y-2.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <span className={`mt-1 h-2 w-2 flex-shrink-0 rounded-full ${dotColor}`} />
            <span className="text-sm text-dark-600 leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

function SuggestionCard({ suggestion, index }) {
  const [copied, setCopied] = useState(false)
  const priority = getPriorityBadge(suggestion.priority)

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="rounded-2xl border border-dark-100 bg-white p-6 shadow-soft"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <Badge color={priority.color} size="md">{priority.label}</Badge>
        </div>
      </div>

      {suggestion.reason && (
        <div className="mb-3">
          <p className="text-xs font-medium text-dark-400 uppercase tracking-wider mb-1">Reason</p>
          <p className="text-sm text-dark-700">{suggestion.reason}</p>
        </div>
      )}

      {suggestion.suggestedFix && (
        <div className="mb-3">
          <p className="text-xs font-medium text-dark-400 uppercase tracking-wider mb-1">Suggested Fix</p>
          <p className="text-sm text-indigo-700 bg-indigo-50 rounded-xl p-3 leading-relaxed">{suggestion.suggestedFix}</p>
        </div>
      )}

      {suggestion.exampleRewrite && (
        <div className="relative">
          <p className="text-xs font-medium text-dark-400 uppercase tracking-wider mb-1">Example Rewrite</p>
          <div className="text-sm text-dark-600 bg-dark-50 rounded-xl p-3 leading-relaxed border border-dark-100">
            {suggestion.exampleRewrite}
          </div>
          <button
            onClick={() => handleCopy(suggestion.exampleRewrite)}
            className="absolute top-2 right-2 rounded-lg p-1.5 text-dark-400 hover:text-indigo-600 hover:bg-white transition-colors"
          >
            {copied ? <FiCheck className="h-4 w-4 text-emerald-500" /> : <FiCopy className="h-4 w-4" />}
          </button>
        </div>
      )}
    </motion.div>
  )
}

export default function ResumeDetail() {
  const { id } = useParams()
  const [resume, setResume] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await resumeApi.getById(id)
        setResume(res.data.resume)
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load resume')
      } finally {
        setLoading(false)
      }
    }
    fetchResume()
  }, [id])

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-14 w-14 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600" />
          <p className="text-sm text-dark-400">Loading analysis...</p>
        </div>
      </div>
    )
  }

  if (error || !resume) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center max-w-md">
          <FiAlertTriangle className="mx-auto mb-4 h-16 w-16 text-rose-300" />
          <h2 className="text-lg font-semibold text-dark-900">Resume not found</h2>
          <p className="mt-1 text-sm text-dark-400">{error || 'The resume you are looking for does not exist.'}</p>
          <Link
            to="/dashboard"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
          >
            <FiArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  const analysis = resume.analysis

  if (!analysis) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12">
        <div className="text-center">
          <FiInfo className="mx-auto mb-4 h-16 w-16 text-dark-300" />
          <h2 className="text-lg font-semibold text-dark-900">Not analyzed yet</h2>
          <p className="mt-1 text-sm text-dark-400">This resume has not been analyzed.</p>
          <Link
            to="/dashboard"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white"
          >
            <FiArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  const scores = [
    { label: 'ATS Score', score: analysis.atsScore, icon: FiShield },
    { label: 'Grammar', score: analysis.grammarScore, icon: FiEdit3 },
    { label: 'Formatting', score: analysis.formattingScore, icon: FiGrid },
    { label: 'Readability', score: analysis.readabilityScore, icon: FiFileText },
    { label: 'Structure', score: analysis.structureScore, icon: FiLayers },
    { label: 'Professionalism', score: analysis.professionalismScore, icon: FiStar },
    { label: 'Keyword Match', score: analysis.keywordMatch, icon: FiTarget },
  ].filter(s => s.score > 0)

  const sections = [
    { title: 'Strengths', icon: FiThumbsUp, color: 'bg-emerald-100', items: analysis.strengths },
    { title: 'Weaknesses', icon: FiAlertTriangle, color: 'bg-rose-100', items: analysis.weaknesses },
    { title: 'Missing Keywords', icon: FiTarget, color: 'bg-amber-100', items: analysis.keywordsMissing },
    { title: 'Skills Detected', icon: FiStar, color: 'bg-indigo-100', items: analysis.skillsDetected },
    { title: 'Recommended Skills', icon: FiTrendingUp, color: 'bg-purple-100', items: analysis.recommendedSkills },
    { title: 'Formatting Suggestions', icon: FiGrid, color: 'bg-cyan-100', items: analysis.formattingSuggestions },
    { title: 'Grammar Suggestions', icon: FiEdit3, color: 'bg-emerald-100', items: analysis.grammarSuggestions },
    { title: 'Bullet Point Improvements', icon: FiEdit3, color: 'bg-violet-100', items: analysis.bulletPointImprovements },
    { title: 'Project Feedback', icon: FiBriefcase, color: 'bg-indigo-100', items: analysis.projectsFeedback },
    { title: 'Experience Feedback', icon: FiBriefcase, color: 'bg-blue-100', items: analysis.experienceFeedback },
    { title: 'Education Feedback', icon: FiBook, color: 'bg-amber-100', items: analysis.educationFeedback },
    { title: 'Priority Fixes', icon: FiTarget, color: 'bg-rose-100', items: analysis.priorityFixes },
    { title: 'AI Rewrite Suggestions', icon: FiEdit3, color: 'bg-purple-100', items: analysis.aiRewriteSuggestions },
    { title: 'Improved Resume Tips', icon: FiStar, color: 'bg-emerald-100', items: analysis.improvedResumeTips },
  ].filter(s => s.items && s.items.length > 0)

  const radarData = scores.map(s => ({
    subject: s.label,
    value: s.score,
    fullMark: 100,
  }))

  const chartScores = scores.filter(s => s.score > 0)

  const handleCopyReport = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link
              to="/dashboard"
              className="mb-2 inline-flex items-center gap-1.5 text-sm font-medium text-dark-400 transition-colors hover:text-dark-600"
            >
              <FiArrowLeft className="h-3.5 w-3.5" />
              Back to Dashboard
            </Link>
            <h1 className="text-xl font-bold text-dark-900 sm:text-2xl">{resume.originalName}</h1>
            <p className="mt-1 text-sm text-dark-400">Analyzed on {formatDate(resume.createdAt)}</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge color={resume.status === 'completed' ? 'green' : resume.status === 'analyzing' ? 'blue' : 'gray'} size="lg">
              {resume.status}
            </Badge>
            <button
              onClick={handleCopyReport}
              className="rounded-xl border border-dark-200 p-2.5 text-dark-400 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 transition-all"
            >
              {copied ? <FiCheck className="h-4 w-4 text-emerald-500" /> : <FiShare2 className="h-4 w-4" />}
            </button>
            <button className="rounded-xl border border-dark-200 p-2.5 text-dark-400 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 transition-all">
              <FiDownload className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Hero Card */}
        <div className="mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-8 text-white sm:p-10 shadow-xl">
          <div className="flex flex-col items-center gap-8 lg:flex-row">
            <div className="flex-shrink-0">
              <ScoreMeter score={analysis.overallScore} size="xl" />
            </div>
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-3 py-1 text-xs text-white/80 mb-3">
                <FiAward className="h-3 w-3 text-amber-400" />
                Overall Assessment
              </div>
              <h2 className="text-2xl font-bold sm:text-3xl">Resume Analysis Report</h2>
              <p className="mt-3 text-white/70 leading-relaxed max-w-xl">{analysis.summary || 'Comprehensive AI-powered analysis of your resume.'}</p>
              <div className="mt-6 flex flex-wrap gap-3 justify-center lg:justify-start">
                <div className="rounded-xl bg-white/10 backdrop-blur-sm px-4 py-2.5 border border-white/10">
                  <p className="text-xs text-white/50">ATS Score</p>
                  <p className="text-lg font-bold">{analysis.atsScore || 0}%</p>
                </div>
                <div className="rounded-xl bg-white/10 backdrop-blur-sm px-4 py-2.5 border border-white/10">
                  <p className="text-xs text-white/50">Keyword Match</p>
                  <p className="text-lg font-bold">{analysis.keywordMatch || 0}%</p>
                </div>
                <div className="rounded-xl bg-white/10 backdrop-blur-sm px-4 py-2.5 border border-white/10">
                  <p className="text-xs text-white/50">Interview Ready</p>
                  <p className="text-lg font-bold">{analysis.interviewReadiness || 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Score Grid */}
        {chartScores.length > 0 && (
          <div className="mb-8">
            <h2 className="mb-4 text-lg font-semibold text-dark-900">Detailed Scores</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {chartScores.map((s) => (
                <ScoreCard key={s.label} {...s} />
              ))}
            </div>
          </div>
        )}

        {/* Charts Section */}
        <div className="mb-8 grid gap-6 lg:grid-cols-2">
          {radarData.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-dark-100 bg-white p-6 shadow-soft"
            >
              <h3 className="text-sm font-semibold text-dark-900 mb-4">Score Radar</h3>
              <ResponsiveContainer width="100%" height={280}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: '#64748b' }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                  <Radar name="Score" dataKey="value" stroke="#6366f1" fill="#6366f1" fillOpacity={0.2} />
                </RadarChart>
              </ResponsiveContainer>
            </motion.div>
          )}

          {chartScores.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-dark-100 bg-white p-6 shadow-soft"
            >
              <h3 className="text-sm font-semibold text-dark-900 mb-4">Score Breakdown</h3>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={chartScores.map(s => ({ name: s.label, score: s.score }))}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#64748b' }} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                  <Tooltip />
                  <Bar dataKey="score" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          )}
        </div>

        {/* Recruiter Perspective */}
        {analysis.recruiterPerspective && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 rounded-2xl border border-dark-100 bg-white p-6 shadow-soft"
          >
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100">
                <FiMessageSquare className="h-4.5 w-4.5 text-indigo-600" />
              </div>
              <h3 className="text-sm font-semibold text-dark-900">Recruiter Perspective</h3>
            </div>
            <p className="text-sm text-dark-600 leading-relaxed">{analysis.recruiterPerspective}</p>
          </motion.div>
        )}

        {/* Final Verdict */}
        {analysis.finalVerdict && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 rounded-2xl border-l-4 border-indigo-500 bg-indigo-50 p-6"
          >
            <div className="flex items-start gap-3">
              <FiInfo className="mt-0.5 h-5 w-5 flex-shrink-0 text-indigo-600" />
              <div>
                <h3 className="text-sm font-semibold text-indigo-900">Final Verdict</h3>
                <p className="mt-1 text-sm text-indigo-800 leading-relaxed">{analysis.finalVerdict}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Detailed Analysis Sections */}
        {sections.length > 0 && (
          <div className="mb-8">
            <h2 className="mb-4 text-lg font-semibold text-dark-900">Detailed Analysis</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {sections.map((section) => (
                <SectionCard key={section.title} {...section} />
              ))}
            </div>
          </div>
        )}

        {/* AI Suggestions */}
        {analysis.aiRewriteSuggestions?.length > 0 && (
          <div className="mb-8">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-md">
                <FiCpu className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-dark-900">AI Suggestions</h2>
                <p className="text-sm text-dark-400">Actionable improvements for your resume</p>
              </div>
            </div>
            <div className="grid gap-4">
              {analysis.aiRewriteSuggestions.map((suggestion, i) => (
                <SuggestionCard key={i} suggestion={suggestion} index={i} />
              ))}
            </div>
          </div>
        )}

        {/* Improvement Tips */}
        {analysis.improvedResumeTips?.length > 0 && (
          <div className="mb-8">
            <h2 className="mb-4 text-lg font-semibold text-dark-900">Tips for Improvement</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {analysis.improvedResumeTips.map((tip, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03 }}
                  className="flex items-start gap-3 rounded-xl border border-dark-100 bg-white p-4 shadow-soft card-hover"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 flex-shrink-0">
                    <FiStar className="h-4 w-4 text-emerald-600" />
                  </div>
                  <p className="text-sm text-dark-600">{tip}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-3 border-t border-dark-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-dark-200 px-5 py-2.5 text-sm font-medium text-dark-700 transition-colors hover:bg-dark-50"
          >
            <FiArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" onClick={handleCopyReport}>
              {copied ? <FiCheck className="h-4 w-4" /> : <FiShare2 className="h-4 w-4" />}
              {copied ? 'Copied' : 'Share'}
            </Button>
            <Button variant="primary" size="sm">
              <FiDownload className="h-4 w-4" />
              Export PDF
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
