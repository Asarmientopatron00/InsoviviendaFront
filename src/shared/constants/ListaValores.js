export const TIPOS_ROLES = [
  {id: 'IN', nombre: 'Interno', estado: 1},
  {id: 'EX', nombre: 'Externo', estado: 1},
];

export const CATEGORIA_APORTES = [
  {id: 'SO', nombre: 'Solicitante', estado: 1},
  {id: 'AG', nombre: 'Aportante Grupo Familiar', estado: 1},
  {id: 'NG', nombre: 'No Aportante Grupo Familiar', estado: 1},
  {id: 'CO', nombre: 'Codeudor', estado: 1},
  {id: 'OT', nombre: 'Otro', estado: 1},
];

export const GENERO = [
  {id: 'MA', nombre: 'Masculino', estado: 1},
  {id: 'FE', nombre: 'Femenino', estado: 1},
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

export const SEGURIDAD_SOCIAL = [
  {id: 'CO', nombre: 'Contributivo', estado: 1},
  {id: 'SU', nombre: 'Subsidiado', estado: 1},
];

export const DATO_BOOLEAN = [
  {id: 'S', nombre: 'Sí', estado: 1},
  {id: 'N', nombre: 'No', estado: 1},
];

export const DATO_BOOLEAN_RADIO = [
  {value: 'S', label: 'Sí', estado: 1},
  {value: 'N', label: 'No', estado: 1},
]

export const ZONA = [
  {id: 'UR', nombre: 'Urbana', estado: 1},
  {id: 'RU', nombre: 'Rural', estado: 1},
];

export const TIPO_PROPIEDAD = [
  {id: 'ES', nombre: 'Escritura', estado: 1},
  {id: 'CO', nombre: 'Compraventa', estado: 1},
  {id: 'PO', nombre: 'Posesión', estado: 1},
  {id: 'SD', nombre: 'Sin Documento', estado: 1},
];

export const ESTRATO = [
  {id: '1', nombre: '1', estado: 1},
  {id: '2', nombre: '2', estado: 1},
  {id: '3', nombre: '3', estado: 1},
  {id: '4', nombre: '4', estado: 1},
  {id: '5', nombre: '5', estado: 1},
  {id: '6', nombre: '6', estado: 1},
];

export const INDICATIVO_PC = [
  {id: 'PO', nombre: 'Posesión', estado: 1},
  {id: 'CV', nombre: 'Compraventa', estado: 1},
];

export const TIPO_TRABAJO = [
  {id: 'FO', nombre: 'Formal', estado: 1},
  {id: 'IN', nombre: 'Informal', estado: 1},
  {id: 'PE', nombre: 'Pensionado', estado: 1},
  {id: 'NA', nombre: 'No Aplica', estado: 1},
];

export const TIPO_CONTRATO = [
  {id: 'IN', nombre: 'Indefinidio', estado: 1},
  {id: 'TF', nombre: 'Término Fijo', estado: 1},
  {id: 'OL', nombre: 'Por Obra Labor', estado: 1},
  {id: 'PS', nombre: 'Prestación de Servicios', estado: 1},
  {id: 'Na', nombre: 'No Aplica', estado: 1},
];

export const ESTADO = [
  {id: '1', nombre: 'Activo', estado: 1},
  {id: '0', nombre: 'Inactivo', estado: 1},
];

export const ESTADO_REGISTRO = [
  {id: 'AC', nombre: 'Activo', estado: 1},
  {id: 'IN', nombre: 'Inactivo', estado: 1},
];

export const ESTADO_TRAMITE = [
  {id: 'SO', nombre: 'Solicitud', estado: 1},
  {id: 'PR', nombre: 'Prospecto', estado: 1},
  {id: 'ES', nombre: 'Estudio', estado: 1},
  {id: 'AP', nombre: 'Aprobado', estado: 1},
  {id: 'RE', nombre: 'Rechazado', estado: 1},
];

export const ESTADOS_PROYECTO = [
  {id: 'SOL', nombre: 'Solicitud', estado: 1},
  {id: 'EST', nombre: 'Estudio', estado: 1},
  {id: 'APR', nombre: 'Aprobado', estado: 1},
  {id: 'REC', nombre: 'Rechazado', estado: 1},
  {id: 'FOR', nombre: 'Formalización', estado: 1},
  {id: 'DES', nombre: 'Desembolsado', estado: 1},
  {id: 'CAN', nombre: 'Cancelado', estado: 1},
  {id: 'CON', nombre: 'Congelado', estado: 1},
];

export const TIPOS_PROYECTO = [
  {id: 'NOR', nombre: 'Normalización', estado: 1},
  {id: 'MEJ', nombre: 'Mejora', estado: 1},
  {id: 'CON', nombre: 'Construcción', estado: 1},
  {id: 'COM', nombre: 'Compra', estado: 1},
];

export const ESTADOS_FORMALIZACION = [
  {id: 'AN', nombre: 'Autorización Notaria', estado: 1},
  {id: 'FI', nombre: 'Firma', estado: 1},
  {id: 'IR', nombre: 'Ingreso Reg.', estado: 1},
  {id: 'SR', nombre: 'Salida Reg.', estado: 1},
  {id: 'PA', nombre: 'Pagaré', estado: 1},
];

export const TIPOS_CUENTA_RECAUDO = [
  {id: 'AH', nombre: 'Ahorros', estado: 1},
  {id: 'CO', nombre: 'Corriente', estado: 1},
];

export const ESTADOS_DONACIONES = [
  {id: 'PD', nombre: 'Por Desembolsar', estado: 1},
  {id: 'DE', nombre: 'Desembolsado', estado: 1},
];

export const TIPOS_PAGO = [
  {id: 'N', nombre: 'Normal', estado: 1},
  {id: 'E', nombre: 'Especial', estado: 1},
  {id: 'A', nombre: 'Abono Extra', estado: 1},
];