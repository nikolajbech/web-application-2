'use client'

import autoAnimate from '@formkit/auto-animate'
import { type FormikProps } from 'formik'
import { omit } from 'lodash'
import { useCallback, useEffect, useRef } from 'react'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { type ComputedFormField, type FormField } from './index'
import { RadioButtons } from './radio-buttons'
import { Label } from '../ui/label'
import { Checkboxes } from './checkboxes'

export const Field = <T,>({
  field,
  formik,
}: {
  field: ComputedFormField<T>
  formik: FormikProps<Partial<T>>
}) => {
  const parent = useRef(null)

  useEffect(() => {
    parent.current && autoAnimate(parent.current)
  }, [parent])

  const { key } = field

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
      'helpText',
      'type',
      'validate',
    ]) as Record<string, unknown>
  }, [])

  const handleValueChange = (value: string | string[]) => {
    handleChange({
      target: {
        name: key,
        value,
      },
    })
  }

  return (
    <div>
      <Label>{field.label}</Label>

      {field.description && (
        <div className='mb-3 text-sm opacity-70'>{field.description}</div>
      )}

      {field.type === 'input' && (
        <Input {...attributes} {...fieldSpecificAttributes(field)} />
      )}

      {field.type === 'textarea' && (
        <Textarea {...attributes} {...fieldSpecificAttributes(field)} />
      )}

      {field.type === 'radio-buttons' && (
        <RadioButtons
          options={field.options}
          value={value as string}
          onChange={handleValueChange}
        />
      )}

      {field.type === 'checkboxes' && (
        <Checkboxes
          options={field.options}
          onChange={handleValueChange}
          values={value as string[]}
        />
      )}

      {field.helpText && (
        <div className='mt-1 text-sm opacity-60'>{field.helpText}</div>
      )}

      <div className='overflow-hidden text-sm text-red-500' ref={parent}>
        {errorMessage && <div className='mt-1'>{errorMessage}</div>}
      </div>
    </div>
  )
}
