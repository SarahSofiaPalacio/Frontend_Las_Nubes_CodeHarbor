import React from "react";

function FormInput({ id, label, type="text", value, onChange, isEditing=true }) {
    return (
        <div className="form-group col-md-6">
            <label htmlFor={id}>{label}</label>
            <input 
                type={type} 
                className="form-control" 
                id={id} 
                value={value} 
                onChange={onChange} 
                readOnly={!isEditing} 
            />
        </div>
    );
}

export default FormInput;
