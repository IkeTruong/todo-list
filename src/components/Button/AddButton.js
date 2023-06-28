import React from 'react'
import PropTypes from 'prop-types'

import AddIcon from '@mui/icons-material/Add'
import { NormalizeButton } from './NormalizeButton'

export default function AddButton(props) {
  const { onAdd } = props
  return (
    <NormalizeButton
      color="info"
      disableElevation
      variant="contained"
      startIcon={<AddIcon />}
      onClick={onAdd}
    >
      Add New Task
    </NormalizeButton>
  )
}

AddButton.propTypes = {
  onAdd: PropTypes.func,
}
