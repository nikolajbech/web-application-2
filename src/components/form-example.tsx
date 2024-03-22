'use client'

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
          email: { type: 'input', validate: (yup) => yup.string().email() },
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
      />
    </div>
  )
}
