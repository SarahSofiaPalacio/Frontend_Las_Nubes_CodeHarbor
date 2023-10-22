import axios from 'axios';
import { colaboradoresMock } from '../mocks/colaboradores';

const URL_BASE = process.env.REACT_APP_URL_BASE;
const USE_MOCK = process.env.REACT_APP_USE_MOCK === "true";

export const getColaboradores = () => {
  if (USE_MOCK) {
    // Retornar una promesa que simula una llamada al servidor
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(colaboradoresMock);
      }, 1000);
    });
  } else {
    // Realizar la llamada al backend
    return axios.get(`${URL_BASE}/colaboradores`)
      .then(response => response.data);
  }
};

export const addColaborador = (colaboradorData) => {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simula una respuesta exitosa; podrías querer actualizar tu mock data aquí.
        resolve({ message: 'Colaborador añadido exitosamente' });
      }, 1000);
    });
  } else {
    return axios.post(`${URL_BASE}/colaboradores`, colaboradorData)
      .then(response => response.data);
  }
};

export const updateColaborador = (numeroDocumento, colaboradorData) => {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simula una respuesta exitosa; podrías querer actualizar tu mock data aquí.
        resolve({ message: 'Colaborador actualizado exitosamente' });
      }, 1000);
    });
  } else {
    return axios.put(`${URL_BASE}/colaboradores/${numeroDocumento}`, colaboradorData)
      .then(response => response.data);
  }
};
