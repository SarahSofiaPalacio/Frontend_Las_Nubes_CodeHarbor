import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import AddButtom from '../../components/AddButtom';
import Table from '../../components/Table';
import FormModal from '../../components/FormModal';
import FormInput from '../../components/FormInput';
import FormSelect from '../../components/FormSelect';
import ConfirmationModal from '../../components/ConfirmationModal.js';
import { getColaboradores, createColaborador, updateColaborador, deleteColaborador } from '../../services/colaboradores.js';

const columns = ['Identificación', 'Nombres', 'Apellidos', 'Jerarquía', 'Fecha de nacimiento', 'Telefono', 'Más'];

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
}

const initialFormSelectData = {
  tipo_identificacion: ['Seleccione...', 'CC', 'TI', 'RC', 'CE', 'CI', 'DNI', 'NIT', 'PASAPORTE'],
  estado_civil: ['Seleccione...', 'Soltero', 'Casado', 'Viudo', 'Divorciado', 'Unión libre'],
  sexo: ['Seleccione...', 'Masculino', 'Femenino', 'No binario'],
  jerarquia: ['Seleccione...', 'Médico', 'Enfermero', 'Secretario', 'Regente de farmacia'],
  especialidad: ['Seleccione...', 'Medicina general', 'Pediatría', 'Ginecología', 'Cardiología', 'Neurología', 'Oftalmología', 'Otorrinolaringología', 'Dermatología', 'Psiquiatría', 'Oncología', 'Traumatología', 'Urología', 'Endocrinología', 'Gastroenterología', 'Nefrología', 'Reumatología', 'Hematología', 'Infectología', 'Neumología', 'Geriatría', 'Medicina interna', 'Medicina nuclear', 'Medicina del deporte', 'Medicina del trabajo', 'Medicina de urgencias', 'Medicina de rehabilitación', 'Medicina de familia', 'Medicina de cuidados intensivos', 'Medicina de emergencias', 'Medicina de cuidados paliativos', 'Medicina de la educación física y el deporte', 'Medicina de la obesidad', 'Medicina de la adolescencia', 'Medicina de la aviación', 'Medicina de la reproducción', 'Medicina de la sexualidad humana', 'Medicina de urgencias y emergencias', 'Medicina de urgencias y emergencias pediátricas', 'Medicina de urgencias y emergencias geriátricas'],
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
    if (!formData.tipo_identificacion || !formData.tipo_identificacion.trim()) {
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

  const createUser = () => {
    if (validateForm()) {
      console.log('Datos válidos, añadiendo colaborador...');
      setIsLoading(true);
      createColaborador(formData)
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
      setSelectedUser(prevState => {
        const newValues = { ...prevState, [name]: value };
        if (name === 'jerarquia' && value !== 'Médico') {
          newValues.especialidad = 'Seleccione...';
        }
        return newValues;
      });
      setFormData(prevData => {
        const newValues = { ...prevData, [name]: value };
        if (name === 'jerarquia' && value !== 'Médico') {
          newValues.especialidad = 'Seleccione...';
        }
        return newValues;
      });
    }
  };
  
  const updateUser = () => {
    if (validateForm()) {
      console.log('Datos válidos, editando colaborador...');
      setIsLoading(true);
      //setIsEditing(false);
      updateColaborador(selectedUser.numero_identificacion, formData)
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
    deleteColaborador(selectedUser.numero_identificacion, formData)
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
          <tr key={colaborador.numero_identificacion}>
            <td>{colaborador.numero_identificacion}</td>
            <td>{colaborador.nombre}</td>
            <td>{colaborador.apellido}</td>
            <td>{colaborador.jerarquia}</td>
            <td>{colaborador.fecha_nacimiento}</td>
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
              onClick={createUser}
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
              id="fecha_ingreso"
              type="date"
              value={formData.fecha_ingreso}
              error={formErrors.fecha_ingreso}
              onChange={(e) => handleAddFormChange('fecha_ingreso', e.target.value)}
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
                id="tipo_identificacion"
                type="text"
                options={initialFormSelectData.tipo_identificacion}
                value={formData.tipo_identificacion}
                error={formErrors.tipo_identificacion}
                isEditing={isEditing}
                onChange={(e) => handleEditFormChange('tipo_identificacion', e.target.value)}
              />
              <FormInput
                label="Número de documento"
                id="numero_identificacion"
                type="number"
                value={formData.numero_identificacion}
                error={formErrors.numero_identificacion}
                isEditing={isEditing}
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
                isEditing={isEditing}
                onChange={(e) => handleEditFormChange('nombre', e.target.value)}
              />
              <FormInput
                label="Apellidos"
                id="apellido"
                type="text"
                value={formData.apellido}
                error={formErrors.apellido}
                isEditing={isEditing}
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
                isEditing={isEditing}
                onChange={(e) => handleEditFormChange('fecha_nacimiento', e.target.value)}
              />
              <FormSelect
                label="Estado Civil"
                id="estado_civil"
                options={initialFormSelectData.estado_civil}
                value={formData.estado_civil}
                error={formErrors.estado_civil}
                isEditing={isEditing}
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
                id="correo_electronico"
                type="email"
                value={formData.correo_electronico}
                error={formErrors.correo_electronico}
                isEditing={isEditing}
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
                id="fecha_ingreso"
                type="date"
                value={formData.fecha_ingreso}
                error={formErrors.fecha_ingreso}
                isEditing={isEditing}
                onChange={(e) => handleEditFormChange('fecha_ingreso', e.target.value)}
              />
              <FormSelect
                label="Especialidad"
                id="especialidad"
                type="text"
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