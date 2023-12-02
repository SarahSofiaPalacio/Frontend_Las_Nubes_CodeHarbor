import React, { useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';
import $ from 'jquery';
import 'datatables.net-bs4';

function Table({ label, columns, data, children, loading }) { 
  
  useEffect(() => {
    if ($.fn.dataTable.isDataTable('#dataTable')) {
      $('#dataTable').DataTable().destroy();
    }
    if (data && data.length > 0) {
      $('#dataTable').DataTable();
    }
  }, [data]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="card shadow mb-4">
      {label && label.length > 0 ? (
      <div className="card-header text-center py-3">
        <h6 className="m-0 font-weight-bold text-primary">{label}</h6>
      </div>
      ) : null}
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
            <thead>
              <tr>
                {columns.map(column => <th key={column}>{column}</th>)}
              </tr>
            </thead>
            <tbody>
              {children}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Table;  