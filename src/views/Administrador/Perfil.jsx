import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import FormInput from '../../components/FormInput';
import FormSelect from '../../components/FormSelect';
import ProfileCards from '../../components/ProfileCards';
import ConfirmationModal from '../../components/ConfirmationModal';
import { getColaborador, updateColaborador } from '../../services/colaboradores.js';

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
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ initialFormData });
    const [formErrors, setFormErrors] = useState({ initialFormErrors });
    const [isLoading, setIsLoading] = useState(false);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

    const [isEditing, setIsEditing] = useState(false);
    const [isConfimUpdateModalOpen, setIsConfimUpdateModalOpen] = useState(false);
    const [isDiscardUpdateModalOpen, setIsDiscardUpdateModalOpen] = useState(false);

    const loadUser = async () => {
        setLoading(true);
        try {
            const userData = await getColaborador('1004755763');
            setFormData(userData);
            console.log(userData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        setLoading(false);
    };

    useEffect(() => {
        loadUser();
    }, []);

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

    const handleEditFormChange = (name, value) => {
        if (isEditing) {
            setFormData(prevData => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const resetForm = () => {
        setFormData(initialFormData);
        setFormErrors(initialFormErrors);
    };

    const startEditing = () => {
        setIsEditing(true);
    };

    const updateUser = () => {
        if (validateForm()) {
            console.log('Datos válidos, editando colaborador...');
            setIsLoading(true);
            setIsEditing(false);
            updateColaborador(formData.numero_identificacion, formData)
                .then(response => {
                    console.log(response.message);
                    setIsConfimUpdateModalOpen(true);
                })
                .catch(error => {
                    console.error('Hubo un error al actualizar el colaborador:', error);
                    setIsErrorModalOpen(true);
                });
        } else {
            console.log('Datos inválidos');
        }
    };

    const closeConfirmUpdateModal = () => {
        setIsConfimUpdateModalOpen(false);
        resetForm();
        setIsEditing(false);
        setIsLoading(false);
        loadUser();
    };

    const closeErrorModal = () => {
        setIsErrorModalOpen(false);
        setIsLoading(false);
    };

    const closeDiscardUpdateModal = () => {
        setIsDiscardUpdateModalOpen(false);
    };

    const closeAndDiscardUpdateModal = () => {
        setIsDiscardUpdateModalOpen(false);
        resetForm();
        setIsEditing(false);
        loadUser();
    };

    return (
        <div>
            <Header title="Configuración de perfil" />
            <div className="d-sm-flex align-items-start justify-content-between mb-3">
                <Header subTitle="Información personal del colaborador del centro médico" />
            </div>

            <ProfileCards loading={loading}>
                {formData ? (
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

                        <div className="text-center mt-3">
                            {isEditing || isLoading ? (
                                <>
                                    <button
                                        type="button"
                                        className="btn btn-success w-25 mr-3"
                                        onClick={updateUser}
                                        disabled={isLoading}
                                    > {isLoading ? "Cargando..." : "Guardar"}
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-secondary w-25 mr-3"
                                        onClick={() => setIsDiscardUpdateModalOpen(true)}
                                        disabled={isLoading}
                                    > Cancelar
                                    </button>
                                </>
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
                ) : (
                    <p>Cargando...</p>
                )}
            </ProfileCards>


            <ConfirmationModal
                isOpen={isConfimUpdateModalOpen}
                title="Colaborador actualizado"
                message="El colaborador ha sido actualizado correctamente."
                footerButtons={
                    <>
                        <button type="button" className="btn btn-success w-25" onClick={closeConfirmUpdateModal}>Aceptar</button>
                    </>
                }
            />

            <ConfirmationModal
                isOpen={isErrorModalOpen}
                title="Error insperado"
                message="La solicitud no puedo ser efectuada debido a un error inesperado, por favor intente de nuevo."
                footerButtons={
                    <>
                        <button type="button" className="btn btn-danger w-25" onClick={closeErrorModal}>Aceptar</button>
                    </>
                }
            />

            <ConfirmationModal
                isOpen={isDiscardUpdateModalOpen}
                title="Descartar cambios"
                message="Tiene cambios sin guardar. ¿Está seguro de que quiere descartarlos?"
                footerButtons={
                    <>
                        <button type="button" className="btn btn-warning w-25" onClick={closeAndDiscardUpdateModal}>Descartar</button>
                        <button type="button" className="btn btn-secondary w-25" onClick={closeDiscardUpdateModal}>Cancelar</button>
                    </>
                }
            />
        </div>
    );
}

export default UserProfile;