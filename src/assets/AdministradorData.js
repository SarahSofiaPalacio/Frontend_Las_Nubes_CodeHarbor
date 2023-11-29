export const colaboradorTableColumns = [
  { title: 'Identificación', key: 'numero_identificacion' },
  { title: 'Nombres', key: 'nombre' },
  { title: 'Apellidos', key: 'apellido' },
  { title: 'Jerarquía', key: 'jerarquia' },
  { title: 'Fecha de nacimiento', key: 'fecha_nacimiento' },
  { title: 'Teléfono', key: 'telefono' },
  { title: 'Más', key: 'accion_mas'}
];

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

export const colaboradorFormSelectOptions = {
  tipo_identificacion: ['Seleccione...', 'CC', 'TI', 'RC', 'CE', 'CI', 'DNI', 'NIT', 'PASAPORTE'],
  estado_civil: ['Seleccione...', 'Soltero', 'Casado', 'Viudo', 'Divorciado', 'Unión libre'],
  sexo: ['Seleccione...', 'Masculino', 'Femenino', 'No binario'],
  jerarquia: ['Seleccione...', 'Médico', 'Enfermero', 'Secretario', 'Regente de farmacia', 'Administrador'],
  especialidad: ['Seleccione...', 'Medicina general', 'Odontología', 'Pediatría', 'Ginecología', 'Cardiología', 'Neurología', 'Oftalmología', 'Otorrinolaringología', 'Dermatología', 'Psiquiatría', 'Oncología', 'Traumatología', 'Urología', 'Endocrinología', 'Gastroenterología', 'Nefrología', 'Reumatología', 'Hematología', 'Infectología', 'Neumología', 'Geriatría'],
}

export const pacienteTableColumns = [
  { title: 'Identificación', key: 'numero_identificacion' },
  { title: 'Nombres', key: 'nombre' },
  { title: 'Apellidos', key: 'apellido' },
  { title: 'Estado civil', key: 'estado_civil' },
  { title: 'Fecha de nacimiento', key: 'fecha_nacimiento' },
  { title: 'Teléfono', key: 'telefono' },
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