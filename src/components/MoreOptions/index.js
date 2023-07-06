import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'

import IconButton from '@mui/material/IconButton'
import Popper from '@mui/material/Popper'
import Grow from '@mui/material/Grow'
import Paper from '@mui/material/Paper'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'
import ClickAwayListener from '@mui/material/ClickAwayListener'

import MoreHorizIcon from '@mui/icons-material/MoreHoriz'

export default function MoreOptions(props) {
  const { openFormEdit, openFormDelete } = props

  const anchorRef = useRef(null)
  const [open, setOpen] = useState(false)

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <IconButton
        size="small"
        ref={anchorRef}
        id="composition-button"
        aria-controls={open ? 'composition-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <MoreHorizIcon fontSize="inherit" htmlColor="white" />
      </IconButton>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        placement="bottom-start"
        transition
        disablePortal
        sx={{ zIndex: 3 }}
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps}>
            <Paper sx={{ width: 120 }}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  id="composition-menu"
                  aria-labelledby="composition-button"
                >
                  <MenuItem onClick={openFormEdit}>Edit</MenuItem>
                  <MenuItem onClick={openFormDelete}>Delete</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  )
}

MoreOptions.propTypes = {
  openFormEdit: PropTypes.func,
  openFormDelete: PropTypes.func,
}
