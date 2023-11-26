import React, { useState } from 'react';
import Header from '../../components/Header';
import { getReport } from '../../services/informes.js';

function Informes() {
  // Estado para manejar si un informe está siendo generado
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownloadReport = async (reportType) => {
    console.log("Generando informe de %s...", reportType);
    setIsGenerating(true); // Bloquea los botones mientras se genera el informe
    getReport(reportType)
      .then(response => {
        console.log("Informe generado:", response);
        window.open(response);
        setIsGenerating(false); // Desbloquea los botones
      })
      .catch(error => {
        console.error("Error al generar informe:", error);
        setIsGenerating(false); // Desbloquea los botones
      });
  }

  return (
    <div>
      <Header
        title="Generar informes"
        subTitle="Generación de informes descargables de cada apartado."
      />

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
              {/* Poner imagen en un recuadro con los bordes redondeado y con tamaño ajustado */}
              <img src={`${process.env.PUBLIC_URL}/img/informe_pacientes.svg`}  alt="Informe de Pacientes" className="img-fluid mb-2 mt-2 rounded mx-auto d-block"/>
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
              <img src={`${process.env.PUBLIC_URL}/img/informe_colaboradores.svg`} alt="Informe de Colaboradores" className="img-fluid mb-2 mt-2 rounded mx-auto d-block "/>
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
              <img src={`${process.env.PUBLIC_URL}/img/informe_medicamentos.svg`} alt="Informe de Medicamentos" className="img-fluid mb-2 mt-2 rounded mx-auto d-block "/>
              Generar informes de Medicamentos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Informes;
