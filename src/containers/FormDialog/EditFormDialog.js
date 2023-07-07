import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import _get from 'lodash/get'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import InputController from 'src/components/InputController'
import RadioController from 'src/components/RadioController'
import CustomDialog from 'src/components/Dialog'

import { priorityOpts, statusOpts } from 'src/assets/variables'
import { validationSchema } from 'src/assets/scheme'

function CustomizedDialogs(props) {
  const { open, onClose, taskInfo, onUpdate } = props

  const { handleSubmit, control, reset } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      title: '',
      description: '',
      priority: '',
      completionStatus: '',
    },
  })

  const onSubmit = (evt) => {
    onUpdate(_get(taskInfo, 'id'), evt)
    onClose()
  }

  useEffect(() => {
    let defaultVal = {
      title: _get(taskInfo, 'title'),
      description: _get(taskInfo, 'description'),
      priority: _get(taskInfo, 'priority'),
      completionStatus: _get(taskInfo, 'completionStatus'),
    }
    reset(defaultVal)
  }, [taskInfo, reset])

  return (
    <CustomDialog
      open={open}
      title="Edit Task"
      txtBtn="Save changes"
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

export default CustomizedDialogs

CustomizedDialogs.propTypes = {
  taskInfo: PropTypes.object,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onUpdate: PropTypes.func,
}
