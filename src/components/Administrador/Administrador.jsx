import React, { useState } from 'react';
import Inicio from './Inicio';
import Colaboradores from './Colaboradores';
import Pacientes from './Pacientes';
import Informes from './Informes';

function Administrador() {
    // Estado para controlar qué componente se muestra
    const [vistaActiva, setVistaActiva] = useState('inicio');

    // Función para cambiar la vista
    const cambiarVista = (nuevaVista) => {
        setVistaActiva(nuevaVista);
    };

    let contenido;
    switch (vistaActiva) {
        case 'inicio':
            contenido = <Inicio />;
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
            contenido = <Inicio />;
    }

    // Esta función determina si una vista es la activa y retorna 'active' si lo es
    const obtenerClaseActive = (vista) => {
        return vistaActiva === vista ? 'active' : '';
    };

    const [sidebarToggled, setSidebarToggled] = useState(false);
    
    const toggleSidebar = () => {
        setSidebarToggled(!sidebarToggled);
    }


    return (
        <div id="page-top">

            {/* Page Wrapper */}
            <div id="wrapper">

                {/* Sidebar */}
                <ul className={`navbar-nav bg-gradient-primary sidebar sidebar-dark accordion ${sidebarToggled ? 'toggled' : ''}`} id="accordionSidebar">

                    {/* Sidebar - Brand */}
                    <a className="sidebar-brand bg-white d-flex align-items-center justify-content-center" href="/#">
                        <div className="sidebar-brand-icon">
                            <img width="50" src="img/logo.svg" alt="las nubes" />
                        </div>
                        <div className="sidebar-brand-text">
                            <img width="120" src="img/text.svg" alt="las nubes" />
                        </div>
                    </a>

                    {/* Divider */}
                    <hr className="sidebar-divider my-0"></hr>

                    {/* Nav Item - Dashboard */}
                    <li className={`nav-item ${obtenerClaseActive('inicio')}`}>
                        <a className="nav-link" href="/#" onClick={() => cambiarVista('inicio')}>
                            <i className="fas fa-fw fa-home"></i>
                            <span>Inicio</span>
                        </a>
                    </li>

                    {/* Divider */}
                    <hr className="sidebar-divider"></hr>

                    {/* Heading */}
                    <div className="sidebar-heading">
                        Gestión de usuarios
                    </div>

                    {/* Nav Item */}
                    <li className={`nav-item ${obtenerClaseActive('colaboradores')}`}>
                        <a className="nav-link" href="/#" onClick={() => cambiarVista('colaboradores')}>
                            <i className="fas fa-fw fa-address-card"></i>
                            <span>Colaboradores</span>
                        </a>
                    </li>

                    {/* Nav Item */}
                    <li className={`nav-item ${obtenerClaseActive('pacientes')}`}>
                        <a className="nav-link" href="/#" onClick={() => cambiarVista('pacientes')}>
                            <i className="fas fa-fw fa-address-card"></i>
                            <span>Pacientes</span>
                        </a>
                    </li>

                    {/* Divider */}
                    <hr className="sidebar-divider"></hr>

                    {/* Heading */}
                    <div className="sidebar-heading">
                        Informes
                    </div>

                    {/* Nav Item - Pages Collapse Menu */}
                    <li className={`nav-item ${obtenerClaseActive('informes')}`}>
                        <a className="nav-link" href="/#" onClick={() => cambiarVista('informes')}>
                            <i className="fas fa-fw fa-book"></i>
                            <span>Generar informes</span>
                        </a>
                    </li>

                    {/* Divider */}
                    <hr className="sidebar-divider d-none d-md-block"></hr>

                </ul>
                {/* End of Sidebar */}

                {/* Content Wrapper */}
                <div id="content-wrapper" className="d-flex flex-column">

                    {/* Main Content */}
                    <div id="content">

                        {/* Topbar */}
                        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

                            {/* Sidebar Toggler */}
                            <button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" onClick={toggleSidebar}>
                                <i className="fas fa-bars"></i>
                            </button>

                            {/* Topbar Navbar */}
                            <ul className="navbar-nav ml-auto">

                                <div className="topbar-divider d-none d-sm-block"></div>

                                {/* Nav Item - User Information */}
                                <li className="nav-item dropdown no-arrow">
                                    <a className="nav-link dropdown-toggle" href="/#" id="userDropdown" role="button"
                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <span className="mr-2 d-none d-lg-inline text-gray-600 small">Brandon Sanderson</span>
                                        <img className="img-profile rounded-circle"
                                            src="img/profile.svg" alt="foto de perfil"></img>
                                    </a>
                                    {/* Dropdown - User Information */}
                                    <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                        aria-labelledby="userDropdown">
                                        <a className="dropdown-item" href="/#">
                                            <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                                            Mi perfil
                                        </a>
                                        <a className="dropdown-item" href="/#">
                                            <i className="fas fa-comments fa-sm fa-fw mr-2 text-gray-400"></i>
                                            Ayuda
                                        </a>
                                        <div className="dropdown-divider"></div>
                                        <a className="dropdown-item" href="/#" data-toggle="modal" data-target="#logoutModal">
                                            <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                            Cerrar sesión
                                        </a>
                                    </div>
                                </li>

                            </ul>

                        </nav>
                        {/* End of Topbar */}

                        {/* Begin Page Content */}
                        <div className="container-fluid">
                            {/* Aquí se carga el contenido de cada página */}
                            {contenido}
                        </div>

                    </div>
                    {/* End of Main Content */}

                </div>
                {/* End of Content Wrapper */}

            </div>
            {/* End of Page Wrapper */}

            {/* Scroll to Top Button*/}
            <a className="scroll-to-top rounded" href="#page-top">
                <i className="fas fa-angle-up"></i>
            </a>

            {/* Logout Modal*/}
            <div className="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="logoutModalLabel"
                aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="logoutModalLabel">¿Estas seguro?</h5>
                            <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">Se terminará tu sesión actual.</div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancelar</button>
                            <a className="btn btn-primary" href="login.html">Cerrar sesión</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Administrador;