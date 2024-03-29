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
        simpleSelect: string
        customerField: string
      }>
        formFields={{
          name: { type: 'input', helpText: 'This is some help text' },
          description: { type: 'textarea', optional: true },
          email: {
            type: 'input',
            label: 'Email address',
            validate: (yup) => yup.string().required().email(),
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
          simpleSelect: {
            type: 'simple-select',
            options: [
              { label: 'Option 1 - more info here - longer text', value: '1' },
              { label: 'Option 2', value: '2' },
            ],
          },
          customerField: {
            type: 'custom',
            render: ({ value, onChange }) => (
              <div>
                <input
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                />
              </div>
            ),
          },
        }}
        initialValues={{
          name: 'Lars',
          selectMultipleOptions: ['2'],
        }}
        onSubmit={(validated) => alert(JSON.stringify(validated))}
        loading={false}
      />
    </div>
  )
}
