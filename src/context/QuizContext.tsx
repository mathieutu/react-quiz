import React, { ReactNode } from 'react'
import { useAndAssertContext, useLocalStorageState } from '../utils/hooks'
import { DURATION, Question, QUESTIONS } from '../quizConfiguration'

type QuizContext = {
  startedAt: number | null,
  duration: number,
  startQuiz: () => void,

  currentQuestionIndex: number,
  currentQuestion: Question,
  questions: Question[]
  goToNextQuestion: () => void,
  goToPreviousQuestion: () => void,
  setCurrentQuestionIndex: (index: number) => void,
}

const quizContext = React.createContext<QuizContext | undefined>(undefined)

type ChildrenProps = { children: ReactNode }

export const QuizProvider = ({ children }: ChildrenProps) => {
  const [startedAt, setStartedAt] = useLocalStorageState<number | null>('startedAt', null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useLocalStorageState<number>('currentQuestionId', 0)

  const context: QuizContext = {
    startedAt,
    duration: DURATION,
    startQuiz: () => setStartedAt(Date.now()),

    currentQuestionIndex,
    currentQuestion: QUESTIONS[currentQuestionIndex],
    questions: QUESTIONS,
    setCurrentQuestionIndex,
    goToNextQuestion: () => setCurrentQuestionIndex(i => i + 1),
    goToPreviousQuestion: () => setCurrentQuestionIndex(i => i - 1),
  }

  return <quizContext.Provider value={context}>{children}</quizContext.Provider>
}

export const useQuiz = () => useAndAssertContext(quizContext)
