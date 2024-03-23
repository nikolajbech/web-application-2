'use client'

import { animated, useTransition } from '@react-spring/web'
import { type FormikProps } from 'formik'
import { omit } from 'lodash'
import { useCallback } from 'react'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { Checkboxes } from './checkboxes'
import { type ComputedFormField, type FormField } from './index'
import { RadioButtons } from './radio-buttons'
import { SimpleSelect } from './simple-select'

export const Field = <T,>({
  field,
  formik,
}: {
  field: ComputedFormField<T>
  formik: FormikProps<Partial<T>>
}) => {
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

  const fieldSpecificAttributes = useCallback((field: FormField<T>) => {
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

  const transition = useTransition(errorMessage, {
    from: { opacity: 0, height: 0 },
    enter: { opacity: 1, height: 16 },
    leave: { opacity: 0, height: 0 },
  })

  return (
    <div>
      <Label>
        {field.label}
        {!field.optional && ' *'}
      </Label>

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

      {field.type === 'simple-select' && (
        <SimpleSelect
          options={field.options}
          value={value as string}
          onChange={handleValueChange}
        />
      )}

      {field.type === 'custom' && <div>{field.render({ formik })}</div>}

      {field.helpText && (
        <div className='mt-1 text-sm opacity-60'>{field.helpText}</div>
      )}

      <div className='mt-1'>
        {transition((style) => (
          <animated.div style={{ ...style }}>
            <div className='text-sm text-red-500'>{errorMessage}</div>
          </animated.div>
        ))}
      </div>
    </div>
  )
}
