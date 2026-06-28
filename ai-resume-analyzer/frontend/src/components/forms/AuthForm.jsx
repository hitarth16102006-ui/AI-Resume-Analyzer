import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { useAuth } from '@hooks/useAuth'
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff, FiGithub } from 'react-icons/fi'
import Input from '@components/ui/Input'
import Button from '@components/ui/Button'

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [remember, setRemember] = useState(false)
  const { login, register } = useAuth()
  const navigate = useNavigate()

  const passwordStrength = () => {
    const p = formData.password
    if (!p) return { label: '', color: 'bg-dark-200', width: '0%' }
    let score = 0
    if (p.length >= 8) score++
    if (p.length >= 12) score++
    if (/[A-Z]/.test(p)) score++
    if (/[0-9]/.test(p)) score++
    if (/[^A-Za-z0-9]/.test(p)) score++
    if (score <= 1) return { label: 'Weak', color: 'bg-rose-500', width: '20%' }
    if (score <= 2) return { label: 'Fair', color: 'bg-orange-500', width: '40%' }
    if (score <= 3) return { label: 'Good', color: 'bg-amber-500', width: '60%' }
    if (score <= 4) return { label: 'Strong', color: 'bg-emerald-500', width: '80%' }
    return { label: 'Very Strong', color: 'bg-emerald-600', width: '100%' }
  }

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isLogin && formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }
    setLoading(true)
    try {
      if (isLogin) {
        await login(formData.email, formData.password)
        toast.success('Welcome back!')
      } else {
        await register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        })
        toast.success('Account created!')
      }
      navigate('/dashboard')
    } catch (err) {
      console.error('[AuthForm] Error:', err)
      if (err.code === 'ERR_NETWORK') {
        toast.error('Cannot connect to server. Backend may be sleeping (Render free tier) or API URL is misconfigured.')
      } else if (err.response) {
        toast.error(err.response.data?.message || `Server error (${err.response.status})`)
      } else {
        toast.error(`Network error: ${err.message}. Check browser console for details.`)
      }
    } finally {
      setLoading(false)
    }
  }

  const strength = passwordStrength()

  return (
    <div className="w-full">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-md">
          <FiUser className="h-6 w-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-dark-900">
          {isLogin ? 'Welcome back' : 'Create your account'}
        </h2>
        <p className="mt-2 text-sm text-dark-400">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Input
              label="Full name"
              name="name"
              type="text"
              placeholder="John Doe"
              icon={FiUser}
              value={formData.name}
              onChange={handleChange}
              required
            />
          </motion.div>
        )}

        <Input
          label="Email address"
          name="email"
          type="email"
          placeholder="you@example.com"
          icon={FiMail}
          value={formData.email}
          onChange={handleChange}
          required
        />

        <div className="relative">
          <Input
            label="Password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder={isLogin ? 'Enter your password' : 'Create a password'}
            icon={FiLock}
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-[38px] text-dark-400 hover:text-dark-600 transition-colors"
          >
            {showPassword ? <FiEyeOff className="h-4 w-4" /> : <FiEye className="h-4 w-4" />}
          </button>
        </div>

        {!isLogin && formData.password && (
          <div className="space-y-1">
            <div className="flex h-1.5 w-full overflow-hidden rounded-full bg-dark-100">
              <div className={`h-full rounded-full transition-all duration-500 ${strength.color}`} style={{ width: strength.width }} />
            </div>
            <p className="text-xs text-dark-400">{strength.label} password</p>
          </div>
        )}

        {!isLogin && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
          >
            <Input
              label="Confirm password"
              name="confirmPassword"
              type="password"
              placeholder="Repeat your password"
              icon={FiLock}
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </motion.div>
        )}

        {isLogin && (
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)}
                className="h-4 w-4 rounded border-dark-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-sm text-dark-500">Remember me</span>
            </label>
            <button type="button" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
              Forgot password?
            </button>
          </div>
        )}

        <Button type="submit" loading={loading} className="w-full" size="lg" variant="primary">
          {isLogin ? 'Sign In' : 'Create Account'}
        </Button>
      </form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-dark-200" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-4 text-dark-400">or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button className="flex items-center justify-center gap-2 rounded-xl border border-dark-200 px-4 py-2.5 text-sm font-medium text-dark-700 transition-colors hover:bg-dark-50 hover:border-dark-300">
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Google
        </button>
        <button className="flex items-center justify-center gap-2 rounded-xl border border-dark-200 px-4 py-2.5 text-sm font-medium text-dark-700 transition-colors hover:bg-dark-50 hover:border-dark-300">
          <FiGithub className="h-5 w-5" />
          GitHub
        </button>
      </div>
    </div>
  )
}
