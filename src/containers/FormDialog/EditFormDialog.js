import React from 'react'
import PropTypes from 'prop-types'
// import { v4 as uuidv4 } from 'uuid'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { styled } from '@mui/material/styles'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import CloseIcon from '@mui/icons-material/Close'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}))

function BootstrapDialogTitle(props) {
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

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
}

const validationSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  priority: yup.string().required('Priority is required'),
  completionStatus: yup.string().required('Completion status is required'),
})

function CustomizedDialogs(props) {
  const { open, onClose, createTodo } = props

  const { handleSubmit, control } = useForm({
    resolver: yupResolver(validationSchema),
  })

  // const [priority, setPriority] = useState('high')
  // const [completionStatus, setcompletionStatus] = useState('todo')

  const onSubmit = (evt) => {
    createTodo(evt)
    onClose()
  }

  return (
    <BootstrapDialog
      onClose={() => {
        onClose()
      }}
      aria-labelledby="customized-dialog-title"
      open={open}
      maxWidth="sm"
      fullWidth
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={onClose}>
        Edit Task
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <Stack spacing={2}>
          <Controller
            name="title"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                label="Title"
                variant="outlined"
                size="small"
                fullWidth
                required
                error={!!error}
                helperText={error ? error.message : null}
                onChange={onChange}
                value={value}
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                label="Description"
                variant="outlined"
                size="small"
                fullWidth
                error={!!error}
                helperText={error ? error.message : null}
                onChange={onChange}
                value={value}
              />
            )}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          disableElevation
          onClick={handleSubmit(onSubmit)}
        >
          Save changes
        </Button>
      </DialogActions>
    </BootstrapDialog>
  )
}

export default CustomizedDialogs

CustomizedDialogs.propTypes = {
  idEdit: PropTypes.bool,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  handleChange: PropTypes.func,
}
