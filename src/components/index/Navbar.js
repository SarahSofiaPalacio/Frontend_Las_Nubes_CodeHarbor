import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

function Navbar() {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top shadow">
      <div className="container">
        {/* Logo a la izquierda */}
        <NavLink className="navbar-brand" to="/">
          <img src="img/logo_text_left.svg" alt="Logo" height="30" />
        </NavLink>

        {/* Botón del menú para pantallas pequeñas */}
        <button className="navbar-toggler" type="button" onClick={handleNavCollapse}>
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`${isNavCollapsed ? 'collapse' : 'text-center'} navbar-collapse justify-content-end`} id="navbarNav">
        <div className="navbar-nav">
            <HashLink smooth className="nav-link" to="/#inicio">Inicio</HashLink>
            <HashLink smooth className="nav-link" to="/#convenios">Convenios</HashLink>
            <HashLink smooth className="nav-link" to="/#sobre-nosotros">Sobre nosotros</HashLink>
            <HashLink smooth className="nav-link" to="/#servicios">Servicios</HashLink>
            <HashLink smooth className="nav-link" to="/#preguntas-frecuentes">Preguntas Frecuentes</HashLink>
            <HashLink smooth className="nav-link" to="/#contacto">Contacto</HashLink>
          </div>

          {/* Botón de iniciar sesión a la derecha */}
          <NavLink to="/login" className="btn btn-primary btn-sm rounded-pill ml-lg-2">Iniciar Sesión</NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;