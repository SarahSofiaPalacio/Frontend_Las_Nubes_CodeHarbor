import React, { useState, useEffect, useCallback } from 'react';
import LoadingSpinner from '../../components/LoadingSpinner.js';
import Header from '../../components/Header.js';
import Table from '../../components/Table.js';
import FormModal from '../../components/FormModal.js';
import FormInput from '../../components/FormInput.js';
import FormSelect from '../../components/FormSelect.js';
import ConfirmationModal from '../../components/ConfirmationModal.js';
import { useAuth } from '../../auth/AuthContext.js';

import { citasTableColumns, citaInitialFormData, citaFormSelectOptions } from '../../assets/CitaData.js';
//import { colaboradorInitialFormData } from '../../assets/ColaboradorData.js';
//import { pacienteInitialFormData } from '../../assets/PacienteData.js';
import { getCitas, updateCita } from '../../services/citas.js';
import { getPaciente } from '../../services/pacientes.js';
import { getColaborador } from '../../services/colaboradores.js';

function Citas() {
  const { token } = useAuth();
  const [citas, setCitas] = useState([]);
  const [selectedCita, setSelectedCita] = useState(null);
  const [isLoadingTable, setLoadingTable] = useState(false);
  const [isLoadingContent, setIsLoadingContent] = useState(true);

  const [formData, setFormData] = useState({ citaInitialFormData });
  const [formErrors, setFormErrors] = useState({});
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isFormEditing, setIsFormEditing] = useState(false);
  const [isConfirmUpdateModalOpen, setIsConfirmUpdateModalOpen] = useState(false);
  const [isDiscardUpdateModalOpen, setIsDiscardUpdateModalOpen] = useState(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);

  // Cargar lista de usuarios al cargar la página

  const loadUsers = useCallback(async () => {
    setLoadingTable(true);
    try {
      const response = await getCitas(token);
      console.log('(Pacientes) Usuarios cargados: ', response);
      setCitas(response);
    } catch (error) {
      console.error('(Pacientes) Error al cargar los usuarios: ', error);
    } finally {
      setLoadingTable(false);
      setIsLoadingContent(false);
    }
  }, [token]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  if (isLoadingContent) return <LoadingSpinner />;

  // Funciones auxiliares

  const convertISOToSimpleDate = (isoDateString) => {
    if (!isoDateString) return;
    const date = new Date(isoDateString);
    return date.toISOString().split('T')[0];
  };

  // Validar formulario de paciente

  const validateForm = () => {
    const errors = {};
    if (!formData.estado || formData.estado === "Activa") {
      errors.sexo = "Estado es requerido";
    } else if (!citaFormSelectOptions.estado.includes(formData.estado)) {
      errors.sexo = "Estado seleccionado no es válido";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Resetear formulario

  const resetForm = () => {
    setFormData(citaInitialFormData);
    setFormErrors({});
  };

  // Modal de error inesperado

  const closeErrorModal = () => {
    setIsErrorModalOpen(false);
    setIsUpdateModalOpen(false);
    setIsLoadingUpdate(false);
    loadUsers();
  };

  // Funciones para el modal editar

  const openEditModal = (paciente) => {
    setSelectedCita(paciente);
    setFormData(paciente);
    setIsUpdateModalOpen(true);
  };

  const closeEditModal = () => {
    if (isFormEditing) {
      setIsDiscardUpdateModalOpen(true);
    } else {
      setIsUpdateModalOpen(false);
      setSelectedCita(null);
      resetForm();
    }
  };

  const startEditing = () => {
    setIsFormEditing(true);
  };

  const handleEditFormChange = (name, value) => {
    if (isFormEditing) {
      setFormData(prevData => {
        const newValues = { ...prevData, [name]: value };
        return newValues;
      });
    }
  };

  const updateDate = async () => {
    if (validateForm()) {
      setIsLoadingUpdate(true);
      setIsFormEditing(false);
      try {
        const newData = Object.keys(citaInitialFormData).reduce((acc, key) => {
          if (key !== 'foto_url') {
            acc[key] = formData[key] ?? citaInitialFormData[key];
          }
          return acc;
        }, {});
        const response = await updateCita(token, selectedCita.numero_identificacion, newData);
        console.log('(Pacientes) Usuario actualizado: ', response);
        setIsConfirmUpdateModalOpen(true);
      } catch (error) {
        console.error('(Pacientes) Hubo un error al actualizar el usuario: ', error);
        setIsErrorModalOpen(true);
      }
    } else {
      console.error('(Pacientes) Datos inválidos.');
    }
  };

  const closeConfirmUpdateModal = () => {
    setIsConfirmUpdateModalOpen(false);
    setIsUpdateModalOpen(false);
    setSelectedCita(null);
    resetForm();
    setIsFormEditing(false);
    setIsLoadingUpdate(false);
    loadUsers();
  };

  const closeDiscardUpdateModal = () => {
    setIsDiscardUpdateModalOpen(false);
  };

  const closeAndDiscardUpdateModal = () => {
    setIsDiscardUpdateModalOpen(false);
    setIsUpdateModalOpen(false);
    setSelectedCita(null);
    resetForm();
    setIsFormEditing(false);
    loadUsers();
  };

  return (
    <div>
      <Header
        title="Gestión de pacientes"
        subTitle="Información personal de los pacientes del centro médico"
      />

      {/* Tabla de pacientes */}

      <Table label="Listado de pacientes citados" columns={citasTableColumns} data={citas} loading={isLoadingTable}>
        {citas.map((cita) => (
          <tr key={cita.numero_identificacion}>
            <td>{getPaciente(cita.id_paciente).numero_identificacion}</td>
            <td>{getPaciente(cita.id_paciente).nombre}</td>
            <td>{getPaciente(cita.id_paciente).apellido}</td>
            <td>{getColaborador(cita.id_medico).especialidad}</td>
            <td>{cita.hora}</td>
            <td>{convertISOToSimpleDate(cita.fecha)}</td>
            <td className="d-flex justify-content-center align-items-center">
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() => openEditModal(cita)}
                aria-label="Más opciones">
                <i className="fas fa-ellipsis-h"></i>
              </button>
            </td>
          </tr>
        ))}
      </Table>

      {/* Modal editar */}

      <FormModal
        isOpen={isUpdateModalOpen}
        title="Más información del paciente"
        footerButtons={
          selectedCita ? (
            <>
              {isFormEditing || isLoadingUpdate ? (
                <button
                  type="button"
                  className="btn btn-success w-25"
                  onClick={updateDate}
                  disabled={isLoadingUpdate}
                > {isLoadingUpdate ? "Cargando..." : "Guardar"}
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    className="btn btn-primary w-25"
                    onClick={startEditing}
                    disabled={isLoadingUpdate}
                  > Editar
                  </button>
                </>
              )}
              <button
                type="button"
                className="btn btn-secondary w-25"
                onClick={closeEditModal}
                disabled={isLoadingUpdate}
              > Cancelar
              </button>
            </>
          ) : (
            <p>Cargando...</p>
          )
        }
      >
        {selectedCita ? (
          <form>
            <div className="form-row">
              <FormSelect
                label="Tipo de documento"
                id="tipo_identificacion"
                type="text"
                value={formData.tipo_identificacion || ''}
                isFormEditing={false}
                onChange={(e) => handleEditFormChange('tipo_identificacion', e.target.value)}
              />
              <FormInput
                label="Número de documento"
                id="numero_identificacion"
                type="number"
                value={formData.numero_identificacion || ''}
                isFormEditing={false}
                onChange={(e) => handleEditFormChange('numero_identificacion', e.target.value)}
              />
            </div>
            <div className="form-row">
              <FormInput
                label="Nombres"
                id="nombre"
                type="text"
                value={formData.nombre || ''}
                isFormEditing={false}
                onChange={(e) => handleEditFormChange('nombre', e.target.value)}
              />
              <FormInput
                label="Apellidos"
                id="apellido"
                type="text"
                value={formData.apellido || ''}
                isFormEditing={false}
                onChange={(e) => handleEditFormChange('apellido', e.target.value)}
              />
            </div>
            <div className="form-row">
              <FormInput
                label="Teléfono"
                id="telefono"
                type="number"
                value={formData.telefono || ''}
                isFormEditing={false}
                onChange={(e) => handleEditFormChange('telefono', e.target.value)}
              />
              <FormInput
                label="Correo Electrónico"
                id="correo_electronico"
                type="email"
                value={formData.correo_electronico || ''}
                isFormEditing={false}
                onChange={(e) => handleEditFormChange('correo_electronico', e.target.value)}
              />
            </div>
            <div className="form-row">
              <FormInput
                label="Fecha de la cita"
                id="fecha"
                type="date"
                value={convertISOToSimpleDate(formData.fecha_nacimiento) || ''}
                isFormEditing={false}
                onChange={(e) => handleEditFormChange('fecha_nacimiento', e.target.value)}
              />
              <FormSelect
                label="Hora de la cita"
                id="hora"
                value={formData.estado_civil || ''}
                isFormEditing={false}
                onChange={(e) => handleEditFormChange('estado_civil', e.target.value)}
              />
            </div>
            <div className="form-row">
              <FormInput
                label="Nombres"
                id="nombre"
                type="text"
                value={formData.nombre || ''}
                isFormEditing={false}
                onChange={(e) => handleEditFormChange('nombre', e.target.value)}
              />
              <FormSelect
                label="Especialidad"
                id="especialidad"
                type="text"
                value={formData.especialidad || ''}
                isFormEditing={false}
                onChange={(e) => handleEditFormChange('especialidad', e.target.value)}
              />
            </div>
            <div className="form-row">
              <FormSelect
                label="Estado de la cita"
                id="estado"
                type="text"
                options={citaFormSelectOptions.estado}
                value={formData.estado || ''}
                error={formErrors.estado}
                isFormEditing={isFormEditing}
                onChange={(e) => handleEditFormChange('estado', e.target.value)}
              />
            </div>
          </form>
        ) : (
          <p>Cargando...</p>
        )}
      </FormModal>

      {/* Modal actualizado correctamente */}

      <ConfirmationModal
        isOpen={isConfirmUpdateModalOpen}
        title="Paciente actualizado"
        message="El paciente ha sido actualizado correctamente."
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
            <button
              type="button" className="btn btn-danger w-25" onClick={closeErrorModal}>Aceptar
            </button>
          </>
        }
      />

    </div>
  );
}

export default Citas;