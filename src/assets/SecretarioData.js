export const citasTableColumns = [
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
  tipo_identificacion: '',
  numero_identificacion: '',
  nombre: '',
  apellido: '',
  fecha_nacimiento: '',
  estado_civil: '',
  sexo: '',
  direccion: '',
  telefono: '',
  correo_electronico: '',
  salario: '',
  jerarquia: '',
  fecha_ingreso: '',
  especialidad: '',
  foto_url: '',
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

export const citaFormSelectOptions = {
  estado: ['Seleccione...', 'Activa', 'Confirmada', 'Cancelada', 'Ausente', 'Realizada', 'En cita'],
}