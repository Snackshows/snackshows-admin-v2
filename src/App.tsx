import './App.css'
import { Route, Routes } from 'react-router'

import LoginPage from './modules/auth/pages/Login'
import DashboardLayout from './components/layouts/DashboardLayout'

import UsersManagementPage from './modules/users/pages/UsersManagement'
import UserDetailsPage from './modules/users/pages/UserDetails'
import DashboardPage from './modules/Dashboard/page/Dashboard'
import CategoryPage from './modules/category/page/Category'
import EpisodeListPage from './modules/episodeList/pages/EpisodeList'
import SeriesListPage from './modules/seriesList/pages/SeriesList'
import SeriesDetailsPage from './modules/seriesList/pages/SeriesDetails'
import ProtectedRoute from './modules/auth/components/ProtectedRoute'
import NotFound from './modules/home/pages/NotFound'
import PaymentPage from './modules/payment/pages/paymentpage'
import EpisodeDetailsPage from './modules/episodeList/pages/EpisodeDetailsPage'
import StaffManagementPage from './modules/staff/pages/StaffManagement'


function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<LoginPage />} />
      <Route path="/forgot-password" element={<LoginPage />} />
      <Route path="*" element={<NotFound />} />

      {/* Protected Routes for App*/}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/users" element={<UsersManagementPage />} />
          <Route path="/users/:userId" element={<UserDetailsPage />} />
          <Route path="/seriesCategory" element={<CategoryPage />} />
          <Route path="/series" element={<SeriesListPage />} />
          <Route path="/series/create" element={<SeriesListPage />} />
          <Route path="/series/:seriesId" element={<SeriesDetailsPage />} />
          <Route path="/episodeList" element={<EpisodeListPage />} />
          <Route path="/episodeList/:episodeId" element={<EpisodeDetailsPage />} />
          <Route path="/products" element={<DashboardPage />} />
          <Route path="/staff" element={<StaffManagementPage />} />
          <Route path="/payments" element={<PaymentPage />} />

        </Route>

      </Route>
    </Routes>
  )
}

export default App
