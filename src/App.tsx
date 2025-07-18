import React, { Suspense, lazy } from 'react';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import { Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import { TaskProvider } from './context/TaskContext';
import ProtectedRoute from './components/routing/ProtectedRoute';
import PublicRoute from './components/routing/PublicRoute';
import { Loader2 } from 'lucide-react';

const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <Suspense fallback={
          <div className="flex justify-center items-center h-screen bg-white">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        }>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
              <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Route>
          </Routes>
        </Suspense>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
