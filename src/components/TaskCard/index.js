import React, { useEffect, useState } from 'react'
import { PropTypes } from 'prop-types'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import ListItemText from '@mui/material/ListItemText'

import Priority from 'src/components/Priority'
import CompletionStatus from 'src/components/CompletionStatus'
import EditButton from 'src/components/Button/EditButton'

import { whiteLightColor } from 'src/assets/variables'

export default function TaskCard(props) {
  const {
    title,
    description,
    priority,
    completionStatus,
    actions,
    onEditPriority,
    onEditStatus,
    measure,
    index,
  } = props
  const [height, setHeight] = useState()

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      setHeight(entries[0].contentRect.height)
    })
    resizeObserver.observe(document.getElementById(`myDivTag${index}`))
  })

  useEffect(() => {
    measure({ height })
  }, [height, measure])

  return (
    <Box
      p={2}
      borderBottom={`thin solid ${whiteLightColor}`}
      id={`myDivTag${index}`}
    >
      <Grid container spacing={1} alignItems="center">
        <Grid item xs>
          <Grid container spacing={1}>
            <Grid item xs>
              <ListItemText primary={<b>{title}</b>} secondary={description} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Stack spacing={1}>
                <Stack direction="row" spacing={1}>
                  <Priority priority={priority} />
                  <EditButton size="small" onClick={onEditPriority} />
                </Stack>
                <Stack direction="row" spacing={1}>
                  <CompletionStatus completionStatus={completionStatus} />
                  <EditButton size="small" onClick={onEditStatus} />
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>{actions}</Grid>
      </Grid>
    </Box>
  )
}

TaskCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  priority: PropTypes.string,
  completionStatus: PropTypes.string,
  actions: PropTypes.node,
  onEditPriority: PropTypes.func,
  onEditStatus: PropTypes.func,
  measure: PropTypes.func,
  index: PropTypes.number,
}
