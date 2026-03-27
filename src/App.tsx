import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Users from './pages/admin/Users';
import AdmitCards from './pages/admin/AdmitCards';
import FeesAndSalaries from './pages/admin/FeesAndSalaries';
import Attendance from './pages/teacher/Attendance';
import Finance from './pages/accountant/Finance';
import Salary from './pages/teacher/Salary';
import StudentDashboard from './pages/student/StudentDashboard';

function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode, allowedRoles?: string[] }) {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/dashboard" />;
  return <Layout>{children}</Layout>;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          
          {/* Admin Routes */}
          <Route path="/admin/users" element={<ProtectedRoute allowedRoles={['admin']}><Users /></ProtectedRoute>} />
          <Route path="/admin/fees-salaries" element={<ProtectedRoute allowedRoles={['admin']}><FeesAndSalaries /></ProtectedRoute>} />
          <Route path="/admin/admit-cards" element={<ProtectedRoute allowedRoles={['admin']}><AdmitCards /></ProtectedRoute>} />
          
          {/* Teacher Routes */}
          <Route path="/teacher/attendance" element={<ProtectedRoute allowedRoles={['teacher', 'admin']}><Attendance /></ProtectedRoute>} />
          <Route path="/staff/salary" element={<ProtectedRoute allowedRoles={['teacher', 'accountant', 'admin']}><Salary /></ProtectedRoute>} />
          
          {/* Accountant Routes */}
          <Route path="/accountant/finance" element={<ProtectedRoute allowedRoles={['accountant', 'admin']}><Finance /></ProtectedRoute>} />
          
          {/* Student Routes */}
          <Route path="/student/dashboard" element={<ProtectedRoute allowedRoles={['student']}><StudentDashboard /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
