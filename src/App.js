import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
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
          role === 'administrador' ? <Administrador /> :
            <Navigate to="/login" replace />
        } />
      </Routes>
    </Router>
  );
}

export default App;