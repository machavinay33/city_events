import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { Layout } from '@/components/layout/Layout'
import { Loader } from '@/components/layout/Loader'
import { ProtectedRoute } from '@/components/admin/ProtectedRoute'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'

import Home from '@/pages/Home'
import About from '@/pages/About'
import Services from '@/pages/Services'
import Events from '@/pages/Events'
import Gallery from '@/pages/Gallery'
import Testimonials from '@/pages/Testimonials'
import Contact from '@/pages/Contact'

import AdminLogin from '@/pages/admin/Login'
import AdminDashboard from '@/pages/admin/Dashboard'
import AdminHomepage from '@/pages/admin/Homepage'
import AdminServices from '@/pages/admin/Services'
import AdminEvents from '@/pages/admin/Events'
import AdminBookings from '@/pages/admin/Bookings'
import AdminRegistrations from '@/pages/admin/Registrations'
import AdminGallery from '@/pages/admin/Gallery'
import AdminTestimonials from '@/pages/admin/Testimonials'
import AdminSettings from '@/pages/admin/Settings'
import AdminMediaLibrary from '@/pages/admin/MediaLibrary'

export default function App() {
  useSmoothScroll()

  return (
    <>
      <Loader />
      <Toaster position="top-center" toastOptions={{ style: { fontFamily: 'Jost, sans-serif' } }} />
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/about" element={<Layout><About /></Layout>} />
        <Route path="/services" element={<Layout><Services /></Layout>} />
        <Route path="/events" element={<Layout><Events /></Layout>} />
        <Route path="/gallery" element={<Layout><Gallery /></Layout>} />
        <Route path="/testimonials" element={<Layout><Testimonials /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/homepage" element={<ProtectedRoute><AdminHomepage /></ProtectedRoute>} />
        <Route path="/admin/services" element={<ProtectedRoute><AdminServices /></ProtectedRoute>} />
        <Route path="/admin/events" element={<ProtectedRoute><AdminEvents /></ProtectedRoute>} />
        <Route path="/admin/bookings" element={<ProtectedRoute><AdminBookings /></ProtectedRoute>} />
        <Route path="/admin/registrations" element={<ProtectedRoute><AdminRegistrations /></ProtectedRoute>} />
        <Route path="/admin/gallery" element={<ProtectedRoute><AdminGallery /></ProtectedRoute>} />
        <Route path="/admin/testimonials" element={<ProtectedRoute><AdminTestimonials /></ProtectedRoute>} />
        <Route path="/admin/media" element={<ProtectedRoute><AdminMediaLibrary /></ProtectedRoute>} />
        <Route path="/admin/settings" element={<ProtectedRoute><AdminSettings /></ProtectedRoute>} />

        <Route path="*" element={<Layout><div className="container-ce py-32 text-center"><h1 className="font-display text-4xl mb-3">404</h1><p className="text-ink/60">That page doesn't exist.</p></div></Layout>} />
      </Routes>
    </>
  )
}
