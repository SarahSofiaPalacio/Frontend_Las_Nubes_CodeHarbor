import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from './auth/AuthContext';
import PrivateRoute from './auth/PrivateRoute';

import Index from './views/Index';
import Login from './views/Login';
import Administrador from './views/Administrador/Administrador';

function App() {
  const { role } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/*" element={
          <PrivateRoute>
            {role === 'Administrador' ? <Administrador /> : <Navigate to="/login" replace />}
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;