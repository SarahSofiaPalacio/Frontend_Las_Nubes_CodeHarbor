export const pacienteTableColumns = ['Identificación', 'Nombres', 'Apellidos', 'Estado civil', 'Fecha de nacimiento', 'Telefono', 'Más'];

export const pacienteInitialFormData = {
  id: '',
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
  usuario_id: '',
  updated_at:'',
  is_deleted: '',
  deleted_at: '',
}

export const pacienteFormSelectOptions = {
  tipo_identificacion: ['Seleccione...', 'CC', 'TI', 'RC', 'CE', 'CI', 'DNI', 'NIT', 'PASAPORTE'],
  estado_civil: ['Seleccione...', 'Soltero', 'Casado', 'Viudo', 'Divorciado', 'Unión libre'],
  sexo: ['Seleccione...', 'Masculino', 'Femenino', 'No binario']
}