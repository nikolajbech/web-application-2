/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { Formik } from 'formik'
import { useCallback, useMemo } from 'react'
import { type z } from 'zod'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { Button } from '../ui/button'
import { type FieldProps } from './FieldProps'
import { Field } from './field'
import { getFields, getInitialValues } from './utils'

export type FormField = {
  key?: string
  label?: string // Will default to the key
  optional?: boolean
  hidden?: boolean
  description?: string
} & FieldProps

type Props<T> = {
  formFields: Record<keyof T, FormField>
  initialValues?: Partial<T>
  /** Zod schema for validation */
  validationSchema?: z.ZodObject<any>
  onSubmit: (validatedValues: Partial<T>) => void
  loading: boolean
}

export const EasyForm = <T,>(p: Props<T>) => {
  const initialValues = useMemo(
    () => getInitialValues(p.formFields, p.initialValues ?? {}),
    [p.formFields, p.initialValues],
  )

  const fields = useMemo(() => getFields(p.formFields), [p.formFields])

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
