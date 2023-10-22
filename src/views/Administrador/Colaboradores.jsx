import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import AddButtom from '../../components/AddButtom';
import Table from '../../components/Table';
import FormModal from '../../components/FormModal';
import FormInput from '../../components/FormInput';
import FormSelect from '../../components/FormSelect';
import ConfirmationModal from '../../components/ConfirmationModal.js';
import { getColaboradores } from '../../services/api';

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

const initialFormErrors = {};

function Colaboradores() {
  const [colaboradores, setColaboradores] = useState([]);
  const [selectedColaborador, setSelectedColaborador] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAddedModalOpen, setIsAddedModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ initialFormData });
  const [formErrors, setFormErrors] = useState({ initialFormErrors });

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

  const resetForm = () => {
    setFormData(initialFormData);
    setFormErrors(initialFormErrors);
  };

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
    resetForm();
  };

  const openEditModal = (colaborador) => {
    setSelectedColaborador(colaborador);
    setFormData(colaborador);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    if (isEditing) {
      setIsConfirmationModalOpen(true);
    } else {
      setIsEditModalOpen(false);
      setSelectedColaborador(null);
      resetForm();
    }
  };

  const closeAddedModal = () => {
    setIsAddedModalOpen(false);
    setIsAddModalOpen(false);
  };

  const closeConfirmModal = () => {
    setIsConfirmationModalOpen(false);
  };

  const closeConfirmModalDiscard = () => {
    setIsEditing(false);
    setIsEditModalOpen(false);
    setIsConfirmationModalOpen(false);
    setSelectedColaborador(null);
    resetForm();
  };

  const handleFormChange = (field, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  const handleInputChange = (field, value) => {
    if (isEditing) {
      setSelectedColaborador(prevState => ({
        ...prevState,
        [field]: value,
      }));
      setFormData(prevData => ({
        ...prevData,
        [field]: value,
      }));
    }
  };

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
  
    setFormErrors(errors); // Asumiendo que tienes una función para actualizar el estado de los errores.
    return Object.keys(errors).length === 0; // Retorna true si no hay errores.
  };
  
  const toggleAdd = () => {
    if (validateForm()) {
      console.log('Datos añadidos');
      setIsAddedModalOpen(true);
    } else {
      console.log('Datos inválidos');
    }
  };

  const startEditing = () => {
    setIsEditing(true);
  };

  const saveChanges = () => {
    if (validateForm()) {
      console.log('Datos editados');
      // Aquí, puedes hacer una llamada a la API para actualizar los datos del colaborador...
      setIsEditing(false);
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
            <button type="button" className="btn btn-primary" onClick={toggleAdd}>Añadir</button>
          </>
        }
      >
        <form>
          <div className="form-row">
            <FormSelect
              label="Tipo de documento"
              id="tipoDocumento"
              type="text"
              options={['Seleccione...','CC']}
              value={formData.tipoDocumento}
              error={formErrors.tipoDocumento}
              onChange={(e) => handleFormChange('tipoDocumento', e.target.value)}
            />
            <FormInput
              label="Número de documento"
              id="numeroDocumento"
              type="number"
              value={formData.numeroDocumento}
              error={formErrors.numeroDocumento}
              onChange={(e) => handleFormChange('numeroDocumento', e.target.value)}
            />
          </div>
          <div className="form-row">
            <FormInput
              label="Nombres"
              id="nombres"
              type="text"
              value={formData.nombres}
              error={formErrors.nombres}
              onChange={(e) => handleFormChange('nombres', e.target.value)}
            />
            <FormInput
              label="Apellidos"
              id="apellidos"
              type="text"
              value={formData.apellidos}
              error={formErrors.apellidos}
              onChange={(e) => handleFormChange('apellidos', e.target.value)}
            />
          </div>
          <div className="form-row">
            <FormInput
              label="Fecha de Nacimiento"
              id="fechaNacimiento"
              type="date"
              value={formData.fechaNacimiento}
              error={formErrors.fechaNacimiento}
              onChange={(e) => handleFormChange('fechaNacimiento', e.target.value)}
            />
            <FormSelect
              label="Estado Civil"
              id="estadoCivil"
              type="text"
              options={['Seleccione...', 'Soltero', 'Casado']}
              value={formData.estadoCivil}
              error={formErrors.estadoCivil}
              onChange={(e) => handleFormChange('estadoCivil', e.target.value)}
            />
          </div>
          <div className="form-row">
            <FormSelect
              label="Sexo"
              id="sexo"
              type="text"
              options={['Seleccione...', 'Masculino', 'Femenino']}
              value={formData.sexo}
              error={formErrors.sexo}
              onChange={(e) => handleFormChange('sexo', e.target.value)}
            />
            <FormInput
              label="Dirección"
              id="direccion"
              type="text"
              value={formData.direccion}
              error={formErrors.direccion}
              onChange={(e) => handleFormChange('direccion', e.target.value)}
            />
          </div>
          <div className="form-row">
            <FormInput
              label="Teléfono"
              id="telefono"
              type="number"
              value={formData.telefono}
              error={formErrors.telefono}
              onChange={(e) => handleFormChange('telefono', e.target.value)}
            />
            <FormInput
              label="Correo Electrónico"
              id="correo"
              type="email"
              value={formData.correo}
              error={formErrors.correo}
              onChange={(e) => handleFormChange('correo', e.target.value)}
            />
          </div>
          <div className="form-row">
            <FormInput
              label="Salario"
              id="salario"
              type="number"
              value={formData.salario}
              error={formErrors.salario}
              onChange={(e) => handleFormChange('salario', e.target.value)}
            />
            <FormSelect
              label="Jerarquía"
              id="jerarquia"
              type="text"
              options={['Seleccione...', 'Médico', 'Enfermero']}
              value={formData.jerarquia}
              error={formErrors.jerarquia}
              onChange={(e) => handleFormChange('jerarquia', e.target.value)}
            />
          </div>
          <div className="form-row">
            <FormInput
              label="Fecha de ingreso"
              id="fechaIngreso"
              type="date"
              value={formData.fechaIngreso}
              error={formErrors.fechaIngreso}
              onChange={(e) => handleFormChange('fechaIngreso', e.target.value)}
            />
            <FormSelect
              label="Especialidad"
              id="especialidad"
              type="text"
              options={['Seleccione...', '1', '2']}
              value={formData.especialidad}
              error={formErrors.especialidad}
              onChange={(e) => handleFormChange('especialidad', e.target.value)}
            />
          </div>
        </form>
      </FormModal>

      <ConfirmationModal
        isOpen={isAddedModalOpen}
        onCancel={closeAddedModal}
        title="Colaborador añadido"
        message="El colaborador ha sido añadido correctamente."
        footerButtons={
          <>
            <button type="button" className="btn btn-primary" onClick={closeAddedModal}>Aceptar</button>
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
                options={['Seleccione...','CC']}
                value={formData.tipoDocumento}
                error={formErrors.tipoDocumento}
                isEditing={isEditing}
                onChange={(e) => handleInputChange('tipoDocumento', e.target.value)}
              />
              <FormInput
                label="Número de documento"
                id="numeroDocumento"
                type="number"
                value={formData.numeroDocumento}
                error={formErrors.numeroDocumento}
                isEditing={isEditing}
                onChange={(e) => handleInputChange('numeroDocumento', e.target.value)}
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
                onChange={(e) => handleInputChange('nombres', e.target.value)}
              />
              <FormInput
                label="Apellidos"
                id="apellidos"
                type="text"
                value={formData.apellidos}
                error={formErrors.apellidos}
                isEditing={isEditing}
                onChange={(e) => handleInputChange('apellidos', e.target.value)}
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
                onChange={(e) => handleInputChange('fechaNacimiento', e.target.value)}
              />
              <FormSelect
                label="Estado Civil"
                id="estadoCivil"
                options={['Seleccione...', 'Soltero', 'Casado']}
                value={formData.estadoCivil}
                error={formErrors.estadoCivil}
                isEditing={isEditing}
                onChange={(e) => handleInputChange('estadoCivil', e.target.value)}
              />
            </div>
            <div className="form-row">
              <FormSelect
                label="Sexo"
                id="sexo"
                options={['Seleccione...', 'Masculino', 'Femenino']}
                value={formData.sexo}
                error={formErrors.sexo}
                isEditing={isEditing}
                onChange={(e) => handleInputChange('sexo', e.target.value)}
              />
              <FormInput
                label="Dirección"
                id="direccion"
                type="text"
                value={formData.direccion}
                error={formErrors.direccion}
                isEditing={isEditing}
                onChange={(e) => handleInputChange('direccion', e.target.value)}
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
                onChange={(e) => handleInputChange('telefono', e.target.value)}
              />
              <FormInput
                label="Correo Electrónico"
                id="correo"
                type="email"
                value={formData.correo}
                error={formErrors.correo}
                isEditing={isEditing}
                onChange={(e) => handleInputChange('correo', e.target.value)}
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
                onChange={(e) => handleInputChange('salario', e.target.value)}
              />
              <FormSelect
                label="Jerarquía"
                id="jerarquia"
                options={['Seleccione...', 'Médico', 'Enfermero']}
                value={formData.jerarquia}
                error={formErrors.jerarquia}
                isEditing={isEditing}
                onChange={(e) => handleInputChange('jerarquia', e.target.value)}
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
                onChange={(e) => handleInputChange('fechaIngreso', e.target.value)}
              />
              <FormSelect
                label="Especialidad"
                id="especialidad"
                options={['Seleccione...', '1', '2']}
                value={formData.especialidad}
                error={formErrors.especialidad}
                isEditing={isEditing}
                onChange={(e) => handleInputChange('especialidad', e.target.value)}
              />
            </div>
          </form>
        ) : (
          <p>Cargando...</p>
        )}

      </FormModal>

      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onCancel={closeConfirmModal}
        title="Descartar cambios"
        message="Tiene cambios sin guardar. ¿Está seguro de que quiere descartarlos?"
        footerButtons={
          <>
            <button type="button" className="btn btn-secondary" onClick={closeConfirmModal}>Cancelar</button>
            <button type="button" className="btn btn-danger" onClick={closeConfirmModalDiscard}>Descartar cambios</button>
          </>
        }
      />
    </div>
  );
}

export default Colaboradores;