import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import 'datatables.net-bs4';

import Header from '../../components/Header';
import AddLink from '../../components/AddLink';
import Table from '../../components/Table';
import FormModal from '../../components/FormModal';
import FormInput from '../../components/FormInput';
import FormSelect from '../../components/FormSelect';

function Colaboradores() {
  // Datos de prueba
  const columns = ['Identificación', 'Nombres', 'Apellidos', 'Jerarquía', 'Especialidad', 'Telefono', 'Más'];
  const data = [
    {
      id: 1,
      values: ['1004755763', 'Johan Fernando', 'Acuña Pérez', 'Médico', 'Medicina general', '3106355956']
    },
    {
      id: 2,
      values: ['1003456789', 'Juan', 'Pérez', 'Enfermero', 'Enfermería', '3106355956']
    },
    {
      id: 3,
      values: ['1003454234', 'María', 'Gómez', 'Enfermero', 'Enfermería', '3106355956']
    },
  ];

  // Estado para controlar si el modal de edición está abierto o cerrado
  const [isEditing, setIsEditing] = useState(false);

  // Función para cambiar el estado del modal de edición
  function toggleEdit() {
    if (isEditing) {
      // Agregar la lógica para guardar los datos del formulario
      console.log('Datos guardados'); // Esto es solo un ejemplo
    }
    setIsEditing(!isEditing);
  }

  // Efecto para inicializar DataTables
  useEffect(() => {
    // Inicializa DataTables
    if ($.fn.dataTable.isDataTable('#dataTable')) {
      $('#dataTable').DataTable().destroy();
    }
    $('#dataTable').DataTable();
  }, []);

  return (
    <div>
      <Header title="Gestión de colaboradores" />
      <div className="d-sm-flex align-items-start justify-content-between mb-3">
        <Header subTitle="Información personal de los colaboradores del centro médico" />
        <AddLink label="Añadir colaborador" />
      </div>
      <Table label="Listado de colaboradores" columns={columns} data={data} />

      {/* Modal añadir colaborador */}
      <FormModal
        modalId="addModal"
        title="Añadir colaborador"
        footerButtons={
          <>
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
            <button type="button" className="btn btn-primary">Añadir</button>
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

      {/* Modal más información colaborador */}
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