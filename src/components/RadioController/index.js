import React from 'react'
import PropTypes from 'prop-types'
import { Controller } from 'react-hook-form'

import _upperFirst from 'lodash/upperFirst'
import _map from 'lodash/map'

import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import Typography from '@mui/material/Typography'

export default function RadioController(props) {
  const { name, label, control, options, ...rest } = props
  return (
    <FormControl>
      <FormLabel required>
        <b>{label}</b>
      </FormLabel>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <RadioGroup
              row
              name="row-priority-radio-buttons-group"
              value={value}
              onChange={onChange}
            >
              {_map(options, (item) => (
                <FormControlLabel
                  key={item}
                  value={item}
                  control={<Radio />}
                  label={_upperFirst(item)}
                  {...rest}
                />
              ))}
            </RadioGroup>
            {error && (
              <Typography variant="caption" color="red">
                {error.message}
              </Typography>
            )}
          </>
        )}
      />
    </FormControl>
  )
}

RadioController.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  control: PropTypes.object,
  options: PropTypes.array,
}
