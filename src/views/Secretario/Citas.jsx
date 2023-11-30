import React, { useState, useEffect, useCallback } from 'react';
import LoadingSpinner from '../../components/LoadingSpinner.js';
import Header from '../../components/Header.js';
import Table from '../../components/Table.js';
import FormModal from '../../components/FormModal.js';
import FormInput from '../../components/FormInput.js';
import FormSelect from '../../components/FormSelect.js';
import ConfirmationModal from '../../components/ConfirmationModal.js';
import { useAuth } from '../../auth/AuthContext.js';

import { citasSecretarioTableColumns, citaInitialFormData, citaFormSelectOptions } from '../../assets/CitaData.js';
import { getCitasSecretario, updateCita } from '../../services/citas.js';
import { getPaciente } from '../../services/pacientes.js';
import { getColaborador } from '../../services/colaboradores.js';

function Citas() {
  const { token } = useAuth();
  const [citas, setCitas] = useState([]);
  const [selectedCita, setSelectedCita] = useState(null);
  const [isLoadingTable, setLoadingTable] = useState(false);
  const [isLoadingContent, setIsLoadingContent] = useState(true);

  const [formCitaData, setCitaFormData] = useState({ citaInitialFormData });
  const [formErrors, setFormErrors] = useState({});
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isFormEditing, setIsFormEditing] = useState(false);
  const [isConfirmUpdateModalOpen, setIsConfirmUpdateModalOpen] = useState(false);
  const [isDiscardUpdateModalOpen, setIsDiscardUpdateModalOpen] = useState(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);

  // Cargar lista de citas al cargar la página

  const loadCitas = useCallback(async () => {
    setLoadingTable(true);
    try {
      const citas = await getCitasSecretario(token);
      console.log('(Citas) citas cargadas: ', citas);
      for (const cita of citas) {
        const paciente = await getPaciente(token, cita.id_paciente);
        const colaborador = await getColaborador(token, cita.id_medico);
        cita.detallePaciente = paciente;
        cita.detalleColaborador = colaborador;
      }
      setCitas(citas);
    } catch (error) {
      console.error('(Citas) Error al cargar las citas: ', error);
    } finally {
      setLoadingTable(false);
      setIsLoadingContent(false);
    }
  }, [token]);

  useEffect(() => {
    loadCitas();
  }, [loadCitas]);

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
    if (!formCitaData.estado || formCitaData.estado === "Activa") {
      errors.estado = "Estado es requerido";
    } else if (!citaFormSelectOptions.estado.includes(formCitaData.estado)) {
      errors.estado = "Estado seleccionado no es válido";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Resetear formulario

  const resetForm = () => {
    setCitaFormData(citaInitialFormData);
    setFormErrors({});
  };

  // Modal de error inesperado

  const closeErrorModal = () => {
    setIsErrorModalOpen(false);
    setIsUpdateModalOpen(false);
    setIsLoadingUpdate(false);
    loadCitas();
  };

  // Funciones para el modal editar

  const openEditModal = (cita) => {
    setSelectedCita(cita);
    setCitaFormData(cita);
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
      setCitaFormData(prevData => {
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
            acc[key] = formCitaData[key] ?? citaInitialFormData[key];
          }
          return acc;
        }, {});
        const response = await updateCita(token, selectedCita.id_cita, newData);
        console.log('(Citas) Cita actualizado: ', response);
        setIsConfirmUpdateModalOpen(true);
      } catch (error) {
        console.error('(Citas) Hubo un error al actualizar la cita: ', error);
        setIsErrorModalOpen(true);
      }
    } else {
      console.error('(Citas) Datos inválidos.');
    }
  };

  const closeConfirmUpdateModal = () => {
    setIsConfirmUpdateModalOpen(false);
    setIsUpdateModalOpen(false);
    setSelectedCita(null);
    resetForm();
    setIsFormEditing(false);
    setIsLoadingUpdate(false);
    loadCitas();
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
    loadCitas();
  };

  return (
    <div>
      <Header
        title="Gestión de citas"
        subTitle="Información sobre las citas programadas para hoy en el centro médico"
      />

      {/* Tabla de pacientes */}

      <Table label="Listado de citas activas" columns={citasSecretarioTableColumns} data={citas} loading={isLoadingTable}>
        {citas.map((cita) => (
          <tr key={cita.id_cita}>
            <td>{cita.detallePaciente.numero_identificacion}</td>
            <td>{cita.detallePaciente.nombre}</td>
            <td>{cita.detallePaciente.apellido}</td>
            <td>{cita.detalleColaborador.especialidad}</td>
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
        title="Más información de la cita"
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
              <FormInput
                label="Documento del paciente"
                id="identificacion_paciente"
                type="text"
                value={(formCitaData.detallePaciente.tipo_identificacion + " " + formCitaData.detallePaciente.numero_identificacion) || ''}
                isFormEditing={false}
              />
              <FormInput
                label="Nombre del paciente"
                id="nombre_paciente"
                type="text"
                value={(formCitaData.detallePaciente.nombre + " " + formCitaData.detallePaciente.apellido) || ''}
                isFormEditing={false}
              />
            </div>
            <div className="form-row">
              <FormInput
                label="Teléfono del paciente"
                id="telefono_paciente"
                type="number"
                value={formCitaData.detallePaciente.telefono || ''}
                isFormEditing={false}
              />
              <FormInput
                label="Correo Electrónico del paciente"
                id="correo_electronico_paciente"
                type="email"
                value={formCitaData.detallePaciente.correo_electronico || ''}
                isFormEditing={false}
              />
            </div>
            <div className="form-row">
              <FormInput
                label="Fecha de la cita"
                id="fecha"
                type="date"
                value={convertISOToSimpleDate(formCitaData.fecha) || ''}
                isFormEditing={false}
              />
              <FormInput
                label="Hora de la cita"
                id="hora"
                value={formCitaData.hora || ''}
                isFormEditing={false}
              />
            </div>
            <div className="form-row">
              <FormInput
                label="Nombre del médico"
                id="nombre_medico"
                type="text"
                value={(formCitaData.detalleColaborador.nombre + " " + formCitaData.detalleColaborador.apellido) || ''}
                isFormEditing={false}
              />
              <FormInput
                label="Tipo de cita"
                id="especialidad_medico"
                type="text"
                value={formCitaData.detalleColaborador.especialidad || ''}
                isFormEditing={false}
              />
            </div>
            <div className="form-row d-flex justify-content-center text-center">
              <FormSelect
                label="Estado de la cita"
                id="estado"
                type="text"
                options={citaFormSelectOptions.estado}
                value={formCitaData.estado || ''}
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
        title="Cita actualizada"
        message="El estado de la cita ha sido actualizada correctamente."
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