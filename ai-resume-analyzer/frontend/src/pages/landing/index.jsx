import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FiCpu, FiBarChart2, FiStar, FiArrowRight,
  FiCheck, FiChevronDown, FiTrendingUp, FiSearch, FiEdit3,
  FiGrid, FiBookOpen, FiBriefcase, FiFileText, FiPlay,
} from 'react-icons/fi'
import Button from '@components/ui/Button'
import { useAuth } from '@hooks/useAuth'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const features = [
  { icon: FiSearch, title: 'ATS Analysis', desc: 'Check how well your resume passes Applicant Tracking Systems with detailed compatibility scoring.', gradient: 'from-indigo-500 to-purple-600' },
  { icon: FiCpu, title: 'AI Suggestions', desc: 'Get intelligent recommendations powered by Google Gemini AI to improve your resume.', gradient: 'from-purple-500 to-pink-600' },
  { icon: FiStar, title: 'Resume Scoring', desc: 'Comprehensive scoring across 10+ dimensions including content, structure, and impact.', gradient: 'from-amber-500 to-orange-600' },
  { icon: FiBarChart2, title: 'Keyword Matching', desc: 'Identify missing keywords and optimize your resume for specific job descriptions.', gradient: 'from-emerald-500 to-teal-600' },
  { icon: FiGrid, title: 'Formatting Check', desc: 'Ensure your resume has proper formatting, consistent styling, and professional layout.', gradient: 'from-cyan-500 to-blue-600' },
  { icon: FiEdit3, title: 'Grammar Check', desc: 'Catch spelling errors, grammar issues, and improve your writing style.', gradient: 'from-rose-500 to-pink-600' },
  { icon: FiBriefcase, title: 'Interview Readiness', desc: 'Assess how prepared you are for interviews based on your resume content.', gradient: 'from-violet-500 to-purple-600' },
  { icon: FiTrendingUp, title: 'Career Suggestions', desc: 'Get personalized career advice and skill recommendations to advance.', gradient: 'from-blue-500 to-indigo-600' },
]

const steps = [
  { number: '01', title: 'Upload Resume', desc: 'Drag & drop your resume. We support PDF, DOC, and DOCX formats.' },
  { number: '02', title: 'AI Analysis', desc: 'Our AI scans and evaluates your resume against industry benchmarks.' },
  { number: '03', title: 'ATS Score', desc: 'Get your ATS compatibility score with detailed breakdown.' },
  { number: '04', title: 'Suggestions', desc: 'Receive actionable suggestions to improve every section.' },
  { number: '05', title: 'Improved Resume', desc: 'Apply the feedback and create a standout resume.' },
]

const testimonials = [
  { name: 'Sarah Chen', role: 'Software Engineer', text: 'This tool helped me identify gaps in my resume I never noticed. Landed interviews at 3 top tech companies within weeks!', rating: 5 },
  { name: 'James Wilson', role: 'Product Manager', text: 'The ATS analysis is incredibly accurate. My interview callbacks increased by 60% after applying the suggestions.', rating: 5 },
  { name: 'Priya Patel', role: 'Marketing Director', text: 'Finally, a resume tool that gives actionable advice instead of generic tips. The keyword recommendations were spot-on.', rating: 5 },
  { name: 'Marcus Johnson', role: 'Data Scientist', text: 'The formatting check saved me from embarrassing layout issues. The AI suggestions are genuinely helpful and specific.', rating: 5 },
]

const faqs = [
  { q: 'How does the AI analysis work?', a: 'Our AI uses Google Gemini to analyze your resume against thousands of industry benchmarks, checking for ATS compatibility, grammar, formatting, keyword optimization, and overall quality.' },
  { q: 'Is my resume data secure?', a: 'Yes, your data is encrypted and stored securely. We never share your resume with third parties.' },
  { q: 'What file formats are supported?', a: 'We support PDF, DOC, and DOCX file formats up to 10MB in size.' },
  { q: 'How long does analysis take?', a: 'Analysis typically takes 30-60 seconds, depending on resume length and current demand.' },
  { q: 'Is there a free version?', a: 'Yes, we offer a free tier with daily analysis limits. Premium plans are available for power users.' },
]

