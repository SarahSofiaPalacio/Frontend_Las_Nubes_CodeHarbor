export const secretarioTableColumns = [
  { title: 'Identificación', key: 'tipo_identificacion' },
  { title: 'Nombre', key: 'nombre' },
  { title: 'Tipo de Cita', key: 'especialidad' },
  { title: 'Hora', key: 'hora' },
  { title: 'Fecha', key: 'fecha' },
  { title: 'Más', key: 'accion_mas' }
];

export const citaInitialFormData = {
  fecha: '',
  hora: '',
  id_colaborador: '',
  id_paciente: '',
  estado: '',
}

export const colaboradorInitialFormData = {
  nombre: '',
  especialidad: '',
}
export const pacienteInitialFormData = {
  tipo_identificacion: '',
  numero_identificacion: '',
  nombre: '',
  apellido: '',
  direccion: '',
  telefono: '',
  correo_electronico: '',
}

export const secretarioFormSelectOptions = {
  estado: ['Seleccione...', 'Activa', 'Confirmada', 'Cancelada', 'Ausente', 'Realizada', 'En cita'],
}