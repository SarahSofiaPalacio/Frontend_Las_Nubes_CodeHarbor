import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Sidebar from '../../components/sidebar/Sidebar';
import NavItem from '../../components/sidebar/NavItem';
import Divider from '../../components/sidebar/Divider';
import Heading from '../../components/sidebar/Heading';
import Topbar from '../../components/topbar/Topbar';

import Home from '../../components/Home';
import Perfil from './Perfil';

function Regente() {
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
                            <Heading text="Gestión de medicamentos" />
                            <NavItem to="/dashboard/medicamentos" icon="fa-address-card" label="Medicamentos" />
                            <Divider />
                            <Heading text="Solicitudes" />
                            <NavItem to="/dashboard/solicitudes" icon="fa-address-card" label="Solicitudes" />
                            <Divider />
                        </>
                    }
                />
                <div id="content-wrapper" className="d-flex flex-column">
                    <Topbar toggleSidebar={toggleSidebar} />
                    <div className="container-fluid">
                        <Routes>
                            <Route index element={<Home />} />
                            <Route path="/perfil" element={<Perfil />} />
                            <Route path="*" element={<Navigate to="/dashboard" replace />} /> 
                        </Routes>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Regente;