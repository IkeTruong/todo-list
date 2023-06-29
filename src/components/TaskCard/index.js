import React from 'react'
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
    ref,
    onEditPriority,
    onEditStatus,
  } = props
  return (
    <Box p={2} ref={ref} borderBottom={`thin solid ${whiteLightColor}`}>
      <Grid container spacing={1} alignItems="center">
        <Grid item xs>
          <Grid container spacing={1}>
            <Grid item xs>
              <ListItemText primary={<b>{title}</b>} secondary={description} />
            </Grid>
            <Grid item xs={12} sm={5} md={4} lg={3}>
              <Stack spacing={1}>
                <Stack direction="row" spacing={1}>
                  <Priority priority={priority} />
                  <EditButton size="small" onFormEdit={onEditPriority} />
                </Stack>
                <Stack direction="row" spacing={1}>
                  <CompletionStatus completionStatus={completionStatus} />
                  <EditButton size="small" onFormEdit={onEditStatus} />
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
  ref: PropTypes.object,
}
