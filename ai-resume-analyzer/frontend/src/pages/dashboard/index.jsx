import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiFileText, FiClock, FiStar, FiBarChart2, FiTarget, FiTrash2, FiEye, FiRefreshCw, FiSearch } from 'react-icons/fi'
import { resumeApi } from '@services/api'
import ResumeUploadForm from '@components/forms/ResumeUploadForm'
import LoadingSpinner from '@components/ui/LoadingSpinner'
import Badge from '@components/ui/Badge'
import { formatDate, getScoreColor } from '@utils/cn'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

const statusColors = {
  completed: 'green',
  analyzing: 'blue',
  pending: 'gray',
  failed: 'red',
}

const COLORS = ['#6366f1', '#a855f7', '#10b981', '#f59e0b']

export default function Dashboard() {
  const [resumes, setResumes] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [stats, setStats] = useState({ total: 0, analyzed: 0, avgScore: 0, bestScore: 0, successRate: 0 })

  const fetchResumes = async () => {
    try {
      const res = await resumeApi.getAll()
      const data = res.data.resumes || []
      setResumes(data)
      const analyzed = data.filter((r) => r.status === 'completed')
      const scores = analyzed.map((r) => r.analysis?.overallScore || 0)
      setStats({
        total: data.length,
        analyzed: analyzed.length,
        avgScore: scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0,
        bestScore: scores.length ? Math.max(...scores) : 0,
        successRate: data.length ? Math.round((analyzed.length / data.length) * 100) : 0,
      })
    } catch {
      // silent
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchResumes()
  }, [])

  const handleDelete = async (id) => {
    try {
      await resumeApi.delete(id)
      fetchResumes()
    } catch {
      // silent
    }
  }

  const filteredResumes = resumes.filter((r) =>
    r.originalName?.toLowerCase().includes(search.toLowerCase())
  )

  const statCards = [
    { label: 'Total Resumes', value: stats.total, icon: FiFileText, gradient: 'from-indigo-500 to-purple-600' },
    { label: 'Analyzed', value: stats.analyzed, icon: FiBarChart2, gradient: 'from-emerald-500 to-teal-600' },
    { label: 'Avg Score', value: `${stats.avgScore}%`, icon: FiStar, gradient: 'from-amber-500 to-orange-600' },
    { label: 'Best Score', value: `${stats.bestScore}%`, icon: FiTarget, gradient: 'from-rose-500 to-pink-600' },
  ]

  const pieData = [
    { name: 'Completed', value: stats.analyzed },
    { name: 'Analyzing', value: resumes.filter((r) => r.status === 'analyzing').length },
    { name: 'Pending', value: resumes.filter((r) => r.status === 'pending').length },
    { name: 'Failed', value: resumes.filter((r) => r.status === 'failed').length },
  ].filter((d) => d.value > 0)

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-dark-900">Dashboard</h1>
            <p className="mt-1 text-sm text-dark-400">
              Manage your resumes and track your analysis results.
            </p>
          </div>
          <button
            onClick={fetchResumes}
            className="inline-flex items-center gap-2 rounded-xl border border-dark-200 px-4 py-2.5 text-sm font-medium text-dark-600 transition-colors hover:bg-dark-50 hover:border-dark-300"
          >
            <FiRefreshCw className="h-4 w-4" />
            Refresh
          </button>
        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -2 }}
              className="rounded-2xl border border-dark-100 bg-white p-5 shadow-soft transition-all duration-300 hover:shadow-soft-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-dark-400 uppercase tracking-wider">{stat.label}</p>
                  <p className="mt-1.5 text-2xl font-bold text-dark-900">{stat.value}</p>
                </div>
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${stat.gradient} shadow-md`}>
                  <stat.icon className="h-5 w-5 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mb-8 grid gap-6 lg:grid-cols-3">
          {/* Pie Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl border border-dark-100 bg-white p-6 shadow-soft"
          >
            <h3 className="text-sm font-semibold text-dark-900 mb-4">Resume Status</h3>
            {pieData.length > 0 ? (
              <div className="flex items-center gap-4">
                <div className="h-32 w-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={30}
                        outerRadius={55}
                        dataKey="value"
                      >
                        {pieData.map((_, index) => (
                          <Cell key={index} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2">
                  {pieData.map((d, i) => (
                    <div key={d.name} className="flex items-center gap-2">
                      <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                      <span className="text-xs text-dark-500">{d.name}: {d.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex h-32 items-center justify-center text-sm text-dark-400">
                No data yet
              </div>
            )}
          </motion.div>

          {/* Success Rate */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="rounded-2xl border border-dark-100 bg-white p-6 shadow-soft"
          >
            <h3 className="text-sm font-semibold text-dark-900 mb-4">Success Rate</h3>
            <div className="flex flex-col items-center justify-center h-32">
              <div className="relative">
                <svg className="h-24 w-24 -rotate-90" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="54" fill="none" stroke="#e2e8f0" strokeWidth="8" />
                  <circle
                    cx="60" cy="60" r="54"
                    fill="none" stroke="#6366f1"
                    strokeWidth="8" strokeLinecap="round"
                    strokeDasharray={`${(stats.successRate / 100) * 339.292} 339.292`}
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold text-indigo-600">{stats.successRate}%</span>
                </div>
              </div>
              <p className="mt-2 text-xs text-dark-400">Analysis completion rate</p>
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-2xl border border-dark-100 bg-white p-6 shadow-soft"
          >
            <h3 className="text-sm font-semibold text-dark-900 mb-4">Recent Activity</h3>
            <div className="space-y-3 h-32 overflow-y-auto scrollbar-hide">
              {resumes.slice(0, 5).map((r) => (
                <div key={r._id} className="flex items-center gap-3">
                  <div className={`h-2 w-2 rounded-full ${r.status === 'completed' ? 'bg-emerald-500' : r.status === 'analyzing' ? 'bg-blue-500' : 'bg-dark-300'}`} />
                  <p className="text-xs text-dark-500 truncate flex-1">{r.originalName}</p>
                  <span className="text-xs text-dark-400">{formatDate(r.createdAt)}</span>
                </div>
              ))}
              {resumes.length === 0 && (
                <p className="text-xs text-dark-400 text-center pt-8">No activity yet</p>
              )}
            </div>
          </motion.div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Upload */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <ResumeUploadForm onUploadSuccess={fetchResumes} />
            </div>
          </div>

          {/* Resume History */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-dark-100 bg-white shadow-soft overflow-hidden">
              <div className="border-b border-dark-100 px-6 py-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2">
                    <FiClock className="h-4 w-4 text-dark-400" />
                    <h2 className="text-sm font-semibold text-dark-900">Resume History</h2>
                  </div>
                  <div className="relative flex-1 max-w-xs">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-dark-400" />
                    <input
                      type="text"
                      placeholder="Search resumes..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full rounded-lg border border-dark-200 bg-white py-2 pl-9 pr-3 text-sm text-dark-900 placeholder-dark-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                    />
                  </div>
                </div>
              </div>

              {loading ? (
                <div className="flex justify-center py-16">
                  <LoadingSpinner size="lg" />
                </div>
              ) : filteredResumes.length === 0 ? (
                <div className="flex flex-col items-center py-16 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50">
                    <FiFileText className="h-8 w-8 text-indigo-400" />
                  </div>
                  <p className="text-base font-semibold text-dark-700">No resumes yet</p>
                  <p className="mt-1 text-sm text-dark-400">
                    {search ? 'No resumes match your search.' : 'Upload your first resume to get started.'}
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-dark-100">
                  {filteredResumes.map((resume, i) => (
                    <motion.div
                      key={resume._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.02 }}
                      className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-dark-50/50"
                    >
                      <div className="flex items-center gap-4 min-w-0 flex-1">
                        <div className={`flex h-11 w-11 items-center justify-center rounded-xl flex-shrink-0 ${
                          resume.status === 'completed' ? 'bg-emerald-50' : 'bg-dark-50'
                        }`}>
                          <FiFileText className={`h-5 w-5 ${
                            resume.status === 'completed' ? 'text-emerald-600' : 'text-dark-400'
                          }`} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-dark-900 truncate">{resume.originalName}</p>
                          <div className="mt-1 flex items-center gap-2.5 flex-wrap">
                            <Badge color={statusColors[resume.status] || 'gray'} size="sm">
                              {resume.status}
                            </Badge>
                            <span className="text-xs text-dark-400">{formatDate(resume.createdAt)}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 flex-shrink-0 ml-4">
                        {resume.analysis?.overallScore != null && (
                          <div className="text-right hidden sm:block">
                            <p className={`text-sm font-bold ${getScoreColor(resume.analysis.overallScore)}`}>
                              {resume.analysis.overallScore}%
                            </p>
                            <p className="text-xs text-dark-400">Score</p>
                          </div>
                        )}
                        <Link
                          to={`/analysis/${resume._id}`}
                          className="rounded-lg p-2 text-dark-400 transition-colors hover:bg-indigo-50 hover:text-indigo-600"
                        >
                          <FiEye className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(resume._id)}
                          className="rounded-lg p-2 text-dark-400 transition-colors hover:bg-rose-50 hover:text-rose-600"
                        >
                          <FiTrash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
