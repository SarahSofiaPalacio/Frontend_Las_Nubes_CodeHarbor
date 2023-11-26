import React from 'react';

const LoadingSpinner = () => (
  <div className="spinner-container d-flex justify-content-center align-items-center text-center vh-100">
    <div className="spinner"></div>
    <p>Cargando datos, por favor espere...</p>
  </div>
);

export default LoadingSpinner;