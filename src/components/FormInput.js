// TextInput.js
import React from "react";

function FormInput({ id, label, type="text", isEditing=true}) {
    return (
        <div className="form-group col-md-6">
            <label htmlFor={id}>{label}</label>
            <input type={type} className="form-control" id={id} readOnly={!isEditing} />
        </div>
    );
}


export default FormInput;
