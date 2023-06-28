import React from 'react'
import PropTypes from 'prop-types'
import _get from 'lodash/get'

import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'

export default function CompletionStatus(props) {
  const { completionStatus } = props
  const compStatus = {
    todo: {
      name: 'Todo',
      color: 'default',
    },
    processing: {
      name: 'Processing',
      color: 'info',
    },
    pending: {
      name: 'Pending',
      color: 'warning',
    },
    done: {
      name: 'Done',
      color: 'success',
    },
  }

  return (
    <div>
      <Typography variant="body2" component="span">
        <b>Completion status: </b>
      </Typography>
      <Chip
        size="small"
        label={_get(compStatus, `${completionStatus}.name`)}
        color={_get(compStatus, `${completionStatus}.color`)}
      />
    </div>
  )
}

CompletionStatus.propTypes = {
  completionStatus: PropTypes.string,
}
