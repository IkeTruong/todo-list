import React, { useState, useEffect } from 'react'
import { Box } from '@mui/material'
import TypoAdvanced from 'src/components/TypoAdvanced'

export default function TaskCard(props) {
  const { provided, snapshot, bgColor, title, desc, measure, index } = props
  const [height, setHeight] = useState()

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      setHeight(entries[0].contentRect.height)
    })
    resizeObserver.observe(document.getElementById(`myDivTag${index}`))
  })

  useEffect(() => {
    measure({ height })
  }, [height, measure])

  return (
    <Box
      ref={provided.innerRef}
      measure
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={{
        userSelect: 'none',
        background: snapshot.isDragging
          ? '#263B4A'
          : `linear-gradient(${bgColor}`,
        marginBottom: '8px',
        color: '#fff',
        ...provided.draggableProps.style,
      }}
      className="stack__item"
      p={2}
      borderRadius={1.5}
    >
      <TypoAdvanced line={2} bold>
        {title}
      </TypoAdvanced>
      <TypoAdvanced variant="caption">{desc}</TypoAdvanced>
    </Box>
  )
}
