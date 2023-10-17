import React, { useState } from 'react';
import Administrador from './components/Administrador/Administrador';

function App() {
  // Estado para controlar qué componente se muestra
  const [vistaActiva, setVistaActiva] = useState('administrador');

  // Función para cambiar la vista
  const cambiarVista = (nuevaVista) => {
    setVistaActiva(nuevaVista);
  };

  let contenido;
  switch (vistaActiva) {
    case 'administrador':
      contenido = <Administrador />;
      break;
    default:
      contenido = <Administrador />;
  }

  // Esta función determina si una vista es la activa y retorna 'active' si lo es
  const obtenerClaseActive = (vista) => {
    return vistaActiva === vista ? 'active' : '';
  };

  return (
    <div id="page-top">
      <li className={`nav ${obtenerClaseActive('administrador')}`}>
        <a href="/#" onClick={() => cambiarVista('administrador')}>
          <i className="fas fa-fw fa-star"></i>
          <span>Administrador</span>
        </a>
      </li>
      <div>
        {contenido}
      </div>
    </div>
  );
}

export default App;