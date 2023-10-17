import React from "react";

function AddLink({ label }) {
    return (
        <a href="/#" className="btn btn-sm btn-primary shadow-sm" data-toggle="modal" data-target="#addModal">
            <i className="fas fa-plus mr-3 text-white-50"></i>{label}
        </a>
    );
}

export default AddLink;
