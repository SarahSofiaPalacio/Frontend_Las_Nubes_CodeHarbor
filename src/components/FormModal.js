import React, { useEffect, useRef } from "react";

const FormModal = ({ isOpen, title, children, footerButtons }) => {
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
      id="FormModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="FormModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header justify-content-center">
            <h5 className="modal-title">{title}</h5>
          </div>
          <div className="modal-body">
            {children}
          </div>
          <div className="modal-footer justify-content-center">
            {footerButtons}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormModal;
