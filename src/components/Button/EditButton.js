import React from 'react'
import PropTypes from 'prop-types'

import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'

import EditIcon from '@mui/icons-material/Edit'

export default function EditButton(props) {
  const { onClick, ...rest } = props
  return (
    <Tooltip title="Edit">
      <IconButton aria-label="edit" onClick={onClick} {...rest}>
        <EditIcon fontSize="inherit" />
      </IconButton>
    </Tooltip>
  )
}

EditButton.propTypes = {
  onClick: PropTypes.func,
}
