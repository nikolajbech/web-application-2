'use client'

import { EasyForm } from './easy-form'

export const FormExample = () => {
  return (
    <div className=''>
      <EasyForm<{
        name: string
        description: string
        email: string
        selectOption: string
        selectMultipleOptions: string[]
      }>
        formFields={{
          name: { type: 'input' },
          description: { type: 'textarea' },
          email: { type: 'input', validate: (yup) => yup.string().email() },
          selectOption: {
            type: 'radio-buttons',
            options: [
              { label: 'Option 1', value: '1' },
              { label: 'Option 2', value: '2' },
            ],
          },
          selectMultipleOptions: {
            type: 'checkboxes',
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
