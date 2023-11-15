import React, { useState, useEffect } from 'react';
import FormInput from '../../components/FormInput';
import FormSelect from '../../components/FormSelect';

const initialFormData = {
    tipo_identificacion: '',
    numero_identificacion: '',
    nombre: '',
    apellido: '',
    fecha_nacimiento: '',
    estado_civil: '',
    sexo: '',
    direccion: '',
    telefono: '',
    correo_electronico: '',
}

const initialFormErrors = {};

const initialFormSelectData = {
    tipo_identificacion: ['Seleccione...', 'CC', 'TI', 'RC', 'CE', 'CI', 'DNI', 'NIT', 'PASAPORTE'],
    estado_civil: ['Seleccione...', 'Soltero', 'Casado', 'Viudo', 'Divorciado', 'Unión libre'],
    sexo: ['Seleccione...', 'Masculino', 'Femenino', 'No binario']
}

function UserProfile() {
    const [selectedUser, setSelectedUser] = useState(null);
    const [formData, setFormData] = useState({ initialFormData });
    const [formErrors, setFormErrors] = useState({ initialFormErrors });
    const [isLoading, setIsLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const validateForm = () => {
        const errors = {};
        if (!formData.tipo_identificacion || !formData.tipo_identificacion.trim()) {
            errors.tipo_identificacion = "Tipo de documento es requerido";
        }
        if (!formData.numero_identificacion || !formData.numero_identificacion.trim()) {
            errors.numero_identificacion = "Número de documento es requerido";
        } else if (!/^\d{7,10}$/.test(formData.numero_identificacion.trim())) {
            errors.numero_identificacion = "Número de documento inválido, debe tener entre 7 y 10 dígitos";
        }
        if (!formData.nombre || !formData.nombre.trim()) {
            errors.nombre = "Nombres son requeridos";
        } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(formData.nombre.trim())) {
            errors.nombre = "Nombres inválidos, solo se permiten letras y espacios";
        }
        if (!formData.apellido || !formData.apellido.trim()) {
            errors.apellido = "Apellidos son requeridos";
        } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(formData.apellido.trim())) {
            errors.apellido = "Apellidos inválidos, solo se permiten letras y espacios";
        }
        if (!formData.fecha_nacimiento) {
            errors.fecha_nacimiento = "Fecha de nacimiento es requerida";
        } else if (new Date(formData.fecha_nacimiento) > new Date()) {
            errors.fecha_nacimiento = "Fecha de nacimiento no puede ser una fecha futura";
        }
        if (!formData.estado_civil || formData.estado_civil === "Seleccione...") {
            errors.estado_civil = "Estado civil es requerido";
        }
        if (!formData.sexo || formData.sexo === "Seleccione...") {
            errors.sexo = "Sexo es requerido";
        }
        if (!formData.direccion || !formData.direccion.trim()) {
            errors.direccion = "Dirección es requerida";
        }
        if (!formData.telefono || !formData.telefono.trim()) {
            errors.telefono = "Teléfono es requerido";
        } else if (!/^\d{7,10}$/.test(formData.telefono.trim())) {
            errors.telefono = "Teléfono inválido, debe tener entre 7 y 10 dígitos";
        }
        if (!formData.correo_electronico || !formData.correo_electronico.trim()) {
            errors.correo_electronico = "Correo Electrónico es requerido";
        } else if (!/^\S+@\S+\.\S+$/.test(formData.correo_electronico.trim())) {
            errors.correo_electronico = "Correo Electrónico inválido";
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const startEditing = () => {
        setIsEditing(true);
    };

    const handleEditFormChange = (name, value) => {
        if (isEditing) {
            setSelectedUser(prevState => ({
                ...prevState,
                [name]: value,
            }));
            setFormData(prevData => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const updateUser = () => {
        if (validateForm()) {
            console.log('Datos válidos, editando paciente...');
            setIsLoading(true);
            //setIsEditing(false);
            updatePaciente(selectedUser.numero_identificacion, formData)
                .then(response => {
                    console.log(response.message);
                    setIsConfimUpdateModalOpen(true);
                })
                .catch(error => {
                    console.error('Hubo un error al actualizar el paciente:', error);
                    setIsErrorModalOpen(true);
                });
        } else {
            console.log('Datos inválidos');
        }
    };

    return (
        <div className="container mt-4">
            <div className="row">
                {/* Columna para la foto de perfil */}
                <div className="col-lg-4">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-primary">Foto de Perfil</h6>
                        </div>
                        <div className="card-body text-center">
                            <img
                                src="path_to_profile_picture.jpg"
                                alt="Foto de perfil"
                                className="rounded-circle mb-3"
                                style={{ width: '150px', height: '150px' }}
                            />
                            <p>JPG o PNG no mayor a 5 MB</p>
                            <button className="btn btn-primary">Cambiar foto</button>
                        </div>
                    </div>
                </div>

                {/* Columna para la información personal */}
                <div className="col-lg-8">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-primary">Información Personal</h6>
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="form-row">
                                    <FormSelect
                                        label="Tipo de documento"
                                        id="tipo_identificacion"
                                        type="text"
                                        options={initialFormSelectData.tipo_identificacion}
                                        value={formData.tipo_identificacion}
                                        error={formErrors.tipo_identificacion}
                                        isEditing={isEditing}
                                        onChange={(e) => handleEditFormChange('tipo_identificacion', e.target.value)}
                                    />
                                    <FormInput
                                        label="Número de documento"
                                        id="numero_identificacion"
                                        type="number"
                                        value={formData.numero_identificacion}
                                        error={formErrors.numero_identificacion}
                                        isEditing={isEditing}
                                        onChange={(e) => handleEditFormChange('numero_identificacion', e.target.value)}
                                    />
                                </div>
                                <div className="form-row">
                                    <FormInput
                                        label="Nombres"
                                        id="nombre"
                                        type="text"
                                        value={formData.nombre}
                                        error={formErrors.nombre}
                                        isEditing={isEditing}
                                        onChange={(e) => handleEditFormChange('nombre', e.target.value)}
                                    />
                                    <FormInput
                                        label="Apellidos"
                                        id="apellido"
                                        type="text"
                                        value={formData.apellido}
                                        error={formErrors.apellido}
                                        isEditing={isEditing}
                                        onChange={(e) => handleEditFormChange('apellido', e.target.value)}
                                    />
                                </div>
                                <div className="form-row">
                                    <FormInput
                                        label="Fecha de Nacimiento"
                                        id="fecha_nacimiento"
                                        type="date"
                                        value={formData.fecha_nacimiento}
                                        error={formErrors.fecha_nacimiento}
                                        isEditing={isEditing}
                                        onChange={(e) => handleEditFormChange('fecha_nacimiento', e.target.value)}
                                    />
                                    <FormSelect
                                        label="Estado Civil"
                                        id="estado_civil"
                                        options={initialFormSelectData.estado_civil}
                                        value={formData.estado_civil}
                                        error={formErrors.estado_civil}
                                        isEditing={isEditing}
                                        onChange={(e) => handleEditFormChange('estado_civil', e.target.value)}
                                    />
                                </div>
                                <div className="form-row">
                                    <FormSelect
                                        label="Sexo"
                                        id="sexo"
                                        options={initialFormSelectData.sexo}
                                        value={formData.sexo}
                                        error={formErrors.sexo}
                                        isEditing={isEditing}
                                        onChange={(e) => handleEditFormChange('sexo', e.target.value)}
                                    />
                                    <FormInput
                                        label="Dirección"
                                        id="direccion"
                                        type="text"
                                        value={formData.direccion}
                                        error={formErrors.direccion}
                                        isEditing={isEditing}
                                        onChange={(e) => handleEditFormChange('direccion', e.target.value)}
                                    />
                                </div>
                                <div className="form-row">
                                    <FormInput
                                        label="Teléfono"
                                        id="telefono"
                                        type="number"
                                        value={formData.telefono}
                                        error={formErrors.telefono}
                                        isEditing={isEditing}
                                        onChange={(e) => handleEditFormChange('telefono', e.target.value)}
                                    />
                                    <FormInput
                                        label="Correo Electrónico"
                                        id="correo_electronico"
                                        type="email"
                                        value={formData.correo_electronico}
                                        error={formErrors.correo_electronico}
                                        isEditing={isEditing}
                                        onChange={(e) => handleEditFormChange('correo_electronico', e.target.value)}
                                    />
                                </div>

                                <div className="text-right mt-3">
                                    {isEditing ? (
                                        <button
                                            type="button"
                                            className="btn btn-success w-25"
                                            onClick={updateUser}
                                            disabled={isLoading}
                                        > {isLoading ? "Cargando..." : "Guardar"}
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            className="btn btn-primary w-25"
                                            onClick={startEditing}
                                            disabled={isLoading}
                                        > Editar
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;