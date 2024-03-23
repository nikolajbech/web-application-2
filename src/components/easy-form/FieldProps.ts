import { type InputProps } from '../ui/input'
import { type TextareaProps } from '../ui/textarea'
import type * as Yup from 'yup'

export type FieldProps =
  | InputField
  | TextAreaField
  | RadioButtonsField
  | CheckBoxesField
  | SimpleSelectField

export type Options = {
  label: string
  value: string
}

type InputField = {
  type: 'input'
  validate?: (yup: typeof Yup) => Yup.StringSchema
} & InputProps

type TextAreaField = {
  type: 'textarea'
  validate?: (yup: typeof Yup) => Yup.StringSchema
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
