import { useAndAssertContext, useLocalStorageState } from '../utils/hooks'
import React, { ReactNode } from 'react'

type QuizContext = {
  startedAt: number | null,
  currentQuestionId: string | null,
  startQuiz: () => void,
  setCurrentQuestionId: (questionId: string) => void,
}

const quizContext = React.createContext<QuizContext | undefined>(undefined)

type ChildrenProps = { children: ReactNode }

export const QuizProvider = ({ children }: ChildrenProps) => {
  const [startedAt, setStartedAt] = useLocalStorageState<number | null>('startedAt', null)
  const [currentQuestionId, setCurrentQuestionId] = useLocalStorageState<string | null>('currentQuestionId', null)

  const context: QuizContext = {
    startedAt,
    currentQuestionId,
    setCurrentQuestionId,
    startQuiz: () => setStartedAt(Date.now()),
  }

  return <quizContext.Provider value={context} children={children} />
}

export const useQuiz = () => useAndAssertContext(quizContext)
