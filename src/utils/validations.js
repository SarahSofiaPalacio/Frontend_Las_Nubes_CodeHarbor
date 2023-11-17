export const isEmpty = (value) => !value || value.trim() === "";

export const isRequired = value => value && value.trim() !== "";

export const isSelection = (value) => value === "Seleccione...";

export const isValidDocumentNumber = (value) => /^\d{7,10}$/.test(value.trim());

export const isValidText = (value) => /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value.trim());

export const isDateValid = (value) => {
  const inputDate = new Date(value);
  const currentDate = new Date();
  return inputDate <= currentDate;
};

export const isValidPhoneNumber = (value) => /^\d{7,10}$/.test(value.trim());

export const isValidEmail = (value) => /^\S+@\S+\.\S+$/.test(value.trim());

export const isNumber = (value) => /^\d+$/.test(value.trim());

export const isEspecialidadRequired = (jerarquia, especialidad) => {
  return jerarquia === 'Médico' ? !isSelection(especialidad) : true;
};