import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion } from 'framer-motion'
import { FiUpload, FiFile, FiX, FiCheckCircle, FiCloud } from 'react-icons/fi'
import toast from 'react-hot-toast'
import { resumeApi } from '@services/api'
import { formatFileSize } from '@utils/cn'
import Button from '@components/ui/Button'

export default function ResumeUploadForm({ onUploadSuccess }) {
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [uploaded, setUploaded] = useState(false)

  const onDrop = useCallback((acceptedFiles) => {
    const selected = acceptedFiles[0]
    if (selected && (selected.type === 'application/pdf' || selected.type === 'application/msword' || selected.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
      setFile(selected)
      setUploaded(false)
    } else {
      toast.error('Please upload a PDF or DOC file')
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxFiles: 1,
  })

  const handleUpload = async () => {
    if (!file) return
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('resume', file)
      const uploadRes = await resumeApi.upload(formData)
      const resumeId = uploadRes.data.resume._id

      await resumeApi.analyze(resumeId)
      toast.success('Resume analyzed successfully!')
      setFile(null)
      setUploaded(true)
      onUploadSuccess?.(uploadRes.data)
    } catch (err) {
      toast.error(err.response?.data?.message || 'Upload or analysis failed')
    } finally {
      setUploading(false)
    }
  }

  if (uploaded) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-4 rounded-2xl border-2 border-emerald-200 bg-emerald-50/50 p-8 text-center"
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
          <FiCheckCircle className="h-7 w-7 text-emerald-600" />
        </div>
        <div>
          <p className="text-base font-semibold text-emerald-900">Analysis Complete!</p>
          <p className="mt-1 text-sm text-emerald-600">View the results in your dashboard.</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => setUploaded(false)}>
          Upload Another
        </Button>
      </motion.div>
    )
  }

  return (
    <div className="rounded-2xl border border-dark-100 bg-white p-6 shadow-soft">
      <h3 className="text-base font-semibold text-dark-900">Upload Resume</h3>
      <p className="mt-1 mb-5 text-sm text-dark-400">
        Upload your resume and get instant AI-powered feedback.
      </p>

      {!file ? (
        <div
          {...getRootProps()}
          className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 transition-all duration-300 ${
            isDragActive
              ? 'border-indigo-400 bg-indigo-50 scale-[1.02]'
              : 'border-dark-200 hover:border-indigo-300 hover:bg-indigo-50/50'
          }`}
        >
          <input {...getInputProps()} />
          <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-xl transition-all duration-300 ${
            isDragActive ? 'bg-indigo-100 scale-110' : 'bg-indigo-50'
          }`}>
            {isDragActive ? (
              <FiCloud className="h-6 w-6 text-indigo-600" />
            ) : (
              <FiUpload className="h-6 w-6 text-indigo-600" />
            )}
          </div>
          <p className="text-sm font-medium text-dark-700">
            {isDragActive ? 'Drop your resume here' : 'Drag & drop or click to browse'}
          </p>
          <p className="mt-1 text-xs text-dark-400">PDF, DOC, or DOCX up to 10MB</p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-dark-100 bg-dark-50/50 p-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 flex-shrink-0">
                <FiFile className="h-5 w-5 text-indigo-600" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-dark-900 truncate">{file.name}</p>
                <p className="text-xs text-dark-400">{formatFileSize(file.size)}</p>
              </div>
            </div>
            <button
              onClick={() => setFile(null)}
              className="rounded-lg p-1.5 text-dark-400 transition-colors hover:bg-dark-100 hover:text-dark-600 flex-shrink-0"
            >
              <FiX className="h-4 w-4" />
            </button>
          </div>
          {uploading && (
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-dark-100">
              <div className="h-full animate-pulse rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" style={{ width: '60%' }} />
            </div>
          )}
        </motion.div>
      )}

      {file && (
        <Button
          onClick={handleUpload}
          loading={uploading}
          className="mt-4 w-full"
          size="lg"
        >
          {uploading ? 'Analyzing...' : 'Analyze Resume'}
        </Button>
      )}
    </div>
  )
}
