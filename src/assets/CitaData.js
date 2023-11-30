export const citasSecretarioTableColumns = ['Identificación Paciente', 'Nombres Paciente', 'Apellidos Paciente', 'Tipo de Cita', 'Hora', 'Fecha', 'Más'];

export const citasEnfermeroTableColumns = ['Identificación Médico', 'Nombres Médico', 'Apellidos Médico', 'Teléfono Médico', 'Tipo de Cita', 'Hora', 'Fecha', 'Más'];

export const citaInitialFormData = {
  id_cita: '',
  fecha: '',
  hora: '',
  id_medico: '',
  id_enfermero: '',
  id_paciente: '',
  estado: '',
  motivo_consulta: '',
  diagnostico_consulta: '',
  tratamiento_consulta: '',
}

export const citaFormSelectOptions = {
  estado: [ 'Activa', 'Confirmada', 'Cancelada' ],
}