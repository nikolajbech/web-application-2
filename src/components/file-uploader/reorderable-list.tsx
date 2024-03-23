'use client'

import {
  DragDropContext,
  Draggable,
  type DropResult,
} from 'react-beautiful-dnd'

import { StrictModeDroppable } from './strict-mode-droppable'
import { type ReactNode } from 'react'

const ReorderableList = <T extends { id: string }>(p: {
  items: T[]
  onReorder: (items: T[]) => void
  renderItem: (item: T) => ReactNode
  footerElement?: ReactNode
}) => {
  const reorder = (list: T[], startIndex: number, endIndex: number) => {
    const result = [...list]
    const [removed] = result.splice(startIndex, 1)
    removed && result.splice(endIndex, 0, removed)

    return result
  }

  const onReorderEnd = (result: DropResult) => {
    // dropped outside the list
    if (!result.destination) {
      return
    }

    const newOrder = reorder(
      p.items,
      result.source.index,
      result.destination.index,
    )

    p.onReorder(newOrder)
  }

  return (
    <div
      className='-my-1 flex w-full flex-col overflow-hidden'
      onClick={(e) => e.stopPropagation()}
    >
      <DragDropContext onDragEnd={onReorderEnd}>
        <StrictModeDroppable droppableId='droppable'>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {p.items.map((item, i) => (
                <Draggable key={item.id} draggableId={item.id} index={i}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {p.renderItem(item)}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </StrictModeDroppable>
        {p.footerElement}
      </DragDropContext>
    </div>
  )
}

export default ReorderableList
