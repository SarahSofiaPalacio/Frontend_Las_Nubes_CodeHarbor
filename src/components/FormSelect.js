import React from "react";

function FormSelect({ id, label, type, options, value, error, onChange, isEditing=true }) {
    return (
        <div className="form-group col-md-6">
            <label htmlFor={id}>{label}</label>
            <select 
                className="form-control" 
                id={id} 
                value={value} 
                error={error}
                onChange={onChange} 
                disabled={!isEditing}
            >
                {options.map(option => <option key={option} value={option}>{option}</option>)}
            </select>
            {error && <div class="error-message">{error}</div>}
        </div>
    );
}

export default FormSelect;
