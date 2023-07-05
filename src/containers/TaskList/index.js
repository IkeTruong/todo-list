import React, { memo, useState } from 'react'
import {
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  InfiniteLoader,
  List,
} from 'react-virtualized'

import _get from 'lodash/get'
import _filter from 'lodash/filter'
import _findIndex from 'lodash/findIndex'

import TaskCard from 'src/components/TaskCard'
import DeleteDialog from 'src/containers/FormDialog/DeleteDialog'
import EditFormDialog from 'src/containers/FormDialog/EditFormDialog'
import DeleteButton from 'src/components/Button/DeleteButton'
import EditButton from 'src/components/Button/EditButton'
import EmptyData from 'src/components/EmptyData'
import NotificationAlert from 'src/components/NotificationAlert'

import { whiteLightColor } from 'src/assets/variables'

const cache = new CellMeasurerCache({
  defaultHeight: 85,
  fixedWidth: true,
})

function TaskList(props) {
  const { todos, setTodos } = props
  const [openDelDialog, setDelDialog] = useState(false)
  const [openFormEdit, setFormEdit] = useState(false)
  const [id, setId] = useState('')
  // const [index, setIndex] = useState('')
  const [editType, setEditType] = useState(null)
  const [showNoti, setShow] = useState(false)
  const [txtAction, setTxt] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const isRowLoaded = ({ index }) => !!todos[index]

  const loadMoreRows = () => {
    if (isLoading) {
      Promise.resolve()
    } else
      Promise.resolve().then(() => {
        setIsLoading(true)
        const prevTodos = todos
        const nextTodos = [...prevTodos, ...todos]

        setTimeout(() => {
          setIsLoading(false)
          setTodos(nextTodos)
        }, 600)
      })
  }

  const infiniteRowCount = () => (!isLoading ? todos.length + 1 : todos.length)

  // function open modal delete task
  const onOpenDelDialog = (id) => {
    setDelDialog(true)
    setId(id)
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
  const onDelete = (id) => {
    const index = _findIndex(dataRoot, (d) => d.id === id)
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
  const rowRenderer = ({ index, key, parent, style }) => {
    const todo = todos[index]
    return (
      <CellMeasurer
        key={key}
        cache={cache}
        parent={parent}
        columnIndex={0}
        rowIndex={index}
      >
        {({ measure }) => (
          <div style={style}>
            <TaskCard
              measure={measure}
              index={index}
              title={_get(todo, 'title')}
              description={_get(todo, 'description')}
              priority={_get(todo, 'priority')}
              completionStatus={_get(todo, 'completionStatus')}
              actions={
                <React.Fragment>
                  <EditButton
                    onClick={() => onOpenFormEdit(_get(todo, 'id'))}
                  />
                  <DeleteButton
                    onClick={() => onOpenDelDialog(_get(todo, 'id'), index)}
                  />
                </React.Fragment>
              }
              onEditPriority={() =>
                onOpenFormEdit(_get(todo, 'id'), 'ePriority')
              }
              onEditStatus={() => onOpenFormEdit(_get(todo, 'id'), 'eStatus')}
            />
          </div>
        )}
      </CellMeasurer>
    )
  }

  return (
    <React.Fragment>
      {todos.length > 0 ? (
        <InfiniteLoader
          isRowLoaded={isRowLoaded}
          loadMoreRows={loadMoreRows}
          rowCount={infiniteRowCount()}
          threshold={0}
          minimumBatchSize={1}
        >
          {() => (
            <AutoSizer style={{ height: 'calc(100vh - 272px)' }}>
              {({ width, height }) => (
                <List
                  width={width}
                  height={height}
                  rowHeight={cache.rowHeight}
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
          )}
        </InfiniteLoader>
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
          onDelete={() => onDelete(id)}
        />
      )}

      {showNoti && (
        <NotificationAlert
          open={showNoti}
          txtAction={txtAction}
          onClose={() => setShow(false)}
        />
      )}
    </React.Fragment>
  )
}

export default memo(TaskList)
