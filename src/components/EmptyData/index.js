import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import emptyTask from 'src/assets/images/empty_task.jpg'

export default function EmptyData() {
  return (
    <React.Fragment>
      <Box width="40%" margin="0 auto" mt={4}>
        <img width="100%" height="100%" src={emptyTask} alt="empty_task" />
      </Box>
      <Typography align="center" variant="h6" color="GrayText">
        You don't have tasks
      </Typography>
    </React.Fragment>
  )
}
