import React, { useEffect, useState } from 'react'

import _filter from 'lodash/filter'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import TaskList from 'src/containers/TaskList'
import SearchTask from 'src/containers/SearchTask'
import FilterTask from 'src/containers/FilterTask'
import AddButton from 'src/components/Button/AddButton'
import AddFormDialog from 'src/containers/FormDialog/AddFormDialog'
import NotificationAlert from 'src/components/NotificationAlert'
import { NormalizeButton } from 'src/components/Button/NormalizeButton'
// import { data } from 'src/assets/data'

export default function App() {
  const [openForm, setOpenForm] = useState(false)
  const [query, setQuery] = useState('')
  const [todos, setTodos] = useState([])
  const [filter, setCondFilter] = useState('all')
  const [showNoti, setShow] = useState(false)

  // function open/close create task form
  const handleForm = () => {
    setOpenForm(!openForm)
  }

  // function create new task, then set it into localstorage
  const onCreate = (newTodo) => {
    setTodos([newTodo, ...todos])
    setShow(true)
    localStorage.setItem('todo-list', JSON.stringify([newTodo, ...todos]))
  }

  // get data in localstorage
  const dataLocalStorage = JSON.parse(localStorage.getItem('todo-list'))

  // todo list by text search
  const searchTodos = _filter(dataLocalStorage, (todo) => {
    if (query === '') {
      return todo
    } else if (
      todo.title.toLowerCase().includes(query.toLowerCase()) ||
      todo.description.toLowerCase().includes(query.toLowerCase())
    ) {
      return todo
    }
  })

  // todo list filter by status
  const filterTodos = _filter(
    searchTodos || dataLocalStorage,
    (todo) => todo.completionStatus === filter,
  )

  // function reset search, filter value
  const onReset = () => {
    setQuery('')
    setCondFilter('all')
  }

  // function clear text input search
  const onClear = () => {
    setQuery('')
  }

  // listen if has data in localstorage, set data
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem('todo-list'))
    if (todos) {
      setTodos(todos)
    }
  }, [])

  // useEffect(() => {
  //   localStorage.setItem('todo-list', JSON.stringify(todos))
  // }, [todos])

  return (
    <>
      <Container maxWidth="xl">
        <Box py={3} position="relative">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography align="center" variant="h2">
                <b>Todo List</b>
              </Typography>
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
            <Grid item>
              <AddButton onClick={handleForm} />
            </Grid>
            <Grid item xs={12}>
              <TaskList
                todos={filter === 'all' ? searchTodos : filterTodos}
                setTodos={setTodos}
              />
            </Grid>
          </Grid>
          <AddFormDialog
            open={openForm}
            onClose={handleForm}
            onCreate={onCreate}
          />
          {showNoti && (
            <NotificationAlert
              open={showNoti}
              txtAction="Create task"
              onClose={() => setShow(false)}
            />
          )}
        </Box>
      </Container>
    </>
  )
}
