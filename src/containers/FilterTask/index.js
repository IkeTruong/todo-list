import React from 'react'
import PropTypes from 'prop-types'

import _upperFirst from 'lodash/upperFirst'
import _map from 'lodash/map'

import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

import { statusOpts } from 'src/assets/variables'

export default function FilterTask({ filter, setCondFilter }) {
  const onFilter = (event) => {
    setCondFilter(event.target.value)
  }

  return (
    <FormControl fullWidth size="small">
      <InputLabel>Filter by status</InputLabel>
      <Select value={filter} onChange={onFilter}>
        {_map(['all', ...statusOpts], (item) => (
          <MenuItem key={item} value={item}>
            {_upperFirst(item)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

FilterTask.propTypes = {
  filter: PropTypes.string,
  setCondFilter: PropTypes.func,
}
