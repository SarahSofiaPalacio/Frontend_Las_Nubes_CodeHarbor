import React from "react";

function LogoutModal() {
    return (
      <div className="modal fade" id="logoutModal" tabIndex="-1" role="dialog" aria-labelledby="logoutModalLabel" aria-hidden="true">
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
    );
  }

export default LogoutModal;