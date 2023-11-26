import React from 'react';
import Brand from './Brand';
import NavItem from './NavItem';

function Sidebar({ sidebarToggled, elements }) {
    return (
        <ul className={`navbar-nav bg-gradient-primary sidebar sidebar-dark accordion ${sidebarToggled ? 'toggled' : ''}`} id="accordionSidebar">
            <Brand />
            <NavItem to="/dashboard" icon="fas fa-home fa-fw" label="Inicio" />
            {elements}
        </ul>
    );
}

export default Sidebar;
