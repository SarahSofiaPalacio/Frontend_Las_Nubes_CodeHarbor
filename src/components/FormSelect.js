import React from "react";

function FormSelect({ id, label, options, value, onChange, isEditing=true }) {
    return (
        <div className="form-group col-md-6">
            <label htmlFor={id}>{label}</label>
            <select 
                className="form-control" 
                id={id} 
                value={value} 
                onChange={onChange} 
                disabled={!isEditing}
            >
                {options.map(option => <option key={option} value={option}>{option}</option>)}
            </select>
        </div>
    );
}

export default FormSelect;
