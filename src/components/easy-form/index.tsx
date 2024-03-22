'use client'
import { Formik } from 'formik'
import { useMemo } from 'react'
import * as Yup from 'yup'
import { Button } from '../ui/button'
import { type FieldProps } from './FieldProps'
import { Field } from './field'
import { getFormValues } from './utils'

export type FormField = {
  label?: string // Will default to the key
  optional?: boolean
  hidden?: boolean
  description?: string
  helpText?: string
} & FieldProps

export type ComputedFormField<T> = FormField & {
  key: keyof T
  label: string
}

type Props<T> = {
  formFields: Record<keyof T, FormField>
  initialValues?: Partial<T>
  onSubmit: (validatedValues: Partial<T>) => void
  loading: boolean
}

export const EasyForm = <T,>(p: Props<T>) => {
  const { initialValues, fields, yupSchema } = useMemo(
    () => getFormValues(p.formFields, p.initialValues ?? {}),
    [p.formFields, p.initialValues],
  )

  return (
    <div className=''>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object().shape(yupSchema)}
        onSubmit={p.onSubmit}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <div className='flex flex-col gap-5'>
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
