import React from 'react'
import PropTypes from 'prop-types'

import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

export default function SearchTask({ onClear, onChange, value }) {
  return (
    <TextField
      fullWidth
      size="small"
      label="Search task"
      placeholder="Please enter task name or description"
      variant="outlined"
      onChange={onChange}
      value={value}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton size="small" onClick={onClear}>
              <CloseIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  )
}

SearchTask.propTypes = {
  value: PropTypes.string,
  onClear: PropTypes.func,
  onChange: PropTypes.func,
}
