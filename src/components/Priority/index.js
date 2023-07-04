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
      color: 'linear-gradient(to right, #cb2d3e, #ef473a)',
    },
    medium: {
      name: 'Medium',
      color: 'linear-gradient(to right, #ff512f, #f09819)',
    },
    low: {
      name: 'Low',
      color: 'linear-gradient(to right, #56ab2f, #a8e063)',
    },
  }

  return (
    <div>
      <Typography variant="body2" component="span" color="text.secondary">
        <b>Priority: </b>
      </Typography>
      <Chip
        size="small"
        label={_get(prio, `${priority}.name`)}
        style={{ background: _get(prio, `${priority}.color`), color: '#fff' }}
      />
    </div>
  )
}

Priority.propTypes = {
  priority: PropTypes.string,
}
