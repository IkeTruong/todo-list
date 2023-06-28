import React from 'react'
import _upperFirst from 'lodash/upperFirst'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

export default function FilterTask({ setCondFilter }) {
  const [status, setStatus] = React.useState('all')

  const handleChange = (event) => {
    setStatus(event.target.value)
    setCondFilter(event.target.value)
  }

  return (
    <FormControl fullWidth size="small">
      <InputLabel>Filter by status</InputLabel>
      <Select value={status} onChange={handleChange}>
        {['all', 'todo', 'processing', 'pending', 'done'].map((item) => (
          <MenuItem key={item} value={item}>
            {_upperFirst(item)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
