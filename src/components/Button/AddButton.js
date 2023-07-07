import React from 'react'
import PropTypes from 'prop-types'
import { NormalizeButton } from './NormalizeButton'

export default function AddButton(props) {
  const { onClick } = props
  return (
    <NormalizeButton
      color="info"
      disableElevation
      variant="contained"
      onClick={onClick}
    >
      Add New Task
    </NormalizeButton>
  )
}

AddButton.propTypes = {
  onClick: PropTypes.func,
}
