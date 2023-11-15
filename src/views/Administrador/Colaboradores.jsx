import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import AddButtom from '../../components/AddButtom';
import Table from '../../components/Table';
import FormModal from '../../components/FormModal';
import FormInput from '../../components/FormInput';
import FormSelect from '../../components/FormSelect';
import ConfirmationModal from '../../components/ConfirmationModal.js';
import { getColaboradores, addColaborador, updateColaborador, deleteColaborador } from '../../services/api';

const columns = ['Identificación', 'Nombres', 'Apellidos', 'Jerarquía', 'Especialidad', 'Telefono', 'Más'];

const initialFormData = {
  tipoDocumento: '',
  numeroDocumento: '',
  nombres: '',
  apellidos: '',
  fechaNacimiento: '',
  estadoCivil: '',
  sexo: '',
  direccion: '',
  telefono: '',
  correo: '',
  salario: '',
  jerarquia: '',
  fechaIngreso: '',
  especialidad: '',
}

const initialFormSelectData = {
  tipoDocumento: ['Seleccione...', 'CC', 'TI', 'RC', 'CE', 'CI', 'DNI', 'NIT', 'PASAPORTE'],
  estadoCivil: ['Seleccione...', 'Soltero', 'Casado', 'Viudo', 'Divorciado', 'Unión libre'],
  sexo: ['Seleccione...', 'Masculino', 'Femenino', 'No binario'],
  jerarquia: ['Seleccione...', 'Médico', 'Enfermero', 'Secretario', 'Regente de farmacia'],
  especialidad: ['Seleccione...', '1', '2', '3', '4', '5'],
}

const initialFormErrors = {};

