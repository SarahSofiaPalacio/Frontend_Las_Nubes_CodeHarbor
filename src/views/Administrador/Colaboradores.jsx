import React, { useEffect, useState } from 'react';
import ModalForm from './Modal';

import $ from 'jquery';
import 'datatables.net-bs4';

function Colaboradores() {
  const columns = ['Identificación', 'Nombres', 'Apellidos', 'Jerarquía', 'Especialidad', 'Telefono', 'Más'];
  const data = [
    {
      id: 1,
      values: ['1004755763', 'Johan Fernando', 'Acuña Pérez', 'Médico', 'Medicina general', '3106355956']
    },
  ];

  const [isEditing, setIsEditing] = useState(false);
  function toggleEdit() {
    if (isEditing) {
      // Agregar la lógica para guardar los datos del formulario
      console.log('Datos guardados'); // Esto es solo un ejemplo
    }
    setIsEditing(!isEditing);
  }

  useEffect(() => {
    // Inicializa DataTables
    if ($.fn.dataTable.isDataTable('#dataTable')) {
      $('#dataTable').DataTable().destroy();
    }

    $('#dataTable').DataTable();
  }, []);

  return (
    <div>
      {/* Información */}
      <div class="d-sm-flex align-items-center justify-content-between mb-3">
        <h1 class="h3 mb-0 text-gray-800">Gestión de colaboradores</h1>
      </div>
      <div class="d-sm-flex align-items-center justify-content-between mb-3">
        <h1 class="h6 mb-0 text-gray-800">Información personal de los colaboradores del centro médico</h1>
        <a href="/#" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm" data-toggle="modal" data-target="#addModal"><i
          class="fas fa-plus mr-3 text-white-50"></i>Añadir colaborador</a>
      </div>

      {/* Tabla de colaboradores */}
      <div class="card shadow mb-4">
        <div class="card-header py-3">
          <h6 class="m-0 font-weight-bold text-primary">Listado de colaboradores</h6>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
              <thead>
                <tr>
                  {columns.map(column => <th key={column}>{column}</th>)}
                </tr>
              </thead>
              <tbody>
                {data.map(row => (
                  <tr key={row.id}>
                    {row.values.map((value, index) => (
                      <td key={index}>{value}</td>
                    ))}
                    <td className="d-flex justify-content-center align-items-center">
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        data-toggle="modal"
                        data-target="#editModal">
                        <i className="fas fa-ellipsis-h"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal añadir colaborador */}
      <ModalForm
        modalId="addModal"
        title="Añadir colaborador"
        footerButtons={
          <>
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
            <button type="button" className="btn btn-primary">Añadir</button>
          </>
        }
      >
        {/* Modal body */}
        <form>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="tipoDocumento">Tipo de documento</label>
              <select className="form-control" id="tipoDocumento">
                <option selected>CC</option>
                {/* Añadir otras opciones si las hay */}
              </select>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="numeroDocumento">Número de documento</label>
              <input type="number" className="form-control" id="numeroDocumento" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="nombres">Nombres</label>
              <input type="text" className="form-control" id="nombres" />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="apellidos">Apellidos</label>
              <input type="text" className="form-control" id="apellidos" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
              <input type="date" className="form-control" id="fechaNacimiento" />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="estadoCivil">Estado Civil</label>
              <select className="form-control" id="estadoCivil">
                <option selected>Seleccione...</option>
                <option>Soltero</option>
                <option>Casado</option>
                {/* Añadir otras opciones si las hay */}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="sexo">Sexo</label>
              <select className="form-control" id="sexo">
                <option selected>Seleccione...</option>
                <option>Masculino</option>
                <option>Femenino</option>
              </select>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="direccion">Dirección</label>
              <input type="text" className="form-control" id="direccion" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="telefono">Teléfono</label>
              <input type="number" className="form-control" id="telefono" />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="correo">Correo Electrónico</label>
              <input type="email" className="form-control" id="correo" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="salario">Salario</label>
              <input type="number" className="form-control" id="salario" />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="jerarquia">Jerarquia</label>
              <select className="form-control" id="jerarquia">
                <option selected>Seleccione...</option>
                <option>Médico</option>
                <option>Enfermero</option>
                {/* Añadir otras opciones si las hay */}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="fechaIngreso">Fecha de ingreso</label>
              <input type="date" className="form-control" id="fechaIngreso" />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="especialidad">Especialidad</label>
              <select className="form-control" id="especialidad">
                <option selected>Seleccione...</option>
                <option>1</option>
                <option>2</option>
                {/* Añadir otras opciones si las hay */}
              </select>
            </div>
          </div>

        </form>
      </ModalForm>

      {/* Modal más información colaborador */}
      <ModalForm
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
        {/* Modal body */}
        <form>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="tipoDocumento">Tipo de documento</label>
              <select className="form-control" id="tipoDocumento" disabled={!isEditing} >
                <option selected>CC</option>
                {/* Añadir otras opciones si las hay */}
              </select>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="numeroDocumento">Número de documento</label>
              <input type="number" className="form-control" id="numeroDocumento" readOnly={!isEditing} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="nombres">Nombres</label>
              <input type="text" className="form-control" id="nombres" readOnly={!isEditing} />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="apellidos">Apellidos</label>
              <input type="text" className="form-control" id="apellidos" readOnly={!isEditing} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
              <input type="date" className="form-control" id="fechaNacimiento" readOnly={!isEditing} />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="estadoCivil">Estado Civil</label>
              <select className="form-control" id="estadoCivil" disabled={!isEditing} >
                <option selected>Seleccione...</option>
                <option>Soltero</option>
                <option>Casado</option>
                {/* Añadir otras opciones si las hay */}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="sexo">Sexo</label>
              <select className="form-control" id="sexo" disabled={!isEditing} >
                <option selected>Seleccione...</option>
                <option>Masculino</option>
                <option>Femenino</option>
              </select>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="direccion">Dirección</label>
              <input type="text" className="form-control" id="direccion" readOnly={!isEditing} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="telefono">Teléfono</label>
              <input type="number" className="form-control" id="telefono" readOnly={!isEditing} />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="correo">Correo Electrónico</label>
              <input type="email" className="form-control" id="correo" readOnly={!isEditing} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="salario">Salario</label>
              <input type="number" className="form-control" id="salario" readOnly={!isEditing} />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="jerarquia">Jerarquia</label>
              <select className="form-control" id="jerarquia" disabled={!isEditing} >
                <option selected>Seleccione...</option>
                <option>Médico</option>
                <option>Enfermero</option>
                {/* Añadir otras opciones si las hay */}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="fechaIngreso">Fecha de ingreso</label>
              <input type="date" className="form-control" id="fechaIngreso" readOnly={!isEditing} />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="especialidad">Especialidad</label>
              <select className="form-control" id="especialidad" disabled={!isEditing} >
                <option selected>Seleccione...</option>
                <option>1</option>
                <option>2</option>
                {/* Añadir otras opciones si las hay */}
              </select>
            </div>
          </div>
        </form>
      </ModalForm>

    </div>
  );
}

export default Colaboradores;