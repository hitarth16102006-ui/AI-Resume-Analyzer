import { Link } from 'react-router-dom'
import { FiFileText, FiGithub, FiTwitter, FiLinkedin } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer className="border-t border-dark-100 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-md group-hover:shadow-lg transition-all">
                <FiFileText className="h-4 w-4 text-white" />
              </div>
              <span className="text-base font-bold text-dark-900">ResumeAI</span>
            </Link>
            <p className="text-sm text-dark-400 leading-relaxed">
              AI-powered resume analysis to help you land your dream job.
            </p>
            <div className="flex gap-3">
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-lg bg-dark-50 text-dark-400 transition-colors hover:bg-indigo-50 hover:text-indigo-600">
                <FiGithub className="h-4 w-4" />
              </a>
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-lg bg-dark-50 text-dark-400 transition-colors hover:bg-indigo-50 hover:text-indigo-600">
                <FiTwitter className="h-4 w-4" />
              </a>
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-lg bg-dark-50 text-dark-400 transition-colors hover:bg-indigo-50 hover:text-indigo-600">
                <FiLinkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-dark-900">Product</h3>
            <ul className="space-y-3">
              {['Features', 'Pricing', 'FAQ', 'Changelog'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-dark-400 transition-colors hover:text-indigo-600">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-dark-900">Company</h3>
            <ul className="space-y-3">
              {['About', 'Blog', 'Careers', 'Contact'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-dark-400 transition-colors hover:text-indigo-600">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-dark-900">Legal</h3>
            <ul className="space-y-3">
              {['Privacy', 'Terms', 'Security', 'Cookies'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-dark-400 transition-colors hover:text-indigo-600">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-dark-100 pt-8 text-center text-sm text-dark-400">
          &copy; {new Date().getFullYear()} ResumeAI. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
