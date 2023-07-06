import React from 'react'
import PropTypes from 'prop-types'
import { useTheme } from '@mui/material/styles'

import _get from 'lodash/get'

import Box from '@mui/material/Box'
import TypoAdvanced from '../TypoAdvanced'

export default function Priority(props) {
  const { priority } = props
  const theme = useTheme()
  const prio = {
    high: {
      name: 'High',
      color: 'linear-gradient(to right, #ff416c, #ff4b2b)',
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
  // style = {{ background: _get(prio, `${priority}.color`), color: '#fff' }

  return (
    <Box component="span" color={theme.palette.common.white}>
      <TypoAdvanced variant="caption">
        {_get(prio, `${priority}.name`)}
      </TypoAdvanced>
    </Box>
  )
}

Priority.propTypes = {
  priority: PropTypes.string,
}
