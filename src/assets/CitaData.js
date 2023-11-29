export const citasTableColumns = [
  { title: 'Identificación', key: 'tipo_identificacion', table: 'pacientes' },
  { title: 'Nombre', key: 'nombre', table: 'pacientes' },
  { title: 'Tipo de Cita', key: 'especialidad', table: 'citas_medicas' },
  { title: 'Hora', key: 'hora', table: 'citas_medicas' },
  { title: 'Fecha', key: 'fecha', table: 'citas_medicas' },
  { title: 'Más', key: 'accion_mas' }
];

export const citaInitialFormData = {
  fecha: '',
  hora: '',
  id_colaborador: '',
  id_paciente: '',
  estado: '',
}

export const citaFormSelectOptions = {
  estado: [ 'Activa', 'Confirmada', 'Cancelada' ],
}