import { type FormField } from '.'

export const getInitialValues = <T>(
  formFields: Record<keyof T, FormField>,
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

export const getFields = <T>(formFields: Record<keyof T, FormField>) =>
  Object.keys(formFields)
    .map((key) => {
      const field = formFields[key as keyof T]

      return {
        key,
        label: field.label ?? keyToLabel(key),
        ...field,
      }
    })
    .filter((field) => !field.hidden)
