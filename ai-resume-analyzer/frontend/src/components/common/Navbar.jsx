import { useState, useEffect, useCallback, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiMenu, FiX, FiLogOut, FiFileText, FiGrid, FiChevronDown,
  FiBell, FiUser, FiBarChart2, FiHome,
} from 'react-icons/fi'
import { useAuth } from '@hooks/useAuth'
import { cn } from '@utils/cn'
import Button from '@components/ui/Button'

const guestLinks = [
  { to: '/', label: 'Home' },
  { to: '/#features', label: 'Features' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/#faq', label: 'FAQ' },
]

const userLinks = [
  { to: '/', label: 'Home', icon: FiHome },
  { to: '/dashboard', label: 'Dashboard', icon: FiGrid },
  { to: '/dashboard', label: 'Resumes', icon: FiFileText },
]

function NavLink({ to, label, icon: Icon, isActive, onClick }) {
  const isAnchor = to.startsWith('/#')

  const content = (
    <>
      {Icon && <Icon className="h-4 w-4" />}
      {label}
      <span className={cn(
        'absolute -bottom-0.5 left-1/2 h-0.5 -translate-x-1/2 rounded-full transition-all duration-300',
        isActive ? 'w-full bg-indigo-600' : 'w-0 bg-indigo-500 group-hover:w-full'
      )} />
    </>
  )

  const classes = cn(
    'group relative flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors duration-200',
    isActive
      ? 'text-indigo-600'
      : 'text-dark-600 hover:text-indigo-600'
  )

  if (isAnchor) {
    return (
      <a href={to} onClick={onClick} className={classes}>
        {content}
      </a>
    )
  }

  return (
    <Link to={to} onClick={onClick} className={classes}>
      {content}
    </Link>
  )
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const scrollRAF = useRef(null)
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRAF.current) return
      scrollRAF.current = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 30)
        scrollRAF.current = null
      })
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollRAF.current) cancelAnimationFrame(scrollRAF.current)
    }
  }, [])

  useEffect(() => {
    setIsOpen(false)
    setDropdownOpen(false)
  }, [location])

  const handleLogout = useCallback(() => {
    logout()
    navigate('/')
  }, [logout, navigate])

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    if (path.startsWith('/#')) return false
    return location.pathname.startsWith(path)
  }

  const links = user ? userLinks : guestLinks

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/85 backdrop-blur-xl border-b border-dark-200/80 shadow-sm'
          : 'bg-white/75 backdrop-blur-lg border-b border-white/20'
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 md:h-20 items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-md transition-all duration-300 group-hover:shadow-lg group-hover:scale-105">
              <FiFileText className="h-4.5 w-4.5 text-white" />
            </div>
            <span className="text-lg font-bold text-dark-900 transition-colors duration-300">
              ResumeAI
            </span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                label={link.label}
                icon={link.icon}
                isActive={isActive(link.to)}
              />
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            {user ? (
              <div className="flex items-center gap-3">
                <button className="relative rounded-xl p-2 text-dark-400 transition-colors hover:bg-dark-100 hover:text-dark-600">
                  <FiBell className="h-5 w-5" />
                  <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-rose-500 border-2 border-white" />
                </button>
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 rounded-xl border border-dark-200 bg-white px-3 py-1.5 text-sm font-medium text-dark-700 transition-all hover:border-dark-300 hover:shadow-sm"
                  >
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 text-xs font-semibold text-white">
                      {user.name?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                    <span className="max-w-[120px] truncate">{user.name || user.email}</span>
                    <FiChevronDown className={cn(
                      'h-3.5 w-3.5 transition-transform duration-200',
                      dropdownOpen && 'rotate-180'
                    )} />
                  </button>
                  <AnimatePresence>
                    {dropdownOpen && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)} />
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, y: -5 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: -5 }}
                          transition={{ duration: 0.15 }}
                          className="absolute right-0 top-full z-20 mt-2 w-56 origin-top-right rounded-2xl border border-dark-100 bg-white p-1.5 shadow-soft-lg"
                        >
                          <div className="border-b border-dark-100 px-3 py-2.5">
                            <p className="text-sm font-semibold text-dark-900">{user.name || 'User'}</p>
                            <p className="text-xs text-dark-400 truncate">{user.email}</p>
                          </div>
                          <Link
                            to="/dashboard"
                            onClick={() => setDropdownOpen(false)}
                            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-dark-600 transition-colors hover:bg-indigo-50 hover:text-indigo-600"
                          >
                            <FiBarChart2 className="h-4 w-4" />
                            Dashboard
                          </Link>
                          <Link
                            to="/dashboard"
                            onClick={() => setDropdownOpen(false)}
                            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-dark-600 transition-colors hover:bg-indigo-50 hover:text-indigo-600"
                          >
                            <FiUser className="h-4 w-4" />
                            Profile
                          </Link>
                          <div className="mt-1 border-t border-dark-100 pt-1">
                            <button
                              onClick={() => { setDropdownOpen(false); handleLogout() }}
                              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-dark-600 transition-colors hover:bg-rose-50 hover:text-rose-600"
                            >
                              <FiLogOut className="h-4 w-4" />
                              Sign Out
                            </button>
                          </div>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ) : (
              <>
                <Link
                  to="/auth"
                  className="rounded-xl border border-dark-200 bg-white px-4 py-2 text-sm font-medium text-dark-600 transition-all hover:border-indigo-300 hover:text-indigo-600 hover:shadow-sm"
                >
                  Sign In
                </Link>
                <Button
                  variant="primary"
                  size="sm"
                  className="shadow-md hover:shadow-lg hover:shadow-indigo-500/20 active:scale-[0.97]"
                  onClick={() => navigate('/auth')}
                >
                  Get Started
                </Button>
              </>
            )}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative z-50 rounded-lg p-2 text-dark-500 transition-colors hover:bg-dark-100 md:hidden"
          >
            <div className="relative h-5 w-5">
              <FiMenu className={cn(
                'absolute inset-0 h-5 w-5 transition-all duration-300',
                isOpen ? 'opacity-0 rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100'
              )} />
              <FiX className={cn(
                'absolute inset-0 h-5 w-5 transition-all duration-300',
                isOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-75'
              )} />
            </div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="border-t border-white/20 bg-white/90 backdrop-blur-xl shadow-soft overflow-hidden md:hidden"
          >
            <div className="space-y-1 px-4 py-3">
              {links.map((link) => (
                link.to.startsWith('/#') ? (
                  <a
                    key={link.to}
                    href={link.to}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-dark-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      'flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                      isActive(link.to)
                        ? 'bg-indigo-50 text-indigo-600'
                        : 'text-dark-600 hover:text-indigo-600 hover:bg-indigo-50'
                    )}
                  >
                    {link.icon && <link.icon className="h-4 w-4" />}
                    {link.label}
                  </Link>
                )
              ))}
              <div className="border-t border-dark-100 pt-2 mt-2">
                {user ? (
                  <>
                    <div className="flex items-center gap-3 px-3 py-2.5">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 text-sm font-semibold text-white">
                        {user.name?.charAt(0)?.toUpperCase() || 'U'}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-dark-900">{user.name || 'User'}</p>
                        <p className="text-xs text-dark-400">{user.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => { setIsOpen(false); handleLogout() }}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-dark-600 transition-colors hover:bg-rose-50 hover:text-rose-600"
                    >
                      <FiLogOut className="h-4 w-4" />
                      Sign Out
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col gap-2 px-3 pt-2">
                    <Link
                      to="/auth"
                      onClick={() => setIsOpen(false)}
                      className="flex w-full items-center justify-center rounded-xl border border-dark-200 px-4 py-2.5 text-sm font-medium text-dark-700 transition-colors hover:bg-dark-50"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/auth"
                      onClick={() => setIsOpen(false)}
                      className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:from-indigo-700 hover:to-purple-700 shadow-md"
                    >
                      Get Started
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
