import React from 'react'
import './App.css'
import { AuthProvider } from './context/AuthContext'
import { Navigate, Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import MainLayout from './layout/MainLayout'
import { TaskProvider } from './context/TaskContext'
import ProtectedRoute from './components/layout/ProtectedRoute'

function App() {

  return (
    <AuthProvider>
      <TaskProvider>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            {/* <Route path="*" element={<NotFound />} /> */}
          </Route>
        </Routes>
      </TaskProvider>
    </AuthProvider>
  )
}

export default App;
