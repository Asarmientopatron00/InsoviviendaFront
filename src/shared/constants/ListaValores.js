export const TIPOS_ROLES = [
  {id: 'IN', nombre: 'Interno', estado: 1},
  {id: 'EX', nombre: 'Externo', estado: 1},
];

export const TIPOS_DATOS = [
  {id: 'PA', nombre: 'Participante', estado: 1},
  {id: 'PR', nombre: 'Proyecto', estado: 1},
  {id: 'AC', nombre: 'Actividad', estado: 1},
];

export const DATO_REQUERIDO = [
  {id: 'S', nombre: 'SÍ', estado: 1},
  {id: 'N', nombre: 'NO', estado: 1},
];

export const TIPO_PERSONA_TERCERO = [
  {id: 'N', nombre: 'Natural', estado: 1},
  {id: 'J', nombre: 'Jurídica', estado: 1},
  {id: 'A', nombre: 'Agrupación', estado: 1},
];

export const TIPO_TERCERO = [
  {id: 'AG', nombre: 'Agencia Financiadora', estado: 1},
  {id: 'PR', nombre: 'Proveedor', estado: 1},
  {id: 'AL', nombre: 'Aliados', estado: 1},
  {id: 'CL', nombre: 'Clientes', estado: 1},
];

export const TIPO_ENTIDAD_TERCERO = [
  {id: 'PU', nombre: 'Pública', estado: 1},
  {id: 'PR', nombre: 'Privada', estado: 1},
  {id: 'MX', nombre: 'Mixta', estado: 1},
];

export const SECTOR_TERCERO = [
  {id: 'CU', nombre: 'Cultural', estado: 1},
  {id: 'AM', nombre: 'Ambiental', estado: 1},
  {id: 'ED', nombre: 'Educativo', estado: 1},
  {id: 'SA', nombre: 'Salud', estado: 1},
  {id: 'EM', nombre: 'Empresarial', estado: 1},
  {id: 'PO', nombre: 'Político', estado: 1},
  {id: 'RE', nombre: 'Religioso', estado: 1},
  {id: 'RC', nombre: 'Recreativo', estado: 1},
  {id: 'SO', nombre: 'Social', estado: 1},
  {id: 'DE', nombre: 'Deportivo', estado: 1},
  {id: 'CM', nombre: 'Comunicaciones', estado: 1},
  {id: 'OT', nombre: 'Otro', estado: 1},
];

export const ESTADO = [
  {id: '1', nombre: 'Activo', estado: 1},
  {id: '0', nombre: 'Inactivo', estado: 1},
];

