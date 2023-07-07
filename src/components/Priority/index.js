import React from 'react'
import PropTypes from 'prop-types'
import { useTheme } from '@mui/material/styles'

import _upperFirst from 'lodash/upperFirst'

import TypoAdvanced from '../TypoAdvanced'

export default function Priority(props) {
  const { priority } = props
  const theme = useTheme()

  return (
    <TypoAdvanced
      variant="caption"
      sx={{
        color: theme.palette.common.white,
        border: `thin solid ${theme.palette.common.white}`,
        paddingX: 1,
        paddingY: 0.5,
        borderRadius: 1,
      }}
    >
      {_upperFirst(priority)}
    </TypoAdvanced>
  )
}

Priority.propTypes = {
  priority: PropTypes.string,
}
