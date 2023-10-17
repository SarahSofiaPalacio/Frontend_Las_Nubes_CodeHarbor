import React, { useState } from 'react';

import Colaboradores from './Colaboradores';
import Pacientes from './Pacientes';
import Informes from './Informes';

import Home from '../../components/Home';
import Sidebar from '../../components/Sidebar';
import Topbar from '../../components/Topbar';
import MainContent from '../../components/MainContent';
import LogoutModal from '../../components/LogoutModal';

function Administrador() {
    // Estado para controlar qué componente se muestra
    const [vistaActiva, setVistaActiva] = useState('home');

    // Función para cambiar la vista
    const cambiarVista = (nuevaVista) => {
        setVistaActiva(nuevaVista);
    };

    // Variable para almacenar el contenido de la vista activa
    let contenido;

    // Switch para determinar qué vista se muestra
    switch (vistaActiva) {
        case 'home':
            contenido = <Home />;
            break;
        case 'colaboradores':
            contenido = <Colaboradores />;
            break;
        case 'pacientes':
            contenido = <Pacientes />;
            break;
        case 'informes':
            contenido = <Informes />;
            break;
        default:
            contenido = <Home />;
    }

    // Esta función determina si una vista es la activa y retorna 'active' si lo es
    const obtenerClaseActive = (vista) => {
        return vistaActiva === vista ? 'active' : '';
    };

    // Estado para controlar si el sidebar está abierto o cerrado
    const [sidebarToggled, setSidebarToggled] = useState(false);
    
    // Función para cambiar el estado del sidebar
    const toggleSidebar = () => {
        setSidebarToggled(!sidebarToggled);
    }

    return (
        <div id="page-top">
            <div id="wrapper">
                <Sidebar
                    sidebarToggled={sidebarToggled}
                    cambiarVista={cambiarVista}
                    obtenerClaseActive={obtenerClaseActive}
                />
                <div id="content-wrapper" className="d-flex flex-column">
                    <Topbar toggleSidebar={toggleSidebar}/>
                    <MainContent contenido={contenido} />
                </div>
            </div>
            <LogoutModal />
        </div>

    );
}

export default Administrador;