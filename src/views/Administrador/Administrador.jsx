import React, { useEffect, useState } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import Cookies from 'js-cookie';

import Perfil from './Perfil';
import Colaboradores from './Colaboradores';
import Pacientes from './Pacientes';
import Informes from './Informes';

import Home from '../../components/Home';
import Sidebar from '../../components/sidebar/Sidebar';
import NavItem from '../../components/sidebar/NavItem';
import Divider from '../../components/sidebar/Divider';
import Heading from '../../components/sidebar/Heading';
import Topbar from '../../components/topbar/Topbar';

function Administrador() {
    const [sidebarToggled, setSidebarToggled] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const username = Cookies.get('username');
        const token = Cookies.get('token');
        const role = Cookies.get('role');
        if (!username || !token || !role) {
            navigate('/login');
        }
    }, [navigate]);

    const toggleSidebar = () => {
        setSidebarToggled(!sidebarToggled);
    }

    return (
        <div id="page-top">
            <div id="wrapper">
                <Sidebar
                    sidebarToggled={sidebarToggled}
                >
                    <div>
                        <Divider />
                        <Heading text="Gestión de usuarios" />
                        <NavItem to="colaboradores" icon="fa-address-card" label="Colaboradores" />
                        <NavItem to="pacientes" icon="fa-address-card" label="Pacientes" />
                        <Divider />
                        <Heading text="Informes" />
                        <NavItem to="informes" icon="fa-address-card" label="Generar informes" />
                        <Divider />
                    </div>
                </Sidebar>
                <div id="content-wrapper" className="d-flex flex-column">
                    <Topbar toggleSidebar={toggleSidebar} />
                    <div className="container-fluid">
                        <Routes>
                            <Route index element={<Home />} />
                            <Route path="perfil" element={<Perfil />} />
                            <Route path="colaboradores" element={<Colaboradores />} />
                            <Route path="pacientes" element={<Pacientes />} />
                            <Route path="informes" element={<Informes />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Administrador;
