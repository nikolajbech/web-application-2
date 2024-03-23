import { type FormikProps } from 'formik'
import { type InputProps } from '../ui/input'
import { type TextareaProps } from '../ui/textarea'
import type * as Yup from 'yup'
import { type ReactNode } from 'react'

export type FieldProps<T> =
  | InputField
  | TextAreaField
  | RadioButtonsField
  | CheckBoxesField
  | SimpleSelectField
  | CustomField<T>

export type Options = {
  label: string
  value: string
}

type YupValidation = (yup: typeof Yup) => Yup.StringSchema

type InputField = {
  type: 'input'
  validate?: YupValidation
} & InputProps

type TextAreaField = {
  type: 'textarea'
  validate?: YupValidation
} & TextareaProps

type RadioButtonsField = {
  type: 'radio-buttons'
  options: Options[]
}

type CheckBoxesField = {
  type: 'checkboxes'
  options: Options[]
}

type SimpleSelectField = {
  type: 'simple-select'
  options: Options[]
}

type CustomField<T> = {
  type: 'custom'
  render: ({ formik }: { formik: FormikProps<Partial<T>> }) => ReactNode
  validate?: YupValidation
}
