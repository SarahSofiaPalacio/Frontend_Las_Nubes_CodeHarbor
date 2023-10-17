import React from 'react';

function UserInfo({ userName, userImage }) {
    return (
      <li className="nav-item dropdown no-arrow">
          <a className="nav-link dropdown-toggle" href="/#" id="userDropdown" role="button"
              data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <span className="mr-2 d-none d-lg-inline text-gray-600 small">{userName}</span>
              <img className="img-profile rounded-circle" src={userImage} alt="foto de perfil" />
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
    );
  }

export default UserInfo;