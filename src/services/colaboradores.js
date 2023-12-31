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

export const createColaborador = async (token, colaboradorData) => {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ message: 'Colaborador añadido exitosamente' });
      }, 1000);
    });
  } else {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      const response = await axios.post(`${URL_BASE}/admin/colaboradores`, colaboradorData, config);
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

export const updateColaborador = async (token, numero_identificacion, colaboradorData) => {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ message: 'Colaborador actualizado exitosamente' });
      }, 1000);
    });
  } else {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      const response = await axios.patch(`${URL_BASE}/admin/colaboradores/${numero_identificacion}`, colaboradorData, config);
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

export const deleteColaborador = async (token, numero_identificacion) => {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ message: 'Colaborador eliminado exitosamente' });
      }, 1000);
    });
  } else {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      const response = await axios.delete(`${URL_BASE}/admin/colaboradores/${numero_identificacion}`, config);
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
