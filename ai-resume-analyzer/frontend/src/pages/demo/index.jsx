import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FiPlay, FiArrowRight, FiCheck, FiCpu, FiStar,
  FiBarChart2, FiGrid, FiEdit3, FiShield, FiTarget, FiFileText,
} from 'react-icons/fi'
import Button from '@components/ui/Button'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const steps = [
  {
    number: '01',
    title: 'Upload Resume',
    desc: 'Drag and drop your resume in PDF or DOC format. We handle the rest.',
    details: ['PDF, DOC, DOCX supported', 'Up to 10MB file size', 'Secure encrypted upload'],
  },
  {
    number: '02',
    title: 'AI Extracts & Parses',
    desc: 'Our AI parses your resume, extracting all sections, skills, experience, and education.',
    details: ['Natural language processing', 'Section detection', 'Entity extraction'],
  },
  {
    number: '03',
    title: 'ATS & AI Analysis',
    desc: 'Google Gemini AI analyzes your resume against hundreds of industry benchmarks.',
    details: ['ATS compatibility check', 'Grammar & spelling analysis', 'Formatting evaluation'],
  },
  {
    number: '04',
    title: 'Receive Complete Report',
    desc: 'Get a detailed report with scores, suggestions, and actionable improvements.',
    details: [
      'ATS Score',
      'Overall Score',
      'Missing Keywords',
      'Strengths',
      'Weaknesses',
      'Formatting Suggestions',
      'Grammar Suggestions',
      'Interview Readiness',
      'Final Verdict',
    ],
  },
]

const features = [
  { icon: FiCpu, title: 'AI Resume Analysis', gradient: 'from-indigo-500 to-purple-600' },
  { icon: FiShield, title: 'ATS Compatibility', gradient: 'from-purple-500 to-pink-600' },
  { icon: FiTarget, title: 'Keyword Optimization', gradient: 'from-amber-500 to-orange-600' },
  { icon: FiGrid, title: 'Resume Formatting', gradient: 'from-cyan-500 to-blue-600' },
  { icon: FiEdit3, title: 'Grammar Check', gradient: 'from-rose-500 to-pink-600' },
  { icon: FiStar, title: 'Actionable Suggestions', gradient: 'from-emerald-500 to-teal-600' },
]

export default function Demo() {
  const navigate = useNavigate()

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 py-24">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute top-1/3 left-1/4 h-80 w-80 rounded-full bg-indigo-400/20 blur-3xl animate-blob" />
        <div className="absolute bottom-1/4 right-1/4 h-60 w-60 rounded-full bg-pink-400/20 blur-3xl animate-blob-delayed" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.span
              variants={itemVariants}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-white/90 backdrop-blur-sm mb-6"
            >
              <FiPlay className="h-3.5 w-3.5 text-amber-400" />
              How It Works
            </motion.span>
            <motion.h1
              variants={itemVariants}
              className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl"
            >
              See ResumeAI in Action
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="mx-auto mt-4 max-w-2xl text-lg text-white/60"
            >
              Watch how our AI transforms your resume with detailed analysis and actionable feedback.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* 4-Step Process */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-dark-900 sm:text-4xl">
              How Resume Analysis Works
            </h2>
            <p className="mt-4 text-lg text-dark-400">
              From upload to detailed report in under a minute.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 hidden w-0.5 bg-gradient-to-b from-indigo-200 via-purple-200 to-transparent md:block" />
            <div className="space-y-16">
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative flex flex-col gap-6 md:flex-row md:pl-16"
                >
                  <div className="relative z-10 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-xl font-bold text-white shadow-lg shadow-indigo-500/20">
                    {step.number}
                  </div>
                  <div className="flex-1 pt-2">
                    <h3 className="text-xl font-semibold text-dark-900">{step.title}</h3>
                    <p className="mt-2 text-sm text-dark-400 leading-relaxed">{step.desc}</p>
                    <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
                      {step.details.map((d, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-dark-500">
                          <FiCheck className="h-3.5 w-3.5 flex-shrink-0 text-emerald-500" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="bg-[#f8fafc] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-dark-900 sm:text-4xl">
              Everything You Get
            </h2>
            <p className="mt-4 text-lg text-dark-400">
              Comprehensive analysis across every dimension of your resume.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-4 rounded-2xl border border-dark-100 bg-white p-5 shadow-soft card-hover"
              >
                <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} shadow-md`}>
                  <feature.icon className="h-5 w-5 text-white" />
                </div>
                <span className="text-sm font-semibold text-dark-900">{feature.title}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Screenshot Placeholder */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-dark-900 sm:text-4xl">
              What Your Report Looks Like
            </h2>
            <p className="mt-4 text-lg text-dark-400">
              A detailed breakdown of your resume with actionable insights.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl border border-dark-100 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 shadow-soft-lg"
          >
            <div className="p-8 sm:p-12">
              <div className="mb-8 flex flex-wrap items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-md">
                  <FiFileText className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-dark-900">Resume Analysis Report</h3>
                  <p className="text-sm text-dark-400">Complete breakdown with scores and suggestions</p>
                </div>
              </div>

              <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { label: 'Overall Score', value: '85%', color: 'text-emerald-600' },
                  { label: 'ATS Score', value: '78%', color: 'text-amber-600' },
                  { label: 'Keyword Match', value: '82%', color: 'text-indigo-600' },
                  { label: 'Readability', value: '90%', color: 'text-emerald-600' },
                ].map((s) => (
                  <div key={s.label} className="rounded-xl border border-dark-100 bg-white p-4">
                    <p className="text-xs text-dark-400">{s.label}</p>
                    <p className={`mt-1 text-2xl font-bold ${s.color}`}>{s.value}</p>
                  </div>
                ))}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                  <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">Strengths</p>
                  <ul className="mt-2 space-y-1">
                    {['Clear career progression', 'Strong action verbs', 'Relevant keywords found'].map((s, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-emerald-800">
                        <FiCheck className="h-3.5 w-3.5 flex-shrink-0 text-emerald-600" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                  <p className="text-xs font-semibold text-amber-700 uppercase tracking-wider">Suggestions</p>
                  <ul className="mt-2 space-y-1">
                    {['Add more quantifiable results', 'Improve summary section', 'Include missing keywords'].map((s, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-amber-800">
                        <FiBarChart2 className="h-3.5 w-3.5 flex-shrink-0 text-amber-600" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="border-t border-dark-100 bg-white/50 px-8 py-4 text-center">
              <p className="text-xs text-dark-400">This is a sample report. Your actual analysis will be personalized to your resume.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 py-20">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute top-1/2 left-1/3 h-64 w-64 rounded-full bg-indigo-400/20 blur-3xl" />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Ready to analyze your resume?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/60">
              Get detailed AI-powered insights and actionable suggestions to improve your resume.
            </p>
            <div className="mt-8">
              <Button
                size="xl"
                variant="gradient"
                className="shadow-xl shadow-amber-500/25"
                onClick={() => navigate('/auth')}
              >
                <FiFileText className="h-4 w-4" />
                Analyze Your Resume
                <FiArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
