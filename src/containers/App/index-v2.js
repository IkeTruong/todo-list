import React, { useState } from 'react'
import { Grid, Box } from '@mui/material'
import TypoAdvanced from 'src/components/TypoAdvanced'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

import { v4 as uuid } from 'uuid'
import { data } from 'src/assets/data'

const columnsFromBackend = {
  [uuid()]: {
    name: 'Todo',
    items: data,
    color: 'to left, #232526, #414345',
  },
  [uuid()]: {
    name: 'In Progress',
    items: [],
    color: 'to top, #56ccf2, #2f80ed',
  },
  [uuid()]: {
    name: 'Done',
    items: [],
    color: 'to right, #56ab2f, #a8e063',
  },
  [uuid()]: {
    name: 'Pending',
    items: [],
    color: 'to right, #ff512f, #f09819',
  },
}

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return
  const { source, destination } = result

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId]
    const destColumn = columns[destination.droppableId]
    const sourceItems = [...sourceColumn.items]
    const destItems = [...destColumn.items]
    const [removed] = sourceItems.splice(source.index, 1)
    destItems.splice(destination.index, 0, removed)
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    })
  } else {
    const column = columns[source.droppableId]
    const copiedItems = [...column.items]
    const [removed] = copiedItems.splice(source.index, 1)
    copiedItems.splice(destination.index, 0, removed)
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    })
  }
}

function App() {
  const [columns, setColumns] = useState(columnsFromBackend)

  let curYPos = 0
  let curXPos = 0
  let curDown = false
  let containerRef = React.createRef()

  const mouseMoveHandler = (e) => {
    if (curDown === true && containerRef.current) {
      window.scrollTo(
        containerRef.current.scrollLeft + (curXPos - e.pageX),
        containerRef.current.scrollTop + (curYPos - e.pageY),
      )
    }
  }

  const mouseDownHandler = (e) => {
    var target = e.target
    if (target.classList[0] !== 'stack__item') {
      curDown = true
      curYPos = e.pageY
      curXPos = e.pageX
    }
  }

  const mouseUpHandler = () => {
    curDown = false
  }

  return (
    <>
      <Box
        p={2}
        onMouseMove={mouseMoveHandler}
        onMouseDown={mouseDownHandler}
        onMouseUp={mouseUpHandler}
        ref={containerRef}
      >
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        >
          <Grid container spacing={2}>
            {Object.entries(columns).map(([columnId, column], index) => {
              return (
                <Grid
                  item
                  xs={12}
                  md={6}
                  lg={3}
                  className="stack__container"
                  key={columnId}
                >
                  <h2 className={`column column__${index + 1}`}>
                    {column.name}
                  </h2>
                  <div>
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
                            {column.items.map((item, index) => {
                              return (
                                <Draggable
                                  key={item.id}
                                  draggableId={item.id}
                                  index={index}
                                >
                                  {(provided, snapshot) => {
                                    return (
                                      // Start Task card
                                      <Box
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={{
                                          userSelect: 'none',
                                          background: snapshot.isDragging
                                            ? '#263B4A'
                                            : `linear-gradient(${column.color}`,
                                          marginBottom: '8px',
                                          color: '#fff',
                                          ...provided.draggableProps.style,
                                        }}
                                        className="stack__item"
                                        p={2}
                                        borderRadius={1.5}
                                      >
                                        <TypoAdvanced line={2} bold>
                                          {item.title}
                                        </TypoAdvanced>
                                        <TypoAdvanced variant="caption">
                                          {item.description}
                                        </TypoAdvanced>
                                      </Box>
                                      // End Task card
                                    )
                                  }}
                                </Draggable>
                              )
                            })}
                            {provided.placeholder}
                          </div>
                        )
                      }}
                    </Droppable>
                  </div>
                </Grid>
              )
            })}
          </Grid>
        </DragDropContext>
      </Box>
      <div className="button_container">
        <button className="add_button">Create task</button>
      </div>
    </>
  )
}

export default App
