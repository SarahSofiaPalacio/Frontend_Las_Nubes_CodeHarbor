import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Sidebar from '../../components/sidebar/Sidebar';
import NavItem from '../../components/sidebar/NavItem';
import Divider from '../../components/sidebar/Divider';
import Heading from '../../components/sidebar/Heading';
import Topbar from '../../components/topbar/Topbar';

import Home from '../../components/Home';
import Perfil from './Perfil';

function Medico() {
    const [sidebarToggled, setSidebarToggled] = useState(false);

    const toggleSidebar = () => {
        setSidebarToggled(!sidebarToggled);
    }

    return (
        <div id="page-top">
            <div id="wrapper">
                <Sidebar
                    sidebarToggled={sidebarToggled}
                    elements={
                        <>
                            <Divider />
                            <Heading text="Programación Citas" />
                            <NavItem to="citas" icon="fa-address-card" label="Citas Médicas" />
                            <Divider />
                            <Heading text="Cita en Curso" />
                            <NavItem to="citas" icon="fa-address-card" label="Trámite" />
                            <NavItem to="citas" icon="fa-address-card" label="Historia Clínica" />
                            <Divider />
                        </>
                    }
                />
                <div id="content-wrapper" className="d-flex flex-column">
                    <Topbar toggleSidebar={toggleSidebar} />
                    <div className="container-fluid">
                        <Routes>
                            <Route index element={<Home />} />
                            <Route path="perfil" element={<Perfil />} />
                            <Route path="*" element={<Navigate to="/dashboard" replace />} /> 
                        </Routes>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Medico;