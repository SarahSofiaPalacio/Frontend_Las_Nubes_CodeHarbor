import axios from 'axios';
import pdfMockURL from '../mocks/informes.pdf';

const URL_BASE = process.env.REACT_APP_URL_BASE;
const USE_MOCK = process.env.REACT_APP_USE_MOCK === "true";

export const getReport = (reportType) => {
    if (USE_MOCK) {
      // Retornar una promesa que simula una llamada al servidor
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(pdfMockURL);
        }, 1000);
      });
    } else {
      // Realizar la llamada al backend y obtener un PDF
      return axios({
        url: `${URL_BASE}/informes/${reportType}`,
        method: 'GET',
        responseType: 'blob', // Importante para que axios trate la respuesta como un archivo binario
      }).then(response => {
        // Crear un URL para el Blob recibido
        const fileURL = URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
        return fileURL;
      });
    }
  };