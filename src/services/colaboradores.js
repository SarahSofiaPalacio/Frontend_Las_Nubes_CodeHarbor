import axios from 'axios';
import { colaboradoresMock } from '../mocks/colaboradores';

const URL_BASE = process.env.REACT_APP_URL_BASE;
const USE_MOCK = process.env.REACT_APP_USE_MOCK === "true";

export const getColaboradores = async (token) => {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(colaboradoresMock);
      }, 1000);
    });
  } else {
    try {
      const config = {
          headers: {
              Authorization: `Bearer ${token}`
          }
      };
      const response = await axios.get(`${URL_BASE}/admin/colaboradores`, config);
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

export const getColaborador = async (token, numero_identificacion) => {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(colaboradoresMock.find(colaborador => colaborador.numero_identificacion === numero_identificacion));
      }, 1000);
    });
  } else {
    try {
      const config = {
          headers: {
              Authorization: `Bearer ${token}`
          }
      };
      const response = await axios.get(`${URL_BASE}/admin/colaboradores/${numero_identificacion}`, config);
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
