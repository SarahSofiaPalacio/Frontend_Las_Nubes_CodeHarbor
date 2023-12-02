import React, { useState, useEffect, useCallback } from 'react';
import LoadingSpinner from '../../components/LoadingSpinner.js';
import Header from '../../components/Header.js';
import Table from '../../components/Table.js';
import FormModal from '../../components/FormModal.js';
import FormInput from '../../components/FormInput.js';
import ConfirmationModal from '../../components/ConfirmationModal.js';
import { useAuth } from '../../auth/AuthContext.js';

import { citasEnfermeroTableColumns, citaInitialFormData } from '../../assets/CitaData.js';
import { getCitasEnfermero } from '../../services/citas.js';
import { getColaborador } from '../../services/colaboradores.js';
import { useNavigate } from 'react-router-dom';

function Citas() {
  const navigate = useNavigate();
  const { token, username, handleLogout } = useAuth();
  const [citas, setCitas] = useState([]);
  const [selectedCita, setSelectedCita] = useState(null);
  const [isLoadingTable, setLoadingTable] = useState(false);
  const [isLoadingContent, setIsLoadingContent] = useState(true);

  const [formCitaData, setCitaFormData] = useState({ citaInitialFormData });
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);

  // Cargar lista de citas al cargar la página

  const loadUsers = useCallback(async () => {
    setLoadingTable(true);
    try {
      const citas = await getCitasEnfermero(token, username);
      console.log('(Citas) citas cargadas: ', citas);
      for (const cita of citas) {
        const colaborador = await getColaborador(token, cita.id_medico);
        cita.detalleColaborador = colaborador;
      }
      setCitas(citas);
    } catch (error) {
      if (error.response === 'Sesión expirada') {
        console.log("(Error) Token inválido. Cerrando sesión...");
        await handleLogout();
        navigate('/login');
      } else console.error('(Citas) Error al cargar las citas: ', error);
    } finally {
      setLoadingTable(false);
      setIsLoadingContent(false);
    }
  }, [token, username, handleLogout, navigate]);

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

  // Resetear formulario

  const resetForm = () => {
    setCitaFormData(citaInitialFormData);
  };

  // Modal de error inesperado

  const closeErrorModal = () => {
    setIsErrorModalOpen(false);
    setIsUpdateModalOpen(false);
    setIsLoadingUpdate(false);
    loadUsers();
  };

  // Funciones para el modal editar

  const openEditModal = (cita) => {
    setSelectedCita(cita);
    setCitaFormData(cita);
    setIsUpdateModalOpen(true);
  };

  const closeEditModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedCita(null);
    resetForm();
  };

  return (
    <div>
      <Header
        title="Gestión de citas"
        subTitle="Información sobre las citas programadas para hoy en el centro médico"
      />

      {/* Tabla de pacientes */}

      <Table label="Listado de citas activas" columns={citasEnfermeroTableColumns} data={citas} loading={isLoadingTable}>
        {citas.map((cita) => (
          <tr key={cita.id_cita}>
            <td>{cita.detalleColaborador.numero_identificacion}</td>
            <td>{cita.detalleColaborador.nombre}</td>
            <td>{cita.detalleColaborador.apellido}</td>
            <td>{cita.detalleColaborador.telefono}</td>
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
              <button
                type="button"
                className="btn btn-secondary w-25"
                onClick={closeEditModal}
                disabled={isLoadingUpdate}
              > Cerrar
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
                label="Documento del médico"
                id="identificacion_medico"
                type="text"
                value={(formCitaData.detalleColaborador.tipo_identificacion + " " + formCitaData.detalleColaborador.numero_identificacion) || ''}
                isFormEditing={false}
              />
              <FormInput
                label="Nombre del médico"
                id="nombre_medico"
                type="text"
                value={(formCitaData.detalleColaborador.nombre + " " + formCitaData.detalleColaborador.apellido) || ''}
                isFormEditing={false}
              />
            </div>
            <div className="form-row">
              <FormInput
                label="Teléfono del medico"
                id="telefono_medico"
                type="number"
                value={formCitaData.detalleColaborador.telefono || ''}
                isFormEditing={false}
              />
              <FormInput
                label="Correo Electrónico del medico"
                id="correo_electronico_medico"
                type="email"
                value={formCitaData.detalleColaborador.correo_electronico || ''}
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
                label="Tipo de cita"
                id="especialidad"
                type="text"
                value={formCitaData.detalleColaborador.especialidad || ''}
                isFormEditing={false}
              />
              <FormInput
                label="Estado de la cita"
                id="estado"
                type="text"
                value={formCitaData.estado || ''}
                isFormEditing={false}
              />
            </div>
          </form>
        ) : (
          <p>Cargando...</p>
        )}
      </FormModal>

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