import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import AddButtom from '../../components/AddButtom';
import Table from '../../components/Table';
import FormModal from '../../components/FormModal';
import FormInput from '../../components/FormInput';
import FormSelect from '../../components/FormSelect';
import ConfirmationModal from '../../components/ConfirmationModal.js';
import { getColaboradores, addColaborador, updateColaborador } from '../../services/api';

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
  const [colaboradores, setColaboradores] = useState([]);
  const [selectedColaborador, setSelectedColaborador] = useState(null);

  const [formData, setFormData] = useState({ initialFormData });
  const [formErrors, setFormErrors] = useState({ initialFormErrors });
  const [isLoading, setIsLoading] = useState(false);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isConfimAddModalOpen, setIsConfimAddModalOpen] = useState(false);
  const [isErrorAddModalOpen, setIsErrorAddModalOpen] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isConfimEditModalOpen, setIsConfimEditModalOpen] = useState(false);
  const [isErrorEditModalOpen, setIsErrorEditModalOpen] = useState(false);
  const [isDiscardEditModalOpen, setIsDiscardEditModalOpen] = useState(false);
  const [isDeleteEditModalOpen, setIsDeleteEditModalOpen] = useState(false);


  // Cargar lista de colaboradores al cargar la página

  useEffect(() => {
    loadColaboradores();
  }, []);

  const loadColaboradores = async () => {
    try {
      const colaboradoresData = await getColaboradores();
      setColaboradores(colaboradoresData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Validar formulario de colaborador

  const validateForm = () => {
    const errors = {};

    if (!formData.tipoDocumento) {
      errors.tipoDocumento = "Tipo de documento es requerido";
    }
    if (!formData.numeroDocumento || !formData.numeroDocumento.trim()) {
      errors.numeroDocumento = "Número de documento es requerido";
    }
    if (!formData.nombres || !formData.nombres.trim()) {
      errors.nombres = "Nombres son requeridos";
    }
    if (!formData.apellidos || !formData.apellidos.trim()) {
      errors.apellidos = "Apellidos son requeridos";
    }
    if (!formData.fechaNacimiento) {
      errors.fechaNacimiento = "Fecha de nacimiento es requerida";
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
    } else if (!/^\d+$/.test(formData.telefono)) {
      errors.telefono = "Teléfono inválido, solo se permiten números";
    }
    if (!formData.correo || !formData.correo.trim()) {
      errors.correo = "Correo Electrónico es requerido";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo)) {
      errors.correo = "Correo Electrónico inválido";
    }
    if (!formData.salario) {
      errors.salario = "Salario es requerido";
    } else if (isNaN(Number(formData.salario)) || Number(formData.salario) <= 0) {
      errors.salario = "Salario inválido";
    }
    if (!formData.jerarquia || formData.jerarquia === "Seleccione...") {
      errors.jerarquia = "Jerarquía es requerida";
    }
    if (!formData.fechaIngreso) {
      errors.fechaIngreso = "Fecha de ingreso es requerida";
    }
    if (!formData.especialidad || formData.especialidad === "Seleccione...") {
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

  // Funciones para el modal añadir

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
    resetForm();
  };

  const handleAddFormChange = (name, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const saveColaborator = () => {
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
          setIsErrorAddModalOpen(true);
        });
    } else {
      console.log('Datos inválidos');
    }
  };

  const closeConfirmAddModal = () => {
    setIsConfimAddModalOpen(false);
    setIsAddModalOpen(false);
    setIsLoading(false);
    loadColaboradores();
  };

  const closeErrorAddModal = () => {
    setIsErrorAddModalOpen(false);
    setIsLoading(false);
  };


  // Funciones para el modal editar

  const openEditModal = (colaborador) => {
    setSelectedColaborador(colaborador);
    setFormData(colaborador);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    if (isEditing) {
      setIsDiscardEditModalOpen(true);
    } else {
      setIsEditModalOpen(false);
      setSelectedColaborador(null);
      resetForm();
    }
  };

  const startEditing = () => {
    setIsEditing(true);
  };

  const handleEditFormChange = (name, value) => {
    if (isEditing) {
      setSelectedColaborador(prevState => ({
        ...prevState,
        [name]: value,
      }));
      setFormData(prevData => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const saveChanges = () => {
    if (validateForm()) {
      console.log('Datos válidos, editando colaborador...');
      setIsLoading(true);
      updateColaborador(selectedColaborador.numeroDocumento, formData)
        .then(response => {
          console.log(response.message);
          setIsConfimEditModalOpen(true);
        })
        .catch(error => {
          console.error('Hubo un error al actualizar el colaborador:', error);
          setIsErrorEditModalOpen(true);
        });
    } else {
      console.log('Datos inválidos');
    }
  };

  const closeConfirmEditModal = () => {
    setIsConfimEditModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedColaborador(null);
    resetForm();
    setIsEditing(false);
    setIsLoading(false);
    loadColaboradores();
  };

  const closeErrorEditModal = () => {
    setIsErrorEditModalOpen(false);
    setIsLoading(false);
  };

  const closeDiscardEditModal = () => {
    setIsDiscardEditModalOpen(false);
  };

  const closeAndDiscardEditModal = () => {
    setIsDiscardEditModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedColaborador(null);
    resetForm();
    setIsEditing(false);
  };

  // Abre sin mas
  const deleteColaborator = () => {
    setIsDeleteEditModalOpen(true);
  };

  // Cierra sin mas
  const closeDeleteEditModal = () => {
    setIsDeleteEditModalOpen(false);
  };

  // Funcion de borrado

  // Se llama en funcion de borrado bien
  const closeAndDeleteEditModal = () => {
    setIsDeleteEditModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedColaborador(null);
    resetForm();
    setIsEditing(false);
    setIsLoading(false);
    loadColaboradores();
  }

  // Se llama en funcion de borrado error

  

  return (
    <div>
      <Header title="Gestión de colaboradores" />
      <div className="d-sm-flex align-items-start justify-content-between mb-3">
        <Header subTitle="Información personal de los colaboradores del centro médico" />
        <AddButtom label="Añadir colaborador" onClick={openAddModal} />
      </div>

      <Table label="Listado de colaboradores" columns={columns} data={colaboradores}>
        {colaboradores.map((colaborador) => (
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

      <FormModal
        isOpen={isAddModalOpen}
        title="Añadir colaborador"
        footerButtons={
          <>
            <button
              type="button"
              className="btn btn-success w-25"
              onClick={saveColaborator}
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

      <ConfirmationModal
        isOpen={isErrorAddModalOpen}
        title="Error al añadir colaborador"
        message="El colaborador no pudo ser añadido debido a un error inesperado, por favor intente de nuevo."
        footerButtons={
          <>
            <button type="button" className="btn btn-danger w-25" onClick={closeErrorAddModal}>Aceptar</button>
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
                onClick={saveChanges}
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
                  onClick={deleteColaborator}
                  disabled={isLoading}
                > Eliminar
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
        {selectedColaborador ? (
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
                isEditing={isEditing}
                onChange={(e) => handleEditFormChange('especialidad', e.target.value)}
              />
            </div>
          </form>
        ) : (
          <p>Cargando...</p>
        )}

      </FormModal>

      <ConfirmationModal
        isOpen={isConfimEditModalOpen}
        title="Colaborador actualizado"
        message="El colaborador ha sido actualizado correctamente."
        footerButtons={
          <>
            <button type="button" className="btn btn-success w-25" onClick={closeConfirmEditModal}>Aceptar</button>
          </>
        }
      />

      <ConfirmationModal
        isOpen={isErrorEditModalOpen}
        title="Error al actualizar colaborador"
        message="El colaborador no pudo ser actualizado debido a un error inesperado, por favor intente de nuevo."
        footerButtons={
          <>
            <button type="button" className="btn btn-danger w-25" onClick={closeErrorEditModal}>Aceptar</button>
          </>
        }
      />

      <ConfirmationModal
        isOpen={isDiscardEditModalOpen}
        title="Descartar cambios"
        message="Tiene cambios sin guardar. ¿Está seguro de que quiere descartarlos?"
        footerButtons={
          <>
            <button type="button" className="btn btn-warning w-25" onClick={closeAndDiscardEditModal}>Descartar</button>
            <button type="button" className="btn btn-secondary w-25" onClick={closeDiscardEditModal}>Cancelar</button>            
          </>
        }
      />

      <ConfirmationModal
        isOpen={isDeleteEditModalOpen}
        title="Eliminar colaborador"
        message="Esta acción no se puede deshacer. ¿Está seguro de que quiere eliminar este colaborador?"
        footerButtons={
          <>
            <button type="button" className="btn btn-danger w-25" onClick={closeAndDeleteEditModal}>Eliminar</button>
            <button type="button" className="btn btn-secondary w-25" onClick={closeDeleteEditModal}>Cancelar</button>
          </>
        }
      />

    </div>
  );
}

export default Colaboradores;