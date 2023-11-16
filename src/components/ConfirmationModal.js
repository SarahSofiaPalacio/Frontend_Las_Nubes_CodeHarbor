import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const ConfirmationModal = ({ isOpen, title, message, footerButtons }) => {
    const hasBeenOpenedRef = useRef(false);

    useEffect(() => {
        if (isOpen) {
            if (!hasBeenOpenedRef.current && document.querySelector('.modal-backdrop')) {
                hasBeenOpenedRef.current = true;
                return;
            }
            document.body.classList.add('modal-open');
            document.body.insertAdjacentHTML('beforeend', '<div class="modal-backdrop fade show"></div>');
        } else {
            if (hasBeenOpenedRef.current) {
                hasBeenOpenedRef.current = false;
                return;
            }
            document.body.classList.remove('modal-open');
            const backdrop = document.querySelector('.modal-backdrop');
            if (backdrop) document.body.removeChild(backdrop);
        }
    }, [isOpen]);

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
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header justify-content-center">
                        <h5 className="modal-title">{title}</h5>
                    </div>
                    <div className="modal-body text-center">
                        <p>{message}</p>
                    </div>
                    <div className="modal-footer justify-content-center">
                        {footerButtons}
                    </div>
                </div>
            </div>
        </div>
    );
}

ConfirmationModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    footerButtons: PropTypes.object.isRequired,
};

ConfirmationModal.defaultProps = {
    message: 'Tiene cambios sin guardar. ¿Está seguro de que quiere descartarlos?',
};

export default ConfirmationModal;
