import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import AddButtom from '../../components/AddButtom';
import Table from '../../components/Table';
import FormModal from '../../components/FormModal';
import FormInput from '../../components/FormInput';
import FormSelect from '../../components/FormSelect';
import ConfirmationModal from '../../components/ConfirmationModal.js';
import { getColaboradores } from '../../services/api';

function Colaboradores() {
  const [colaboradores, setColaboradores] = useState([]);
  const [selectedColaborador, setSelectedColaborador] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const columns = ['Identificación', 'Nombres', 'Apellidos', 'Jerarquía', 'Especialidad', 'Telefono', 'Más'];
  
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

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const openEditModal = (colaborador) => {
    setSelectedColaborador(colaborador);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    if (isEditing) {
      setIsConfirmationModalOpen(true);
    } else {
      setIsEditModalOpen(false);
      setSelectedColaborador(null);
    }
  };

  const closeConfirmModal = () => {
    setIsConfirmationModalOpen(false);
  };
  
  const closeConfirmModalDiscard = () => {
    setIsEditing(false);
    setIsEditModalOpen(false);
    setIsConfirmationModalOpen(false);
    setSelectedColaborador(null);
  };
  
  const handleInputChange = (field, value) => {
    setSelectedColaborador(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  // Estado para controlar si el modal de edición está abierto o cerrado
  const [isEditing, setIsEditing] = useState(false);
  function toggleEdit() {
    if (isEditing) {
      // Agregar la lógica para guardar los datos del formulario
      console.log('Datos guardados');
    }
    setIsEditing(!isEditing);
  }

  // Estado para controlar si el modal de adición está abierto o cerrado
  const [isAdding, setIsAdding] = useState(false);
  function toggleAdd() {
    if (isAdding) {
      // Agregar la lógica para guardar los datos del formulario
      console.log('Datos añadidos');
    }
    setIsAdding(!isAdding);
  }

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
            <FormSelect label="Tipo de documento" id="tipoDocumento" options={['CC']} />
            <FormInput label="Número de documento" id="numeroDocumento" type="number" />
          </div>

          <div className="form-row">
            <FormInput label="Nombres" id="nombres" />
            <FormInput label="Apellidos" id="apellidos" />
          </div>

          <div className="form-row">
            <FormInput label="Fecha de Nacimiento" id="fechaNacimiento" type="date" />
            <FormSelect label="Estado Civil" id="estadoCivil" options={['Seleccione...', 'Soltero', 'Casado']} />
          </div>

          <div className="form-row">
            <FormSelect label="Sexo" id="sexo" options={['Seleccione...', 'Masculino', 'Femenino']} />
            <FormInput label="Dirección" id="direccion" />
          </div>

          <div className="form-row">
            <FormInput label="Teléfono" id="telefono" type="number" />
            <FormInput label="Correo Electrónico" id="correo" type="email" />
          </div>

          <div className="form-row">
            <FormInput label="Salario" id="salario" type="number" />
            <FormSelect label="Jerarquía" id="jerarquia" options={['Seleccione...', 'Médico', 'Enfermero']} />
          </div>

          <div className="form-row">
            <FormInput label="Fecha de ingreso" id="fechaIngreso" type="date" />
            <FormSelect label="Especialidad" id="especialidad" options={['Seleccione...', '1', '2']} />
          </div>
        </form>
      </FormModal>

      <FormModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        title="Más información del colaborador"
        footerButtons={
          <>
            <button type="button" className="btn btn-secondary" onClick={closeEditModal}>Cerrar</button>
            <button type="button" className="btn btn-primary" onClick={toggleEdit}>
              {isEditing ? "Guardar" : "Editar"}
            </button>
          </>
        }
      >
        {selectedColaborador ? (
          <form>
            <div className="form-row">
              <FormSelect label="Tipo de documento" id="tipoDocumento" options={['CC']} value={selectedColaborador.tipoDocumento || 'CC'} isEditing={isEditing} onChange={(e) => handleInputChange('tipoDocumento', e.target.value)} />
              <FormInput label="Número de documento" id="numeroDocumento" type="number" value={selectedColaborador.numeroDocumento} isEditing={isEditing} onChange={(e) => handleInputChange('numeroDocumento', e.target.value)} />
            </div>

            <div className="form-row">
              <FormInput label="Nombres" id="nombres" type="text" value={selectedColaborador.nombres} isEditing={isEditing} onChange={(e) => handleInputChange('nombres', e.target.value)} />
              <FormInput label="Apellidos" id="apellidos" type="text" value={selectedColaborador.apellidos} isEditing={isEditing} onChange={(e) => handleInputChange('apellidos', e.target.value)} />
            </div>

            <div className="form-row">
              <FormInput label="Fecha de Nacimiento" id="fechaNacimiento" type="date" value={selectedColaborador.fechaNacimiento} isEditing={isEditing} onChange={(e) => handleInputChange('fechaNacimiento', e.target.value)} />
              <FormSelect label="Estado Civil" id="estadoCivil" options={['Seleccione...', 'Soltero', 'Casado']} value={selectedColaborador.estadoCivil} isEditing={isEditing} onChange={(e) => handleInputChange('estadoCivil', e.target.value)} />
            </div>

            <div className="form-row">
              <FormSelect label="Sexo" id="sexo" options={['Seleccione...', 'Masculino', 'Femenino']} value={selectedColaborador.sexo} isEditing={isEditing} onChange={(e) => handleInputChange('sexo', e.target.value)} />
              <FormInput label="Dirección" id="direccion" value={selectedColaborador.direccion} isEditing={isEditing} onChange={(e) => handleInputChange('direccion', e.target.value)} />
            </div>

            <div className="form-row">
              <FormInput label="Teléfono" id="telefono" type="number" value={selectedColaborador.telefono} isEditing={isEditing} onChange={(e) => handleInputChange('telefono', e.target.value)} />
              <FormInput label="Correo Electrónico" id="correo" type="email" value={selectedColaborador.correo} isEditing={isEditing} onChange={(e) => handleInputChange('correo', e.target.value)} />
            </div>

            <div className="form-row">
              <FormInput label="Salario" id="salario" type="number" value={selectedColaborador.salario} isEditing={isEditing} onChange={(e) => handleInputChange('salario', e.target.value)} />
              <FormSelect label="Jerarquía" id="jerarquia" options={['Seleccione...', 'Médico', 'Enfermero']} value={selectedColaborador.jerarquia} isEditing={isEditing} onChange={(e) => handleInputChange('jerarquia', e.target.value)} />
            </div>

            <div className="form-row">
              <FormInput label="Fecha de ingreso" id="fechaIngreso" type="date" value={selectedColaborador.fechaIngreso} isEditing={isEditing} onChange={(e) => handleInputChange('fechaIngreso', e.target.value)} />
              <FormSelect label="Especialidad" id="especialidad" options={['Seleccione...', '1', '2']} value={selectedColaborador.especialidad} isEditing={isEditing} onChange={(e) => handleInputChange('especialidad', e.target.value)} />
            </div>
          </form>
        ) : (
          <p>Cargando...</p>
        )}

      </FormModal>

      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onCancel={closeConfirmModal} 
        onDiscard={closeConfirmModalDiscard}
        message="Tiene cambios sin guardar. ¿Está seguro de que quiere descartarlos?"
      />

    </div>
  );
}

export default Colaboradores;