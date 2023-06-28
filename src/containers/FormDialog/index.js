import React from 'react'
import PropTypes from 'prop-types'
// import { v4 as uuidv4 } from 'uuid'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { styled } from '@mui/material/styles'

import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import CloseIcon from '@mui/icons-material/Close'

import RadioController from 'src/components/RadioController'
import InputController from 'src/components/InputController'
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

const validationSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  priority: yup.string().required('Priority is required'),
  completionStatus: yup.string().required('Completion status is required'),
})

export default function FormDialog(props) {
  const { open, onClose, createTodo } = props
  const defaultValues = {
    title: '',
    description: '',
    priority: '',
    completionStatus: '',
  }
  const { handleSubmit, control, reset } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  })

  const onSubmit = (evt) => {
    createTodo(evt)
    reset(defaultValues)
    onClose()
  }

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
        Add New Task
      </StyledDialogTitle>
      <DialogContent>
        <Stack spacing={2} pt={1}>
          <InputController name="title" label="Title" control={control} />
          <InputController
            name="description"
            label="Description"
            control={control}
          />
          <RadioController
            control={control}
            name="priority"
            label="Priority"
            options={['high', 'medium', 'low']}
          />
          <RadioController
            control={control}
            name="completionStatus"
            label="Completion Status"
            options={['todo', 'processing', 'pending', 'done']}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <NormalizeButton
          variant="contained"
          disableElevation
          onClick={handleSubmit(onSubmit)}
        >
          Create task
        </NormalizeButton>
      </DialogActions>
    </StyledDialog>
  )
}

FormDialog.propTypes = {
  idEdit: PropTypes.bool,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  handleChange: PropTypes.func,
}
