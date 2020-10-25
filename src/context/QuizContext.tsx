import { useAndAssertContext, useLocalStorageState } from '../utils/hooks'
import React, { ReactNode } from 'react'
import { QUESTIONS } from '../quizConfiguration'

export type PossibleAnswer = {
  key: string,
  text: string
};

export type Question = {
  content: ReactNode,
  id: string,
  possibleAnswers: PossibleAnswer[]
}

type QuizContext = {
  startedAt: number | null,
  currentQuestionIndex: number,
  currentQuestion: Question,
  questions: Question[]
  startQuiz: () => void,
  goToNextQuestion: () => void,
  goToPreviousQuestion: () => void,
}

const quizContext = React.createContext<QuizContext | undefined>(undefined)

type ChildrenProps = { children: ReactNode }

export const QuizProvider = ({ children }: ChildrenProps) => {
  const [startedAt, setStartedAt] = useLocalStorageState<number | null>('startedAt', null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useLocalStorageState<number>('currentQuestionId', 0)

  const context: QuizContext = {
    startedAt,
    currentQuestionIndex,
    currentQuestion: QUESTIONS[currentQuestionIndex],
    questions: QUESTIONS,
    goToNextQuestion: () => setCurrentQuestionIndex(i => i + 1),
    goToPreviousQuestion: () => setCurrentQuestionIndex(i => i - 1),
    startQuiz: () => setStartedAt(Date.now()),
  }

  return <quizContext.Provider value={context} children={children} />
}

export const useQuiz = () => useAndAssertContext(quizContext)
