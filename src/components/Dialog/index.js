import React from 'react'
import PropTypes from 'prop-types'
import { styled } from '@mui/material/styles'

import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import CloseIcon from '@mui/icons-material/Close'
import { NormalizeButton } from 'src/components/Button/NormalizeButton'

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}))

function StyledDialogTitle(props) {
  const { children, onClose, ...other } = props

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  )
}

StyledDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
}

export default function CustomDialog(props) {
  const { open, title, txtBtn, content, handleSubmit, onClose } = props
  return (
    <StyledDialog
      onClose={() => {
        onClose()
      }}
      aria-labelledby="customized-dialog-title"
      open={open}
      maxWidth="sm"
      fullWidth
    >
      <StyledDialogTitle id="customized-dialog-title" onClose={onClose}>
        {title}
      </StyledDialogTitle>
      <DialogContent>
        <Stack spacing={2} pt={1}>
          {content}
        </Stack>
      </DialogContent>
      <DialogActions>
        <NormalizeButton
          variant="contained"
          disableElevation
          onClick={handleSubmit}
        >
          {txtBtn}
        </NormalizeButton>
      </DialogActions>
    </StyledDialog>
  )
}
