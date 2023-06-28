import React from 'react'
import PropTypes from 'prop-types'
import _get from 'lodash/get'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'

export default function Priority(props) {
  const { priority } = props
  const prio = {
    high: {
      name: 'High',
      color: 'error',
    },
    medium: {
      name: 'Medium',
      color: 'warning',
    },
    low: {
      name: 'Low',
      color: 'success',
    },
  }
  return (
    <div>
      <Typography variant="body2" component="span">
        <b>Priority: </b>
      </Typography>
      <Chip
        size="small"
        label={_get(prio, `${priority}.name`)}
        color={_get(prio, `${priority}.color`)}
      />
    </div>
  )
}

Priority.propTypes = {
  priority: PropTypes.string,
}
