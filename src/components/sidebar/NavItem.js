import React from 'react';
import { NavLink } from 'react-router-dom';

function NavItem({ to, icon, label }) {
  return (
    <li className="nav-item">
      <NavLink to={to} className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
        <i className={`fas fa-fw ${icon}`}></i>
        <span>{label}</span>
      </NavLink>
    </li>
  );
}

export default NavItem;

