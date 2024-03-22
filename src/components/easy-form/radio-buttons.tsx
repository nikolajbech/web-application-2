'use client'

import { Label } from '../ui/label'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { type Options } from './FieldProps'

export const RadioButtons = (p: {
  options: Options[]
  onChange: ((value: string) => void) | undefined
  value: string
}) => {
  return (
    <RadioGroup
      onValueChange={p.onChange}
      defaultValue={p.value}
      className='mt-2'
    >
      {p.options.map(({ value, label }, i) => (
        <div key={i} className='flex items-center space-x-2'>
          <RadioGroupItem value={value} id={`r${i}`} />
          <Label htmlFor={`r${i}`}>{label}</Label>
        </div>
      ))}
    </RadioGroup>
  )
}
