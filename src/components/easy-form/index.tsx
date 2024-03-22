/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { Formik } from 'formik'
import { useCallback, useMemo } from 'react'
import { type z } from 'zod'
import { toFormikValidationSchema } from 'zod-formik-adapter'
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

type Options = {
  label: string
  value: string
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
    return key // Todo
  }

  const initialValues = useMemo(
    // Initialize with empty values
    () =>
      Object.keys(p.formFields).reduce((acc, key) => {
        const field = p.formFields[key as keyof T]

        if (field.type === 'checkboxes') {
          return {
            ...acc,
            [key]: [],
          }
        }

        return {
          ...acc,
          [key]: '',
        }
      }, {} as Partial<T>),
    [p.formFields],
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
        {/* {
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        } */}
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            {fields.map((field, i) => (
              <Field key={i} formik={formik} field={field} />
            ))}
            {/* 
            <input
              type='email'
              name='email'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            {errors.email && touched.email && errors.email}

            <input
              type='password'
              name='password'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            {errors.password && touched.password && errors.password}

            <button type='submit' disabled={isSubmitting}>
              Submit
            </button> */}
          </form>
        )}
      </Formik>
    </div>
  )
}
