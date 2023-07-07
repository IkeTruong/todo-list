import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import _get from 'lodash/get'

import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'

import TypoAdvanced from 'src/components/TypoAdvanced'
import MoreOptions from 'src/components/MoreOptions'
import Priority from 'src/components/Priority'
import { dragColor } from 'src/assets/variables'

export default function TaskCard(props) {
  const { taskInfo, index, bgColor, ...rest } = props
  return (
    <Draggable draggableId={_get(taskInfo, 'id')} index={index}>
      {(provided, snapshot) => {
        return (
          <Box
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              userSelect: 'none',
              background: snapshot.isDragging ? dragColor : bgColor,
              marginBottom: '8px',
              color: '#fff',
              ...provided.draggableProps.style,
            }}
            className="stack__item"
            p={2}
            borderRadius={1.5}
          >
            <Grid container alignItems="flex-start" spacing={1}>
              <Grid item xs>
                <TypoAdvanced line={4} bold>
                  {_get(taskInfo, 'title')}
                </TypoAdvanced>
                <TypoAdvanced variant="caption">
                  {_get(taskInfo, 'description')}
                </TypoAdvanced>
              </Grid>
              <Grid item>
                <MoreOptions {...rest} />
              </Grid>
              <Grid item xs={12}>
                <Priority priority={_get(taskInfo, 'priority')} />
              </Grid>
            </Grid>
          </Box>
        )
      }}
    </Draggable>
  )
}
