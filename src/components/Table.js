import React, { useEffect } from 'react';
import $ from 'jquery';
import 'datatables.net-bs4';
import LoadingSpinner from './LoadingSpinner';

function Table({ label, columns, data, children, loading }) { 
  useEffect(() => {
    if ($.fn.dataTable.isDataTable('#dataTable')) {
      $('#dataTable').DataTable().destroy();
    }
    if (data && data.length > 0) {
      $('#dataTable').DataTable();
    }
  }, [data, loading]);

  if (loading) {
    return <LoadingSpinner />;
  }

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
              {children}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Table;  