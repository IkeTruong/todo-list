import React from 'react'
import PropTypes from 'prop-types'

import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'

import EditIcon from '@mui/icons-material/Edit'

export default function EditButton(props) {
  const { onFormEdit, ...rest } = props
  return (
    <Tooltip title="Edit">
      <IconButton aria-label="edit" onClick={onFormEdit} {...rest}>
        <EditIcon fontSize="inherit" />
      </IconButton>
    </Tooltip>
  )
}

EditButton.propTypes = {
  onFormEdit: PropTypes.func,
}
