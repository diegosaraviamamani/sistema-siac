export const inputs = [
  {
    name: 'order',
    label: 'Nro de orden*',
    type: 'text',
    rules: {
      required: 'Ingrese el Nro de orden',
      maxLength: {
        value: 7,
        message: 'El Nro de orden debe tener como maximo 7 digitos',
      },
    },
  },
  {
    name: 'type',
    label: 'Tipo de prueba*',
    type: 'text',
    rules: {
      required: 'Ingrese el Tipo de prueba',
      maxLength: {
        value: 30,
        message: 'El Tipo de prueba debe tener como maximo 30 caracteres',
      },
    },
  },
]

export const defaultValues = { order: '', type: '' }
