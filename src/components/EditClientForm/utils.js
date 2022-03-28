export const inputs = [
  {
    name: 'ci',
    label: 'Carnet de Identidad*',
    type: 'text',
    disabled: true,
    rules: {
      required: 'Ingrese su Carnet de Identidad',
      minLength: {
        value: 7,
        message: 'El CI debe tener al menos 7 digitos',
      },
      maxLength: {
        value: 10,
        message: 'El CI debe tener como maximo 10 digitos',
      },
    },
  },
  {
    name: 'name',
    label: 'Nombre*',
    type: 'text',
    rules: {
      required: 'Ingrese su Nombre',
    },
  },
  {
    name: 'lastName',
    label: 'Apellido*',
    type: 'text',
    rules: {
      required: 'Ingrese su Apellido',
    },
  },
  {
    name: 'phone',
    label: 'Teléfono*',
    type: 'text',
    rules: {
      required: 'Ingrese su Telefono',
      pattern: {
        value: /^[0-9]*$/,
        message: 'El teléfono debe contener solo números',
      },
      maxLength: {
        value: 10,
        message: 'El teléfono debe tener como maximo 10 digitos',
      },
    },
  },
]

export const defaultValues = { ci: '', name: '', lastName: '', phone: '' }