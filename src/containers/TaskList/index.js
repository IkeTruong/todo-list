/* eslint-disable no-unused-vars */
import React, { useState, memo } from 'react'
import { List, AutoSizer } from 'react-virtualized'
import _get from 'lodash/get'
// import _map from 'lodash/map'
import _filter from 'lodash/filter'

import Grid from '@mui/material/Grid'

import TaskCard from 'src/components/TaskCard'
import ConfirmDialog from 'src/components/Dialog/ConfirmDialog'
import EditFormDialog from 'src/containers/FormDialog/EditFormDialog'
import DeleteButton from 'src/components/Button/DeleteButton'
import EditButton from 'src/components/Button/EditButton'
import EmptyData from 'src/components/EmptyData'

function TaskList(props) {
  const { todos, setTodos } = props
  const [openDelDialog, setDelDialog] = useState(false)
  const [openFormEdit, setFormEdit] = useState(false)
  const [id, setId] = useState('')
  const [index, setIndex] = useState('')

  const onOpenDelDialog = (id, index) => {
    setDelDialog(true)
    setId(id)
    setIndex(index)
  }
  const onCloseDelDialog = () => {
    setDelDialog(false)
  }
  const onOpenFormEdit = (id) => {
    setFormEdit(true)
    setId(id)
  }
  const onCloseFormEdit = () => {
    setFormEdit(false)
  }
  const onEdit = () => {
    setFormEdit(false)
  }
  const dataRoot = JSON.parse(localStorage.getItem('todo-list'))
  const onDelete = (id, index) => {
    setDelDialog(false)
    setTodos(_filter(dataRoot, (todo) => todo.id !== id))
    dataRoot.splice(index, 1)
    localStorage.setItem('todo-list', JSON.stringify(dataRoot))
  }

  const onUpdate = (id, updateTask) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, ...updateTask }
      }
      return todo
    })
    setTodos(updatedTodos)
    // localStorage.setItem('todo-list', JSON.stringify(todos))
  }

  const taskDetail = _filter(todos, (todo) => todo.id === id)[0]

  const rowRenderer = ({ index, key, style }) => {
    return (
      <Grid item xs={12} sm={6} md={4} lg={3} key={key} style={style}>
        <TaskCard
          title={_get(dataRoot[index], 'title')}
          description={_get(dataRoot[index], 'description')}
          priority={_get(dataRoot[index], 'priority')}
          completionStatus={_get(dataRoot[index], 'completionStatus')}
          actions={
            <React.Fragment>
              <EditButton />
              <DeleteButton
                onConfirm={() =>
                  onOpenDelDialog(_get(dataRoot[index], 'id'), index)
                }
              />
            </React.Fragment>
          }
        />
      </Grid>
    )
  }

  return (
    <React.Fragment>
      {todos.length > 0 ? (
        <AutoSizer style={{ height: 'calc(100vh - 272px)' }}>
          {({ width, height }) => (
            <List
              width={width}
              height={height}
              rowHeight={230}
              rowRenderer={rowRenderer}
              rowCount={todos.length}
              overscanRowCount={3}
            />
          )}
        </AutoSizer>
      ) : (
        <EmptyData />
      )}

      <EditFormDialog
        taskInfo={taskDetail}
        open={openFormEdit}
        onClose={onCloseFormEdit}
        handleChange={onEdit}
        updateTodo={onUpdate}
      />
      <ConfirmDialog
        open={openDelDialog}
        taskTitle={_get(taskDetail, 'title')}
        onCancel={onCloseDelDialog}
        onDelete={() => onDelete(id, index)}
      />
    </React.Fragment>
  )
}

export default memo(TaskList)
