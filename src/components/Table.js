import React, { useEffect } from 'react';
import $ from 'jquery';
import 'datatables.net-bs4';

function Table({ label, columns, data }) {
  // Efecto para inicializar DataTables
  useEffect(() => {
    if ($.fn.dataTable.isDataTable('#dataTable')) {
      $('#dataTable').DataTable().destroy();
    }

    // Verifica si hay datos disponibles para evitar inicializar la tabla vacía
    if (data && data.length > 0) {
      // Inicializa DataTables nuevamente
      $('#dataTable').DataTable();
    }
  }, [data]); // Dependencia del efecto en 'data'

  return (
    <div className="card shadow mb-4">
      <div className="card-header py-3">
        <h6 className="m-0 font-weight-bold text-primary">{label}</h6>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-bordered" id="dataTable" width="100%" cellspacing="0">
            <thead>
              <tr>
                {columns.map(column => <th key={column}>{column}</th>)}
              </tr>
            </thead>
            <tbody>
              {data.map((colaborador) => (
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
                      data-toggle="modal"
                      data-target={`#editModal-${colaborador.numeroDocumento}`}
                      aria-label="Más opciones">
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
  );
}

export default Table;  