import { Suspense } from 'react'
import { useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import AppRoutes from '@routes'
import MainLayout from '@components/layout/MainLayout'
import LoadingSpinner from '@components/ui/LoadingSpinner'
import ScrollToTop from '@components/common/ScrollToTop'

function App() {
  const location = useLocation()

  return (
    <MainLayout>
      <ScrollToTop />
      <Suspense
        fallback={
          <div className="flex min-h-[60vh] items-center justify-center">
            <LoadingSpinner size="lg" />
          </div>
        }
      >
        <AnimatePresence mode="wait">
          <div key={location.pathname}>
            <AppRoutes />
          </div>
        </AnimatePresence>
      </Suspense>
    </MainLayout>
  )
}

export default App
