import React, { useState, useEffect, useCallback, useRef } from 'react';
import LoadingSpinner from '../../components/LoadingSpinner';
import Header from '../../components/Header';
import FormInput from '../../components/FormInput';
import FormSelect from '../../components/FormSelect';
import ProfileCards from '../../components/ProfileCards';
import ConfirmationModal from '../../components/ConfirmationModal';
import { getColaborador, updateColaborador } from '../../services/colaboradores.js';
import { useAuth } from '../../auth/AuthContext.js';

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
    salario: '',
    jerarquia: '',
    fecha_ingreso: '',
    especialidad: '',
    foto: '',
}

const initialFormErrors = {};

const initialFormSelectData = {
    tipo_identificacion: ['Seleccione...', 'CC', 'TI', 'RC', 'CE', 'CI', 'DNI', 'NIT', 'PASAPORTE'],
    estado_civil: ['Seleccione...', 'Soltero', 'Casado', 'Viudo', 'Divorciado', 'Unión libre'],
    sexo: ['Seleccione...', 'Masculino', 'Femenino', 'No binario'],
    jerarquia: ['Seleccione...', 'Médico', 'Enfermero', 'Secretario', 'Regente de farmacia', 'Administrador'],
    especialidad: ['Seleccione...', 'Medicina general', 'Pediatría', 'Ginecología', 'Cardiología', 'Neurología', 'Oftalmología', 'Otorrinolaringología', 'Dermatología', 'Psiquiatría', 'Oncología', 'Traumatología', 'Urología', 'Endocrinología', 'Gastroenterología', 'Nefrología', 'Reumatología', 'Hematología', 'Infectología', 'Neumología', 'Geriatría'],
}

