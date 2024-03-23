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
    const { children, setIsDraggedOver, onDropFiles, supportedMimeTypes } = p

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
          <div {...getRootProps()} className='flex flex-col p-1'>
            <input
              {...getInputProps()}
              ref={inputRef}
              style={{ display: 'none', marginBottom: 6, paddingBottom: 0 }}
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
