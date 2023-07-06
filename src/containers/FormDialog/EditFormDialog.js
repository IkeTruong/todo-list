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
  const { open, onClose, taskInfo, idColumn, onUpdate, editType = null } = props
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
    onUpdate({ idColumn, idTask: _get(taskInfo, 'id') }, evt)
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

  const disable = editType !== null

  return (
    <CustomDialog
      open={open}
      title="Edit Task"
      txtBtn="Save changes"
      content={
        <>
          <InputController
            name="title"
            label="Title"
            control={control}
            disabled={disable}
          />
          <InputController
            name="description"
            label="Description"
            control={control}
            disabled={disable}
          />
          <RadioController
            control={control}
            name="priority"
            label="Priority"
            options={priorityOpts}
            disabled={editType === 'eStatus'}
          />
          <RadioController
            control={control}
            name="completionStatus"
            label="Completion Status"
            options={statusOpts}
            disabled={editType === 'ePriority'}
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
  editType: PropTypes.string,
  taskInfo: PropTypes.object,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onUpdate: PropTypes.func,
}
