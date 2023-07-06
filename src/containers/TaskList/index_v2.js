import React from 'react'
import PropTypes from 'prop-types'
import { Droppable } from 'react-beautiful-dnd'

import _get from 'lodash/get'
import _map from 'lodash/map'

import TaskCard from 'src/components/TaskCard/index_v2'

export default function TaskList(props) {
  const { columnId, columnData, bgColor, openFormDelete, openFormEdit } = props

  return (
    <>
      <Droppable droppableId={columnId} key={columnId}>
        {(provided) => {
          return (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{
                height: 500,
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
                    openFormEdit={() =>
                      openFormEdit(_get(item, 'id'), columnId, item)
                    }
                    openFormDelete={() =>
                      openFormDelete(_get(item, 'id'), columnId)
                    }
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
