/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { Formik } from 'formik'
import { useCallback, useMemo } from 'react'
import { type z } from 'zod'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { Button } from '../ui/button'
import { type InputProps } from '../ui/input'
import { type TextareaProps } from '../ui/textarea'
import { Field } from './field'

export type FormField = {
  key?: string
  label?: string // Will default to the key
  optional?: boolean
  hidden?: boolean
  description?: string
} & (InputField | TextAreaField | RadioButtonsField | CheckBoxesField)

export type Options = {
  label: string
  value: string
}

type InputField = {
  type: 'input'
} & InputProps

type TextAreaField = {
  type: 'textarea'
} & TextareaProps

type RadioButtonsField = {
  type: 'radio-buttons'
  options: Options[]
}

type CheckBoxesField = {
  type: 'checkboxes'
  options: Options[]
}

type Props<T> = {
  formFields: Record<keyof T, FormField>
  initialValues?: Partial<T>
  /** Zod schema for validation */
  validationSchema?: z.ZodObject<any>
  onSubmit: (validatedValues: Partial<T>) => void
  loading: boolean
}

export const EasyForm = <T,>(p: Props<T>) => {
  const keyToLabel = (key: string) => {
    const withSpaces = key.replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    return withSpaces[0]?.toLocaleUpperCase() + withSpaces.slice(1)
  }

  const initialValues = useMemo(
    // Initialize with empty values
    () =>
      Object.keys(p.formFields).reduce((acc, key) => {
        const field = p.formFields[key as keyof T]
        const initialValue = p.initialValues?.[key as keyof T]

        if (field.type === 'checkboxes') {
          return {
            ...acc,
            [key]: initialValue ?? [],
          }
        }

        return {
          ...acc,
          [key]: initialValue ?? '',
        }
      }, {} as Partial<T>),
    [p.formFields, p.initialValues],
  )

  const fields = useMemo(
    () =>
      Object.keys(p.formFields).map((key) => {
        const field = p.formFields[key as keyof T]

        return {
          key,
          label: field.label ?? keyToLabel(key),
          ...field,
        }
      }),
    [p.formFields],
  ).filter((field) => !field.hidden)

  const validate = useCallback(
    () =>
      p.validationSchema ? toFormikValidationSchema(p.validationSchema) : {},
    [p.validationSchema],
  )

  return (
    <div className=''>
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={p.onSubmit}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <div className='flex flex-col gap-3'>
              {fields.map((field, i) => (
                <Field<T> key={i} field={field} formik={formik} />
              ))}
            </div>
            <Button
              type='submit'
              className='mt-8'
              disabled={formik.isSubmitting}
            >
              Submit
            </Button>
          </form>
        )}
      </Formik>
    </div>
  )
}
