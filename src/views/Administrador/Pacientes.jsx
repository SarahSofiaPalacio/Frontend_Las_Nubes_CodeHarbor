import React, { useState, useEffect, useCallback } from 'react';
import LoadingSpinner from '../../components/LoadingSpinner';
import Header from '../../components/Header';
import Table from '../../components/Table';
import FormModal from '../../components/FormModal';
import FormInput from '../../components/FormInput';
import FormSelect from '../../components/FormSelect';
import ConfirmationModal from '../../components/ConfirmationModal.js';
import { useAuth } from '../../auth/AuthContext';

import { pacienteTableColumns, pacienteInitialFormData, pacienteFormSelectOptions } from '../../assets/AdministradorData.js';
import { getPacientes, createPaciente, updatePaciente, deletePaciente } from '../../services/pacientes.js';

function Pacientes() {
  const { token, username } = useAuth();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isLoadingTable, setLoadingTable] = useState(false);
  const [isLoadingContent, setIsLoadingContent] = useState(true);

  const [formData, setFormData] = useState({ pacienteInitialFormData });
  const [formErrors, setFormErrors] = useState({});
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isConfirmAddModalOpen, setIsConfirmAddModalOpen] = useState(false);
  const [isLoadingAdd, setIsLoadingAdd] = useState(false);

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isFormEditing, setIsFormEditing] = useState(false);
  const [isConfirmUpdateModalOpen, setIsConfirmUpdateModalOpen] = useState(false);
  const [isDiscardUpdateModalOpen, setIsDiscardUpdateModalOpen] = useState(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);

  const [isDesactivateModalOpen, setIsDesactivateModalOpen] = useState(false);
  const [isConfirmDesactivateModalOpen, setIsConfirmDesactivateModalOpen] = useState(false);
  const [isActivateModalOpen, setIsActivateModalOpen] = useState(false);
  const [isConfirmActivateModalOpen, setIsConfirmActivateModalOpen] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  // Cargar lista de usuarios al cargar la página

  const loadUsers = useCallback(async () => {
    setLoadingTable(true);
    try {
      const response = await getPacientes(token);
      console.log('(Pacientes) Usuarios cargados: ', response);
      setUsers(response);
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
    if (!formData.tipo_identificacion || formData.tipo_identificacion === "Seleccione...") {
      errors.tipo_identificacion = "Tipo de documento es requerido";
    } else if (!pacienteFormSelectOptions.tipo_identificacion.includes(formData.tipo_identificacion)) {
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
    } else if (!pacienteFormSelectOptions.estado_civil.includes(formData.estado_civil)) {
      errors.estado_civil = "Estado civil seleccionado no es válido";
    }
    if (!formData.sexo || formData.sexo === "Seleccione...") {
      errors.sexo = "Sexo es requerido";
    } else if (!pacienteFormSelectOptions.sexo.includes(formData.sexo)) {
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
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Resetear formulario

  const resetForm = () => {
    setFormData(pacienteInitialFormData);
    setFormErrors({});
  };

  // Modal de error inesperado

  const closeErrorModal = () => {
    setIsErrorModalOpen(false);
    setIsAddModalOpen(false);
    setIsUpdateModalOpen(false);
    setIsDesactivateModalOpen(false);
    setIsActivateModalOpen(false);
    setIsLoadingAdd(false);
    setIsLoadingUpdate(false);
    setIsLoadingDelete(false);
    loadUsers();
  };

  // Funciones para el modal añadir

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
    resetForm();
  };

  const handleAddFormChange = (name, value) => {
    setFormData((prevFormData) => {
      const updatedFormData = { ...prevFormData, [name]: value };
      return updatedFormData;
    });
  };

  const createUser = async () => {
    if (validateForm()) {
      setIsLoadingAdd(true);
      try {
        const response = await createPaciente(token, formData);
        console.log('(Pacientes) Usuario creado: ', response);
        setIsConfirmAddModalOpen(true);
      } catch (error) {
        console.error('(Pacientes) Hubo un error al crear el usuario: ', error);
        setIsErrorModalOpen(true);
      }
    } else {
      console.error('(Pacientes) Datos inválidos.');
    }
  };

  const closeConfirmAddModal = () => {
    setIsConfirmAddModalOpen(false);
    setIsAddModalOpen(false);
    setIsLoadingAdd(false);
    loadUsers();
  };

  // Funciones para el modal editar

  const openEditModal = (paciente) => {
    setSelectedUser(paciente);
    setFormData(paciente);
    setIsUpdateModalOpen(true);
  };

  const closeEditModal = () => {
    if (isFormEditing) {
      setIsDiscardUpdateModalOpen(true);
    } else {
      setIsUpdateModalOpen(false);
      setSelectedUser(null);
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

  const updateUser = async () => {
    if (validateForm()) {
      setIsLoadingUpdate(true);
      setIsFormEditing(false);
      try {
        const newData = Object.keys(pacienteInitialFormData).reduce((acc, key) => {
          if (key !== 'foto_url') {
            acc[key] = formData[key] ?? pacienteInitialFormData[key];
          }
          return acc;
        }, {});
        const response = await updatePaciente(token, selectedUser.numero_identificacion, newData);
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
    setSelectedUser(null);
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
    setSelectedUser(null);
    resetForm();
    setIsFormEditing(false);
    loadUsers();
  };

  const OpenDesactivateModal = () => {
    setIsDesactivateModalOpen(true);
  };

  const closeDesactivateModal = () => {
    setIsDesactivateModalOpen(false);
  };

  const OpenActivateModal = () => {
    setIsActivateModalOpen(true);
  };

  const closeActivateModal = () => {
    setIsActivateModalOpen(false);
  };

  const desactivateUser = async () => {
    setIsLoadingDelete(true);
    try {
      const response = await deletePaciente(token, selectedUser.numero_identificacion);
      console.log('(Pacientes) Usuario desactivado: ', response);
      setIsConfirmDesactivateModalOpen(true);
    } catch (error) {
      console.error('(Pacientes) Hubo un error al desactivar el usuario: ', error);
      setIsErrorModalOpen(true);
    }
  };

  const activateUser = async () => {
    setIsLoadingDelete(true);
    try {
      const response = await updatePaciente(token, selectedUser.numero_identificacion, { is_deleted: false });
      console.log('(Pacientes) Usuario activado: ', response);
      setIsConfirmActivateModalOpen(true);
    } catch (error) {
      console.error('(Pacientes) Hubo un error al activar el usuario: ', error);
      setIsErrorModalOpen(true);
    }
  };

  const closeConfirmDesactivateModal = () => {
    setIsConfirmDesactivateModalOpen(false);
    setIsDesactivateModalOpen(false);
    setIsUpdateModalOpen(false);
    setSelectedUser(null);
    resetForm();
    setIsLoadingDelete(false);
    loadUsers();
  }

  const closeConfirmActivateModal = () => {
    setIsConfirmActivateModalOpen(false);
    setIsActivateModalOpen(false);
    setIsUpdateModalOpen(false);
    setSelectedUser(null);
    resetForm();
    setIsLoadingDelete(false);
    loadUsers();
  }

  return (
    <div>
      <Header
        title="Gestión de pacientes"
        subTitle="Información personal de los pacientes del centro médico"
        addButton={
          <button className="btn btn-sm btn-primary" onClick={openAddModal}>
            <i className="fas fa-plus mr-3 text-white-50"></i> Añadir paciente
          </button>
        }
      />

      {/* Tabla de pacientes */}

      <Table label="Listado de pacientes" columns={pacienteTableColumns} data={users} loading={isLoadingTable}>
        {users.map((paciente) => (
          <tr key={paciente.numero_identificacion}>
            <td>{paciente.numero_identificacion}</td>
            <td>{paciente.nombre}</td>
            <td>{paciente.apellido}</td>
            <td>{paciente.estado_civil}</td>
            <td>{convertISOToSimpleDate(paciente.fecha_nacimiento)}</td>
            <td>{paciente.telefono}</td>
            <td className="d-flex justify-content-center align-items-center">
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() => openEditModal(paciente)}
                aria-label="Más opciones">
                <i className="fas fa-ellipsis-h"></i>
              </button>
            </td>
          </tr>
        ))}
      </Table>

      {/* Modal añadir */}

      <FormModal
        isOpen={isAddModalOpen}
        title="Añadir paciente"
        footerButtons={
          <>
            <button
              type="button"
              className="btn btn-success w-25"
              onClick={createUser}
              disabled={isLoadingAdd}
            > {isLoadingAdd ? "Cargando..." : "Añadir"}
            </button>
            <button
              type="button"
              className="btn btn-secondary w-25"
              onClick={closeAddModal}
              disabled={isLoadingAdd}
            > Cancelar
            </button>
          </>
        }
      >
        <form>
          <div className="form-row">
            <FormSelect
              label="Tipo de documento"
              id="tipo_identificacion"
              type="text"
              options={pacienteFormSelectOptions.tipo_identificacion}
              value={formData.tipo_identificacion || ''}
              error={formErrors.tipo_identificacion}
              onChange={(e) => handleAddFormChange('tipo_identificacion', e.target.value)}
            />
            <FormInput
              label="Número de documento"
              id="numero_identificacion"
              type="number"
              value={formData.numero_identificacion || ''}
              error={formErrors.numero_identificacion}
              onChange={(e) => handleAddFormChange('numero_identificacion', e.target.value)}
            />
          </div>
          <div className="form-row">
            <FormInput
              label="Nombres"
              id="nombre"
              type="text"
              value={formData.nombre || ''}
              error={formErrors.nombre}
              onChange={(e) => handleAddFormChange('nombre', e.target.value)}
            />
            <FormInput
              label="Apellidos"
              id="apellido"
              type="text"
              value={formData.apellido || ''}
              error={formErrors.apellido}
              onChange={(e) => handleAddFormChange('apellido', e.target.value)}
            />
          </div>
          <div className="form-row">
            <FormInput
              label="Fecha de Nacimiento"
              id="fecha_nacimiento"
              type="date"
              value={formData.fecha_nacimiento || ''}
              error={formErrors.fecha_nacimiento}
              onChange={(e) => handleAddFormChange('fecha_nacimiento', e.target.value)}
            />
            <FormSelect
              label="Estado Civil"
              id="estado_civil"
              type="text"
              options={pacienteFormSelectOptions.estado_civil}
              value={formData.estado_civil || ''}
              error={formErrors.estado_civil}
              onChange={(e) => handleAddFormChange('estado_civil', e.target.value)}
            />
          </div>
          <div className="form-row">
            <FormSelect
              label="Sexo"
              id="sexo"
              type="text"
              options={pacienteFormSelectOptions.sexo}
              value={formData.sexo || ''}
              error={formErrors.sexo}
              onChange={(e) => handleAddFormChange('sexo', e.target.value)}
            />
            <FormInput
              label="Dirección"
              id="direccion"
              type="text"
              value={formData.direccion || ''}
              error={formErrors.direccion}
              onChange={(e) => handleAddFormChange('direccion', e.target.value)}
            />
          </div>
          <div className="form-row">
            <FormInput
              label="Teléfono"
              id="telefono"
              type="number"
              value={formData.telefono || ''}
              error={formErrors.telefono}
              onChange={(e) => handleAddFormChange('telefono', e.target.value)}
            />
            <FormInput
              label="Correo Electrónico"
              id="correo_electronico"
              type="email"
              value={formData.correo_electronico || ''}
              error={formErrors.correo_electronico}
              onChange={(e) => handleAddFormChange('correo_electronico', e.target.value)}
            />
          </div>
        </form>
      </FormModal>

      {/* Modal editar */}

      <FormModal
        isOpen={isUpdateModalOpen}
        title="Más información del paciente"
        footerButtons={
          selectedUser ? (
            <>
              {isFormEditing || isLoadingUpdate ? (
                <button
                  type="button"
                  className="btn btn-success w-25"
                  onClick={updateUser}
                  disabled={isLoadingUpdate || isLoadingDelete}
                > {isLoadingUpdate ? "Cargando..." : "Guardar"}
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    className="btn btn-primary w-25"
                    onClick={startEditing}
                    disabled={isLoadingUpdate || isLoadingDelete}
                  > Editar
                  </button>
                  {selectedUser.is_deleted ? (
                    <button
                      type="button"
                      className="btn btn-warning w-25"
                      onClick={OpenActivateModal}
                      disabled={isLoadingUpdate || isLoadingDelete}
                    > {isLoadingDelete ? "Cargando..." : "Activar"}
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-danger w-25"
                      onClick={OpenDesactivateModal}
                      disabled={isLoadingUpdate || isLoadingDelete || selectedUser.numero_identificacion === parseInt(username)}
                    > {isLoadingDelete ? "Cargando..." : "Desactivar"}
                    </button>
                  )}
                </>
              )}
              <button
                type="button"
                className="btn btn-secondary w-25"
                onClick={closeEditModal}
                disabled={isLoadingUpdate || isLoadingDelete}
              > Cancelar
              </button>
            </>
          ) : (
            <p>Cargando...</p>
          )
        }
      >
        {selectedUser ? (
          <form>
            <div className="form-row">
              <FormSelect
                label="Tipo de documento"
                id="tipo_identificacion"
                type="text"
                options={pacienteFormSelectOptions.tipo_identificacion}
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
                error={convertISOToSimpleDate(formErrors.fecha_nacimiento)}
                isFormEditing={isFormEditing}
                onChange={(e) => handleEditFormChange('fecha_nacimiento', e.target.value)}
              />
              <FormSelect
                label="Estado Civil"
                id="estado_civil"
                options={pacienteFormSelectOptions.estado_civil}
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
                options={pacienteFormSelectOptions.sexo}
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
          </form>
        ) : (
          <p>Cargando...</p>
        )}
      </FormModal>

      {/* Modal añadido correctamente */}

      <ConfirmationModal
        isOpen={isConfirmAddModalOpen}
        title="Paciente añadido"
        message="El paciente ha sido añadido correctamente."
        footerButtons={
          <>
            <button type="button" className="btn btn-success w-25" onClick={closeConfirmAddModal}>Aceptar</button>
          </>
        }
      />

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

      {/* Modal confirmar desactivar */}

      <ConfirmationModal
        isOpen={isDesactivateModalOpen}
        title="Desactivar paciente"
        message="¿Está seguro de que desea desactivar este paciente?"
        footerButtons={
          <>
            <button type="button" className="btn btn-danger w-25" onClick={desactivateUser}>Desactivar</button>
            <button type="button" className="btn btn-secondary w-25" onClick={closeDesactivateModal}>Cancelar</button>
          </>
        }
      />

      {/* Modal desactivado correctamente */}

      <ConfirmationModal
        isOpen={isConfirmDesactivateModalOpen}
        title="Paciente desactivado"
        message="El paciente ha sido desactivado correctamente."
        footerButtons={
          <>
            <button type="button" className="btn btn-success w-25" onClick={closeConfirmDesactivateModal}>Aceptar</button>
          </>
        }
      />

      {/* Modal confirmar activar */}

      <ConfirmationModal
        isOpen={isActivateModalOpen}
        title="Activar paciente"
        message="Está seguro de que desea activar este paciente?"
        footerButtons={
          <>
            <button type="button" className="btn btn-warning w-25" onClick={activateUser}>Activar</button>
            <button type="button" className="btn btn-secondary w-25" onClick={closeActivateModal}>Cancelar</button>
          </>
        }
      />

      {/* Modal activado correctamente */}

      <ConfirmationModal
        isOpen={isConfirmActivateModalOpen}
        title="Paciente activado"
        message="El paciente ha sido activado correctamente."
        footerButtons={
          <>
            <button type="button" className="btn btn-success w-25" onClick={closeConfirmActivateModal}>Aceptar</button>
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

export default Pacientes;