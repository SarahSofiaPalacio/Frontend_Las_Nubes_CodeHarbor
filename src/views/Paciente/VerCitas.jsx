import React, { useState, useEffect, useCallback } from 'react';
import LoadingSpinner from '../../components/LoadingSpinner.js';
import Header from '../../components/Header.js';
import Table from '../../components/Table.js';
import ConfirmationModal from '../../components/ConfirmationModal.js';
import { useAuth } from '../../auth/AuthContext.js';

import { citasPacienteTableColumns, citaInitialFormData } from '../../assets/CitaData.js';
import { getCitasPacienteActivas, deleteCita } from '../../services/citas.js';
import { getColaborador } from '../../services/colaboradores.js';

function VerCitas() {
  const { token, username } = useAuth();

  const [citas, setCitas] = useState([]);
  const [selectedCita, setSelectedCita] = useState({ citaInitialFormData });

  const [isLoadingTable, setLoadingTable] = useState(false);
  const [isLoadingContent, setIsLoadingContent] = useState(true);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const [isDeleteDateModalOpen, setIsDeleteDateModalOpen] = useState(false);
  const [isConfirmDeleteDateModalOpen, setIsConfirmDeleteDateModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  // Cargar lista de citas al cargar la página

  const loadDates = useCallback(async () => {
    setLoadingTable(true);
    try {
      const citas = await getCitasPacienteActivas(token, username);
      console.log('(Citas) citas cargadas: ', citas);
      for (const cita of citas) {
        const colaborador = await getColaborador(token, cita.id_medico);
        cita.detalleColaborador = colaborador;
      }
      setCitas(citas);
    } catch (error) {
      console.error('(Citas) Error al cargar las citas: ', error);
    } finally {
      setLoadingTable(false);
      setIsLoadingContent(false);
    }
  }, [token, username]);

  useEffect(() => {
    loadDates();
  }, [loadDates]);

  if (isLoadingContent) return <LoadingSpinner />;

  // Funciones auxiliares

  const convertISOToSimpleDate = (isoDateString) => {
    if (!isoDateString) return;
    const date = new Date(isoDateString);
    return date.toISOString().split('T')[0];
  };

  // Resetear formulario

  const resetForm = () => {
    setSelectedCita(citaInitialFormData);
    setCitas([]);
  };

  // Modal de error inesperado

  const closeErrorModal = () => {
    setIsErrorModalOpen(false);
    setIsLoadingDelete(false);
    resetForm();
    loadDates();
  };

  // Funciones para el modal de cancelar cita

  const openDeleteDateModal = (cita) => {
    setSelectedCita(cita);
    setIsDeleteDateModalOpen(true);
  };

  const closeDeleteDateModal = () => {
    setIsDeleteDateModalOpen(false);
  };

  const closeConfirmDeleteDateModal = () => {
    setIsConfirmDeleteDateModalOpen(false);
    resetForm();
    loadDates();
  }

  const deleteDate = async () => {
    setIsLoadingDelete(true);
    try {
      const response = await deleteCita(token, selectedCita.id_cita);
      console.log('(Citas) cita eliminada: ', response);
      setIsDeleteDateModalOpen(false);
      setIsConfirmDeleteDateModalOpen(true);
    } catch (error) {
      console.error('(Citas) Error al cancelar la cita: ', error);
      setIsDeleteDateModalOpen(false);
      setIsErrorModalOpen(true);
    } finally {
      setIsLoadingDelete(false);
    }
  }

  return (
    <div>
      <Header
        title="Gestión de citas"
        subTitle="Información sobre las citas pedidas por el paciente"
      />

      {/* Tabla de pacientes */}

      <Table label="Listado de citas pedidas" columns={citasPacienteTableColumns} data={citas} loading={isLoadingTable}>
        {citas.map((cita) => (
          <tr key={cita.id_cita}>
            <td>{(cita.detalleColaborador.nombre + " " + cita.detalleColaborador.apellido)}</td>
            <td>{cita.detalleColaborador.especialidad}</td>
            <td>{cita.hora}</td>
            <td>{convertISOToSimpleDate(cita.fecha)}</td>
            <td>{cita.eps}</td>
            <td className="d-flex justify-content-center align-items-center">
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() => openDeleteDateModal(cita)}
                aria-label="Cancelar cita"
                ><i className="fas fa-trash"></i>
              </button>
            </td>
          </tr>
        ))}
      </Table>

      {/* Modal confirmar cancelar cita */}

      <ConfirmationModal
        isOpen={isDeleteDateModalOpen}
        title="Cancelar cita"
        message="¿Está seguro de que desea cancelar esta cita?"
        footerButtons={
          <>
            <button type="button" className="btn btn-danger w-25" disabled={isLoadingDelete} onClick={deleteDate}>{isLoadingDelete ? 'Cargando...' : 'Cancelar cita'}</button>
            <button type="button" className="btn btn-secondary w-25" disabled={isLoadingDelete} onClick={closeDeleteDateModal}>Cerrar</button>
          </>
        }
      />

      {/* Modal cita cancelada correctamente */}

      <ConfirmationModal
        isOpen={isConfirmDeleteDateModalOpen}
        title="Cita cancelada"
        message="La cita ha sido cancelada correctamente."
        footerButtons={
          <>
            <button type="button" className="btn btn-success w-25" onClick={closeConfirmDeleteDateModal}>Aceptar</button>
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

export default VerCitas;