'use client'

import { FileUploader } from '@/components/file-uploader'
import { SimpleConfirmAlert } from '@/components/simple-confirm-alert'
import { Button } from '@/components/ui/button'
import { FormExample } from '@/components/form-example'
import { useState } from 'react'
import { type FileItem } from '@/components/file-uploader'

export default function Home() {
  const [files, setFiles] = useState<FileItem[]>([])

  return (
    <main className='flex min-h-screen flex-col items-center justify-center'>
      <div className='min-w-[400px] max-w-[400px]'>
        <FileUploader
          className='mb-2'
          fileItems={files}
          onChange={(files) => setFiles(files)}
          multiple
        />
        <FormExample />
        <SimpleConfirmAlert>
          <Button>Open</Button>
        </SimpleConfirmAlert>
      </div>
    </main>
  )
}
