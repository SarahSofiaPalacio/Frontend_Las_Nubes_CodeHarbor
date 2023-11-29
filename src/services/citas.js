import axios from 'axios';
//import { citasMock } from '../mocks/citas';

const URL_BASE = process.env.REACT_APP_URL_BASE;
const USE_MOCK = process.env.REACT_APP_USE_MOCK === "true";

export const getCitas = () => {
  if (USE_MOCK) {
    // Retornar una promesa que simula una llamada al servidor
    return new Promise((resolve) => {
      setTimeout(() => {
        //resolve(citasMock);
      }, 1000);
    });
  } else {
    // Realizar la llamada al backend
    return axios.get(`${URL_BASE}/citas`)
      .then(response => response.data);
  }
};

export const updateCita = (numeroDocumento, citaData) => {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simula una respuesta exitosa; podrías querer actualizar tu mock data aquí.
        resolve({ message: 'Cita actualizado exitosamente' });
      }, 1000);
    });
  } else {
    return axios.put(`${URL_BASE}/citas/${numeroDocumento}`, citaData)
      .then(response => response.data);
  }
};

