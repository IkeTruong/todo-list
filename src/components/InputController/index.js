import React from 'react'
import PropTypes from 'prop-types'
import { Controller } from 'react-hook-form'
import TextField from '@mui/material/TextField'

export default function InputController(props) {
  const { control, name, label, ...rest } = props
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          label={label}
          variant="outlined"
          size="small"
          fullWidth
          required
          error={!!error}
          helperText={error ? error.message : null}
          onChange={onChange}
          value={value}
          {...rest}
        />
      )}
    />
  )
}

InputController.propTypes = {
  control: PropTypes.object,
  name: PropTypes.string,
  label: PropTypes.string,
  rest: PropTypes.object,
}
