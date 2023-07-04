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
      color: 'linear-gradient(to left, #232526, #414345)',
    },
    processing: {
      name: 'Processing',
      color: 'linear-gradient(to top, #56ccf2, #2f80ed)',
    },
    pending: {
      name: 'Pending',
      color: 'linear-gradient(to right, #ff512f, #f09819)',
    },
    done: {
      name: 'Done',
      color: 'linear-gradient(to right, #56ab2f, #a8e063)',
    },
  }

  return (
    <div>
      <Typography variant="body2" component="span" color="text.secondary">
        <b>Completion status: </b>
      </Typography>
      <Chip
        size="small"
        label={_get(compStatus, `${completionStatus}.name`)}
        style={{
          background: _get(compStatus, `${completionStatus}.color`),
          color: '#fff',
        }}
      />
    </div>
  )
}

CompletionStatus.propTypes = {
  completionStatus: PropTypes.string,
}
