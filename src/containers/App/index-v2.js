import React, { useState, useRef, useEffect } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'

import _get from 'lodash/get'
import _map from 'lodash/map'
// import _merge from 'lodash/merge'
import _upperFirst from 'lodash/upperFirst'
import _findIndex from 'lodash/findIndex'
import _filter from 'lodash/filter'

import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'

import TypoAdvanced from 'src/components/TypoAdvanced'
import TaskList from 'src/containers/TaskList/index_v2'
import AddButton from 'src/components/Button/AddButton'
import SearchTask from 'src/containers/SearchTask'
// import FilterTask from 'src/containers/FilterTask'
import AddFormDialog from 'src/containers/FormDialog/AddFormDialog'
import EditFormDialog from 'src/containers/FormDialog/EditFormDialog'
import DeleteDialog from 'src/containers/FormDialog/DeleteDialog'

import { NormalizeButton } from 'src/components/Button/NormalizeButton'

// import { columnsData } from 'src/assets/data'

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return
  const { source, destination } = result
  console.log('result', result)
  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId]
    const destColumn = columns[destination.droppableId]
    const sourceItems = [...sourceColumn.items]
    const destItems = [...destColumn.items]
    const [removed] = sourceItems.splice(source.index, 1)
    destItems.splice(destination.index, 0, removed)
    const newObj = {
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    }
    setColumns(newObj)
    localStorage.setItem('todo-list', JSON.stringify(newObj))
  } else {
    const column = columns[source.droppableId]
    const copiedItems = [...column.items]
    const [removed] = copiedItems.splice(source.index, 1)
    copiedItems.splice(destination.index, 0, removed)
    const newObj = {
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    }
    setColumns(newObj)
    localStorage.setItem('todo-list', JSON.stringify(newObj))
  }
}

export default function App() {
  const [columns, setColumns] = useState({})
  const [openForm, setOpenForm] = useState(false)
  const [openDelModal, setDelModal] = useState(false)
  const [openEditModal, setEditModal] = useState(false)
  const [obj, setObj] = useState(null)
  const [query, setQuery] = useState('')

  let containerRef = useRef(null)
  let curYPos = 0
  let curXPos = 0
  let curDown = false

  const todoStore = JSON.parse(localStorage.getItem('todo-list'))
  const taskInfo = _filter(
    _get(todoStore[_get(obj, 'idColumn')], 'items'),
    (task) => task.id === _get(obj, 'idTask'),
  )[0]

  // function open/close create task form
  const handleForm = () => {
    setOpenForm(!openForm)
  }

  /*==========Block Actions Delete==========*/
  //function open delete modal, it received props: idTask, idColumn
  const onOpenDelModal = (idTask, idColumn) => {
    setDelModal(true)
    setObj({ idTask, idColumn })
  }
  // function close delete modal
  const onCloseDelModal = () => {
    setDelModal(false)
  }
  // function delete task, it received obj({idTask, idColumn})
  const onDelete = (oj) => {
    const dataColumn = _get(todoStore[_get(oj, 'idColumn')], 'items')
    const index = _findIndex(dataColumn, (d) => d.id === _get(oj, 'idTask'))
    setColumns(_filter(dataColumn, (todo) => todo.id !== _get(oj, 'idTask')))
    dataColumn.splice(index, 1)
    localStorage.setItem('todo-list', JSON.stringify(todoStore))
    setDelModal(false)
  }
  /*==========Block Actions Delete==========*/

  /*==========Block Actions Edit==========*/
  //function open edit modal, it received props: idTask, idColumn
  const onOpenEditModal = (idTask, idColumn, info) => {
    setObj({ idTask, idColumn, info })
    setEditModal(true)
  }
  //function close edit modal
  const onCloseEditModal = () => {
    setEditModal(false)
  }
  // function edit task, it received ({oj, updateTask})
  const onUpdate = (oj, updateTask) => {
    const dataColumn = _get(todoStore[_get(oj, 'idColumn')], 'items')
    const updatedTodos = _map(dataColumn, (todo) => {
      if (todo.id === _get(oj, 'idTask')) {
        return { ...todo, ...updateTask }
      }
      return todo
    })
    const newData = {
      ...todoStore,
      [_get(oj, 'idColumn')]: {
        ...todoStore[_get(oj, 'idColumn')],
        items: updatedTodos,
      },
    }
    setColumns(newData)
    localStorage.setItem('todo-list', JSON.stringify(newData))
  }
  /*==========Block Actions Edit==========*/

  // function create new task, then set it into localstorage
  const onCreate = () => {
    // setTodos([newTodo, ...todos])
    // setShow(true)
    // localStorage.setItem('todo-list', JSON.stringify([newTodo, ...todos]))
  }

  // function clear text input search
  const onClear = () => {
    setQuery('')
  }

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

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem('todo-list'))
    if (todos) {
      setColumns(todos)
    }
  }, [])

  // useEffect(() => {
  //   localStorage.setItem('todo-list', JSON.stringify(columns))
  // }, [columns])

  return (
    <Box p={2}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TypoAdvanced variant="h2" align="center">
            <b>TODO LIST</b>
          </TypoAdvanced>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6} md={3}>
              <SearchTask
                onChange={(event) => setQuery(event.target.value)}
                onClear={onClear}
                value={query}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              {/* <FilterTask /> */}
            </Grid>
            <Grid item>
              <NormalizeButton
                variant="contained"
                color="info"
                disableElevation
              >
                Reset
              </NormalizeButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <AddButton onClick={handleForm} />
        </Grid>
        <Grid item xs={12}>
          <div
            onMouseMove={mouseMoveHandler}
            onMouseDown={mouseDownHandler}
            onMouseUp={mouseUpHandler}
            ref={containerRef}
          >
            <DragDropContext
              onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
            >
              <Grid container spacing={3}>
                {_map(
                  Object.entries(todoStore),
                  ([columnId, column], index) => {
                    return (
                      <Grid
                        item
                        xs={12}
                        md={6}
                        lg={3}
                        className="stack__container"
                        key={columnId}
                      >
                        <TypoAdvanced
                          variant="h5"
                          className={`column column__${index + 1}`}
                          paragraph
                        >
                          <b>{_upperFirst(column.name)}</b>
                        </TypoAdvanced>
                        <TaskList
                          columnData={_get(column, 'items')}
                          columnId={columnId}
                          bgColor={_get(column, 'color')}
                          openFormEdit={onOpenEditModal}
                          openFormDelete={onOpenDelModal}
                        />
                      </Grid>
                    )
                  },
                )}
              </Grid>
            </DragDropContext>
          </div>
        </Grid>
      </Grid>
      <AddFormDialog open={openForm} onClose={handleForm} onCreate={onCreate} />
      <DeleteDialog
        open={openDelModal}
        taskTitle={_get(taskInfo, 'title')}
        onCancel={onCloseDelModal}
        onDelete={() => onDelete(obj)}
      />
      <EditFormDialog
        taskInfo={taskInfo}
        idColumn={_get(obj, 'idColumn')}
        open={openEditModal}
        onClose={onCloseEditModal}
        onUpdate={onUpdate}
      />
    </Box>
  )
}
