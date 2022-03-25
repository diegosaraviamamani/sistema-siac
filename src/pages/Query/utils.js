export const inputs = [
  {
    name: 'ci',
    label: 'Carnet de Identidad*',
    type: 'text',
    rules: {
      required: 'Ingrese su Carnet de Identidad',
      maxLength: {
        value: 10,
        message: 'El CI debe tener como maximo 10 digitos',
      },
    },
  },
  {
    name: 'order',
    label: 'Nro de Orden*',
    rules: {
      required: 'Ingrese su número de orden',
      maxLength: {
        value: 7,
        message: 'El número de orden debe tener como maximo 7 digitos',
      },
    },
  },
]

export const defaultValues = { ci: '', order: '' }
