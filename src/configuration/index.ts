import { ReactNode } from 'react'

export type Question = {
  id: string,
  title: ReactNode,
  possibleAnswers: { key: string, label: string }[]
}

export * from './react-master'
