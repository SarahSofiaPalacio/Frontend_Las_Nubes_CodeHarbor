import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import AddButtom from '../../components/AddButtom';
import Table from '../../components/Table';
import FormModal from '../../components/FormModal';
import FormInput from '../../components/FormInput';
import FormSelect from '../../components/FormSelect';
import ConfirmationModal from '../../components/ConfirmationModal.js';
import { getPacientes, createPaciente, updatePaciente, deletePaciente } from '../../services/pacientes.js';

const tableColumns = ['Identificación', 'Nombres', 'Apellidos', 'Estado civil', 'Fecha de nacimiento', 'Telefono', 'Más'];

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

const initialFormSelectData = {
  tipo_identificacion: ['Seleccione...', 'CC', 'TI', 'RC', 'CE', 'CI', 'DNI', 'NIT', 'PASAPORTE'],
  estado_civil: ['Seleccione...', 'Soltero', 'Casado', 'Viudo', 'Divorciado', 'Unión libre'],
  sexo: ['Seleccione...', 'Masculino', 'Femenino', 'No binario']
}

const initialFormErrors = {};

function Pacientes() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isLoadingTable, setLoadingTable] = useState(false);

  const [formData, setFormData] = useState({ initialFormData });
  const [formErrors, setFormErrors] = useState({ initialFormErrors });
  const [isLoadingRequest, setIsLoadingRequest] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isConfimAddModalOpen, setIsConfimAddModalOpen] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isFormEditing, setIsFormEditing] = useState(false);
  const [isConfimUpdateModalOpen, setIsConfimUpdateModalOpen] = useState(false);
  const [isDiscardUpdateModalOpen, setIsDiscardUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);

  // Cargar lista de usuarios al cargar la página

  const loadUsers = () => {
    console.log('Cargando pacientes...');
    setLoadingTable(true);
    getPacientes()
      .then(response => {
        console.log('Data fetched:', response);
        setUsers(response);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setIsErrorModalOpen(true);
      })
      .finally(() => {
        setLoadingTable(false);
      });
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // Validar formulario de paciente

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
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Resetear formulario

  const resetForm = () => {
    setFormData(initialFormData);
    setFormErrors(initialFormErrors);
  };

  // Modal de error inesperado

  const closeErrorModal = () => {
    setIsErrorModalOpen(false);
    setIsLoadingRequest(false);
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

  const createUser = () => {
    if (validateForm()) {
      console.log('Datos válidos, añadiendo paciente...');
      setIsLoadingRequest(true);
      createPaciente(formData)
        .then(response => {
          console.log(response.message);
          setIsConfimAddModalOpen(true);
        })
        .catch(error => {
          console.error('Hubo un error al añadir el paciente:', error);
          setIsErrorModalOpen(true);
        });
    } else {
      console.log('Datos inválidos');
    }
  };

  const closeConfirmAddModal = () => {
    setIsConfimAddModalOpen(false);
    setIsAddModalOpen(false);
    setIsLoadingRequest(false);
    loadUsers();
  };

  // Funciones para el modal editar

  const openEditModal = (paciente) => {
    setSelectedUser(paciente);
    setFormData(paciente);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    if (isFormEditing) {
      setIsDiscardUpdateModalOpen(true);
    } else {
      setIsEditModalOpen(false);
      setSelectedUser(null);
      resetForm();
    }
  };

  const startEditing = () => {
    setIsFormEditing(true);
  };

  const handleEditFormChange = (name, value) => {
    if (isFormEditing) {
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
      setIsLoadingRequest(true);
      setIsFormEditing(false);
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

  const closeConfirmUpdateModal = () => {
    setIsConfimUpdateModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedUser(null);
    resetForm();
    setIsFormEditing(false);
    setIsLoadingRequest(false);
    loadUsers();
  };

  const closeDiscardUpdateModal = () => {
    setIsDiscardUpdateModalOpen(false);
  };

  const closeAndDiscardUpdateModal = () => {
    setIsDiscardUpdateModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedUser(null);
    resetForm();
    setIsFormEditing(false);
  };

  const OpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const deleteUser = () => {
    console.log('Eliminando paciente...');
    setIsLoadingRequest(true);
    setIsDeleteModalOpen(false);
    deletePaciente(selectedUser.numero_identificacion, formData)
      .then(response => {
        console.log(response.message);
        setIsConfirmDeleteModalOpen(true);
      })
      .catch(error => {
        console.error('Hubo un error al actualizar el paciente:', error);
        setIsErrorModalOpen(true);
      });
  };

  const closeConfirmDeleteModal = () => {
    setIsConfirmDeleteModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedUser(null);
    resetForm();
    setIsFormEditing(false);
    setIsLoadingRequest(false);
    loadUsers();
  }

  return (
    <div>
      <Header title="Gestión de pacientes" />
      <div className="d-sm-flex align-items-start justify-content-between mb-3">
        <Header subTitle="Información personal de los pacientes del centro médico" />
        <AddButtom label="Añadir paciente" onClick={openAddModal} />
      </div>

      {/* Tabla de colaboradores */}

      <Table label="Listado de pacientes" columns={tableColumns} data={users} loading={isLoadingTable}>
        {users.map((paciente) => (
          <tr key={paciente.numero_identificacion}>
            <td>{paciente.numero_identificacion}</td>
            <td>{paciente.nombre}</td>
            <td>{paciente.apellido}</td>
            <td>{paciente.estado_civil}</td>
            <td>{paciente.fecha_nacimiento}</td>
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
              disabled={isLoadingRequest}
            > {isLoadingRequest ? "Cargando..." : "Añadir"}
            </button>
            <button
              type="button"
              className="btn btn-secondary w-25"
              onClick={closeAddModal}
              disabled={isLoadingRequest}
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
              options={initialFormSelectData.tipo_identificacion}
              value={formData.tipo_identificacion}
              error={formErrors.tipo_identificacion}
              onChange={(e) => handleAddFormChange('tipo_identificacion', e.target.value)}
            />
            <FormInput
              label="Número de documento"
              id="numero_identificacion"
              type="number"
              value={formData.numero_identificacion}
              error={formErrors.numero_identificacion}
              onChange={(e) => handleAddFormChange('numero_identificacion', e.target.value)}
            />
          </div>
          <div className="form-row">
            <FormInput
              label="Nombres"
              id="nombre"
              type="text"
              value={formData.nombre}
              error={formErrors.nombre}
              onChange={(e) => handleAddFormChange('nombre', e.target.value)}
            />
            <FormInput
              label="Apellidos"
              id="apellido"
              type="text"
              value={formData.apellido}
              error={formErrors.apellido}
              onChange={(e) => handleAddFormChange('apellido', e.target.value)}
            />
          </div>
          <div className="form-row">
            <FormInput
              label="Fecha de Nacimiento"
              id="fecha_nacimiento"
              type="date"
              value={formData.fecha_nacimiento}
              error={formErrors.fecha_nacimiento}
              onChange={(e) => handleAddFormChange('fecha_nacimiento', e.target.value)}
            />
            <FormSelect
              label="Estado Civil"
              id="estado_civil"
              type="text"
              options={initialFormSelectData.estado_civil}
              value={formData.estado_civil}
              error={formErrors.estado_civil}
              onChange={(e) => handleAddFormChange('estado_civil', e.target.value)}
            />
          </div>
          <div className="form-row">
            <FormSelect
              label="Sexo"
              id="sexo"
              type="text"
              options={initialFormSelectData.sexo}
              value={formData.sexo}
              error={formErrors.sexo}
              onChange={(e) => handleAddFormChange('sexo', e.target.value)}
            />
            <FormInput
              label="Dirección"
              id="direccion"
              type="text"
              value={formData.direccion}
              error={formErrors.direccion}
              onChange={(e) => handleAddFormChange('direccion', e.target.value)}
            />
          </div>
          <div className="form-row">
            <FormInput
              label="Teléfono"
              id="telefono"
              type="number"
              value={formData.telefono}
              error={formErrors.telefono}
              onChange={(e) => handleAddFormChange('telefono', e.target.value)}
            />
            <FormInput
              label="Correo Electrónico"
              id="correo_electronico"
              type="email"
              value={formData.correo_electronico}
              error={formErrors.correo_electronico}
              onChange={(e) => handleAddFormChange('correo_electronico', e.target.value)}
            />
          </div>
        </form>
      </FormModal>

      {/* Modal añadido correctamente */}

      <ConfirmationModal
        isOpen={isConfimAddModalOpen}
        title="Paciente añadido"
        message="El paciente ha sido añadido correctamente."
        footerButtons={
          <>
            <button type="button" className="btn btn-success w-25" onClick={closeConfirmAddModal}>Aceptar</button>
          </>
        }
      />

      {/* Modal editar */}

      <FormModal
        isOpen={isEditModalOpen}
        title="Más información del paciente"
        footerButtons={
          <>
            {isFormEditing || isLoadingRequest ? (
              <button
                type="button"
                className="btn btn-success w-25"
                onClick={updateUser}
                disabled={isLoadingRequest}
              > {isLoadingRequest ? "Cargando..." : "Guardar"}
              </button>
            ) : (
              <>
                <button
                  type="button"
                  className="btn btn-primary w-25"
                  onClick={startEditing}
                  disabled={isLoadingRequest}
                > Editar
                </button>
                <button
                  type="button"
                  className="btn btn-danger w-25"
                  onClick={OpenDeleteModal}
                  disabled={isLoadingRequest}
                > {isLoadingRequest ? "Cargando..." : "Eliminar"}
                </button>
              </>
            )}
            <button
              type="button"
              className="btn btn-secondary w-25"
              onClick={closeEditModal}
              disabled={isLoadingRequest}
            > Cancelar
            </button>
          </>
        }
      >
        {selectedUser ? (
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
          </form>
        ) : (
          <p>Cargando...</p>
        )}

      </FormModal>

      {/* Modal actualizado correctamente */}

      <ConfirmationModal
        isOpen={isConfimUpdateModalOpen}
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

      {/* Modal confirmar eliminar */}

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        title="Eliminar paciente"
        message="Esta acción no se puede deshacer. ¿Está seguro de que quiere eliminar este paciente?"
        footerButtons={
          <>
            <button type="button" className="btn btn-danger w-25" onClick={deleteUser}>Eliminar</button>
            <button type="button" className="btn btn-secondary w-25" onClick={closeDeleteModal}>Cancelar</button>
          </>
        }
      />

      {/* Modal eliminado correctamente */}

      <ConfirmationModal
        isOpen={isConfirmDeleteModalOpen}
        title="Paciente eliminado"
        message="El paciente ha sido eliminado correctamente."
        footerButtons={
          <>
            <button type="button" className="btn btn-success w-25" onClick={closeConfirmDeleteModal}>Aceptar</button>
          </>
        }
      />

    </div>
  );
}

export default Pacientes;