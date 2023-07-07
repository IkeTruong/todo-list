import React, { useState, useRef, useEffect } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import { useTheme } from '@mui/material/styles'

import _get from 'lodash/get'
import _map from 'lodash/map'
import _upperFirst from 'lodash/upperFirst'
import _lowerCase from 'lodash/lowerCase'
import _findIndex from 'lodash/findIndex'
import _filter from 'lodash/filter'
import _remove from 'lodash/remove'

import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Stack from '@mui/material/Stack'

import TypoAdvanced from 'src/components/TypoAdvanced'
import TaskList from 'src/containers/TaskList'
import AddButton from 'src/components/Button/AddButton'
import SearchTask from 'src/containers/SearchTask'
import FilterTask from 'src/containers/FilterTask'
import AddFormDialog from 'src/containers/FormDialog/AddFormDialog'
import EditFormDialog from 'src/containers/FormDialog/EditFormDialog'
import DeleteDialog from 'src/containers/FormDialog/DeleteDialog'
import NotificationAlert from 'src/components/NotificationAlert'

import { NormalizeButton } from 'src/components/Button/NormalizeButton'
import { TitleTypography } from 'src/components/TypoAdvanced/TitleTypography'

import {
  midnightColor,
  blueSkiesColor,
  lushColor,
  sunriseColor,
} from 'src/assets/variables'

