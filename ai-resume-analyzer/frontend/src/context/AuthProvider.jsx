import { useState, useEffect, useCallback } from 'react'
import { AuthContext } from './AuthContext'
import { authApi } from '@services/api'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const loadUser = useCallback(async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      setLoading(false)
      return
    }
    try {
      const res = await authApi.getProfile()
      setUser(res.data.user || res.data)
    } catch {
      localStorage.removeItem('token')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadUser()
  }, [loadUser])

  const login = async (email, password) => {
    const res = await authApi.login({ email, password })
    if (!res.data?.token) {
      throw new Error('No token received from server')
    }
    localStorage.setItem('token', res.data.token)
    setUser(res.data.user)
  }

  const register = async (data) => {
    const res = await authApi.register(data)
    if (!res.data?.token) {
      throw new Error('No token received from server')
    }
    localStorage.setItem('token', res.data.token)
    setUser(res.data.user)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
