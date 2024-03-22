'use client'

import { Checkbox } from '../ui/checkbox'
import { Label } from '../ui/label'
import { type Options } from './FieldProps'

export const Checkboxes = (p: {
  options: Options[]
  onChange: ((values: string[]) => void) | undefined
  values: string[]
}) => {
  const onClick = (value: string) => {
    if (p.onChange) {
      p.onChange(
        p.values.includes(value)
          ? p.values.filter((v) => v !== value)
          : [...p.values, value],
      )
    }
  }

  return (
    <div className='mt-2 flex flex-col gap-2'>
      {p.options.map(({ value, label }, i) => (
        <div key={i} className='flex items-center space-x-2'>
          <Checkbox
            id={value}
            checked={p.values.includes(value)}
            onClick={() => onClick(value)}
          />
          <Label
            htmlFor={value}
            className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
          >
            {label}
          </Label>
        </div>
      ))}
    </div>
  )
}
