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
          name: { type: 'input', helpText: 'This is some help text' },
          description: { type: 'textarea' },
          email: {
            helpText: 'Write you email with an @',
            type: 'input',
            validate: (yup) => yup.string().email(),
          },
          selectOption: {
            type: 'radio-buttons',
            options: [
              { label: 'Option 1', value: '1' },
              { label: 'Option 2', value: '2' },
            ],
          },
          selectMultipleOptions: {
            type: 'checkboxes',
            description:
              'This is a description. A description is a description.',
            helpText: 'This is some help text',
            options: [
              { label: 'Option 1', value: '1' },
              { label: 'Option 2', value: '2' },
            ],
          },
        }}
        initialValues={{
          name: 'Lars',
          selectOption: '1',
          selectMultipleOptions: ['2'],
        }}
        onSubmit={(validated) => alert(JSON.stringify(validated))}
        loading={false}
      />
    </div>
  )
}