export default function App() {
  const theme = useTheme()
  const [columns, setColumns] = useState([])
  const [openForm, setOpenForm] = useState(false)
  const [openDelModal, setDelModal] = useState(false)
  const [openEditModal, setEditModal] = useState(false)
  const [id, setId] = useState(null)
  const [query, setQuery] = useState('')
  const [alert, setAlert] = useState(false)
  const [txt, setTxt] = useState(false)
  const [filter, setCondFilter] = useState('all')

  let containerRef = useRef(null)
  let curYPos = 0
  let curXPos = 0
  let curDown = false

  const todoStore = JSON.parse(localStorage.getItem('todo-list')) || []
  const taskInfo = _filter(todoStore, (task) => task.id === id)[0]

  /*==========Block Actions Delete==========*/
  const onOpenDelModal = (id) => {
    setDelModal(true)
    setId(id)
  }
  const onCloseDelModal = () => {
    setDelModal(false)
  }
  const onDelete = (id) => {
    const index = _findIndex(todoStore, (d) => d.id === id)
    setColumns(_filter(todoStore, (todo) => todo.id !== id))
    todoStore.splice(index, 1)
    localStorage.setItem('todo-list', JSON.stringify(todoStore))
    setDelModal(false)
    setAlert(true)
    setTxt('Delete')
  }
  /*==========Block Actions Delete==========*/

  /*==========Block Actions Edit==========*/
  const onOpenEditModal = (id) => {
    setId(id)
    setEditModal(true)
  }
  const onCloseEditModal = () => {
    setEditModal(false)
  }
  const onUpdate = (id, updateTask) => {
    const updatedTodos = _map(todoStore, (todo) => {
      if (todo.id === id) {
        return { ...todo, ...updateTask }
      }
      return todo
    })
    setColumns(updatedTodos)
    setAlert(true)
    setTxt('Update')
    localStorage.setItem('todo-list', JSON.stringify(updatedTodos))
  }
  /*==========Block Actions Edit==========*/

  /*==========Block Actions Create==========*/
  const handleForm = () => {
    setOpenForm(!openForm)
  }
  const onCreate = (newTodo) => {
    setColumns([newTodo, ...columns])
    setAlert(true)
    setTxt('Create')
    localStorage.setItem('todo-list', JSON.stringify([newTodo, ...columns]))
  }
  /*==========Block Actions Create==========*/

  /*==========Block Actions Search==========*/
  const searchTodos = _filter(todoStore, (todo) => {
    if (query === '') {
      return todo
    } else if (
      todo.title.toLowerCase().includes(query.toLowerCase()) ||
      todo.description.toLowerCase().includes(query.toLowerCase())
    ) {
      return todo
    }
  })
  /*==========Block Actions Search==========*/

  /*==========Block Actions Filter==========*/
  const filterTodos = _filter(
    searchTodos || todoStore,
    (todo) => todo.completionStatus === filter,
  )
  /*==========Block Actions Filter==========*/

  /*==========Block Actions Reset==========*/
  const onReset = () => {
    setQuery('')
    setCondFilter('all')
  }
  const onClear = () => {
    setQuery('')
  }
  /*==========Block Actions Reset==========*/

  /*==========Block Actions Mouse==========*/
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
  /*==========Block Actions Mouse==========*/

  /*==========Block Actions Handle Data==========*/
  const filterData = (type) =>
    _filter(
      filter === 'all' ? searchTodos : filterTodos,
      (d) => d.completionStatus === type,
    ) || []

  const todoArr = filterData('todo')
  const processArr = filterData('processing')
  const doneArr = filterData('done')
  const pendingArr = filterData('pending')

  const newArr = [
    { name: 'Todo', array: todoArr, bgColor: midnightColor },
    { name: 'Processing', array: processArr, bgColor: blueSkiesColor },
    { name: 'Done', array: doneArr, bgColor: lushColor },
    { name: 'Pending', array: pendingArr, bgColor: sunriseColor },
  ]
  /*==========Block Actions Handle Data==========*/

  /*==========Block Actions Drag & Drop==========*/
  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return
    const { source, destination } = result
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = _filter(
        columns,
        (column) => column.name === source.droppableId,
      )
      const destColumn = _filter(
        columns,
        (column) => column.name === destination.droppableId,
      )

      const sourceItems = sourceColumn[0].array
      const destItems = destColumn[0].array

      const [removed] = sourceItems.splice(source.index, 1)

      const overwriteRemove = {
        ...removed,
        completionStatus: _lowerCase(destination.droppableId),
      }
      destItems.splice(destination.index, 0, overwriteRemove)

      const removeOldTask = _remove(
        todoStore,
        (todo) => todo.id !== _get(removed, 'id'),
      )
      const newArray = [...new Set(destItems.concat(removeOldTask))]
      setColumns(newArray)
      localStorage.setItem('todo-list', JSON.stringify(newArray))
    } else {
      const column = _filter(
        columns,
        (column) => column.name === source.droppableId,
      )
      const copiedItems = [...column[0].array]
      const [removed] = copiedItems.splice(source.index, 1)
      copiedItems.splice(destination.index, 0, removed)
      const newArray = [...new Set(copiedItems.concat(todoStore))]
      setColumns(newArray)
      localStorage.setItem('todo-list', JSON.stringify(newArray))
    }
  }
  /*==========Block Actions Drag & Drop==========*/

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem('todo-list'))
    if (todos) {
      setColumns(todos)
    }
  }, [])

  return (
    <Box p={2}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TitleTypography variant="h1" align="center" gutterBottom>
            TODO LIST
          </TitleTypography>
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
              <FilterTask setCondFilter={setCondFilter} filter={filter} />
            </Grid>
            <Grid item>
              <NormalizeButton
                variant="contained"
                color="info"
                disableElevation
                onClick={onReset}
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
          <Box
            onMouseMove={mouseMoveHandler}
            onMouseDown={mouseDownHandler}
            onMouseUp={mouseUpHandler}
            ref={containerRef}
            bgcolor={theme.palette.grey[200]}
            borderRadius={2}
            paddingX={2}
            mt={2}
          >
            <DragDropContext
              onDragEnd={(result) => onDragEnd(result, newArr, setColumns)}
            >
              <Grid container spacing={2}>
                {_map(newArr, (column, index) => {
                  return (
                    <Grid
                      item
                      xs={12}
                      md={6}
                      lg={3}
                      className="stack__container"
                      key={_get(column, 'name')}
                    >
                      <Stack spacing={2}>
                        <Card
                          variant="none"
                          sx={{ paddingX: 1, paddingY: 0.5 }}
                        >
                          <TypoAdvanced
                            className={`column column__${index + 1}`}
                            sx={{
                              background: _get(column, 'bgColor'),
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                            }}
                          >
                            <b>{_upperFirst(column.name)}</b>
                          </TypoAdvanced>
                        </Card>
                        <TaskList
                          columnData={_get(column, 'array')}
                          columnId={_get(column, 'name')}
                          bgColor={_get(column, 'bgColor')}
                          openFormEdit={onOpenEditModal}
                          openFormDelete={onOpenDelModal}
                        />
                      </Stack>
                    </Grid>
                  )
                })}
              </Grid>
            </DragDropContext>
          </Box>
        </Grid>
      </Grid>
      <AddFormDialog open={openForm} onClose={handleForm} onCreate={onCreate} />
      <DeleteDialog
        open={openDelModal}
        taskTitle={_get(taskInfo, 'title')}
        onCancel={onCloseDelModal}
        onDelete={() => onDelete(id)}
      />
      <EditFormDialog
        taskInfo={taskInfo}
        idColumn={_get(id, 'idColumn')}
        open={openEditModal}
        onClose={onCloseEditModal}
        onUpdate={onUpdate}
      />
      {alert && (
        <NotificationAlert
          open={alert}
          onClose={() => setAlert(false)}
          txtAction={txt}
        />
      )}
    </Box>
  )
}
