export const pacienteTableColumns = [
  { title: 'Identificación', key: 'numero_identificacion', table: 'pacientes' },
  { title: 'Nombres', key: 'nombre', table: 'pacientes' },
  { title: 'Apellidos', key: 'apellido', table: 'pacientes' },
  { title: 'Estado civil', key: 'estado_civil', table: 'pacientes' },
  { title: 'Fecha de nacimiento', key: 'fecha_nacimiento', table: 'pacientes' },
  { title: 'Teléfono', key: 'telefono', table: 'pacientes' },
  { title: 'Más', key: 'accion_mas'}
];

export const pacienteInitialFormData = {
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
  foto_url: '',
}

export const pacienteFormSelectOptions = {
  tipo_identificacion: ['Seleccione...', 'CC', 'TI', 'RC', 'CE', 'CI', 'DNI', 'NIT', 'PASAPORTE'],
  estado_civil: ['Seleccione...', 'Soltero', 'Casado', 'Viudo', 'Divorciado', 'Unión libre'],
  sexo: ['Seleccione...', 'Masculino', 'Femenino', 'No binario']
}