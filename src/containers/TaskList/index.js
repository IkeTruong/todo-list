/* eslint-disable no-unused-vars */
import React, { useState, memo } from 'react'
import { List, AutoSizer } from 'react-virtualized'

import _get from 'lodash/get'
import _filter from 'lodash/filter'

import Divider from '@mui/material/Divider'
import TaskCard from 'src/components/TaskCard'
import DeleteDialog from 'src/containers/FormDialog/DeleteDialog'
import EditFormDialog from 'src/containers/FormDialog/EditFormDialog'
import DeleteButton from 'src/components/Button/DeleteButton'
import EditButton from 'src/components/Button/EditButton'
import EmptyData from 'src/components/EmptyData'
import NotificationAlert from 'src/components/NotificationAlert'

import { whiteLightColor } from 'src/assets/variables'

function TaskList(props) {
  const { todos, setTodos } = props
  const [openDelDialog, setDelDialog] = useState(false)
  const [openFormEdit, setFormEdit] = useState(false)
  const [id, setId] = useState('')
  const [index, setIndex] = useState('')
  const [editType, setEditType] = useState(null)
  const [showNoti, setShow] = useState(false)
  const [txtAction, setTxt] = useState('')

  // function open modal delete task
  const onOpenDelDialog = (id, index) => {
    setDelDialog(true)
    setId(id)
    setIndex(index)
  }

  // function close modal delete task
  const onCloseDelDialog = () => {
    setDelDialog(false)
  }

  // function open modal edit task
  const onOpenFormEdit = (id, type = null) => {
    setFormEdit(true)
    setId(id)
    setEditType(type)
  }

  // function close modal edit task
  const onCloseFormEdit = () => {
    setFormEdit(false)
  }
  const onEdit = () => {
    setFormEdit(false)
  }

  const dataRoot = JSON.parse(localStorage.getItem('todo-list'))

  // function delete item
  const onDelete = (id, index) => {
    setDelDialog(false)
    setTodos(_filter(dataRoot, (todo) => todo.id !== id))
    setTxt('Delete task')
    setShow(true)
    dataRoot.splice(index, 1)
    localStorage.setItem('todo-list', JSON.stringify(dataRoot))
  }

  // function update item
  const onUpdate = (id, updateTask) => {
    const updatedTodos = dataRoot.map((todo) => {
      if (todo.id === id) {
        return { ...todo, ...updateTask }
      }
      return todo
    })
    setTodos(updatedTodos)
    setTxt('Edit task')
    setShow(true)
    localStorage.setItem('todo-list', JSON.stringify(updatedTodos))
  }

  const taskDetail = _filter(todos, (todo) => todo.id === id)[0]

  // Each item in list of react-virtualize
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
          onEditPriority={() =>
            onOpenFormEdit(_get(todos[index], 'id'), 'ePriority')
          }
          onEditStatus={() =>
            onOpenFormEdit(_get(todos[index], 'id'), 'eStatus')
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
              rowHeight={109}
              rowRenderer={rowRenderer}
              rowCount={todos.length}
              overscanRowCount={3}
              style={{
                border: `thin solid ${whiteLightColor}`,
                borderRadius: 5,
              }}
            />
          )}
        </AutoSizer>
      ) : (
        <EmptyData />
      )}

      {openFormEdit && (
        <EditFormDialog
          taskInfo={taskDetail}
          open={openFormEdit}
          onClose={onCloseFormEdit}
          handleChange={onEdit}
          updateTodo={onUpdate}
          editType={editType}
        />
      )}

      {openDelDialog && (
        <DeleteDialog
          open={openDelDialog}
          taskTitle={_get(taskDetail, 'title')}
          onCancel={onCloseDelDialog}
          onDelete={() => onDelete(id, index)}
        />
      )}

      {showNoti && (
        <NotificationAlert
          open={showNoti}
          txtAction="Create task"
          onClose={() => setShow(false)}
        />
      )}
    </React.Fragment>
  )
}

export default memo(TaskList)
