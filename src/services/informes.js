import axios from 'axios';
import pdfMockURL from '../mocks/informes.pdf';

const URL_BASE = process.env.REACT_APP_URL_BASE;
const USE_MOCK = process.env.REACT_APP_USE_MOCK === "true";

export const getReport = async (token, reportType) => {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(pdfMockURL);
      }, 1000);
    });
  } else {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        },
        responseType: 'blob'
      };
      const response = await axios.get(`${URL_BASE}/users/informe/${reportType}`, config);
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.msg || 'Error desconocido');
      } else if (error.request) {
        throw new Error('No hay respuesta del servidor');
      } else {
        throw new Error('Error al configurar la petición');
      }
    }
  }
};