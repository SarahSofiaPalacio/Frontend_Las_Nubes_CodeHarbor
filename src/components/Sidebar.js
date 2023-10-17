import React from 'react';
import Brand from './Brand';
import NavItem from './NavItem';
import Divider from './Divider';
import Heading from './Heading';

function Sidebar({ sidebarToggled, obtenerClaseActive, cambiarVista }) {
    return (
        <ul className={`navbar-nav bg-gradient-primary sidebar sidebar-dark accordion ${sidebarToggled ? 'toggled' : ''}`} id="accordionSidebar">
            <Brand />
            <NavItem icon="fa-home" label="Inicio" isActive={obtenerClaseActive('inicio') === 'active'} onClick={() => cambiarVista('inicio')} />
            <Divider />
            <Heading text="Gestión de usuarios" />
            <NavItem icon="fa-address-card" label="Colaboradores" isActive={obtenerClaseActive('colaboradores') === 'active'} onClick={() => cambiarVista('colaboradores')} />
            <NavItem icon="fa-address-card" label="Pacientes" isActive={obtenerClaseActive('pacientes') === 'active'} onClick={() => cambiarVista('pacientes')} />
        </ul>
    );
}

export default Sidebar;