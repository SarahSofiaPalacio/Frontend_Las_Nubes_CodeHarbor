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
