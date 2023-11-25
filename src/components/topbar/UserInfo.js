import { React, useState, useEffect} from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import Cookies from 'js-cookie';
import { logout } from '../../services/login';
import { getColaborador } from '../../services/colaboradores';
import ConfirmationModal from '../ConfirmationModal';

function UserInfo() {
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const [userName, setUserName] = useState('Usuario');
    const [userImage, setUserImage] = useState(`${process.env.PUBLIC_URL}/img/profile.svg`);
    const navigate = useNavigate();

    useEffect(() => {
        const username = Cookies.get('username');
        if (username) {
            getColaborador(username)
                .then(data => {
                    if (data.nombre) setUserName(data.nombre);
                    if (data.foto) setUserImage(data.foto);
                })
                .catch(error => {
                    console.error("Error fetching user data:", error);
                });
        }
    }, []);

    const openLogoutModal = () => {
        setIsLogoutModalOpen(true);
    };

    const closeLogoutModal = () => {
        setIsLogoutModalOpen(false);
    };

    const handleLogout = () => {
        setIsLogoutModalOpen(false);
        Cookies.remove('username');
        Cookies.remove('token');
        Cookies.remove('role');
        logout();
    };

    const onModalCloseComplete = () => {
        navigate('/');
    };

    return (
        <li className="nav-item dropdown no-arrow">
            <button className="btn btn-link nav-link dropdown-toggle" id="userDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ boxShadow: 'none' }}>
                <span className="mr-2 d-none d-lg-inline text-gray-600 small">Bienvenido, {userName}</span>
                <img className="img-profile rounded-circle mx-auto d-block" src={userImage} alt="Foto de perfil" />
            </button>
            <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                aria-labelledby="userDropdown">
                <NavLink className="dropdown-item" to="/perfil">
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
                onCloseComplete={onModalCloseComplete}
            />
        </li>
    );
}

export default UserInfo;
