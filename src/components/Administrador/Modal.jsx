import React from "react";

function ModalForm(props) {
    return (
      <div className="modal fade" id={props.modalId} tabIndex="-1" role="dialog" aria-labelledby={`${props.modalId}Label`} aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id={`${props.modalId}Label`}>{props.title}</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {props.children}
            </div>
            <div className="modal-footer">
              {props.footerButtons}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default ModalForm;