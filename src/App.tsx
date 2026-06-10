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
import SettingsLayout from './modules/settings/components/SettingsLayout'
import Settings from './modules/settings/pages/Settings'
import SettingsProfile from './modules/settings/pages/SettingsProfile'


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
          {/* Users */}
          <Route path="/users" element={<UsersManagementPage />} />
          <Route path="/users/:userId" element={<UserDetailsPage />} />
          {/* Series */}
          <Route path="/seriesCategory" element={<CategoryPage />} />
          <Route path="/series" element={<SeriesListPage />} />
          <Route path="/series/create" element={<SeriesListPage />} />
          <Route path="/series/:seriesId" element={<SeriesDetailsPage />} />
          {/* Episode */}
          <Route path="/episodeList" element={<EpisodeListPage />} />
          <Route path="/episodeList/:episodeId" element={<EpisodeDetailsPage />} />
          {/* Products */}
          <Route path="/products" element={<DashboardPage />} />
          {/* Staff */}
          <Route path="/staff" element={<StaffManagementPage />} />
          {/* Languages */}
          <Route path="/languages" element={<StaffManagementPage />} />
          {/* Payments */}
          <Route path="/payments" element={<PaymentPage />} />
          {/* Settings */}
          <Route path="/settings" element={<SettingsLayout />}>
            <Route index element={<Settings/>} />
            <Route path="profile" element={<SettingsProfile />} />
          </Route>

        </Route>

      </Route>
    </Routes>
  )
}

export default App
