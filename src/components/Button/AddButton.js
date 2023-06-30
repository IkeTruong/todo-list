import React from 'react'
import PropTypes from 'prop-types'

import AddIcon from '@mui/icons-material/Add'
import { NormalizeButton } from './NormalizeButton'

export default function AddButton(props) {
  const { onClick } = props
  return (
    <NormalizeButton
      color="info"
      disableElevation
      variant="contained"
      startIcon={<AddIcon />}
      onClick={onClick}
    >
      Add New Task
    </NormalizeButton>
  )
}

AddButton.propTypes = {
  onClick: PropTypes.func,
}
