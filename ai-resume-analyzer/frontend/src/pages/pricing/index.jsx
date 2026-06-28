import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FiCheck, FiStar, FiArrowRight, FiChevronDown,
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

const freeFeatures = [
  'AI Resume Analysis',
  'ATS Score',
  'Resume Suggestions',
  'Resume History',
  'Dashboard',
  'PDF Upload',
  'Limited AI Analyses per day',
]

const proFeatures = [
  'Unlimited Resume Analysis',
  'Faster AI Processing',
  'Unlimited ATS Reports',
  'Resume Comparison',
  'Multiple Resume Versions',
  'Priority AI Models',
  'Export PDF Reports',
  'Cover Letter Generator',
  'AI Resume Rewrite',
  'Interview Preparation',
  'Advanced Analytics',
]

const faqs = [
  {
    q: 'Is the app free?',
    a: 'Yes, the application currently offers a free plan with full access to core features including AI resume analysis, ATS scoring, and personalized suggestions.',
  },
  {
    q: 'Why is there a daily limit?',
    a: 'The application currently uses the Gemini API free tier, which has request quotas. This allows us to offer the service at no cost while maintaining quality for all users.',
  },
  {
    q: 'Will Pro be available?',
    a: 'Yes, a premium version is planned with unlimited analyses, faster processing, and advanced features. Stay tuned for updates!',
  },
]

export default function Pricing() {
  const { user } = useAuth()

  return (
    <div>
      {/* Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 py-20">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute top-1/2 left-1/3 h-64 w-64 rounded-full bg-indigo-400/20 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-48 w-48 rounded-full bg-pink-400/20 blur-3xl" />
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
              <FiStar className="h-3.5 w-3.5 text-amber-400" />
              Pricing
            </motion.span>
            <motion.h1
              variants={itemVariants}
              className="text-4xl font-bold text-white sm:text-5xl"
            >
              Simple, transparent pricing
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="mx-auto mt-4 max-w-2xl text-lg text-white/60"
            >
              Start free and upgrade when you need more. No hidden fees, no surprises.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="bg-[#f8fafc] py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Free Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative rounded-3xl border-2 border-emerald-200 bg-white p-8 shadow-soft-lg"
            >
              <div className="absolute -top-3 right-6">
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white shadow-md">
                  <FiCheck className="h-3 w-3" />
                  Current Plan
                </span>
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-bold text-dark-900">Free</h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-dark-900">₹0</span>
                  <span className="text-dark-400">/ Forever</span>
                </div>
              </div>
              <ul className="mb-8 space-y-3">
                {freeFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <FiCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" />
                    <span className="text-sm text-dark-600">{f}</span>
                  </li>
                ))}
              </ul>
              <Link to={user ? '/dashboard' : '/auth'}>
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                >
                  {user ? 'Go to Dashboard' : 'Get Started Free'}
                  <FiArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </motion.div>

            {/* Pro Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative rounded-3xl border-2 border-indigo-200 bg-white p-8 shadow-soft-lg"
            >
              <div className="absolute -top-3 right-6">
                <span className="inline-flex items-center gap-1 rounded-full bg-indigo-500 px-3 py-1 text-xs font-semibold text-white shadow-md">
                  <FiStar className="h-3 w-3" />
                  Coming Soon
                </span>
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-bold text-dark-900">Pro</h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-dark-900">₹299</span>
                  <span className="text-dark-400">/ month</span>
                </div>
                <p className="mt-1 text-sm text-dark-400">
                  or <span className="font-semibold text-dark-600">$5</span>/month
                </p>
              </div>
              <ul className="mb-8 space-y-3">
                {proFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <FiCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-indigo-500" />
                    <span className="text-sm text-dark-600">{f}</span>
                  </li>
                ))}
              </ul>
              <Button
                variant="secondary"
                size="lg"
                className="w-full opacity-60 cursor-not-allowed"
                disabled
              >
                Upgrade to Pro
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-dark-900 sm:text-4xl">
              Frequently asked pricing questions
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.details
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group rounded-2xl border border-dark-100 bg-white p-5 shadow-soft transition-all open:shadow-soft-lg"
              >
                <summary className="flex cursor-pointer items-center justify-between text-sm font-semibold text-dark-900">
                  {faq.q}
                  <FiChevronDown className="h-4 w-4 text-dark-400 transition-transform duration-200 group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-sm text-dark-400 leading-relaxed">{faq.a}</p>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 py-16">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Start optimizing your resume today
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/60">
              Join thousands of job seekers who use ResumeAI to land their dream jobs.
            </p>
            <div className="mt-8">
              <Link to={user ? '/dashboard' : '/auth'}>
                <Button
                  variant="gradient"
                  size="xl"
                  className="shadow-xl shadow-amber-500/25"
                >
                  {user ? 'Go to Dashboard' : 'Get Started Free'}
                  <FiArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
