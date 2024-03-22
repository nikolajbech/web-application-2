'use client'

import { z } from 'zod'
import { EasyForm } from './easy-form'

export const FormExample = () => {
  return (
    <div className=''>
      <EasyForm<{
        name: string
        age: number
        email: string
      }>
        formFields={{
          name: { label: 'Name', type: 'input' },
          age: { label: 'Age', type: 'input' },
          email: { label: 'Email', type: 'input' },
        }}
        onSubmit={(validated) => console.log(validated)}
        loading={false}
        validationSchema={z.object({})}
      />
    </div>
  )
}
