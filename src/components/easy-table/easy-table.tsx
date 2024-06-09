import { type ReactNode } from 'react'

import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  Table as TablePrimitive,
  TableRow,
} from '@/components/ui/table'

export const EasyTable = <T, K extends keyof T>(p: {
  data?: T[]
  columns?: {
    key: K
    label: string
    render: (value: T[K], row: T) => ReactNode
  }[]
}) => {
  return (
    <TablePrimitive>
      <TableHeader>
        <TableRow>
          {p.columns?.map((column, key) => (
            <TableHead key={key}>{column.label}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {p.data?.map((row, i) => (
          <TableRow key={i}>
            {p.columns?.map((column, j) => (
              <TableCell key={j}>
                {column.render(row[column.key], row)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </TablePrimitive>
  )
}
