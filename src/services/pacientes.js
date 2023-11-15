import axios from 'axios';
import { pacientesMock } from '../mocks/pacientes';

const URL_BASE = process.env.REACT_APP_URL_BASE;
const USE_MOCK = process.env.REACT_APP_USE_MOCK === "true";

export const getPacientes = () => {
  if (USE_MOCK) {
    // Retornar una promesa que simula una llamada al servidor
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(pacientesMock);
      }, 1000);
    });
  } else {
    // Realizar la llamada al backend
    return axios.get(`${URL_BASE}/pacientes`)
      .then(response => response.data);
  }
};

export const createPaciente = (pacienteData) => {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simula una respuesta exitosa; podrías querer actualizar tu mock data aquí.
        resolve({ message: 'Paciente añadido exitosamente' });
      }, 1000);
    });
  } else {
    return axios.post(`${URL_BASE}/pacientes`, pacienteData)
      .then(response => response.data);
  }
};

export const updatePaciente = (numeroDocumento, pacienteData) => {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simula una respuesta exitosa; podrías querer actualizar tu mock data aquí.
        resolve({ message: 'Paciente actualizado exitosamente' });
      }, 1000);
    });
  } else {
    return axios.put(`${URL_BASE}/pacientes/${numeroDocumento}`, pacienteData)
      .then(response => response.data);
  }
};

export const deletePaciente = (numeroDocumento) => {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simula una respuesta exitosa; podrías querer actualizar tu mock data aquí.
        resolve({ message: 'Paciente eliminado exitosamente' });
      }, 1000);
    });
  } else {
    return axios.delete(`${URL_BASE}/pacientes/${numeroDocumento}`)
      .then(response => response.data);
  }
}
