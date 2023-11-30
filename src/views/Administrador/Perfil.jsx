import React, { useState, useEffect, useCallback, useRef } from 'react';
import LoadingSpinner from '../../components/LoadingSpinner';
import Header from '../../components/Header';
import FormInput from '../../components/FormInput';
import FormSelect from '../../components/FormSelect';
import ProfileCards from '../../components/ProfileCards';
import ConfirmationModal from '../../components/ConfirmationModal';
import { useAuth } from '../../auth/AuthContext.js';

import { colaboradorInitialFormData, colaboradorFormSelectOptions } from '../../assets/ColaboradorData.js';
import { getColaborador, updateColaborador } from '../../services/colaboradores.js';

function UserProfile() {
    const { token, username, setName, setFoto } = useAuth();

    const fileInputRef = useRef();
    const [isPhotoUpdated, setIsPhotoUpdated] = useState(false);

    const [isLoadingContent, setIsLoadingContent] = useState(true);
    const [isLoadingForm, setLoadingForm] = useState(false);

    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [isConfimUpdateModalOpen, setIsConfirmUpdateModalOpen] = useState(false);
    const [isDiscardUpdateModalOpen, setIsDiscardUpdateModalOpen] = useState(false);
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);

    const [isFormEditing, setIsFormEditing] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [formData, setFormData] = useState({ colaboradorInitialFormData });

    // Cargar datos del colaborador

    const loadUser = useCallback(async () => {
        setLoadingForm(true);
        try {
            const data = await getColaborador(token, username);
            console.log("(Perfil) Datos del usuario cargados: ", data);
            setName(`${data.nombre} ${data.apellido}`);
            setFoto(data.foto_url);
            setFormData(data);
        } catch (error) {
            console.error("(Perfil) Error al cargar datos del usuario: ", error);
            setIsErrorModalOpen(true);
        } finally {
            setLoadingForm(false);
            setIsLoadingContent(false);
        }
    }, [token, username, setName, setFoto]);

    useEffect(() => {
        loadUser();
    }, [loadUser]);

    // Validar formulario de colaborador

    const validateForm = useCallback(() => {
        const errors = {};
        if (!formData.tipo_identificacion || formData.tipo_identificacion === "Seleccione...") {
            errors.tipo_identificacion = "Tipo de documento es requerido";
        } else if (!colaboradorFormSelectOptions.tipo_identificacion.includes(formData.tipo_identificacion)) {
            errors.tipo_identificacion = "Tipo de identificación seleccionado no es válido";
        }
        if (!formData.numero_identificacion) {
            errors.numero_identificacion = "Número de documento es requerido";
        } else if (!/^\d{7,10}$/.test(formData.numero_identificacion)) {
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
        } else if (!colaboradorFormSelectOptions.estado_civil.includes(formData.estado_civil)) {
            errors.estado_civil = "Estado civil seleccionado no es válido";
        }
        if (!formData.sexo || formData.sexo === "Seleccione...") {
            errors.sexo = "Sexo es requerido";
        } else if (!colaboradorFormSelectOptions.sexo.includes(formData.sexo)) {
            errors.sexo = "Sexo seleccionado no es válido";
        }
        if (!formData.direccion || !formData.direccion.trim()) {
            errors.direccion = "Dirección es requerida";
        }
        if (!formData.telefono) {
            errors.telefono = "Teléfono es requerido";
        } else if (!/^\d{7,10}$/.test(formData.telefono)) {
            errors.telefono = "Teléfono inválido, debe tener entre 7 y 10 dígitos";
        }
        if (!formData.correo_electronico || !formData.correo_electronico.trim()) {
            errors.correo_electronico = "Correo Electrónico es requerido";
        } else if (!/^\S+@\S+\.\S+$/.test(formData.correo_electronico.trim())) {
            errors.correo_electronico = "Correo Electrónico inválido";
        }
        if (!formData.salario) {
            errors.salario = "Salario es requerido";
        } else if (!/^\d+$/.test(formData.salario)) {
            errors.salario = "Salario inválido, solo se permiten números";
        }
        if (!formData.jerarquia || formData.jerarquia === "Seleccione...") {
            errors.jerarquia = "Jerarquía es requerida";
        } else if (!colaboradorFormSelectOptions.jerarquia.includes(formData.jerarquia)) {
            errors.jerarquia = "Jerarquía seleccionada no es válida";
        }
        if (!formData.fecha_ingreso) {
            errors.fecha_ingreso = "Fecha de ingreso es requerida";
        } else if (new Date(formData.fecha_ingreso) > new Date()) {
            errors.fecha_ingreso = "Fecha de ingreso no puede ser una fecha futura";
        }
        if (formData.jerarquia === 'Médico' && (!formData.especialidad || formData.especialidad === "Seleccione...")) {
            errors.especialidad = "Especialidad es requerida";
        } else if (!colaboradorFormSelectOptions.especialidad.includes(formData.especialidad)) {
            errors.especialidad = "Especialidad seleccionada no es válida";
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    }, [formData]);

    const updatePhoto = useCallback(async () => {
        if (formData.foto_url && formData.foto_url instanceof File) {
            setIsLoadingUpdate(true);
            try {
                const formDataObj = new FormData();
                formDataObj.append('foto_url', formData.foto_url, formData.foto_url.name);
                const response = await updateColaborador(token, username, formDataObj);
                console.log('(Perfil) Foto del usuario actualizada: ', response);
                setIsConfirmUpdateModalOpen(true);
            } catch (error) {
                console.error('(Perfil) Error al actualizar la foto: ', error);
                setIsErrorModalOpen(true);
            }
        }
    }, [token, username, formData.foto_url]);

    const updateUserDetails = async () => {
        if (validateForm()) {
            setIsLoadingUpdate(true);
            setIsFormEditing(false);
            try {
                const newData = Object.keys(colaboradorInitialFormData).reduce((acc, key) => {
                    if (key !== 'foto_url') {
                        acc[key] = formData[key] ?? colaboradorInitialFormData[key];
                    }
                    return acc;
                }, {});
                const response = await updateColaborador(token, username, newData);
                console.log('(Perfil) Datos del usuario actualizados: ', response);
                setIsConfirmUpdateModalOpen(true);
            } catch (error) {
                console.error('(Perfil) Error al actualizar datos del usuario: ', error);
                setIsErrorModalOpen(true);
            }
        } else {
            console.error('(Perfil) Datos inválidos.');
        }
    };

    useEffect(() => {
        if (isPhotoUpdated) {
            updatePhoto();
            setIsPhotoUpdated(false);
        }
    }, [isPhotoUpdated, updatePhoto]);

    if (isLoadingContent) return <LoadingSpinner />;

    // Funciones auxiliares

    const convertISOToSimpleDate = (isoDateString) => {
        if (!isoDateString) return;
        const date = new Date(isoDateString);
        return date.toISOString().split('T')[0];
    };


    // Manejar cambios en el formulario de colaborador

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
            console.log('(Perfil) Foto de perfil cargada: ', file);
            setFormData(prevFormData => ({
                ...prevFormData,
                foto_url: file
            }));
            setIsPhotoUpdated(true);
        } else {
            alert("El archivo debe ser una imagen JPG o PNG y no mayor a 5 MB.");
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const resetForm = () => {
        setFormData(colaboradorInitialFormData);
        setFormErrors({});
    };

    const startEditing = () => {
        setIsFormEditing(true);
    };

    const closeConfirmUpdateModal = () => {
        setIsConfirmUpdateModalOpen(false);
        resetForm();
        setIsFormEditing(false);
        setIsLoadingUpdate(false);
        loadUser();
    };

    const closeErrorModal = () => {
        setIsErrorModalOpen(false);
        setIsLoadingUpdate(false);
        loadUser();
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
                subTitle="Información personal del administrador del centro médico"
            />

            {/* Perfil de administrador */}

            <ProfileCards
                loading={isLoadingForm}
                profilePicture={
                    <>
                        <img
                            src={formData.foto_url ? formData.foto_url : `${process.env.PUBLIC_URL}/img/profile.svg`}
                            alt="Foto de perfil"
                            className="img-profile mx-auto d-block mb-3"
                        />
                        <p>JPG, JPEG o PNG no mayor a 5 MB</p>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            accept=".jpg,.jpeg,.png"
                            style={{ display: 'none' }}
                            ref={fileInputRef}
                        />
                        <button className="btn btn-primary" onClick={handleButtonClick} disabled={isLoadingUpdate || isFormEditing}>
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
                                        options={colaboradorFormSelectOptions.tipo_identificacion}
                                        value={formData.tipo_identificacion || ''}
                                        error={formErrors.tipo_identificacion}
                                        isFormEditing={isFormEditing}
                                        onChange={(e) => handleEditFormChange('tipo_identificacion', e.target.value)}
                                    />
                                    <FormInput
                                        label="Número de documento"
                                        id="numero_identificacion"
                                        type="number"
                                        value={formData.numero_identificacion || ''}
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
                                        value={formData.nombre || ''}
                                        error={formErrors.nombre}
                                        isFormEditing={isFormEditing}
                                        onChange={(e) => handleEditFormChange('nombre', e.target.value)}
                                    />
                                    <FormInput
                                        label="Apellidos"
                                        id="apellido"
                                        type="text"
                                        value={formData.apellido || ''}
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
                                        value={convertISOToSimpleDate(formData.fecha_nacimiento) || ''}
                                        error={formErrors.fecha_nacimiento}
                                        isFormEditing={isFormEditing}
                                        onChange={(e) => handleEditFormChange('fecha_nacimiento', e.target.value)}
                                    />
                                    <FormSelect
                                        label="Estado Civil"
                                        id="estado_civil"
                                        options={colaboradorFormSelectOptions.estado_civil}
                                        value={formData.estado_civil || ''}
                                        error={formErrors.estado_civil}
                                        isFormEditing={isFormEditing}
                                        onChange={(e) => handleEditFormChange('estado_civil', e.target.value)}
                                    />
                                </div>
                                <div className="form-row">
                                    <FormSelect
                                        label="Sexo"
                                        id="sexo"
                                        options={colaboradorFormSelectOptions.sexo}
                                        value={formData.sexo || ''}
                                        error={formErrors.sexo}
                                        isFormEditing={isFormEditing}
                                        onChange={(e) => handleEditFormChange('sexo', e.target.value)}
                                    />
                                    <FormInput
                                        label="Dirección"
                                        id="direccion"
                                        type="text"
                                        value={formData.direccion || ''}
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
                                        value={formData.telefono || ''}
                                        error={formErrors.telefono}
                                        isFormEditing={isFormEditing}
                                        onChange={(e) => handleEditFormChange('telefono', e.target.value)}
                                    />
                                    <FormInput
                                        label="Correo Electrónico"
                                        id="correo_electronico"
                                        type="email"
                                        value={formData.correo_electronico || ''}
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
                                        value={formData.salario || ''}
                                        error={formErrors.salario}
                                        isFormEditing={isFormEditing}
                                        onChange={(e) => handleEditFormChange('salario', e.target.value)}
                                    />
                                    <FormSelect
                                        label="Jerarquía"
                                        id="jerarquia"
                                        options={colaboradorFormSelectOptions.jerarquia}
                                        value={formData.jerarquia || ''}
                                        error={formErrors.jerarquia}
                                        isFormEditing={false}
                                        onChange={(e) => handleEditFormChange('jerarquia', e.target.value)}
                                    />
                                </div>
                                <div className="form-row">
                                    <FormInput
                                        label="Fecha de ingreso"
                                        id="fecha_ingreso"
                                        type="date"
                                        value={convertISOToSimpleDate(formData.fecha_ingreso) || ''}
                                        error={formErrors.fecha_ingreso}
                                        isFormEditing={isFormEditing}
                                        onChange={(e) => handleEditFormChange('fecha_ingreso', e.target.value)}
                                    />
                                    <FormSelect
                                        label="Especialidad"
                                        id="especialidad"
                                        type="text"
                                        options={colaboradorFormSelectOptions.especialidad}
                                        value={formData.especialidad || ''}
                                        error={formErrors.especialidad}
                                        isFormEditing={isFormEditing && formData.jerarquia === 'Médico'}
                                        onChange={(e) => handleEditFormChange('especialidad', e.target.value)}
                                    />
                                </div>
                                <div className="text-center mt-3">
                                    {isFormEditing || isLoadingUpdate ? (
                                        <>
                                            <button
                                                type="button"
                                                className="btn btn-success w-25 mr-3"
                                                onClick={updateUserDetails}
                                                disabled={isLoadingUpdate}
                                            > {isLoadingUpdate ? "Cargando..." : "Guardar"}
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-secondary w-25 mr-3"
                                                onClick={() => setIsDiscardUpdateModalOpen(true)}
                                                disabled={isLoadingUpdate}
                                            > Cancelar
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            type="button"
                                            className="btn btn-primary w-25"
                                            onClick={startEditing}
                                            disabled={isLoadingUpdate}
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

            {/* Modal actualizado correctamente */}

            <ConfirmationModal
                isOpen={isConfimUpdateModalOpen}
                title="Administador actualizado"
                message="El administrador ha sido actualizado correctamente."
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
        </div>
    );
}

export default UserProfile;