function UserProfile() {
    const [isLoadingContent, setIsLoadingContent] = useState(true);

    const { username } = useAuth();
    const fileInputRef = useRef();

    const [isLoadingForm, setLoadingForm] = useState(false);
    const [formData, setFormData] = useState({ initialFormData });
    const [formErrors, setFormErrors] = useState({ initialFormErrors });
    const [isLoadingRequest, setIsLoadingRequest] = useState(false);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

    const [isFormEditing, setIsFormEditing] = useState(false);
    const [isConfimUpdateModalOpen, setIsConfimUpdateModalOpen] = useState(false);
    const [isDiscardUpdateModalOpen, setIsDiscardUpdateModalOpen] = useState(false);

    const loadUser = useCallback(() => {
        console.log('Cargando datos del colaborador...');
        setLoadingForm(true);
        getColaborador(username)
            .then(response => {
                console.log('Datos del colaborador cargados: ', response);
                setFormData(response);
            })
            .catch(error => {
                console.error('Error al cargar los datos del colaborador: ', error);
                setIsErrorModalOpen(true);
            })
            .finally(() => {
                setLoadingForm(false);
                setIsLoadingContent(false);
            });
    }, [username]);

    useEffect(() => {
        loadUser();
    }, [loadUser]);

    if (isLoadingContent) return <LoadingSpinner />;

    const validateForm = () => {
        const errors = {};
        if (!formData.tipo_identificacion || formData.tipo_identificacion === "Seleccione...") {
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
        if (!formData.salario || !formData.salario.trim()) {
            errors.salario = "Salario es requerido";
        } else if (!/^\d+$/.test(formData.salario.trim())) {
            errors.salario = "Salario inválido, solo se permiten números";
        }
        if (!formData.jerarquia || formData.jerarquia === "Seleccione...") {
            errors.jerarquia = "Jerarquía es requerida";
        }
        if (!formData.fecha_ingreso) {
            errors.fecha_ingreso = "Fecha de ingreso es requerida";
        } else if (new Date(formData.fecha_ingreso) > new Date()) {
            errors.fecha_ingreso = "Fecha de ingreso no puede ser una fecha futura";
        }
        if (formData.jerarquia === 'Médico' && (!formData.especialidad || formData.especialidad === "Seleccione...")) {
            errors.especialidad = "Especialidad es requerida";
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleEditFormChange = (name, value) => {
        if (isFormEditing) {
            setFormData(prevData => {
                const newValues = { ...prevData, [name]: value };
                if (name === 'jerarquia' && value !== 'Médico') {
                    newValues.especialidad = 'Seleccione...';
                }
                return newValues;
            });
        }
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file && (file.type === "image/jpeg" || file.type === "image/png") && file.size <= 5000000) {
            await updateUser(file); // Llama a uploadUser inmediatamente después de seleccionar un archivo válido
        } else {
            alert("El archivo debe ser una imagen JPG o PNG y no mayor a 5 MB.");
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current.click(); // Activa el input oculto
    };

    const resetForm = () => {
        setFormData(initialFormData);
        setFormErrors(initialFormErrors);
    };

    const startEditing = () => {
        setIsFormEditing(true);
    };

    const updateUser = () => {
        if (validateForm()) {
            console.log('Datos válidos, editando colaborador...');
            setIsLoadingRequest(true);
            setIsFormEditing(false);
            updateColaborador(formData.numero_identificacion, formData)
                .then(response => {
                    console.log("Colaborador editado: ", response.message);
                    setIsConfimUpdateModalOpen(true);
                })
                .catch(error => {
                    console.error('Hubo un error al editar el colaborador: ', error);
                    setIsErrorModalOpen(true);
                });
        } else {
            console.log('Datos inválidos.');
        }
    };

    const closeConfirmUpdateModal = () => {
        setIsConfimUpdateModalOpen(false);
        resetForm();
        setIsFormEditing(false);
        setIsLoadingRequest(false);
        loadUser();
    };

    const closeErrorModal = () => {
        setIsErrorModalOpen(false);
        setIsLoadingRequest(false);
    };

    const closeDiscardUpdateModal = () => {
        setIsDiscardUpdateModalOpen(false);
    };

    const closeAndDiscardUpdateModal = () => {
        setIsDiscardUpdateModalOpen(false);
        resetForm();
        setIsFormEditing(false);
        loadUser();
    };

    return (
        <div>
            <Header 
                title="Configuración de perfil"
                subTitle="Información personal del colaborador del centro médico"
            />

            {/* Perfil de colaborador */}

            <ProfileCards
                loading={isLoadingForm}
                profilePicture={
                    <>
                        <img
                            src={formData.foto ? formData.foto : `${process.env.PUBLIC_URL}/img/profile.svg`}
                            alt="Foto de perfil"
                            className="img-profile mb-3 rounded-circle mx-auto d-block img-fluid w-50 w-sm-75 w-md-100"
                        />
                        <p>JPG, JPEG o PNG no mayor a 5 MB</p>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            accept=".jpg,.jpeg,.png"
                            style={{ display: 'none' }} // Oculta el input
                            ref={fileInputRef} // Referencia al input
                        />
                        <button className="btn btn-primary" onClick={handleButtonClick} disabled={isLoadingRequest || isFormEditing}>
                            Cambiar foto
                        </button>
                    </>
                }
                profileForm={
                    <>
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
                                        isFormEditing={isFormEditing}
                                        onChange={(e) => handleEditFormChange('tipo_identificacion', e.target.value)}
                                    />
                                    <FormInput
                                        label="Número de documento"
                                        id="numero_identificacion"
                                        type="number"
                                        value={formData.numero_identificacion}
                                        error={formErrors.numero_identificacion}
                                        isFormEditing={isFormEditing}
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
                                        isFormEditing={isFormEditing}
                                        onChange={(e) => handleEditFormChange('nombre', e.target.value)}
                                    />
                                    <FormInput
                                        label="Apellidos"
                                        id="apellido"
                                        type="text"
                                        value={formData.apellido}
                                        error={formErrors.apellido}
                                        isFormEditing={isFormEditing}
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
                                        isFormEditing={isFormEditing}
                                        onChange={(e) => handleEditFormChange('fecha_nacimiento', e.target.value)}
                                    />
                                    <FormSelect
                                        label="Estado Civil"
                                        id="estado_civil"
                                        options={initialFormSelectData.estado_civil}
                                        value={formData.estado_civil}
                                        error={formErrors.estado_civil}
                                        isFormEditing={isFormEditing}
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
                                        isFormEditing={isFormEditing}
                                        onChange={(e) => handleEditFormChange('sexo', e.target.value)}
                                    />
                                    <FormInput
                                        label="Dirección"
                                        id="direccion"
                                        type="text"
                                        value={formData.direccion}
                                        error={formErrors.direccion}
                                        isFormEditing={isFormEditing}
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
                                        isFormEditing={isFormEditing}
                                        onChange={(e) => handleEditFormChange('telefono', e.target.value)}
                                    />
                                    <FormInput
                                        label="Correo Electrónico"
                                        id="correo_electronico"
                                        type="email"
                                        value={formData.correo_electronico}
                                        error={formErrors.correo_electronico}
                                        isFormEditing={isFormEditing}
                                        onChange={(e) => handleEditFormChange('correo_electronico', e.target.value)}
                                    />
                                </div>
                                <div className="form-row">
                                    <FormInput
                                        label="Salario"
                                        id="salario"
                                        type="number"
                                        value={formData.salario}
                                        error={formErrors.salario}
                                        isFormEditing={isFormEditing}
                                        onChange={(e) => handleEditFormChange('salario', e.target.value)}
                                    />
                                    <FormSelect
                                        label="Jerarquía"
                                        id="jerarquia"
                                        options={initialFormSelectData.jerarquia}
                                        value={formData.jerarquia}
                                        error={formErrors.jerarquia}
                                        isFormEditing={isFormEditing}
                                        onChange={(e) => handleEditFormChange('jerarquia', e.target.value)}
                                    />
                                </div>
                                <div className="form-row">
                                    <FormInput
                                        label="Fecha de ingreso"
                                        id="fecha_ingreso"
                                        type="date"
                                        value={formData.fecha_ingreso}
                                        error={formErrors.fecha_ingreso}
                                        isFormEditing={isFormEditing}
                                        onChange={(e) => handleEditFormChange('fecha_ingreso', e.target.value)}
                                    />
                                    <FormSelect
                                        label="Especialidad"
                                        id="especialidad"
                                        type="text"
                                        options={initialFormSelectData.especialidad}
                                        value={formData.especialidad}
                                        error={formErrors.especialidad}
                                        isFormEditing={isFormEditing && formData.jerarquia === 'Médico'}
                                        onChange={(e) => handleEditFormChange('especialidad', e.target.value)}
                                    />
                                </div>

                                <div className="text-center mt-3">
                                    {isFormEditing || isLoadingRequest ? (
                                        <>
                                            <button
                                                type="button"
                                                className="btn btn-success w-25 mr-3"
                                                onClick={updateUser}
                                                disabled={isLoadingRequest}
                                            > {isLoadingRequest ? "Cargando..." : "Guardar"}
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-secondary w-25 mr-3"
                                                onClick={() => setIsDiscardUpdateModalOpen(true)}
                                                disabled={isLoadingRequest}
                                            > Cancelar
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            type="button"
                                            className="btn btn-primary w-25"
                                            onClick={startEditing}
                                            disabled={isLoadingRequest}
                                        > Editar
                                        </button>
                                    )}
                                </div>
                            </form>
                        ) : (
                            <p>Cargando...</p>
                        )}
                    </>
                }
            />

            {/* Modal de error inesperado */}

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

            {/* Modal actualizado correctamente */}

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

            {/* Modal descartar cambios */}

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