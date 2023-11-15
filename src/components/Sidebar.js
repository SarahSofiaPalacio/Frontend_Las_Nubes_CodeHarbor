import React from 'react';
import Brand from './SidebarBrand';
import NavItem from './SidebarNavItem';

function Sidebar({ sidebarToggled, obtenerVistaActiva, cambiarVista, children}) {
    return (
        <ul className={`navbar-nav bg-gradient-primary sidebar sidebar-dark accordion ${sidebarToggled ? 'toggled' : ''}`} id="accordionSidebar">
            <Brand />
            <NavItem icon="fa-home" label="Inicio" isActive={obtenerVistaActiva('inicio') === 'active'} onClick={() => cambiarVista('inicio')} />
            {children}
        </ul>
    );
}

export default Sidebar;