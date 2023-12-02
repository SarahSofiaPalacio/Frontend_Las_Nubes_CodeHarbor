import React, { useState, useEffect, useCallback } from 'react';
import DatePicker from 'react-datepicker';
import LoadingSpinner from '../../components/LoadingSpinner.js';
import Header from '../../components/Header.js';
import FormInput from '../../components/FormInput.js';
import FormSelect from '../../components/FormSelect.js';
import ConfirmationModal from '../../components/ConfirmationModal.js';
import Table from '../../components/Table.js';
import { useAuth } from '../../auth/AuthContext.js';

import "react-datepicker/dist/react-datepicker.css";
import "./styles.css"; // Tu archivo CSS personalizado

import { pacienteInitialFormData } from '../../assets/PacienteData.js';
import { getCitaEspecialidad, getCitasMedicos, getCitaMedicoFecha, getCitaMedicoHora, asignCita } from '../../services/citas.js';
import { getPaciente } from '../../services/pacientes.js';
import { useNavigate } from 'react-router-dom';

function PedirCitas() {
    const navigate = useNavigate();
    const { token, username, handleLogout } = useAuth();

    const [pacienteData, setPacienteData] = useState({ pacienteInitialFormData });

    const [selectedTypeDate, setSelectedTypeDate] = useState('');
    const [typesDates, setTypesDates] = useState([]);

    const [selectedMedico, setSelectedMedico] = useState('');
    const [medicos, setMedicos] = useState({});
    const [namesMedicos, setNamesMedicos] = useState([]);

    const [selectedDate, setSelectedDate] = useState('');
    const [dates, setDates] = useState([]);

    const [selectedHour, setSelectedHour] = useState('');
    const [hours, setHours] = useState([]);

    const [dateFormErrors, setDateFormErrors] = useState({});
    const [dateFormData, setDateFormData] = useState({});

    const [isLoadingContent, setIsLoadingContent] = useState(true);
    const [isLoadingForm, setLoadingForm] = useState(false);
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);

    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [isAsignedModalOpen, setIsAsignedModalOpen] = useState(false);
    const [isConfimUpdateModalOpen, setIsConfirmUpdateModalOpen] = useState(false);

    // Cargar datos de las citas

    const loadPaciente = useCallback(async () => {
        setLoadingForm(true);
        try {
            const paciente = await getPaciente(token, username);
            setPacienteData(paciente);
            console.log("(Pedir) Datos del paciente cargados: ", paciente);
        } catch (error) {
            setIsErrorModalOpen(true);
            if (error.response === 'Sesión expirada') {
                console.log("(Error) Token inválido. Cerrando sesión...");
                await handleLogout();
                navigate('/login');
            } else console.error("(Pedir) Error al cargar los datos del paciente: ", error);
        } finally {
            setLoadingForm(false);
            setIsLoadingContent(false);
        }
    }, [token, username, handleLogout, navigate]);

    // Cargar los tipos de citas disponibles

    const loadTypeCita = useCallback(async () => {
        setLoadingForm(true);
        try {
            const tiposCitasDisponibles = await getCitaEspecialidad(token);
            const especialidadesUnicas = new Set();
            tiposCitasDisponibles.forEach(cita => especialidadesUnicas.add(cita.especialidad.trim()));
            const opcionesCitas = ['Seleccione...', ...especialidadesUnicas];
            setTypesDates(opcionesCitas);
            console.log("(Pedir) Tipos de citas disponibles filtrados: ", opcionesCitas);
        } catch (error) {
            setIsErrorModalOpen(true);
            if (error.response === 'Sesión expirada') {
                console.log("(Error) Token inválido. Cerrando sesión...");
                await handleLogout();
                navigate('/login');
            } else console.error("(Pedir) Error al cargar los tipos de citas sin asignar: ", error);
        } finally {
            setLoadingForm(false);
            setIsLoadingContent(false);
        }
    }, [token, handleLogout, navigate]);

    // Cargar los medicos disponibles para el tipo de cita

    const loadMedicos = useCallback(async () => {
        setLoadingForm(true);
        try {
            const medicosDisponibles = await getCitasMedicos(token, selectedTypeDate);
            const mapeoMedicos = {};
            medicosDisponibles.forEach(medico => {
                const nombreCompleto = medico.nombre.trim() + " " + medico.apellido.trim();
                mapeoMedicos[nombreCompleto] = medico.numero_identificacion;
            });
            setMedicos(mapeoMedicos);
            const opcionesMedicos = ['Seleccione...', ...Object.keys(mapeoMedicos)];
            setNamesMedicos(opcionesMedicos);
            console.log("(Pedir) Medicos disponibles cargados: ", opcionesMedicos);
        } catch (error) {
            setIsErrorModalOpen(true);
            if (error.response === 'Sesión expirada') {
                console.log("(Error) Token inválido. Cerrando sesión...");
                await handleLogout();
                navigate('/login');
            } else console.error("(Pedir) Error al cargar los medicos disponibles: ", error);
        } finally {
            setLoadingForm(false);
            setIsLoadingContent(false);
        }
    }, [token, selectedTypeDate, handleLogout, navigate]);

    // Cargar las fechas disponibles para el medico

    const loadFechas = useCallback(async () => {
        setLoadingForm(true);
        try {
            const dates = await getCitaMedicoFecha(token, selectedMedico);
            const fechasResaltadas = dates.map(cita => {
                return new Date(cita.fecha);
            });
            setDates(fechasResaltadas);
            console.log("(Pedir) Días disponibles cargados: ", fechasResaltadas);
        } catch (error) {
            setIsErrorModalOpen(true);
            if (error.response === 'Sesión expirada') {
                console.log("(Error) Token inválido. Cerrando sesión...");
                await handleLogout();
                navigate('/login');
            } else console.error("(Pedir) Error al cargar los días disponibles: ", error);
        } finally {
            setLoadingForm(false);
            setIsLoadingContent(false);
        }
    }, [token, selectedMedico, handleLogout, navigate]);

    // Cargar las horas disponibles para la fecha y el médico

    const loadHoras = useCallback(async () => {
        setLoadingForm(true);
        try {
            const hours = await getCitaMedicoHora(token, selectedMedico, convertISOToSimpleDate(selectedDate));
            setHours(hours);
            console.log("(Pedir) Horas disponibles cargadas: ", hours);
        } catch (error) {
            setIsErrorModalOpen(true);
            if (error.response === 'Sesión expirada') {
                console.log("(Error) Token inválido. Cerrando sesión...");
                await handleLogout();
                navigate('/login');
            } else console.error("(Pedir) Error al cargar las horas disponibles: ", error);
        } finally { 
            setLoadingForm(false);
            setIsLoadingContent(false);
        }
    }, [token, selectedMedico, selectedDate, handleLogout, navigate]);

    // Cargar datos de las citas

    useEffect(() => {
        loadPaciente();
        loadTypeCita();
    }, [loadPaciente, loadTypeCita]);

    useEffect(() => {
        if (selectedTypeDate && selectedTypeDate !== 'Seleccione...') {
            loadMedicos();
        }
    }, [selectedTypeDate, loadMedicos]);

    useEffect(() => {
        if (selectedMedico && selectedMedico !== 'Seleccione...') {
            loadFechas();
        }
    }, [selectedMedico, loadFechas]);

    useEffect(() => {
        if (selectedDate) {
            loadHoras();
        }
    }, [selectedDate, loadHoras]);

    // Actualizar la cita

    const asignDate = async () => {
        setIsLoadingUpdate(true);
        try {
            const response = await asignCita(token, selectedHour, dateFormData);
            console.log('(Pedir) Cita asignada: ', response);
            setIsAsignedModalOpen(true);
        } catch (error) {
            setIsErrorModalOpen(true);
            if (error.response === 'Sesión expirada') {
                console.log("(Error) Token inválido. Cerrando sesión...");
                await handleLogout();
                navigate('/login');
            } else console.error('(Pedir) Error al asignar la cita: ', error);
        } finally {
            setIsLoadingUpdate(false);
            setIsConfirmUpdateModalOpen(false);
        }
    };

    // Manejar cambios en el formulario de la cita

    if (isLoadingContent) return <LoadingSpinner />;

    // Funciones auxiliares

    const convertISOToSimpleDate = (isoDateString) => {
        if (!isoDateString) return;
        const date = new Date(isoDateString);
        return date.toISOString().split('T')[0];
    };

    // Manejar cambios en el formulario de la cita

    const handleEditDateFormChange = (name, value) => {
        //setDateFormData(prevData => ({ ...prevData, [name]: value }));
        if (name === 'tipo_cita') {
            console.log("(Pedir) Tipo de cita seleccionada: ", value)
            setNamesMedicos([]);
            setSelectedMedico('');
            setDates([]);
            setSelectedDate('');
            setSelectedTypeDate(value);
        }
        if (name === 'medico') {
            console.log("(Pedir) Médico seleccionado: ", value)
            setDates([]);
            setSelectedDate('');
            setSelectedMedico(medicos[value]);
        }
        if (name === 'fecha') {
            console.log("(Pedir) Fecha seleccionada: ", value)
            setSelectedDate(value);
        }
    };

    const resetForm = () => {
        setDateFormData({});
        setDateFormErrors({});
        setSelectedTypeDate('');
        setTypesDates([]);
        setSelectedMedico('');
        setMedicos({});
        setNamesMedicos([]);
        setSelectedDate('');
        setDates([]);
        setSelectedHour('');
        setHours([]);
        loadPaciente();
        loadTypeCita();
    };

    const openConfirmUpdateModal = (hour) => {
        setSelectedHour(hour.id_cita);
        setDateFormData({
            id_paciente: pacienteData.numero_identificacion,
            eps: 'EPS Las Nubes'
        });
        setIsConfirmUpdateModalOpen(true);
    };

    const closeConfirmUpdateModal = () => {
        setIsConfirmUpdateModalOpen(false);
        setIsLoadingUpdate(false);
    };

    const closeAsignedModal = () => {
        setIsAsignedModalOpen(false);
        resetForm();
    };

    const closeErrorModal = () => {
        setIsErrorModalOpen(false);
        resetForm();
    };

    return (
        <div>
            <Header
                title="Pedir cita médica"
                subTitle="En esta sección puede pedir una cita médica."
            />

            {/* Información personal del paciente */}

            <div className="card shadow mb-4">
                <div className="card-header text-center py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Información personal</h6>
                </div>
                <div className="card-body text-center">
                    <>
                        {pacienteData ? (
                            <form>
                                <div className="form-row">
                                    <FormInput
                                        label="Número de documento"
                                        id="numero_identificacion"
                                        type="text"
                                        value={(pacienteData.tipo_identificacion + " " + pacienteData.numero_identificacion) || ''}
                                        isFormEditing={false}
                                    />
                                    <FormInput
                                        label="Nombre del paciente"
                                        id="nombre"
                                        type="text"
                                        value={(pacienteData.nombre + " " + pacienteData.apellido) || ''}
                                        isFormEditing={false}
                                    />
                                </div>
                                <div className="form-row">
                                    <FormInput
                                        label="Teléfono"
                                        id="telefono"
                                        type="number"
                                        value={pacienteData.telefono || ''}
                                        isFormEditing={false}
                                    />
                                    <FormInput
                                        label="Correo Electrónico"
                                        id="correo_electronico"
                                        type="email"
                                        value={pacienteData.correo_electronico || ''}
                                        isFormEditing={false}
                                    />
                                </div>
                            </form>
                        ) : (
                            <p>Cargando...</p>
                        )}
                    </>
                </div>
            </div>

            {/* Seleccionar tipo de cita */}

            {typesDates.length > 0 ? (
                <div className="card shadow mb-4">
                    <div className="card-header text-center py-3">
                        <h5 className="m-0 font-weight-bold text-primary">PASO 1</h5>
                        <h6 className="m-0 font-weight-bold text-secundary">Seleccione el tipo de cita</h6>
                    </div>
                    <div className="card-body text-center">
                        <div className="form-row justify-content-center">
                            <FormSelect
                                label="Tipo de cita"
                                id="tipo_cita"
                                type="text"
                                options={typesDates}
                                value={selectedTypeDate || ''}
                                error={dateFormErrors.tipo_cita}
                                isFormEditing={true}
                                onChange={(e) => handleEditDateFormChange('tipo_cita', e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            ) : null}

            {/* Seleccionar médico */}
            {selectedTypeDate && selectedTypeDate !== 'Seleccione...' && namesMedicos.length > 0 ? (
                <div className="card shadow mb-4">
                    <div className="card-header text-center py-3">
                        <h5 className="m-0 font-weight-bold text-primary">PASO 2</h5>
                        <h6 className="m-0 font-weight-bold text-secundary">Seleccione el médico</h6>
                    </div>
                    <div className="card-body text-center">
                        <div className="form-row justify-content-center">
                            <FormSelect
                                label="Médico"
                                id="medico"
                                type="text"
                                options={namesMedicos}
                                value={(medicos && Object.keys(medicos).find(name => medicos[name] === selectedMedico)) || ''}
                                error={dateFormErrors.medico}
                                isFormEditing={selectedTypeDate && selectedTypeDate !== 'Seleccione...' && namesMedicos.length > 0}
                                onChange={(e) => handleEditDateFormChange('medico', e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            ) : null}

            {/* Selecionar fecha en calendario */}

            {selectedMedico && selectedMedico !== 'Seleccione...' && dates.length > 0 ? (
                <div className="card shadow mb-4">
                    <div className="card-header text-center py-3">
                        <h5 className="m-0 font-weight-bold text-primary">PASO 3</h5>
                        <h6 className="m-0 font-weight-bold text-secundary">Seleccione la fecha de la cita</h6>
                    </div>
                    <div className="card-body text-center">
                        <div className="form-row justify-content-center">
                            <DatePicker
                                inline
                                selected={selectedDate}
                                onChange={(date) => handleEditDateFormChange('fecha', date)}
                                highlightDates={dates}
                                filterDate={(date) => dates.some(d => d.getDate() === date.getDate() && d.getMonth() === date.getMonth() && d.getFullYear() === date.getFullYear())}
                                className="custom-datepicker"
                            />
                        </div>
                    </div>
                </div>
            ) : null}

            {/* Selecionar hora con listado de médicos */}

            {selectedDate && hours.length > 0 ? (
                <div className="card shadow mb-4">
                    <div className="card-header text-center py-3">
                        <h5 className="m-0 font-weight-bold text-primary">PASO 4</h5>
                        <h6 className="m-0 font-weight-bold text-secundary">Seleccione la hora de la cita</h6>
                    </div>
                    <div className="card-body text-center">
                        <Table columns={['Hora', 'Asignar']} loading={isLoadingForm}>
                            {hours.map((hour) => (
                                <tr key={hour.id_cita}>
                                    <td className='p-1'>{hour.hora}</td>
                                    <td className="justify-content-center align-items-center p-1">
                                        <button
                                            type="button"
                                            className="btn btn-primary btn-sm"
                                            onClick={() => openConfirmUpdateModal(hour)}
                                            aria-label="Confirmar"
                                        > Confirmar cita
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </Table>
                    </div>
                </div>
            ) : null}

            {/* Modal confirmar desactivar */}

            <ConfirmationModal
                isOpen={isConfimUpdateModalOpen}
                title="Confirmar cita"
                message="¿Está seguro de que desea asignar la cita?"
                footerButtons={
                    <>
                        <button type="button" className="btn btn-primary w-25" onClick={asignDate}>Confirmar</button>
                        <button type="button" className="btn btn-secondary w-25" onClick={closeConfirmUpdateModal}>Cancelar</button>
                    </>
                }
            />

            {/* Modal cita asignada correctamente */}

            <ConfirmationModal
                isOpen={isAsignedModalOpen}
                title="Cita asignada"
                message="La cita ha sido asignada correctamente."
                footerButtons={
                    <>
                        <button type="button" className="btn btn-success w-25" onClick={closeAsignedModal}>Aceptar</button>
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

export default PedirCitas;