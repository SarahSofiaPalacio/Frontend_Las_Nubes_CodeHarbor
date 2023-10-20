import React from "react";

function AddButtom({ label, onClick }) {
    return (
        <a href="/#" className="btn btn-sm btn-primary shadow-sm" onClick={onClick}>
            <i className="fas fa-plus mr-3 text-white-50"></i>{label}
        </a>
    );
}

export default AddButtom;
