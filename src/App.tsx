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
import LanguageList from './modules/languages/Pages/LanguageList'
import SubscriptionsPage from './modules/Subscription/pages/Subscriptions'
import UserProfilePage from './modules/settings/pages/UserProfilePage'
import CurrencyPage from './modules/settings/pages/Currency'
import ForgetPasswordPage from './modules/auth/pages/ForgetPassword'
import ResetPasswordPage from './modules/auth/pages/ResetPassword'

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forget-password" element={<ForgetPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="*" element={<NotFound />} />

      {/* Protected Routes for App*/}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<DashboardPage />} />
          {/* Users */}
          <Route path="/users" element={<UsersManagementPage />} />
          <Route path="/users/:userId" element={<UserDetailsPage />} />
          {/* Category */}
          <Route path="/seriesCategory" element={<CategoryPage />} />
          {/* Series */}

          <Route path="/series" element={<SeriesListPage />} />

          <Route path="/series/:seriesId" element={<SeriesDetailsPage />} />

          {/* Episode */}
          <Route path="/episodeList" element={<EpisodeListPage />} />
          <Route path="/episodeList/:episodeId" element={<EpisodeDetailsPage />} />
          {/* Products */}
          <Route path="/products" element={<DashboardPage />} />
          {/* Staff */}
          <Route path="/staff" element={<StaffManagementPage />} />
          {/* Languages */}
          <Route path="/languageList" element={<LanguageList />} />
          
          {/* Subscription Management */}
          <Route path="/subscriptions" element={<SubscriptionsPage />} />
          <Route path="/orders-list" element={<PaymentPage />} />

          

          {/* Settings */}
          <Route path="/settings"  element={<SettingsLayout />}>
            <Route index element={<Settings/>} />
            <Route path="ads-setting" element={<SettingsProfile />} />
            <Route path="storage" element={<SettingsProfile />} />
            <Route path="payment" element={<SettingsProfile />} />
            <Route path="report-reasons" element={<SettingsProfile />} />
            <Route path="currency" element={<CurrencyPage />} />
            <Route path="profile" element={<UserProfilePage />} />
          </Route>

        </Route>

      </Route>
    </Routes>
  )
}

export default App
