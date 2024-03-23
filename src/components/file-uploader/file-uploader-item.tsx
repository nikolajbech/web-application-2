/* eslint-disable @next/next/no-img-element */
'use client'

import { filesize } from 'filesize'
import { capitalize } from 'lodash'
import { DownloadCloud, Replace, Trash } from 'lucide-react'
import ReactPlayer from 'react-player'

export type FileUploadState = 'uploaded' | 'not uploaded' | 'error'

export type FileItem = {
  id: string
  file?: File
  name?: string
  errors?: string[]
  url?: string
  state?: FileUploadState
  size?: number
  mimeType?: string
}

type Props = {
  fileItem: FileItem
  deleteItem: () => void
  replaceItem: () => void
  downloadFile?: () => void
}

export const FileUploaderItem = (p: Props) => {
  const toFileSize = (size: number) => {
    return filesize(size || 0, {
      base: 2,
      standard: 'jedec',
    })
  }

  const tag = {
    uploaded: {
      text: 'Uploaded',
      color: 'text-green-500',
    },
    'not uploaded': {
      text: 'Not uploaded',
      color: 'text-orange-500',
    },
    error: {
      text: 'Error',
      color: 'text-red-500',
    },
  }[p.fileItem.state ?? 'not uploaded'] || {
    text: 'To be uploaded',
    color: 'text-yellow-500',
  }

  const fileSize = p.fileItem.size ?? p.fileItem.file?.size ?? 0
  const isImage = p.fileItem.mimeType?.startsWith('image')
  const isVideo = p.fileItem.mimeType?.startsWith('video')

  const ImagePreview = () => (
    <img src={p.fileItem.url} className='h-full w-full object-cover' alt='' />
  )

  const VideoPreview = () => (
    <ReactPlayer
      url={p.fileItem.url}
      playing={false}
      volume={0}
      width='100%'
      height='100%'
    />
  )

  const Errors = () => {
    if (!p.fileItem.errors?.length) return null
    return (
      <div className='-mt-1 text-sm text-red-500'>
        {capitalize(p.fileItem.errors.join(', ').toLocaleLowerCase())}
      </div>
    )
  }

  return (
    <div>
      <div className='flex w-full min-w-full overflow-hidden rounded-md bg-background'>
        <div className='relative h-20 min-w-32 max-w-32 overflow-hidden rounded-md'>
          {isImage ? <ImagePreview /> : isVideo ? <VideoPreview /> : null}
          <div className='absolute bottom-1 left-1 rounded-full bg-white/50 px-2 text-xs backdrop-blur-md'>
            {tag.text}
          </div>
        </div>
        <div className='relative px-2'>
          <div className='line-clamp-1 text-ellipsis font-bold'>
            {p.fileItem.name ?? p.fileItem.file?.name}
          </div>
          {!!fileSize && (
            <p className='-mt-1 text-sm opacity-50'>
              {p.fileItem.mimeType} - {toFileSize(fileSize)}
            </p>
          )}
          <Errors />
          <div className='absolute bottom-2 left-2 flex'>
            <button
              className='mr-2 text-sm'
              onClick={p.replaceItem}
              aria-label='Replace file'
            >
              <Replace className='h-4 w-4' />
            </button>
            <button
              className='mr-2 text-sm'
              onClick={p.downloadFile}
              aria-label='Download'
            >
              <DownloadCloud className='h-4 w-4' />
            </button>
            <button
              className='text-sm'
              onClick={p.deleteItem}
              aria-label='Delete'
            >
              <Trash className='h-4 w-4' />
            </button>
          </div>
        </div>
      </div>
      <div className='h-1' />
    </div>
  )
}
