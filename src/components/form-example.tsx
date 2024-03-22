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
        selectOption: string
      }>
        formFields={{
          name: { type: 'input' },
          age: { type: 'input' },
          email: { type: 'input' },
          selectOption: {
            type: 'radio-buttons',
            options: [
              { label: 'Option 1', value: '1' },
              { label: 'Option 2', value: '2' },
            ],
          },
        }}
        initialValues={{
          name: 'Lars',
        }}
        onSubmit={(validated) => alert(validated)}
        loading={false}
        validationSchema={z.object({
          email: z.string().email(),
        })}
      />
    </div>
  )
}
