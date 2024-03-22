'use client'

import autoAnimate from '@formkit/auto-animate'
import { type FormikProps } from 'formik'
import { omit } from 'lodash'
import { useCallback, useEffect, useRef } from 'react'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { type FormField } from './index'
import { RadioButtons } from './radio-buttons'
import { Label } from '../ui/label'
import { Checkboxes } from './checkboxes'

export const Field = <T,>({
  field,
  formik,
}: {
  field: FormField
  formik: FormikProps<Partial<T>>
}) => {
  const parent = useRef(null)

  useEffect(() => {
    parent.current && autoAnimate(parent.current)
  }, [parent])

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
      'validate',
    ]) as Record<string, unknown>
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
          value={value as string}
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
        <Checkboxes
          options={field.options}
          onChange={(values) => {
            handleChange({
              target: {
                name: key,
                value: values,
              },
            })
          }}
          values={value as string[]}
        />
      ) : null}
      <div className='overflow-hidden text-sm text-red-500' ref={parent}>
        {errorMessage && <div className='mt-1'>{errorMessage}</div>}
      </div>
    </div>
  )
}
