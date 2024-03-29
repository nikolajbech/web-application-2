import { FormExample } from '@/components/form-example'

export const metadata = {
  title: 'Home',
}

export default async function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center'>
      Template
      <FormExample />
    </main>
  )
}
