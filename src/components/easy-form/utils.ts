import { type ComputedFormField, type FormField } from '.'
import * as Yup from 'yup'

export const getInitialValues = <T>(
  formFields: Record<keyof T, FormField<T>>,
  initialValues: Partial<T>,
) =>
  Object.keys(formFields).reduce((acc, key) => {
    const field = formFields[key as keyof T]
    const initialValue = initialValues?.[key as keyof T]

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
  }, {} as Partial<T>)

const keyToLabel = (key: string) => {
  const withSpaces = key.replace(/([a-z0-9])([A-Z])/g, '$1 $2')
  return withSpaces[0]?.toLocaleUpperCase() + withSpaces.slice(1)
}

export const getFields = <T>(formFields: Record<keyof T, FormField<T>>) =>
  Object.keys(formFields)
    .map((key) => {
      const field = formFields[key as keyof T]

      return {
        key,
        label: field.label ?? keyToLabel(key),
        ...field,
      }
    })
    .filter((field) => !field.hidden) as ComputedFormField<T>[]

export const getValidationSchemaFromFields = <T>(
  formFields: ComputedFormField<T>[],
) =>
  formFields.reduce((acc, field) => {
    if (!field.key) return acc

    // Custom validation
    const validate = (field as { validate: (yup: typeof Yup) => Yup.AnySchema })
      .validate
    if (validate) {
      return { ...acc, [field.key]: validate(Yup).label(field.label) }
    }

    // Default validation
    if (!field.optional) {
      if (
        ['input', 'textarea', 'radio-buttons', 'simple-select'].includes(
          field.type,
        )
      ) {
        return {
          ...acc,
          [field.key]: Yup.string().required().label(field.label),
        }
      }
    }

    return acc
  }, {})

export const getFormValues = <T>(
  formFields: Record<keyof T, FormField<T>>,
  initialValues: Partial<T>,
) => {
  const _initialValues = getInitialValues(formFields, initialValues ?? {})
  const fields = getFields(formFields)
  const yupSchema = getValidationSchemaFromFields(fields)

  return {
    initialValues: _initialValues,
    fields,
    yupSchema,
  }
}