export default function Landing() {
  const navigate = useNavigate()
  const { user } = useAuth()

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900" />
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute top-20 left-1/4 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl animate-blob" />
        <div className="absolute bottom-20 right-1/4 h-80 w-80 rounded-full bg-purple-500/20 blur-3xl animate-blob-delayed" />
        <div className="absolute top-1/3 right-1/3 h-64 w-64 rounded-full bg-pink-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mx-auto max-w-4xl text-center"
          >
            <motion.div variants={itemVariants} className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm text-white/90 backdrop-blur-sm">
              <FiStar className="h-3.5 w-3.5 text-amber-400" />
              AI-Powered Resume Analysis
              <span className="ml-1 rounded-full bg-amber-500/20 px-2 py-0.5 text-xs text-amber-300">New</span>
            </motion.div>
            <motion.h1
              variants={itemVariants}
              className="text-5xl font-bold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl"
            >
              Build an{' '}
              <span className="gradient-text-hero">
                ATS-Optimized Resume
              </span>
              <br />
              with AI
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="mx-auto mt-6 max-w-2xl text-lg text-white/60 leading-relaxed"
            >
              Get instant, detailed feedback on your resume. Our AI analyzes everything from ATS compatibility to grammar, helping you stand out from the competition and land more interviews.
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Button
                size="xl"
                variant="gradient"
                className="shadow-xl shadow-amber-500/25 hover:shadow-2xl hover:shadow-amber-500/30"
                onClick={() => navigate(user ? '/dashboard' : '/auth')}
              >
                {user ? 'Go to Dashboard' : 'Upload Your Resume'}
                <FiArrowRight className="h-4 w-4" />
              </Button>
              <Button
                size="xl"
                variant="glass"
                className="border-white/30"
                onClick={() => navigate('/demo')}
              >
                <FiPlay className="h-4 w-4" />
                Watch Demo
              </Button>
            </motion.div>
            <motion.div variants={itemVariants} className="mt-16 flex items-center justify-center gap-8 text-white/40">
              <div className="flex items-center gap-2">
                <FiCheck className="h-4 w-4 text-emerald-400" />
                <span className="text-sm">Free to start</span>
              </div>
              <div className="flex items-center gap-2">
                <FiCheck className="h-4 w-4 text-emerald-400" />
                <span className="text-sm">No credit card</span>
              </div>
              <div className="flex items-center gap-2">
                <FiCheck className="h-4 w-4 text-emerald-400" />
                <span className="text-sm">Instant results</span>
              </div>
            </motion.div>

            {/* Trusted by */}
            <motion.div variants={itemVariants} className="mt-20">
              <p className="text-xs text-white/30 uppercase tracking-widest mb-6">Trusted by professionals at</p>
              <div className="flex flex-wrap items-center justify-center gap-8 opacity-30">
                {['Google', 'Microsoft', 'Amazon', 'Meta', 'Apple', 'Netflix'].map((name) => (
                  <span key={name} className="text-white/40 text-lg font-bold tracking-tight">{name}</span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-[#f8fafc] py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-indigo-100 px-4 py-1.5 text-sm font-medium text-indigo-700">
              <FiStar className="h-3.5 w-3.5" />
              Features
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-dark-900 sm:text-4xl">
              Everything you need to optimize your resume
            </h2>
            <p className="mt-4 text-lg text-dark-400">
              Comprehensive analysis tools to help you create a resume that gets noticed.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group card-gradient rounded-2xl p-6 card-hover"
              >
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} shadow-md group-hover:shadow-lg transition-all`}>
                  <feature.icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-dark-900">{feature.title}</h3>
                <p className="text-sm text-dark-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-4 py-1.5 text-sm font-medium text-purple-700">
              <FiTrendingUp className="h-3.5 w-3.5" />
              How It Works
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-dark-900 sm:text-4xl">
              From upload to optimized resume in minutes
            </h2>
            <p className="mt-4 text-lg text-dark-400">
              Our AI-powered pipeline makes resume optimization effortless.
            </p>
          </div>

          <div className="mt-16 relative">
            <div className="absolute left-8 top-0 bottom-0 hidden w-0.5 bg-gradient-to-b from-indigo-200 via-purple-200 to-transparent md:block" />
            <div className="space-y-12">
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative flex items-start gap-6 md:pl-16"
                >
                  <div className="relative z-10 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-xl font-bold text-white shadow-lg shadow-indigo-500/20">
                    {step.number}
                  </div>
                  <div className="pt-3">
                    <h3 className="text-lg font-semibold text-dark-900">{step.title}</h3>
                    <p className="mt-1 text-sm text-dark-400">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              { value: '10,000+', label: 'Resumes Analyzed', icon: FiFileText },
              { value: '92%', label: 'ATS Improvement', icon: FiTrendingUp },
              { value: '4.9★', label: 'Average Rating', icon: FiStar },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <p className="text-4xl font-bold text-white">{stat.value}</p>
                <p className="mt-2 text-white/60">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-[#f8fafc] py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-medium text-emerald-700">
              <FiStar className="h-3.5 w-3.5" />
              Testimonials
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-dark-900 sm:text-4xl">
              Loved by job seekers
            </h2>
            <p className="mt-4 text-lg text-dark-400">
              Hear from people who landed their dream jobs with our help.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-dark-100 bg-white p-6 shadow-soft card-hover"
              >
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <FiStar key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="mb-4 text-sm text-dark-600 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-xs font-semibold text-white shadow-md">
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-dark-900">{t.name}</p>
                    <p className="text-xs text-dark-400">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-white py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-dark-900 sm:text-4xl">
              Frequently asked questions
            </h2>
            <p className="mt-4 text-lg text-dark-400">
              Everything you need to know about our resume analysis service.
            </p>
          </div>

          <div className="mt-12 space-y-4">
            {faqs.map((faq, i) => (
              <motion.details
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group rounded-2xl border border-dark-100 bg-white p-5 shadow-soft transition-all open:shadow-soft-lg card-hover"
              >
                <summary className="flex cursor-pointer items-center justify-between text-sm font-semibold text-dark-900">
                  {faq.q}
                  <FiChevronDown className="h-4 w-4 text-dark-400 transition-transform duration-200 group-open:rotate-180" />
                </summary>
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-3 text-sm text-dark-400 leading-relaxed"
                >
                  {faq.a}
                </motion.p>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 py-20">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute top-1/2 left-1/3 h-64 w-64 rounded-full bg-indigo-400/20 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-48 w-48 rounded-full bg-pink-400/20 blur-3xl" />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Ready to optimize your resume?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/60">
              Join thousands of job seekers who landed their dream jobs with AI-powered resume analysis.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="xl"
                variant="gradient"
                className="shadow-xl shadow-amber-500/25"
                onClick={() => navigate(user ? '/dashboard' : '/auth')}
              >
                {user ? 'Go to Dashboard' : 'Get Started Free'}
                <FiArrowRight className="h-4 w-4" />
              </Button>
              <Button
                size="xl"
                variant="glass"
                className="border-white/30"
              >
                <FiBookOpen className="h-4 w-4" />
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
