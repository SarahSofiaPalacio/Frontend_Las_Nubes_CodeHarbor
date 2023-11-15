import React from 'react';
import Header from '../../components/Header';

function Informes() {
  return (
    <div>
      <Header title="Generar informes" />
      <div className="d-sm-flex align-items-start justify-content-between mb-3">
        <Header subTitle="Generación de informes descargables de cada apartado." />
      </div>
      <div className="container my-5">
        <div className="row justify-content-center">
          {/* Button 1 */}
          <div className="col-md-4 text-center">
            <button type="button" className="btn btn-primary w-75">
              <img src="img/profile.svg" alt="Informe de Pacientes" className="img-fluid mb-4"/>
              Generar informes de Pacientes
            </button>
          </div>
          {/* Button 2 */}
          <div className="col-md-4 text-center">
            <button type="button" className="btn btn-primary w-75">
              <img src="img/profile.svg" alt="Informe de Colaboradores" className="img-fluid mb-4"/>
              Generar informes de Colaboradores
            </button>
          </div>
          {/* Button 3 */}
          <div className="col-md-4 text-center">
            <button type="button" className="btn btn-primary w-75">
              <img src="img/profile.svg" alt="Informe de Medicamentos" className="img-fluid mb-4"/>
              Generar informes de Medicamentos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Informes;
