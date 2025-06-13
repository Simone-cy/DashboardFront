import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './components/Login';
import Register from './components/Registrazione';
import Dashboard from './components/Dashboard';
import OrderDetail from './components/OrderDetail';
import { useAuth } from './contexts/AuthContext';

function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard/>
              </ProtectedRoute>
            }/>
            <Route path="/order/:orderId" element={
              <ProtectedRoute>
                <OrderDetail/>
              </ProtectedRoute>
            }/>
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;