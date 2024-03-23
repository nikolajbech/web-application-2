'use client'

import { filesize } from 'filesize'
import { isMobile } from 'react-device-detect'
import { UploadCloud } from 'lucide-react'

export const Info = (p: {
  supportedFilesText?: string
  maxFileSize?: number
}) => {
  const maxFileSize = filesize(p.maxFileSize ?? 0, {
    base: 2,
    standard: 'jedec',
  })

  const maxFileSizeString = `Max file size: ${maxFileSize}`

  return (
    <div className='flex w-full cursor-pointer flex-col items-center p-3 pt-5 text-sm'>
      <UploadCloud />
      <span>Click to upload {!isMobile && 'or drag and drop'}</span>
      <div className='align-middle text-sm opacity-60'>
        {p.supportedFilesText}
      </div>
      <div className='text-sm opacity-60'>{maxFileSizeString}</div>
    </div>
  )
}
