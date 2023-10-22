import React from 'react';
import PropTypes from 'prop-types';

const ConfirmationModal = ({ isOpen, onCancel, title, message, footerButtons }) => {
    
    if (!isOpen) return null;

    return (
        <div
            className="modal show"
            style={{ display: "block" }}
            id="confirmationModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="confirmationModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
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
                        {footerButtons}
                    </div>
                </div>
            </div>
        </div>
    );
}

ConfirmationModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    footerButtons: PropTypes.object.isRequired,
};

ConfirmationModal.defaultProps = {
    message: 'Tiene cambios sin guardar. ¿Está seguro de que quiere descartarlos?',
};

export default ConfirmationModal;
