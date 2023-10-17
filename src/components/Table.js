import React from 'react';

function Table({ label, columns, data }) {
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
    );
  }

export default Table;  