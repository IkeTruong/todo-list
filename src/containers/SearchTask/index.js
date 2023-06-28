import React from 'react'
import TextField from '@mui/material/TextField'

export default function SearchTask({ onChange, value }) {
  return (
    <TextField
      fullWidth
      size="small"
      label="Search task"
      placeholder="Please enter task name or description"
      variant="outlined"
      value={value}
      onChange={onChange}
    />
  )
}
