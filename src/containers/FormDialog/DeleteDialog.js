import React from 'react'
import PropTypes from 'prop-types'

import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

import { NormalizeButton } from 'src/components/Button/NormalizeButton'

export default function DeleteDialog(props) {
  const { open, taskTitle, onCancel, onDelete } = props
  return (
    <Dialog
      open={open}
      maxWidth="sm"
      fullWidth
      onClose={onCancel}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">{taskTitle} task</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Do you want remove {taskTitle} task?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <NormalizeButton
          variant="contained"
          color="inherit"
          disableElevation
          hasgradient="false"
          onClick={onCancel}
        >
          Cancel
        </NormalizeButton>
        <NormalizeButton
          variant="contained"
          disableElevation
          onClick={onDelete}
        >
          Delete
        </NormalizeButton>
      </DialogActions>
    </Dialog>
  )
}

DeleteDialog.propTypes = {
  open: PropTypes.bool,
  taskTitle: PropTypes.string,
  onCancel: PropTypes.func,
  onDelete: PropTypes.func,
}
