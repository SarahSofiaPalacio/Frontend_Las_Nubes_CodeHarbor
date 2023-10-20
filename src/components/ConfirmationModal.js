import React from 'react';
import PropTypes from 'prop-types';

const ConfirmationModal = ({ isOpen, onCancel, onDiscard, message }) => {
    
    if (!isOpen) return null;

    return (
        <div
            className="modal show"
            style={{ display: "block" }}
            id="confirmationModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="confimationModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Confirmación</h5>
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
                    <div className="modal-body">
                        <p>{message}</p>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            aria-label="Cancel"
                            onClick={onCancel}
                        >
                            Cancelar
                        </button>
                        <button
                            type="button"
                            className="btn btn-danger"
                            data-dismiss="modal"
                            aria-label="Discard"
                            onClick={onDiscard}
                        >
                            Descartar Cambios
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

ConfirmationModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
    onDiscard: PropTypes.func.isRequired,
    message: PropTypes.string,
};

ConfirmationModal.defaultProps = {
    message: 'Tiene cambios sin guardar. ¿Está seguro de que quiere descartarlos?',
};

export default ConfirmationModal;
