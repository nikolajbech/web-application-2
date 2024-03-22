import { type InputProps } from '../ui/input'
import { type TextareaProps } from '../ui/textarea'

export type FieldProps =
  | InputField
  | TextAreaField
  | RadioButtonsField
  | CheckBoxesField

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
