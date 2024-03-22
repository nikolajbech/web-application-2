'use client'

import { type FormikProps } from 'formik'
import { omit } from 'lodash'
import { useCallback } from 'react'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { type FormField } from './index'
import { RadioButtons } from './radio-buttons'
import { Label } from '../ui/label'

export const Field = <T,>({
  field,
  formik,
}: {
  field: FormField
  formik: FormikProps<Partial<T>>
}) => {
  const key = field.key as keyof T

  const errors = formik.errors[key]
  const touched = formik.touched[key]
  const value = formik.values[key]

  const { handleChange, handleBlur } = formik

  const errorMessage = errors && touched ? errors.toLocaleString() : undefined

  const attributes = {
    name: key as string,
    value: value as string,
    onChange: handleChange,
    onBlur: handleBlur,
  }

  const fieldSpecificAttributes = useCallback((field: FormField) => {
    return omit(field, [
      'key',
      'label',
      'optional',
      'hidden',
      'description',
      'type',
    ])
  }, [])

  return (
    <div>
      <Label>{field.label}</Label>
      {field.type === 'input' ? (
        <Input {...attributes} {...fieldSpecificAttributes(field)} />
      ) : field.type === 'textarea' ? (
        <Textarea {...attributes} {...fieldSpecificAttributes(field)} />
      ) : field.type === 'radio-buttons' ? (
        <RadioButtons
          options={field.options}
          defaultValue={value as string}
          onChange={(value) => {
            handleChange({
              target: {
                name: key,
                value,
              },
            })
          }}
        />
      ) : field.type === 'checkboxes' ? (
        <Textarea {...attributes} {...fieldSpecificAttributes(field)} />
      ) : null}
      <div className='text-sm text-red-500'>{errorMessage}</div>
    </div>
  )
}
