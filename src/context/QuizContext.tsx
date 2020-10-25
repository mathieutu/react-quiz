import { useAndAssertContext, useLocalStorageState } from '../utils/hooks'
import React, { ReactNode } from 'react'
import { DURATION, QUESTIONS } from '../quizConfiguration'

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
  duration: number,
  startQuiz: () => void,

  currentQuestionIndex: number,
  currentQuestion: Question,
  questions: Question[]
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
    duration: DURATION,
    startQuiz: () => setStartedAt(Date.now()),

    currentQuestionIndex,
    currentQuestion: QUESTIONS[currentQuestionIndex],
    questions: QUESTIONS,
    goToNextQuestion: () => setCurrentQuestionIndex(i => i + 1),
    goToPreviousQuestion: () => setCurrentQuestionIndex(i => i - 1),
  }

  return <quizContext.Provider value={context} children={children} />
}

export const useQuiz = () => useAndAssertContext(quizContext)
