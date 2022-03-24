export const inputs = [
  {
    name: 'email',
    label: 'Correo Electronico',
    rules: {
      required: 'Ingrese su correo electronico',
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        message: 'Ingrese un email valido',
      },
    },
  },
  {
    name: 'password',
    label: 'Contraseña',
    rules: {
      required: 'Ingrese su contraseña',
      minLength: {
        value: 8,
        message: 'La contraseña debe tener al menos 8 caracteres',
      },
    },
    type: 'password',
  },
]

export const defaultValues = {
  email: '',
  password: '',
}
