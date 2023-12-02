import axios from 'axios';
//import { citasMock } from '../mocks/citas';

const URL_BASE = process.env.REACT_APP_URL_BASE;
const USE_MOCK = process.env.REACT_APP_USE_MOCK === "true";

export const getCitasSecretario = async (token) => {
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
      const response = await axios.get(`${URL_BASE}/citas/activas`, config);
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

export const updateCita = async (token, id_cita, citaData) => {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ message: 'Cita actualizado exitosamente' });
      }, 1000);
    });
  } else {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      const response = await axios.patch(`${URL_BASE}/citas/update/${id_cita}`, citaData, config);
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
export const getCitasEnfermero = async (token, id_enfermero) => {
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
      const response = await axios.get(`${URL_BASE}/citas/enfermero/${id_enfermero}`, config);
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
export const getCitasSinAsignar = async (token) => {
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
      const response = await axios.get(`${URL_BASE}/citas/sinasignar`, config);
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
export const getCitasPacienteActivas = async (token, id_paciente) => {
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
      const response = await axios.get(`${URL_BASE}/citas/paciente/activas/${id_paciente}`, config);
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

export const getEnCitaPacientes = async (token, id_paciente) => {
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
      const response = await axios.get(`${URL_BASE}/citas/medico/encita/${id_paciente}`, config);
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
export const deleteCita = async (token, id_cita) => {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ message: 'cita eliminado exitosamente' });
      }, 1000);
    });
  } else {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      const response = await axios.delete(`${URL_BASE}/citas/cancelar/${id_cita}`, config);
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
export const getCitaEspecialidad = async (token) => {
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
      const response = await axios.get(`${URL_BASE}/citas/especialidades`, config);
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

export const getCitasMedicos = async (token, especialidad) => {
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
      const response = await axios.get(`${URL_BASE}/citas/medicos/${especialidad}`, config);
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

export const getCitaMedico = async (token, id_medico) => {
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
      const response = await axios.get(`${URL_BASE}/citas/medico/${id_medico}`, config);
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

export const getCitaMedicoFecha = async (token, id_medico) => {
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
      const response = await axios.get(`${URL_BASE}/citas/fechas/${id_medico}`, config);
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

export const getCitaMedicoHora = async (token, id_medico, fecha) => {
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
      const response = await axios.get(`${URL_BASE}/citas/horas/${id_medico}/${fecha}`, config);
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

export const asignCita = async (token, id_cita, pacienteData) => {
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
      const response = await axios.post(`${URL_BASE}/citas/pedir/${id_cita}`, pacienteData, config);
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

