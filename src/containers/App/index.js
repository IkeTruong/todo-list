import React, { useState, useEffect } from 'react'

import _filter from 'lodash/filter'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import TaskList from 'src/containers/TaskList'
import SearchTask from 'src/containers/SearchTask'
import FilterTask from 'src/containers/FilterTask'
import AddButton from 'src/components/Button/AddButton'
import FormDialog from 'src/containers/FormDialog'

// import { data } from 'src/assets/data'

export default function App() {
  const [openForm, setOpenForm] = useState(false)
  const [query, setQuery] = useState('')
  const [todos, setTodos] = useState([])
  const [filter, setCondFilter] = useState('all')

  const handleOpenForm = () => {
    setOpenForm(true)
  }
  const handleCloseForm = () => {
    setOpenForm(false)
  }

  const onCreate = (newTodo) => {
    setTodos([newTodo, ...todos])
    localStorage.setItem('todo-list', JSON.stringify([newTodo, ...todos]))
  }

  const dataLocalStorage = JSON.parse(localStorage.getItem('todo-list'))

  const filterTodos = _filter(
    dataLocalStorage,
    (todo) => todo.completionStatus === filter
  )

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
    <Container maxWidth="xl">
      <Box py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography align="center" variant="h2">
              <b>Todo List</b>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" spacing={1}>
              <SearchTask onChange={(event) => setQuery(event.target.value)} />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Grid
              container
              spacing={2}
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item xs={6} md={4} lg={3}>
                <AddButton onAdd={handleOpenForm} />
              </Grid>
              <Grid item xs={6} md={4} lg={3}>
                <FilterTask setCondFilter={setCondFilter} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <TaskList
              todos={filter === 'all' ? searchTodos : filterTodos}
              setTodos={setTodos}
            />
          </Grid>
        </Grid>
        <FormDialog
          open={openForm}
          onClose={handleCloseForm}
          createTodo={onCreate}
        />
      </Box>
    </Container>
  )
}
