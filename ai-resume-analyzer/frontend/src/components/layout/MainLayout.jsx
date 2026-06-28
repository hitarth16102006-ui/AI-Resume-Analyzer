import { Navbar } from '@components/common'
import { Footer } from '@components/common'

export default function MainLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#f8fafc]">
      <Navbar />
      <main className="flex-1 pt-16 md:pt-20">{children}</main>
      <Footer />
    </div>
  )
}
