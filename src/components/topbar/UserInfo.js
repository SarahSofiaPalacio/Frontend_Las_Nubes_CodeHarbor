import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useAuth } from '../../AuthContext';
import { logout } from '../../services/login';
import { getColaborador } from '../../services/colaboradores';
import ConfirmationModal from '../ConfirmationModal';

function UserInfo() {
    const { username, setUsername, setRole, setToken } = useAuth();
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const [userName, setUserName] = useState('Usuario');
    const [userImage, setUserImage] = useState(`${process.env.PUBLIC_URL}/img/profile.svg`);

    useEffect(() => {
        if (username) {
            console.log("Cargando datos del usuario (Topbar)...");
            getColaborador(username)
                .then(data => {
                    console.log("Datos del usuario cargados (Topbar): ", data);
                    if (data.nombre) setUserName(data.nombre);
                    if (data.foto) setUserImage(data.foto);
                })
                .catch(error => {
                    console.error("Error al cargar datos del usuario (Topbar): ", error);
                });
        }
    }, [username]);

    const openLogoutModal = () => {
        setIsLogoutModalOpen(true);
    };

    const closeLogoutModal = () => {
        setIsLogoutModalOpen(false);
    };

    const handleLogout = () => {
        logout()
            .then(response => {
                console.log("Sesión cerrada exitosamente:", response);
                Cookies.remove('username');
                Cookies.remove('token');
                Cookies.remove('role');
                setUsername(null);
                setRole(null);
                setToken(null);
                console.log("Datos de usuario eliminados de cookies y contexto.");
            })
            .catch(error => {
                console.error("Error al cerrar sesión:", error);
            });
        setIsLogoutModalOpen(false);
    };

    return (
        <li className="nav-item dropdown no-arrow">
            <button className="btn btn-link nav-link dropdown-toggle shadow-none" id="userDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span className="mr-2 d-none d-lg-inline text-gray-600 small">Bienvenido, {userName}</span>
                <img className="img-profile rounded-circle mx-auto d-block" src={userImage} alt="Foto de perfil" />
            </button>
            <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                aria-labelledby="userDropdown">
                <NavLink className="dropdown-item" to="perfil">
                    <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                    Mi perfil
                </NavLink>
                <button className="dropdown-item" onClick={openLogoutModal}>
                    <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                    Cerrar sesión
                </button>
            </div>
            <ConfirmationModal
                isOpen={isLogoutModalOpen}
                title="¿Estás seguro?"
                message="Se terminará tu sesión actual."
                footerButtons={
                    <>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleLogout}
                        >Cerrar sesión
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary w-25"
                            onClick={closeLogoutModal}
                        >Cancelar
                        </button>
                    </>
                }
            />
        </li>
    );
}

export default UserInfo;
