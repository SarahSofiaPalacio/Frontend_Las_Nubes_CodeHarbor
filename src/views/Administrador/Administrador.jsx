import React, { useState } from 'react';

import Perfil from './Perfil';
import Colaboradores from './Colaboradores';
import Pacientes from './Pacientes';
import Informes from './Informes';

import Home from '../../components/Home';
import Sidebar from '../../components/Sidebar';
import Topbar from '../../components/Topbar';
import MainContent from '../../components/MainContent';
import NavItem from '../../components/SidebarNavItem';
import Divider from '../../components/SidebarDivider';
import Heading from '../../components/SidebarHeading';

function Administrador() {
    const [vistaActiva, setVistaActiva] = useState('home');
    const [sidebarToggled, setSidebarToggled] = useState(false);

    let contenido;
    switch (vistaActiva) {
        case 'home':
            contenido = <Home />;
            break;
        case 'perfil':
            contenido = <Perfil />;
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

    const cambiarVista = (nuevaVista) => {
        setVistaActiva(nuevaVista);
    };

    const obtenerVistaActiva = (vista) => {
        return vistaActiva === vista ? 'active' : '';
    };

    const toggleSidebar = () => {
        setSidebarToggled(!sidebarToggled);
    }

    return (
        <div id="page-top">
            <div id="wrapper">
                <Sidebar
                    sidebarToggled={sidebarToggled}
                    cambiarVista={cambiarVista}
                    obtenerVistaActiva={obtenerVistaActiva}
                >
                    <div>
                        <Divider />
                        <Heading text="Gestión de usuarios" />
                        <NavItem icon="fa-address-card" label="Colaboradores" isActive={obtenerVistaActiva('colaboradores') === 'active'} onClick={() => cambiarVista('colaboradores')} />
                        <NavItem icon="fa-address-card" label="Pacientes" isActive={obtenerVistaActiva('pacientes') === 'active'} onClick={() => cambiarVista('pacientes')} />
                        <Divider />
                        <Heading text="Informes" />
                        <NavItem icon="fa-address-card" label="Generar informes" isActive={obtenerVistaActiva('informes') === 'active'} onClick={() => cambiarVista('informes')} />
                        <Divider />
                    </div>
                </Sidebar>
                <div id="content-wrapper" className="d-flex flex-column">
                    <Topbar
                        toggleSidebar={toggleSidebar}
                        userName="Brandon Sanderson"
                        userImage="img/profile.svg"
                        cambiarVista={cambiarVista}
                    />
                    <MainContent contenido={contenido} />
                </div>
            </div>
        </div>

    );
}

export default Administrador;