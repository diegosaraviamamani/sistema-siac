import { TextField } from '@mui/material'
import { Controller } from 'react-hook-form'

const FormInputText = ({ name, control, label, rules = {}, ...rest }) => (
  <Controller
    name={name}
    control={control}
    rules={rules}
    render={({ field: { onChange, value }, fieldState: { error } }) => (
      <TextField
        onChange={onChange}
        value={value}
        label={label}
        variant="outlined"
        error={!!error}
        helperText={error?.message}
        sx={{ backgroundColor: '#fff' }}
        {...rest}
      />
    )}
  />
)

export default FormInputText
