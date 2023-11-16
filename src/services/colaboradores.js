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

export const getColaborador = (numero_identificacion) => {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simula una respuesta exitosa; podrías querer actualizar tu mock data aquí.
        resolve(colaboradoresMock.find(colaborador => colaborador.numero_identificacion === numero_identificacion));
      }, 1000);
    });
  } else {
    return axios.get(`${URL_BASE}/colaboradores/${numero_identificacion}`)
      .then(response => response.data);
  }
}

export const createColaborador = (colaboradorData) => {
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

export const updateColaborador = (numero_identificacion, colaboradorData) => {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simula una respuesta exitosa; podrías querer actualizar tu mock data aquí.
        resolve({ message: 'Colaborador actualizado exitosamente' });
      }, 1000);
    });
  } else {
    return axios.put(`${URL_BASE}/colaboradores/${numero_identificacion}`, colaboradorData)
      .then(response => response.data);
  }
};

export const deleteColaborador = (numero_identificacion) => {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simula una respuesta exitosa; podrías querer actualizar tu mock data aquí.
        resolve({ message: 'Colaborador eliminado exitosamente' });
      }, 1000);
    });
  } else {
    return axios.delete(`${URL_BASE}/colaboradores/${numero_identificacion}`)
      .then(response => response.data);
  }
}
