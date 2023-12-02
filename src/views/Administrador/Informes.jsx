import React, { useState } from 'react';
import Header from '../../components/Header';
import { useAuth } from '../../auth/AuthContext';
import { getReport } from '../../services/informes.js';
import { useNavigate } from 'react-router-dom';

function Informes() {
  const navigate = useNavigate();
  const { token, handleLogout } = useAuth();
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownloadReport = async (reportType) => {
    setIsGenerating(true);
    try {
      const data = await getReport(token, reportType);
      console.log("(Informes) Informe de %s generado exitosamente", reportType);
      const file = new Blob([data], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    } catch (error) {
      if (error.response === 'Sesión expirada') {
        console.log("(Error) Token inválido. Cerrando sesión...");
        await handleLogout();
        navigate('/login');
      } else console.log("(Informes) Error al generar informe de %s:", reportType, error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div>
      <Header
        title="Generar informes"
        subTitle="Generación de informes descargables de cada apartado."
      />

      <div className="container my-5">
        <div className="row justify-content-center">
          {/* Button 1 Pacientes */}
          <div className="col-md-4 text-center mb-3">
            <button
              type="button"
              className="btn btn-primary w-75"
              onClick={() => handleDownloadReport(1)}
              disabled={isGenerating}
            >
              {/* Poner imagen en un recuadro con los bordes redondeado y con tamaño ajustado */}
              <img src={`${process.env.PUBLIC_URL}/img/informe_pacientes.svg`} alt="Informe de Pacientes" className="img-fluid mb-2 mt-2 rounded mx-auto d-block" />
              Generar informes de Pacientes
            </button>
          </div>
          {/* Button 2 Colaboradores */}
          <div className="col-md-4 text-center mb-3">
            <button
              type="button"
              className="btn btn-primary w-75"
              onClick={() => handleDownloadReport(2)}
              disabled={isGenerating}
            >
              <img src={`${process.env.PUBLIC_URL}/img/informe_colaboradores.svg`} alt="Informe de Colaboradores" className="img-fluid mb-2 mt-2 rounded mx-auto d-block " />
              Generar informes de Colaboradores
            </button>
          </div>
          {/* Button 3 Medicamentos */}
          <div className="col-md-4 text-center mb-3">
            <button
              type="button"
              className="btn btn-primary w-75"
              onClick={() => handleDownloadReport(3)}
              disabled={isGenerating}
            >
              <img src={`${process.env.PUBLIC_URL}/img/informe_medicamentos.svg`} alt="Informe de Medicamentos" className="img-fluid mb-2 mt-2 rounded mx-auto d-block " />
              Generar informes de Medicamentos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Informes;
