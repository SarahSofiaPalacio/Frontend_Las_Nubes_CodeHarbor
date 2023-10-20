import React, { useEffect } from "react";

const LogoutModal = ({ isOpen, onCancel, onAccept }) => {
    
    useEffect(() => {
        if (isOpen) {
          document.body.classList.add('modal-open');
          document.body.insertAdjacentHTML('beforeend', '<div class="modal-backdrop fade show"></div>');
        } else {
          document.body.classList.remove('modal-open');
          const backdrop = document.querySelector('.modal-backdrop');
          if (backdrop) {
            document.body.removeChild(backdrop);
          }
        }
      }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div
            className="modal show"
            style={{ display: "block" }}
            id="logoutModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="logoutModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="logoutModalLabel">¿Estas seguro?</h5>
                        <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                            onClick={onCancel}
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">Se terminará tu sesión actual.</div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-dismiss="modal"
                            aria-label="Close"
                            onClick={onCancel}
                        >
                            Cancelar
                        </button>
                        <a className="btn btn-primary" href="login.html">Cerrar sesión</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LogoutModal;