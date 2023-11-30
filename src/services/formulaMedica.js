import axios from 'axios';
//import { citasMock } from '../mocks/citas';

const URL_BASE = process.env.REACT_APP_URL_BASE;
const USE_MOCK = process.env.REACT_APP_USE_MOCK === "true";

export const getFormulaMedica = async (token, id_paciente) => {
    if (USE_MOCK) {
      return new Promise((resolve) => {
        setTimeout(() => {
          //resolve(citasMock);
        }, 1000);
      });
    } else {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        const response = await axios.get(`${URL_BASE}//${id_paciente}`, config);
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