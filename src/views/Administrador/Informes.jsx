import React, { useState } from 'react';
import Header from '../../components/Header';
import { getReport } from '../../services/informes.js';

function Informes() {
  // Estado para manejar si un informe está siendo generado
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownloadReport = async (reportType) => {
    setIsGenerating(true); // Bloquea los botones mientras se genera el informe
    try {
      const fileURL = await getReport(reportType);
      window.open(fileURL);
    } catch (error) {
      console.error("Error fetching report:", error);
    }
    setIsGenerating(false); // Desbloquea los botones una vez generado el informe
  };

  return (
    <div>
      <Header title="Generar informes" />
      <div className="d-sm-flex align-items-start justify-content-between mb-3">
        <Header subTitle="Generación de informes descargables de cada apartado." />
      </div>
      <div className="container my-5">
        <div className="row justify-content-center">
          {/* Button 1 */}
          <div className="col-md-4 text-center mb-3">
            <button 
              type="button" 
              className="btn btn-primary w-75" 
              onClick={() => handleDownloadReport('pacientes')}
              disabled={isGenerating}
            >
              <img src="img/profile.svg" alt="Informe de Pacientes" className="img-fluid mb-4"/>
              Generar informes de Pacientes
            </button>
          </div>
          {/* Button 2 */}
          <div className="col-md-4 text-center mb-3">
            <button 
              type="button" 
              className="btn btn-primary w-75" 
              onClick={() => handleDownloadReport('colaboradores')}
              disabled={isGenerating}
            >
              <img src="img/profile.svg" alt="Informe de Colaboradores" className="img-fluid mb-4"/>
              Generar informes de Colaboradores
            </button>
          </div>
          {/* Button 3 */}
          <div className="col-md-4 text-center mb-3">
            <button 
              type="button" 
              className="btn btn-primary w-75" 
              onClick={() => handleDownloadReport('medicamentos')}
              disabled={isGenerating}
            >
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
