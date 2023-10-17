import React, { useState, useEffect } from 'react';

import Header from '../../components/Header';
import AddButtom from '../../components/AddButtom';
import Table from '../../components/Table';
import FormModal from '../../components/FormModal';
import FormInput from '../../components/FormInput';
import FormSelect from '../../components/FormSelect';

import { getColaboradores } from '../../services/api';

function Colaboradores() {
  // Datos los colaboradores
  const columns = ['Identificación', 'Nombres', 'Apellidos', 'Jerarquía', 'Especialidad', 'Telefono', 'Más'];
  const [colaboradores, setColaboradores] = useState([]);
  useEffect(() => {
    getColaboradores()
      .then(colaboradoresData => {
        setColaboradores(colaboradoresData);
      })
      .catch(error => {
        console.error("Hubo un error al obtener los datos de los colaboradores:", error);
      });
  }, []);

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
        <AddButtom label="Añadir colaborador" />
      </div>
      <Table label="Listado de colaboradores" columns={columns} data={colaboradores} />
      <FormModal
        modalId="addModal"
        title="Añadir colaborador"
        footerButtons={
          <>
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
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
        modalId="editModal"
        title="Más información del colaborador"
        footerButtons={
          <>
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
            <button type="button" className="btn btn-primary" onClick={toggleEdit}>
              {isEditing ? "Guardar" : "Editar"}
            </button>
          </>
        }
      >
        <form>
          <div className="form-row">
            <FormSelect id="tipoDocumento" label="Tipo de documento" options={['CC']} isEditing={isEditing} />
            <FormInput id="numeroDocumento" label="Número de documento" type="number" isEditing={isEditing} />
          </div>

          <div className="form-row">
            <FormInput id="nombres" label="Nombres" type="text" isEditing={isEditing} />
            <FormInput id="apellidos" label="Apellidos" type="text" isEditing={isEditing} />
          </div>

          <div className="form-row">
            <FormInput id="fechaNacimiento" label="Fecha de Nacimiento" type="date" isEditing={isEditing} />
            <FormSelect id="estadoCivil" label="Estado Civil" options={['Seleccione...', 'Soltero', 'Casado']} isEditing={isEditing} />
          </div>

          <div className="form-row">
            <FormSelect label="Sexo" id="sexo" options={['Seleccione...', 'Masculino', 'Femenino']} isEditing={isEditing} />
            <FormInput label="Dirección" id="direccion" isEditing={isEditing} />
          </div>

          <div className="form-row">
            <FormInput label="Teléfono" id="telefono" type="number" isEditing={isEditing} />
            <FormInput label="Correo Electrónico" id="correo" type="email" isEditing={isEditing} />
          </div>

          <div className="form-row">
            <FormInput label="Salario" id="salario" type="number" isEditing={isEditing} />
            <FormSelect label="Jerarquía" id="jerarquia" options={['Seleccione...', 'Médico', 'Enfermero']} isEditing={isEditing} />
          </div>

          <div className="form-row">
            <FormInput label="Fecha de ingreso" id="fechaIngreso" type="date" isEditing={isEditing} />
            <FormSelect label="Especialidad" id="especialidad" options={['Seleccione...', '1', '2']} isEditing={isEditing} />
          </div>
        </form>
      </FormModal>

    </div>
  );
}

export default Colaboradores;