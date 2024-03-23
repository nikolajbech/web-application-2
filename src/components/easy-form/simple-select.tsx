import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { type Options } from './FieldProps'

export const SimpleSelect = (p: {
  options: Options[]
  onChange: ((value: string) => void) | undefined
  value: string
}) => {
  return (
    <Select onValueChange={p.onChange} value={p.value}>
      <SelectTrigger className='w-full'>
        <SelectValue placeholder='Select' />
      </SelectTrigger>
      <SelectContent>
        {p.options.map(({ value, label }) => (
          <SelectItem key={value} value={label}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