export const SEXO = [
  {id: 'H', nombre: 'Hombre', estado: 1},
  {id: 'M', nombre: 'Mujer', estado: 1},
  {id: 'O', nombre: 'Otro', estado: 1},
];
export const ESTADO_SOCIOPOLITICO = [
  {id: 'D', nombre: 'Desplazamiento', estado: 1},
  {id: 'V', nombre: 'Víctima del Conflicto', estado: 1},
  {id: 'E', nombre: 'Excombatiente', estado: 1},
  {id: 'O', nombre: 'Otro', estado: 1},
];
export const TIPO_VINCULACION = [
  {id: 'CT', nombre: 'Término Fijo Tiempo Completo', estado: 1},
  {id: 'CP', nombre: 'Término Fijo Tiempo Parcial', estado: 1},
  {id: 'PS', nombre: 'Prestación de Servicios', estado: 1},
  {id: 'OC', nombre: 'Contrato Obra o Labor Tiempo Completo', estado: 1},
  {id: 'OP', nombre: 'Contrato Obra o Labor Tiempo Parcial', estado: 1},
  {
    id: 'V',
    nombre: 'Acuerdo de Prestación de Servicios de Voluntariado',
    estado: 1,
  },
  {id: 'OPS', nombre: 'Orden de Prestación de Servicios', estado: 1},
  {id: 'PR', nombre: 'Convenio de Prácticas', estado: 1},
  {id: 'CA', nombre: 'Contrato de Aprendizaje', estado: 1},
];
export const TIPO_SANGRE_RH = [
  {id: '1', nombre: '+', estado: 1},
  {id: '0', nombre: '-', estado: 1},
];
export const INDICATIVO_DISCAPACIDAD = [
  {value: 'S', label: 'Sí', estado: 1},
  {value: 'N', label: 'No', estado: 1},
];
export const ESTADO_CIVIL = [
  {id: 'S', nombre: 'Soltero(a)', estado: 1},
  {id: 'C', nombre: 'Casado(a)', estado: 1},
  {id: 'U', nombre: 'Unión Libre', estado: 1},
  {id: 'V', nombre: 'Viudo(a)', estado: 1},
  {id: 'D', nombre: 'Divorciado(a)', estado: 1},
];
export const SEGURIDAD_SOCIAL = [
  {id: 'C', nombre: 'Contributivo', estado: 1},
  {id: 'S', nombre: 'Subsidiado', estado: 1},
];
export const PARENTESCO = [
  {id: 'PA', nombre: 'Padre', estado: 1},
  {id: 'MA', nombre: 'Madre', estado: 1},
  {id: 'TI', nombre: 'Tio(a)', estado: 1},
  {id: 'AB', nombre: 'Abuelo(a)', estado: 1},
  {id: 'HE', nombre: 'Hermano(a)', estado: 1},
  {id: 'PR', nombre: 'Primo(a)', estado: 1},
  {id: 'OT', nombre: 'Otro', estado: 1},
];
export const TENENCIA_VIVIENDA = [
  {id: 'PR', nombre: 'Propia', estado: 1},
  {id: 'AR', nombre: 'Arrendada', estado: 1},
  {id: 'OT', nombre: 'Otra', estado: 1},
];
export const TIPO_SALARIO = [
  {id: 'SA', nombre: 'Salario', estado: 1},
  {id: 'HO', nombre: 'Honorarios', estado: 1},
  {id: 'AE', nombre: 'Auxilio Economico', estado: 1},
  {id: 'OT', nombre: 'Otro', estado: 1},
];
export const FACTURA_ELECTRONICA = [
  {id: 'S', nombre: 'Si', estado: 1},
  {id: 'N', nombre: 'No', estado: 1},
  {id: 'N/A', nombre: 'No Aplica', estado: 1},
];
export const TIPO_UBICACION_FAMILIA = [
  {id: 'U', nombre: 'Urbana', estado: 1},
  {id: 'R', nombre: 'Rural', estado: 1},
];
export const NIVEL_INGRESOS = [
  {id: '< 1', nombre: '< 1', estado: 1},
  {id: 'Entre 1 y 2', nombre: 'Entre 1 y 2', estado: 1},
  {id: 'Entre 2 y 3', nombre: 'Entre 2 y 3', estado: 1},
  {id: '> 3', nombre: '> 3', estado: 1},
];

export const ADDRESS_LABELS = [
  'Cra',
  'Calle',
  'Avda',
  'Circ',
  'Transv',
  'Loma',
  'Aut',
  'Correg',
  'Ver',
];

export const CATEGORIA_APORTES = [
  {id: 'AA', nombre: 'Primera', estado: 1},
  {id: 'BB', nombre: 'Segunda', estado: 1},
  {id: 'CC', nombre: 'Tercera', estado: 1},
];

export const ESTADO_REGISTRO = [
  {id: 'PE', nombre: 'Pendiente', estado: 1},
  {id: 'AC', nombre: 'Aceptada', estado: 1},
  {id: 'NA', nombre: 'No aplica', estado: 1},
];

export const ESTADO_TRAMITE = [
  {id: 'PE', nombre: 'Pendiente', estado: 1},
  {id: 'AC', nombre: 'Aceptada', estado: 1},
  {id: 'NA', nombre: 'No aplica', estado: 1},
];