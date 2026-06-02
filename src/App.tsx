import './App.css'
import { Route, Routes } from 'react-router'

import LoginPage from './modules/auth/pages/Login'
import DashboardLayout from './components/layouts/DashboardLayout'

import UsersManagementPage from './modules/users/pages/UsersManagement'
import DashboardPage from './modules/Dashboard/page/Dashboard'
import CategoryPage from './modules/category/page/Category'
import EpisodeListPage from './modules/episodeList/pages/EpisodeList'
import SeriesListPage from './modules/seriesList/pages/SeriesList'


function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />}>
      </Route>
      <Route  element={<DashboardLayout />}>
        <Route path="/" element={<DashboardPage />}/> 
        <Route path="/users" element={<UsersManagementPage />}/> 
        <Route path="/seriesCategory" element={<CategoryPage/>}/> 
        <Route path="/series" element={<SeriesListPage/>}/> 
        <Route path="/episodeList" element={<EpisodeListPage />}/> 
        <Route path="/products" element={<DashboardPage />}/> 
        <Route path="/staff" element={<DashboardPage />}/> 
        
      </Route>

    </Routes>
  )
}

export default App
