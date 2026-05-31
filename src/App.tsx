import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router'

import LoginPage from './modules/auth/pages/Login'
import DashboardLayout from './components/layouts/DashboardLayout'
import DashboardPage from './modules/Dashboard/page/dashboard'


function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />}>
      </Route>
      <Route  element={<DashboardLayout />}>
        <Route path="/" element={<DashboardPage />}>
        </Route>
      </Route>

    </Routes>
  )
}

export default App
