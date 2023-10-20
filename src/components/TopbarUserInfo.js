import React, { useState } from 'react';
import LogoutModal from './LogoutModal';

function TopbarUserInfo({ userName, userImage }) {

    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    const openLogoutModal = () => {
        setIsLogoutModalOpen(true);
    };

    const closeLogoutModal = () => {
        setIsLogoutModalOpen(false);
    };

    return (
      <li className="nav-item dropdown no-arrow">
          <a className="nav-link dropdown-toggle" href="/#" id="userDropdown" role="button"
              data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <span className="mr-2 d-none d-lg-inline text-gray-600 small">{userName}</span>
              <img className="img-profile rounded-circle" src={userImage} alt="foto de perfil" />
          </a>
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
              <a className="dropdown-item" href="/#" onClick={openLogoutModal}>
                  <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                  Cerrar sesión
              </a>
          </div>
            <LogoutModal
                isOpen={isLogoutModalOpen}
                onCancel={closeLogoutModal}
                onAccept={closeLogoutModal}
            />
      </li>
    );
  }

export default TopbarUserInfo;