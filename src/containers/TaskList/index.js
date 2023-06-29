/* eslint-disable no-unused-vars */
import React, { useState, memo } from 'react'
import { List, AutoSizer } from 'react-virtualized'

import _get from 'lodash/get'
import _filter from 'lodash/filter'

import TaskCard from 'src/components/TaskCard'
import DeleteDialog from 'src/containers/FormDialog/DeleteDialog'
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
    console.log('id, updateTask', id, updateTask)
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, ...updateTask }
      }
      return todo
    })
    setTodos(updatedTodos)
    localStorage.setItem('todo-list', JSON.stringify(updatedTodos))
  }

  const taskDetail = _filter(todos, (todo) => todo.id === id)[0]

  const rowRenderer = ({ index, key, style }) => {
    return (
      <div key={key} style={style}>
        <TaskCard
          title={_get(todos[index], 'title')}
          description={_get(todos[index], 'description')}
          priority={_get(todos[index], 'priority')}
          completionStatus={_get(todos[index], 'completionStatus')}
          actions={
            <React.Fragment>
              <EditButton
                onFormEdit={() => onOpenFormEdit(_get(todos[index], 'id'))}
              />
              <DeleteButton
                onConfirm={() =>
                  onOpenDelDialog(_get(todos[index], 'id'), index)
                }
              />
            </React.Fragment>
          }
        />
      </div>
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
      <DeleteDialog
        open={openDelDialog}
        taskTitle={_get(taskDetail, 'title')}
        onCancel={onCloseDelDialog}
        onDelete={() => onDelete(id, index)}
      />
    </React.Fragment>
  )
}

export default memo(TaskList)
