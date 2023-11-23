// WelcomeSection.js
import React from 'react';
import { NavLink } from 'react-router-dom';

function WelcomeSection() {
  return (
    <section className="container" id="inicio">
      <div className="row align-items-center">
        {/* Columna de texto */}
        <div className="col-md-6 text-center text-md-left">
          <h1 className="display-5 fw-bold text-dark">Bienvenido a <span className="text-primary">Las Nubes</span></h1>
          <p className="lead text-dark">Trabajamos para que tu bienestar toque el cielo.</p>
          <NavLink to="/login" className="btn btn-primary btn-lg rounded-pill">
            Iniciar Sesión
          </NavLink>
        </div>

        {/* Columna de imagen */}
        <div className="col-md-6 d-md-block">
          <img src="img/section_welcome.svg" alt="Bienvenida" className="img-fluid"/>
        </div>
      </div>
    </section>
  );
}

export default WelcomeSection;
