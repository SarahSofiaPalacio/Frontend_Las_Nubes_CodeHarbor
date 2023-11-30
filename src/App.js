import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from './auth/AuthContext';
import PrivateRoute from './auth/PrivateRoute';

import Index from './views/Index';
import Login from './views/Login';
import Administrador from './views/Administrador/Administrador';
import Secretario from './views/Secretario/Secretario';
import Enfermero from './views/Enfermero/Enfermero';

function App() {
  const { role } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/*" element={
          <PrivateRoute>
            {role === 'Administrador' ? <Administrador /> :
              role === 'Secretario' ? <Secretario /> :
                role === 'Enfermero' ? <Enfermero /> :
                  <Navigate to="/" replace />}
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;