import React from 'react'
import PropTypes from 'prop-types'

import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'

import DeleteIcon from '@mui/icons-material/Delete'

export default function DeleteButton(props) {
  const { onClick } = props
  return (
    <Tooltip title="Delete">
      <IconButton aria-label="delete" onClick={onClick}>
        <DeleteIcon fontSize="inherit" />
      </IconButton>
    </Tooltip>
  )
}

DeleteButton.propTypes = {
  onClick: PropTypes.func,
}
