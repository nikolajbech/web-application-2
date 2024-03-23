'use client'

import { useCallback, useRef, useState } from 'react'
import DragAndDropFileArea, {
  type DragAndDropFileAreaRef,
} from './drag-and-drop-file-area'
import { nanoid } from 'nanoid'
import ReorderableList from './reorderable-list'
import { type FileUploadState, FileUploaderItem } from './file-uploader-item'
import { Info } from './info'
import { EmptyFileUploaderItem } from './empty-file-uploader-item'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'

type FileItem = {
  id: string
  file: File
  errors: string[]
  url: string
  state: FileUploadState
  mimeType: string
  size: number
}

type Props = {
  fileItems: FileItem[]
  supportedMimeTypes?: string[]
  supportedFilesText?: string
  maxFileSize?: number
  onChange?: (fileItems: FileItem[]) => void
  multiple?: boolean
  className?: string
}

export const FileUploader = (p: Props) => {
  const [isDraggedOver, setIsDraggedOver] = useState(false)
  const replaceInputRef = useRef<HTMLInputElement>(null)
  const dragAndDropFilesAreaRef = useRef<DragAndDropFileAreaRef>(null)
  const [idToReplace, setIdToReplace] = useState<string | null>(null)

  const fileErrros = useCallback(
    (file: File) => {
      const supportFileError = !p.supportedMimeTypes?.includes(file.type)
        ? 'Unsupported file type'
        : undefined

      const sizeError =
        p.maxFileSize && file.size > (p.maxFileSize || 0)
          ? 'File too large'
          : undefined

      return [supportFileError, sizeError].filter(Boolean) as string[]
    },
    [p.maxFileSize, p.supportedMimeTypes],
  )

  const fileUrl = (file: File) => {
    const isImage = file.type?.startsWith('image')
    const isVideo = file.type?.startsWith('video')
    return isImage || isVideo ? URL.createObjectURL(file) : ''
  }

  const appendDroppedFiles = useCallback(
    (files: File[]) => {
      const filesAsFileItem = files.map((file) => {
        const errors = fileErrros(file)
        const url = fileUrl(file)

        return {
          id: nanoid(10),
          file,
          errors,
          url,
          state: errors.length ? ('error' as const) : ('not uploaded' as const),
          mimeType: file.type,
          size: file.size,
        }
      })

      if (!filesAsFileItem?.[0]) return

      if (p.multiple) {
        const newFileItems = [...p.fileItems, ...filesAsFileItem]
        p.onChange?.(newFileItems)
      } else {
        const newFileItems = [filesAsFileItem[0]]
        p.onChange?.(newFileItems)
      }
    },
    [fileErrros, p.fileItems, p.multiple, p.onChange],
  )

  const replaceFile = useCallback(
    (file: File) => {
      const newFileItems = p.fileItems.map((fileItem) => {
        if (fileItem.id === idToReplace) {
          const errors = fileErrros(file)
          const url = fileUrl(file)

          return {
            ...fileItem,
            file,
            errors,
            url,
            state: errors.length
              ? ('error' as const)
              : ('not uploaded' as const),
            mimeType: file.type,
            size: file.size,
          }
        }
        return fileItem
      })
      p.onChange?.(newFileItems)
    },
    [fileErrros, idToReplace],
  )

  const deleteItem = (id: string) => {
    // confirm({
    //   title: 'Delete file',
    //   message: 'Are you sure you want to delete this file?',
    //   confirmText: 'Delete',
    //   isDanger: true,
    //   onConfirm: (cb) => {
    //     const newFileItems = p.fileItems.filter((item) => item.id !== id)
    //     p.onChange?.(newFileItems)
    //     cb()
    //   },
    // })
  }

  const onReorder = (fileItems: FileItem[]) => {
    p.onChange?.(fileItems)
  }

  const onClearAllFilesClick = () => {
    // confirm({
    //   title: 'Delete all files',
    //   message: 'Are you sure you want to delete all files?',
    //   confirmText: 'Delete',
    //   isDanger: true,
    //   onConfirm: (cb) => {
    //     p.onChange?.([])
    //     cb()
    //   },
    // })
  }

  const downloadFile = (fileItem: FileItem) => {
    // const a = document.createElement('a')
    // a.href = fileItem.url ?? ''
    // a.download =
    //   (fileItem.name ?? 'unnamed') + mime.extension(fileItem.mimeType ?? '') ??
    //   ''
    // a.target = '_blank'
    // a.click()
  }

  return (
    <div className={cn('w-full rounded-md border border-input', p.className)}>
      <DragAndDropFileArea
        setIsDraggedOver={setIsDraggedOver}
        onDropFiles={appendDroppedFiles}
        supportedMimeTypes={p.supportedMimeTypes}
        ref={dragAndDropFilesAreaRef}
      >
        <ReorderableList
          items={p.fileItems}
          onReorder={onReorder}
          renderItem={(fileItem) => {
            return (
              <FileUploaderItem
                fileItem={fileItem}
                deleteItem={() => deleteItem(fileItem.id)}
                replaceItem={() => {
                  setIdToReplace(fileItem.id)
                  replaceInputRef.current?.click()
                }}
                downloadFile={() => downloadFile(fileItem)}
              />
            )
          }}
          footerElement={isDraggedOver ? <EmptyFileUploaderItem /> : null}
        />
        {p.multiple && p.fileItems.length > 0 && (
          <div className='mt-5 justify-center'>
            <Button
              onClick={(e) => {
                e.stopPropagation()
                onClearAllFilesClick()
              }}
            >
              Clear All Files
            </Button>
          </div>
        )}
        <Info
          maxFileSize={p.maxFileSize}
          supportedFilesText={p.supportedFilesText}
        />
      </DragAndDropFileArea>
      <input
        ref={replaceInputRef}
        onChange={(e) => {
          e.target.files?.[0] && replaceFile(e.target.files[0])
        }}
        accept={p.supportedMimeTypes?.join(', ')}
        type='file'
        hidden
      />
    </div>
  )
}
