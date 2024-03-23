'use client'

import React, {
  type ReactNode,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react'
import Dropzone from 'react-dropzone'

type Props = {
  children: ReactNode
  setIsDraggedOver: (isDraggedOver: boolean) => void
  onDropFiles: (files: File[]) => void
  supportedMimeTypes?: string[]
}

export type DragAndDropFileAreaRef = {
  open: () => void
}

// eslint-disable-next-line react/display-name
const DragAndDropFileArea = forwardRef<DragAndDropFileAreaRef, Props>(
  (p, ref) => {
    const {
      children,
      setIsDraggedOver,
      onDropFiles,
      supportedMimeTypes,
      ...flexProps
    } = p

    const inputRef = useRef<HTMLInputElement>(null)

    useImperativeHandle(
      ref,
      () => ({
        open: () => inputRef.current?.click(),
      }),
      [],
    )

    return (
      <Dropzone
        onDrop={(files) => {
          setIsDraggedOver(false)
          onDropFiles(files as File[])
        }}
        onDragOver={() => setIsDraggedOver(true)}
        onDragLeave={() => setIsDraggedOver(false)}
      >
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} {...flexProps}>
            <input
              {...getInputProps()}
              ref={inputRef}
              accept={supportedMimeTypes?.join(', ')}
            />
            {children}
          </div>
        )}
      </Dropzone>
    )
  },
)

export default DragAndDropFileArea
