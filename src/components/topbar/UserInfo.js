import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useAuth } from '../../auth/AuthContext';
import { logout } from '../../services/login';
import { getColaborador } from '../../services/colaboradores';
import ConfirmationModal from '../ConfirmationModal';

function UserInfo() {
    const { username, token, setUsername, setRole, setToken } = useAuth();
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const [userName, setUserName] = useState('Usuario');
    const [userImage, setUserImage] = useState(`${process.env.PUBLIC_URL}/img/profile.svg`);

    useEffect(() => {
        const handleObtenerColaborador = async () => {
            if (!token || !username) return;
            try {
                const data = await getColaborador(token, username);
                console.log("(Topbar) Datos del usuario cargados: ", data);
                if (data.nombre) setUserName(data.nombre);
                if (data.foto_url) setUserImage(data.foto_url);
            } catch (error) {
                console.error("(Topbar) Error al cargar datos del usuario: ", error);
            }
        };
        handleObtenerColaborador();
    }, [token, username]);

    const openLogoutModal = () => {
        setIsLogoutModalOpen(true);
    };

    const closeLogoutModal = () => {
        setIsLogoutModalOpen(false);
    };

    const handleLogout = async () => {
        try {
            const token = Cookies.get('token');
            const response = await logout(token);
            console.log("(Logout) Sesión cerrada exitosamente:", response);
            Cookies.remove('username');
            Cookies.remove('token');
            Cookies.remove('role');
            setUsername(null);
            setRole(null);
            setToken(null);
            console.log("(Logout) Datos de usuario eliminados de cookies y contexto.");
        } catch (error) {
            console.error("(Logout) Error al cerrar sesión:", error);
        } finally {
            setIsLogoutModalOpen(false);
        }
    };

    return (
        <li className="nav-item dropdown no-arrow">
            <button className="btn btn-link nav-link dropdown-toggle shadow-none" id="userDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span className="mr-2 d-none d-lg-inline text-gray-600 small">Bienvenido, {userName}</span>
                <img className="img-profile mx-auto d-block" src={userImage} alt="Foto de perfil" />
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
