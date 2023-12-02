import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import { logout } from '../../services/login';
import { getColaborador } from '../../services/colaboradores';
import { getPaciente } from '../../services/pacientes';
import ConfirmationModal from '../ConfirmationModal';

function UserInfo() {
    const navigate = useNavigate();
    const { token, role, username, name, setName, foto, setFoto, handleLogout } = useAuth();
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const [isLoadingLogout, setIsLoadingLogout] = useState(false);

    useEffect(() => {
        const handleGetUser = async () => {
            if (!token || !username) return;
            try {
                let data;
                if (role === 'Paciente') data = await getPaciente(token, username);
                else data = await getColaborador(token, username);
                console.log("(Topbar) Datos del usuario cargados: ", data);
                if (data.nombre && data.apellido) setName(`${data.nombre} ${data.apellido}`);
                else setName('Usuario');
                if (data.foto_url) setFoto(data.foto_url);
                else setFoto(`${process.env.PUBLIC_URL}/img/profile.svg`);
            } catch (error) {
                if (error.response === 'Sesión expirada') {
                    console.log("(Error) Token inválido. Cerrando sesión...");
                    await handleLogout();
                    navigate('/login');
                } else console.error("(Error) Error en la solicitud: ", error);
            }
        };
        handleGetUser();
    }, [token, username, role, setName, setFoto, handleLogout, navigate]);

    const openLogoutModal = () => {
        setIsLogoutModalOpen(true);
    };

    const closeLogoutModal = () => {
        setIsLogoutModalOpen(false);
    };

    const handleOut = async () => {
        setIsLoadingLogout(true);
        try {
            const response = await logout(token);
            console.log("(Logout) Sesión cerrada exitosamente:", response);
            await handleLogout();
            navigate('/login');
        } catch (error) {
            if (error.response === 'Sesión expirada') {
                console.log("(Error) Token inválido. Cerrando sesión...");
                await handleLogout();
                navigate('/login');
            } else console.error("(Error) Error en la solicitud: ", error);
        } finally {
            setIsLoadingLogout(false);
            setIsLogoutModalOpen(false);
        }
    };

    return (
        <li className="nav-item dropdown no-arrow">
            <button className="btn btn-link nav-link dropdown-toggle shadow-none" id="userDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span className="mr-2 d-none d-lg-inline text-gray-600 small">Bienvenido, {name}</span>
                <img className="img-profile mx-auto d-block" src={foto} alt="Foto de perfil" />
            </button>
            <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                aria-labelledby="userDropdown">
                <NavLink className="dropdown-item" to="/dashboard/perfil">
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
                            onClick={handleOut}
                            disabled={isLoadingLogout}
                        >{isLoadingLogout ? "Cerrando sesión..." : "Cerrar sesión"}
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary w-25"
                            onClick={closeLogoutModal}
                            disabled={isLoadingLogout}
                        >Cancelar
                        </button>
                    </>
                }
            />
        </li>
    );
}

export default UserInfo;
