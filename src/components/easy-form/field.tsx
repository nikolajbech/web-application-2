'use client'

import { type FormikProps } from 'formik'
import { type FormField } from './index'
import { Input } from '../ui/input'

export const Field = <T,>({
  field,
  formik,
}: {
  field: FormField
  formik: FormikProps<Partial<T>>
}) => {
  if (!field.key) return null
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

  return (
    <div>
      <b>{field.label}</b>
      {field.type === 'input' ? <Input type='text' {...attributes} /> : null}
      <div className='text-sm text-red-500'>{errorMessage}</div>
    </div>
  )
}
