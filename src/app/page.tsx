import { FileUploader } from '@/components/file-uploader'
import { SimpleConfirmAlert } from '@/components/simple-confirm-alert'
import { Button } from '@/components/ui/button'
import { FormExample } from '@/components/form-example'

export default async function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center'>
      <div className='w-96'>
        <FileUploader className='mb-2' fileItems={[]} />
        <FormExample />
        <SimpleConfirmAlert>
          <Button>Open</Button>
        </SimpleConfirmAlert>
      </div>
    </main>
  )
}
