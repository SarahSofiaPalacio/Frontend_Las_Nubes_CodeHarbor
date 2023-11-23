import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './views/Index';
import Login from './views/Login';
import Administrador from './views/Administrador/Administrador';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/administrador" element={<Administrador />} />
      </Routes>
    </Router>
  );
}

export default App;