function Colaboradores() {
  const [user, setUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({ initialFormData });
  const [formErrors, setFormErrors] = useState({ initialFormErrors });
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isConfimAddModalOpen, setIsConfimAddModalOpen] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isConfimUpdateModalOpen, setIsConfimUpdateModalOpen] = useState(false);
  const [isDiscardUpdateModalOpen, setIsDiscardUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);

  // Cargar lista de user al cargar la página

  const loadUser = async () => {
    setLoading(true);
    try {
      const userData = await getColaboradores();
      setUser(userData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadUser();
  }, []);

  // Validar formulario de colaborador

  const validateForm = () => {
    const errors = {};
    if (!formData.numeroDocumento || !formData.numeroDocumento.trim()) {
      errors.numeroDocumento = "Número de documento es requerido";
    } else if (!/^\d{7,10}$/.test(formData.numeroDocumento.trim())) {
      errors.numeroDocumento = "Número de documento inválido, debe tener entre 7 y 10 dígitos";
    }
    if (!formData.numeroDocumento || !formData.numeroDocumento.trim()) {
      errors.numeroDocumento = "Número de documento es requerido";
    }
    if (!formData.nombres || !formData.nombres.trim()) {
      errors.nombres = "Nombres son requeridos";
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(formData.nombres.trim())) {
      errors.nombres = "Nombres inválidos, solo se permiten letras y espacios";
    }
    if (!formData.apellidos || !formData.apellidos.trim()) {
      errors.apellidos = "Apellidos son requeridos";
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(formData.apellidos.trim())) {
      errors.apellidos = "Apellidos inválidos, solo se permiten letras y espacios";
    }
    if (!formData.fechaNacimiento) {
      errors.fechaNacimiento = "Fecha de nacimiento es requerida";
    } else if (new Date(formData.fechaNacimiento) > new Date()) {
      errors.fechaNacimiento = "Fecha de nacimiento no puede ser una fecha futura";
    }
    if (!formData.estadoCivil || formData.estadoCivil === "Seleccione...") {
      errors.estadoCivil = "Estado civil es requerido";
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
    if (!formData.correo || !formData.correo.trim()) {
      errors.correo = "Correo Electrónico es requerido";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.correo.trim())) {
      errors.correo = "Correo Electrónico inválido";
    }
    if (!formData.salario || !formData.salario.trim()) {
      errors.salario = "Salario es requerido";
    } else if (!/^\d+$/.test(formData.salario.trim())) {
      errors.salario = "Salario inválido, solo se permiten números";
    }
    if (!formData.jerarquia || formData.jerarquia === "Seleccione...") {
      errors.jerarquia = "Jerarquía es requerida";
    }
    if (!formData.fechaIngreso) {
      errors.fechaIngreso = "Fecha de ingreso es requerida";
    } else if (new Date(formData.fechaIngreso) > new Date()) {
      errors.fechaIngreso = "Fecha de ingreso no puede ser una fecha futura";
    }
    if (formData.jerarquia === 'Médico' && (!formData.especialidad || formData.especialidad === "Seleccione...")) {
      errors.especialidad = "Especialidad es requerida";
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
    setIsLoading(false);
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
      if (name === 'jerarquia' && value !== 'Médico') {
        updatedFormData.especialidad = 'Seleccione...';
      }
      return updatedFormData;
    });
  };

  const addUser = () => {
    if (validateForm()) {
      console.log('Datos válidos, añadiendo colaborador...');
      setIsLoading(true);
      addColaborador(formData)
        .then(response => {
          console.log(response.message);
          setIsConfimAddModalOpen(true);
        })
        .catch(error => {
          console.error('Hubo un error al añadir el colaborador:', error);
          setIsErrorModalOpen(true);
        });
    } else {
      console.log('Datos inválidos');
    }
  };

  const closeConfirmAddModal = () => {
    setIsConfimAddModalOpen(false);
    setIsAddModalOpen(false);
    setIsLoading(false);
    loadUser();
  };

  // Funciones para el modal editar

  const openEditModal = (colaborador) => {
    setSelectedUser(colaborador);
    setFormData(colaborador);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    if (isEditing) {
      setIsDiscardUpdateModalOpen(true);
    } else {
      setIsEditModalOpen(false);
      setSelectedUser(null);
      resetForm();
    }
  };

  const startEditing = () => {
    setIsEditing(true);
  };

  const handleEditFormChange = (name, value) => {
    if (isEditing) {
      setSelectedUser(prevState => ({
        ...prevState,
        [name]: value,
        especialidad: name === 'jerarquia' && value !== 'Médico' ? 'Seleccione...' : prevState.especialidad,
      }));
      setFormData(prevData => ({
        ...prevData,
        [name]: value,
        especialidad: name === 'jerarquia' && value !== 'Médico' ? 'Seleccione...' : prevData.especialidad,
      }));
    }
  };

  const updateUser = () => {
    if (validateForm()) {
      console.log('Datos válidos, editando colaborador...');
      setIsLoading(true);
      //setIsEditing(false);
      updateColaborador(selectedUser.numeroDocumento, formData)
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
    setIsEditModalOpen(false);
    setSelectedUser(null);
    resetForm();
    setIsEditing(false);
    setIsLoading(false);
    loadUser();
  };

  const closeDiscardUpdateModal = () => {
    setIsDiscardUpdateModalOpen(false);
  };

  const closeAndDiscardUpdateModal = () => {
    setIsDiscardUpdateModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedUser(null);
    resetForm();
    setIsEditing(false);
  };

  const OpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const deleteUser = () => {
    console.log('Eliminando colaborador...');
    setIsLoading(true);
    setIsDeleteModalOpen(false);
    deleteColaborador(selectedUser.numeroDocumento, formData)
      .then(response => {
        console.log(response.message);
        setIsConfirmDeleteModalOpen(true);
      })
      .catch(error => {
        console.error('Hubo un error al actualizar el colaborador:', error);
        setIsErrorModalOpen(true);
      });
  };

  const closeConfirmDeleteModal = () => {
    setIsConfirmDeleteModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedUser(null);
    resetForm();
    setIsEditing(false);
    setIsLoading(false);
    loadUser();
  }

  return (
    <div>
      <Header title="Gestión de colaboradores" />
      <div className="d-sm-flex align-items-start justify-content-between mb-3">
        <Header subTitle="Información personal de los colaboradores del centro médico" />
        <AddButtom label="Añadir colaborador" onClick={openAddModal} />
      </div>

      <Table label="Listado de colaboradores" columns={columns} data={user} loading={loading}>
        {user.map((colaborador) => (
          <tr key={colaborador.numeroDocumento}>
            <td>{colaborador.numeroDocumento}</td>
            <td>{colaborador.nombres}</td>
            <td>{colaborador.apellidos}</td>
            <td>{colaborador.jerarquia}</td>
            <td>{colaborador.especialidad}</td>
            <td>{colaborador.telefono}</td>
            <td className="d-flex justify-content-center align-items-center">
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() => openEditModal(colaborador)}
                aria-label="Más opciones">
                <i className="fas fa-ellipsis-h"></i>
              </button>
            </td>
          </tr>
        ))}
      </Table>

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

      <FormModal
        isOpen={isAddModalOpen}
        title="Añadir colaborador"
        footerButtons={
          <>
            <button
              type="button"
              className="btn btn-success w-25"
              onClick={addUser}
              disabled={isLoading}
            > {isLoading ? "Cargando..." : "Añadir"}
            </button>
            <button
              type="button"
              className="btn btn-secondary w-25"
              onClick={closeAddModal}
              disabled={isLoading}
            > Cancelar
            </button>
          </>
        }
      >
        <form>
          <div className="form-row">
            <FormSelect
              label="Tipo de documento"
              id="tipoDocumento"
              type="text"
              options={initialFormSelectData.tipoDocumento}
              value={formData.tipoDocumento}
              error={formErrors.tipoDocumento}
              onChange={(e) => handleAddFormChange('tipoDocumento', e.target.value)}
            />
            <FormInput
              label="Número de documento"
              id="numeroDocumento"
              type="number"
              value={formData.numeroDocumento}
              error={formErrors.numeroDocumento}
              onChange={(e) => handleAddFormChange('numeroDocumento', e.target.value)}
            />
          </div>
          <div className="form-row">
            <FormInput
              label="Nombres"
              id="nombres"
              type="text"
              value={formData.nombres}
              error={formErrors.nombres}
              onChange={(e) => handleAddFormChange('nombres', e.target.value)}
            />
            <FormInput
              label="Apellidos"
              id="apellidos"
              type="text"
              value={formData.apellidos}
              error={formErrors.apellidos}
              onChange={(e) => handleAddFormChange('apellidos', e.target.value)}
            />
          </div>
          <div className="form-row">
            <FormInput
              label="Fecha de Nacimiento"
              id="fechaNacimiento"
              type="date"
              value={formData.fechaNacimiento}
              error={formErrors.fechaNacimiento}
              onChange={(e) => handleAddFormChange('fechaNacimiento', e.target.value)}
            />
            <FormSelect
              label="Estado Civil"
              id="estadoCivil"
              type="text"
              options={initialFormSelectData.estadoCivil}
              value={formData.estadoCivil}
              error={formErrors.estadoCivil}
              onChange={(e) => handleAddFormChange('estadoCivil', e.target.value)}
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
              id="correo"
              type="email"
              value={formData.correo}
              error={formErrors.correo}
              onChange={(e) => handleAddFormChange('correo', e.target.value)}
            />
          </div>
          <div className="form-row">
            <FormInput
              label="Salario"
              id="salario"
              type="number"
              value={formData.salario}
              error={formErrors.salario}
              onChange={(e) => handleAddFormChange('salario', e.target.value)}
            />
            <FormSelect
              label="Jerarquía"
              id="jerarquia"
              type="text"
              options={initialFormSelectData.jerarquia}
              value={formData.jerarquia}
              error={formErrors.jerarquia}
              onChange={(e) => handleAddFormChange('jerarquia', e.target.value)}
            />
          </div>
          <div className="form-row">
            <FormInput
              label="Fecha de ingreso"
              id="fechaIngreso"
              type="date"
              value={formData.fechaIngreso}
              error={formErrors.fechaIngreso}
              onChange={(e) => handleAddFormChange('fechaIngreso', e.target.value)}
            />
            <FormSelect
              label="Especialidad"
              id="especialidad"
              type="text"
              options={initialFormSelectData.especialidad}
              value={formData.especialidad}
              error={formErrors.especialidad}
              onChange={(e) => handleAddFormChange('especialidad', e.target.value)}
              isEditing={formData.jerarquia === 'Médico'}
            />
          </div>
        </form>
      </FormModal>

      <ConfirmationModal
        isOpen={isConfimAddModalOpen}
        title="Colaborador añadido"
        message="El colaborador ha sido añadido correctamente."
        footerButtons={
          <>
            <button type="button" className="btn btn-success w-25" onClick={closeConfirmAddModal}>Aceptar</button>
          </>
        }
      />

      <FormModal
        isOpen={isEditModalOpen}
        title="Más información del colaborador"
        footerButtons={
          <>            
            {isEditing ? (
              <button
                type="button"
                className="btn btn-success w-25"
                onClick={updateUser}
                disabled={isLoading}
              > {isLoading ? "Cargando..." : "Guardar"}
              </button>
            ) : (
              <>
                <button
                  type="button"
                  className="btn btn-primary w-25"
                  onClick={startEditing}
                  disabled={isLoading}
                > Editar
                </button>
                <button
                  type="button"
                  className="btn btn-danger w-25"
                  onClick={OpenDeleteModal}
                  disabled={isLoading}
                > {isLoading ? "Cargando..." : "Eliminar"}
              </button>
              </>
            )}
            <button
              type="button"
              className="btn btn-secondary w-25"
              onClick={closeEditModal}
              disabled={isLoading}
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
                id="tipoDocumento"
                type="text"
                options={initialFormSelectData.tipoDocumento}
                value={formData.tipoDocumento}
                error={formErrors.tipoDocumento}
                isEditing={isEditing}
                onChange={(e) => handleEditFormChange('tipoDocumento', e.target.value)}
              />
              <FormInput
                label="Número de documento"
                id="numeroDocumento"
                type="number"
                value={formData.numeroDocumento}
                error={formErrors.numeroDocumento}
                isEditing={isEditing}
                onChange={(e) => handleEditFormChange('numeroDocumento', e.target.value)}
              />
            </div>
            <div className="form-row">
              <FormInput
                label="Nombres"
                id="nombres"
                type="text"
                value={formData.nombres}
                error={formErrors.nombres}
                isEditing={isEditing}
                onChange={(e) => handleEditFormChange('nombres', e.target.value)}
              />
              <FormInput
                label="Apellidos"
                id="apellidos"
                type="text"
                value={formData.apellidos}
                error={formErrors.apellidos}
                isEditing={isEditing}
                onChange={(e) => handleEditFormChange('apellidos', e.target.value)}
              />
            </div>
            <div className="form-row">
              <FormInput
                label="Fecha de Nacimiento"
                id="fechaNacimiento"
                type="date"
                value={formData.fechaNacimiento}
                error={formErrors.fechaNacimiento}
                isEditing={isEditing}
                onChange={(e) => handleEditFormChange('fechaNacimiento', e.target.value)}
              />
              <FormSelect
                label="Estado Civil"
                id="estadoCivil"
                options={initialFormSelectData.estadoCivil}
                value={formData.estadoCivil}
                error={formErrors.estadoCivil}
                isEditing={isEditing}
                onChange={(e) => handleEditFormChange('estadoCivil', e.target.value)}
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
                id="correo"
                type="email"
                value={formData.correo}
                error={formErrors.correo}
                isEditing={isEditing}
                onChange={(e) => handleEditFormChange('correo', e.target.value)}
              />
            </div>
            <div className="form-row">
              <FormInput
                label="Salario"
                id="salario"
                type="number"
                value={formData.salario}
                error={formErrors.salario}
                isEditing={isEditing}
                onChange={(e) => handleEditFormChange('salario', e.target.value)}
              />
              <FormSelect
                label="Jerarquía"
                id="jerarquia"
                options={initialFormSelectData.jerarquia}
                value={formData.jerarquia}
                error={formErrors.jerarquia}
                isEditing={isEditing}
                onChange={(e) => handleEditFormChange('jerarquia', e.target.value)}
              />
            </div>
            <div className="form-row">
              <FormInput
                label="Fecha de ingreso"
                id="fechaIngreso"
                type="date"
                value={formData.fechaIngreso}
                error={formErrors.fechaIngreso}
                isEditing={isEditing}
                onChange={(e) => handleEditFormChange('fechaIngreso', e.target.value)}
              />
              <FormSelect
                label="Especialidad"
                id="especialidad"
                options={initialFormSelectData.especialidad}
                value={formData.especialidad}
                error={formErrors.especialidad}
                isEditing={isEditing && formData.jerarquia === 'Médico'}
                onChange={(e) => handleEditFormChange('especialidad', e.target.value)}
              />
            </div>
          </form>
        ) : (
          <p>Cargando...</p>
        )}

      </FormModal>

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

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        title="Eliminar colaborador"
        message="Esta acción no se puede deshacer. ¿Está seguro de que quiere eliminar este colaborador?"
        footerButtons={
          <>
            <button type="button" className="btn btn-danger w-25" onClick={deleteUser}>Eliminar</button>
            <button type="button" className="btn btn-secondary w-25" onClick={closeDeleteModal}>Cancelar</button>
          </>
        }
      />

      <ConfirmationModal
        isOpen={isConfirmDeleteModalOpen}
        title="Colaborador eliminado"
        message="El colaborador ha sido eliminado correctamente."
        footerButtons={
          <>
            <button type="button" className="btn btn-success w-25" onClick={closeConfirmDeleteModal}>Aceptar</button>
          </>
        }
      />

    </div>
  );
}

export default Colaboradores;