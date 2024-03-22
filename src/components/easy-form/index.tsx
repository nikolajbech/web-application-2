/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { Formik } from 'formik'
import { useCallback, useMemo } from 'react'
import * as Yup from 'yup'
import {
  type ArraySchema,
  type BooleanSchema,
  type DateSchema,
  type NumberSchema,
  type ObjectSchema,
  type StringSchema,
} from 'yup'
import { Button } from '../ui/button'
import { type FieldProps } from './FieldProps'
import { Field } from './field'
import { getFields, getInitialValues } from './utils'

type KeyOf<T> = Extract<keyof T, string>

export type EasyFormYup<T> = Partial<
  Record<
    KeyOf<T>,
    | BooleanSchema
    | StringSchema
    | NumberSchema
    | DateSchema
    | ArraySchema<any, any>
    | ObjectSchema<any>
  >
>

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
  yupSchema?: (yup: typeof Yup) => EasyFormYup<T>
  onSubmit: (validatedValues: Partial<T>) => void
  loading: boolean
}

export const EasyForm = <T,>(p: Props<T>) => {
  const initialValues = useMemo(
    () => getInitialValues(p.formFields, p.initialValues ?? {}),
    [p.formFields, p.initialValues],
  )

  const fields = useMemo(() => getFields(p.formFields), [p.formFields])

  const yupSchema = useCallback(() => p.yupSchema?.(Yup), [p.yupSchema])

  return (
    <div className=''>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object().shape(yupSchema as any)}
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
