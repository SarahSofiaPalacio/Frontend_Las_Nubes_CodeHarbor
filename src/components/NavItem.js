import React from 'react';

function NavItem({ isActive, onClick, icon, label }) {
  return (
    <li className={`nav-item ${isActive ? 'active' : ''}`} >
      <a className="nav-link" href="/#" onClick={(e) => { e.preventDefault(); onClick(); }}>
        <i className={`fas fa-fw ${icon}`}></i>
        <span>{label}</span>
      </a>
    </li>
  );
}


export default NavItem;