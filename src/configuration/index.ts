import { ReactNode } from 'react'

export type Question = {
  id: string,
  title: ReactNode,
  possibleAnswers: { key: string, label: string, disabled?: boolean }[]
}

// export * from './react-master'

export * from './example'
