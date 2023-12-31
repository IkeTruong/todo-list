import React from 'react'
import PropTypes from 'prop-types'

import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

import { quepalColor } from 'src/assets/variables'

export default function NotificationAlert(props) {
  const { open, txtAction, onClose } = props
  return (
    <Snackbar
      open={open}
      autoHideDuration={2000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert
        variant="filled"
        sx={{ background: quepalColor }}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={onClose}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        {txtAction} success
      </Alert>
    </Snackbar>
  )
}
NotificationAlert.propTypes = {
  open: PropTypes.bool,
  txtAction: PropTypes.string,
  onClose: PropTypes.func,
}
