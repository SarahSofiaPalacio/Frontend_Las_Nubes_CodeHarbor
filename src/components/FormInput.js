import React from "react";

function FormInput({ id, label, type="text", value, error, onChange, isEditing=true }) {
    return (
        <div className="form-group col-md-6">
            <label htmlFor={id}>{label}</label>
            <input 
                type={type} 
                className="form-control" 
                id={id} 
                value={value} 
                error={error}
                onChange={onChange} 
                readOnly={!isEditing} 
            />
            {error && <div className="error-message">{error}</div>}
        </div>
    );
}

export default FormInput;
