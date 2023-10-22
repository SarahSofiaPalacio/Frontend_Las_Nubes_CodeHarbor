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
  tipoDocumento: ['Seleccione...','CC','TI','RC','CE','CI','DNI','NIT','PASAPORTE'],
  estadoCivil: ['Seleccione...','Soltero','Casado','Viudo','Divorciado','Unión libre'],
  sexo: ['Seleccione...','Masculino','Femenino','No binario'],
  jerarquia: ['Seleccione...','Médico','Enfermero','Secretario','Regente de farmacia'],
  especialidad: ['Seleccione...','1','2','3','4','5'],
}

const initialFormErrors = {};

function Colaboradores() {
  const [colaboradores, setColaboradores] = useState([]);
  const [selectedColaborador, setSelectedColaborador] = useState(null);

  const [formData, setFormData] = useState({ initialFormData });
  const [formErrors, setFormErrors] = useState({ initialFormErrors });

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isConfimAddModalOpen, setIsConfimAddModalOpen] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isConfimEditModalOpen, setIsConfimEditModalOpen] = useState(false);
  const [isDiscardEditModalOpen, setIsDiscardEditModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);


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

  const closeConfirmAddModal = () => {
    setIsConfimAddModalOpen(false);
    setIsAddModalOpen(false);
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
      addColaborador(formData)
        .then(response => {
          console.log(response.message);
          setIsConfimAddModalOpen(true);
          loadColaboradores();
        })
        .catch(error => {
          console.error('Hubo un error al añadir el colaborador:', error);
        });
    } else {
      console.log('Datos inválidos');
    }
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

  const closeConfirmEditModal = () => {
    setIsConfimEditModalOpen(false);
    setIsEditModalOpen(false);
  };

  const closeDiscardEditModal = () => {
    setIsDiscardEditModalOpen(false);
  };

  const closeAndDiscardEditModal = () => {
    setIsEditing(false);
    setIsEditModalOpen(false);
    setIsDiscardEditModalOpen(false);
    setSelectedColaborador(null);
    resetForm();
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
      updateColaborador(selectedColaborador.numeroDocumento, formData)
        .then(response => {
          console.log(response.message);
          setIsEditing(false);
          // Aquí puedes también manejar la actualización de la lista de colaboradores o cualquier otro estado si es necesario.
        })
        .catch(error => {
          console.error('Hubo un error al actualizar el colaborador:', error);
          // Aquí puedes manejar errores, mostrar un mensaje de error en la UI, etc.
        });
    } else {
      console.log('Datos inválidos');
    }
  };

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
        onClose={closeAddModal}
        title="Añadir colaborador"
        footerButtons={
          <>
            <button type="button" className="btn btn-secondary" onClick={closeAddModal}>Cancelar</button>
            <button type="button" className="btn btn-primary" onClick={saveColaborator}>Añadir</button>
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
        onCancel={closeConfirmAddModal}
        title="Colaborador añadido"
        message="El colaborador ha sido añadido correctamente."
        footerButtons={
          <>
            <button type="button" className="btn btn-primary" onClick={closeConfirmAddModal}>Aceptar</button>
          </>
        }
      />

      <FormModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        title="Más información del colaborador"
        footerButtons={
          <>
            <button type="button" className="btn btn-secondary" onClick={closeEditModal}>Cerrar</button>
            {isEditing ? (
              <button type="button" className="btn btn-success" onClick={saveChanges}>Guardar</button>
            ) : (
              <button type="button" className="btn btn-primary" onClick={startEditing}>Editar</button>
            )}
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
        onCancel={closeConfirmEditModal}
        title="Colaborador actualizado"
        message="El colaborador ha sido actualizado correctamente."
        footerButtons={
          <>
            <button type="button" className="btn btn-primary" onClick={closeConfirmEditModal}>Aceptar</button>
          </>
        }
      />

      <ConfirmationModal
        isOpen={isDiscardEditModalOpen}
        onCancel={closeDiscardEditModal}
        title="Descartar cambios"
        message="Tiene cambios sin guardar. ¿Está seguro de que quiere descartarlos?"
        footerButtons={
          <>
            <button type="button" className="btn btn-secondary" onClick={closeDiscardEditModal}>Cancelar</button>
            <button type="button" className="btn btn-danger" onClick={closeAndDiscardEditModal}>Descartar cambios</button>
          </>
        }
      />
    </div>
  );
}

export default Colaboradores;