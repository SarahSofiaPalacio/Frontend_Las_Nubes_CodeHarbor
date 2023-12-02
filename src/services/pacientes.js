import axios from 'axios';
import { pacientesMock } from '../mocks/pacientes';

const URL_BASE = process.env.REACT_APP_URL_BASE;
const USE_MOCK = process.env.REACT_APP_USE_MOCK === "true";

export const getPacientes = async (token) => {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(pacientesMock);
      }, 1000);
    });
  } else {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      const response = await axios.get(`${URL_BASE}/pacientes`, config);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Sesión expirada');
      } else if (error.response) {
        throw new Error(error.response.data.msg || 'Error desconocido');
      } else if (error.request) {
        throw new Error('No hay respuesta del servidor');
      } else {
        throw new Error('Error al configurar la petición');
      }
    }
  }
};

export const getPaciente = async (token, numero_identificacion) => {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(pacientesMock.find(paciente => paciente.numero_identificacion === numero_identificacion));
      }, 1000);
    });
  } else {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      const response = await axios.get(`${URL_BASE}/pacientes/${numero_identificacion}`, config);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Sesión expirada');
      } else if (error.response) {
        throw new Error(error.response.data.msg || 'Error desconocido');
      } else if (error.request) {
        throw new Error('No hay respuesta del servidor');
      } else {
        throw new Error('Error al configurar la petición');
      }
    }
  }
};

export const createPaciente = async (token, pacienteData) => {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ message: 'Paciente añadido exitosamente' });
      }, 1000);
    });
  } else {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      const response = await axios.post(`${URL_BASE}/pacientes`, pacienteData, config);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Sesión expirada');
      } else if (error.response) {
        throw new Error(error.response.data.msg || 'Error desconocido');
      } else if (error.request) {
        throw new Error('No hay respuesta del servidor');
      } else {
        throw new Error('Error al configurar la petición');
      }
    }
  }
};

export const updatePaciente = async (token, numero_identificacion, pacienteData) => {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ message: 'Paciente actualizado exitosamente' });
      }, 1000);
    });
  } else {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      const response = await axios.patch(`${URL_BASE}/pacientes/${numero_identificacion}`, pacienteData, config);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Sesión expirada');
      } else if (error.response) {
        throw new Error(error.response.data.msg || 'Error desconocido');
      } else if (error.request) {
        throw new Error('No hay respuesta del servidor');
      } else {
        throw new Error('Error al configurar la petición');
      }
    }
  }
};

export const deletePaciente = async (token, numero_identificacion) => {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ message: 'Paciente eliminado exitosamente' });
      }, 1000);
    });
  } else {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      const response = await axios.delete(`${URL_BASE}/pacientes/${numero_identificacion}`, config);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Sesión expirada');
      } else if (error.response) {
        throw new Error(error.response.data.msg || 'Error desconocido');
      } else if (error.request) {
        throw new Error('No hay respuesta del servidor');
      } else {
        throw new Error('Error al configurar la petición');
      }
    }
  }
}
