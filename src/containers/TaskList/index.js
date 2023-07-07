import React from 'react'
import PropTypes from 'prop-types'
import { Droppable } from 'react-beautiful-dnd'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import _get from 'lodash/get'
import _map from 'lodash/map'

import TaskCard from 'src/components/TaskCard'

export default function TaskList(props) {
  const { columnId, columnData, bgColor, openFormDelete, openFormEdit } = props

  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('lg'))
  console.log('matches', matches)
  return (
    <>
      <Droppable droppableId={columnId} key={columnId}>
        {(provided) => {
          return (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{
                height: matches ? 'auto' : 500,
                overflow: 'auto',
              }}
            >
              {_map(columnData, (item, index) => {
                return (
                  <TaskCard
                    key={_get(item, 'id')}
                    taskInfo={item}
                    index={index}
                    bgColor={bgColor}
                    openFormEdit={() => openFormEdit(_get(item, 'id'))}
                    openFormDelete={() => openFormDelete(_get(item, 'id'))}
                  />
                )
              })}
              {provided.placeholder}
            </div>
          )
        }}
      </Droppable>
    </>
  )
}

TaskList.propTypes = {
  columnId: PropTypes.string,
  bgColor: PropTypes.string,
  columnData: PropTypes.array,
  actions: PropTypes.object,
}
