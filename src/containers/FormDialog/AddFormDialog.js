import React from 'react'
import PropTypes from 'prop-types'
import { v4 as uuidv4 } from 'uuid'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import _merge from 'lodash/merge'

import RadioController from 'src/components/RadioController'
import InputController from 'src/components/InputController'
import CustomDialog from 'src/components/Dialog'

import { priorityOpts, statusOpts } from 'src/assets/variables'
import { validationSchema } from 'src/assets/scheme'

export default function AddFormDialog(props) {
  const { open, onClose, onCreate } = props
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
    const newTask = _merge(evt, { id: uuidv4() })
    onCreate(newTask)
    reset(defaultValues)
    onClose()
  }

  return (
    <CustomDialog
      open={open}
      title="Add New Task"
      txtBtn="Create task"
      content={
        <>
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
            options={priorityOpts}
          />
          <RadioController
            control={control}
            name="completionStatus"
            label="Completion Status"
            options={statusOpts}
          />
        </>
      }
      handleSubmit={handleSubmit(onSubmit)}
      onClose={onClose}
    />
  )
}

AddFormDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onCreate: PropTypes.func,
}
