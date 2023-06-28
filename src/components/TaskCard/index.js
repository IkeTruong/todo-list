import React from 'react'
import { PropTypes } from 'prop-types'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Stack from '@mui/material/Stack'

import Priority from 'src/components/Priority'
import CompletionStatus from 'src/components/CompletionStatus'
import EditButton from 'src/components/Button/EditButton'
import TypoAdvanced from 'src/components/TypoAdvanced'

import { cardShadowHover } from 'src/assets/variables'

export default function TaskCard(props) {
  const { title, description, priority, completionStatus, actions } = props
  return (
    <Card
      variant="outlined"
      sx={{
        height: '100%',
        ':hover': {
          boxShadow: cardShadowHover,
        },
      }}
    >
      <CardContent>
        <TypoAdvanced line={1} variant="h5" gutterBottom>
          {title}
        </TypoAdvanced>
        <TypoAdvanced line={1} variant="body2" paragraph>
          {description}
        </TypoAdvanced>
        <Stack spacing={1}>
          <Stack direction="row" spacing={1}>
            <Priority priority={priority} />
            <EditButton size="small" onFormEdit={() => console.log('edit')} />
          </Stack>
          <Stack direction="row" spacing={1}>
            <CompletionStatus completionStatus={completionStatus} />
            <EditButton size="small" onFormEdit={() => console.log('edit')} />
          </Stack>
        </Stack>
      </CardContent>
      <CardActions>{actions}</CardActions>
    </Card>
  )
}

TaskCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  priority: PropTypes.string,
  completionStatus: PropTypes.string,
  actions: PropTypes.node,
}
