import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

function NavItem({ to, icon, label }) {
  const location = useLocation();
  
  // Determinar si la ruta está activa
  const isActive = location.pathname === to;

  return (
    <li className={`nav-item ${isActive ? 'active' : ''}`}>
      <NavLink to={to} className="nav-link" end>
        <i className={`fas fa-fw ${icon}`}></i>
        <span>{label}</span>
      </NavLink>
    </li>
  );
}

export default NavItem;
