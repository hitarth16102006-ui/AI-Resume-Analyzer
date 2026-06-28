import { motion } from 'framer-motion'
import { FiFileText, FiStar, FiShield, FiBarChart2 } from 'react-icons/fi'
import AuthForm from '@components/forms/AuthForm'

export default function Auth() {
  return (
    <div className="flex min-h-[calc(100vh-5rem)]">
      <div className="hidden w-1/2 lg:block">
        <div className="relative flex h-full items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
          <div className="absolute inset-0 bg-grid opacity-20" />
          <div className="absolute top-1/3 left-1/4 h-80 w-80 rounded-full bg-indigo-400/20 blur-3xl animate-blob" />
          <div className="absolute bottom-1/4 right-1/4 h-60 w-60 rounded-full bg-pink-400/20 blur-3xl animate-blob-delayed" />

          <div className="relative px-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
                <FiFileText className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-4xl font-bold text-white">ResumeAI</h2>
              <p className="mt-4 text-lg text-white/60 max-w-sm mx-auto">
                AI-powered resume analysis to help you land your dream job.
              </p>
            </motion.div>

            <div className="mt-12 space-y-6 text-left max-w-sm mx-auto">
              {[
                { icon: FiStar, text: 'Get detailed ATS compatibility scores' },
                { icon: FiShield, text: 'Identify missing keywords and skills' },
                { icon: FiBarChart2, text: 'Receive actionable improvement suggestions' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                    <item.icon className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-sm text-white/70">{item.text}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-12 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6"
            >
              <p className="text-white/50 text-xs uppercase tracking-widest mb-2">Trusted by</p>
              <div className="flex items-center justify-center gap-6 text-white/30 text-sm font-semibold">
                <span>Google</span>
                <span>Microsoft</span>
                <span>Amazon</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="flex w-full items-center justify-center px-4 sm:px-6 lg:w-1/2 bg-[#f8fafc]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md py-12"
        >
          <AuthForm />
        </motion.div>
      </div>
    </div>
  )
}
