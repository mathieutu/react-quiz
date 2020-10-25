import React, { ReactNode } from 'react'
import { useAndAssertContext, useLocalStorageState } from '../utils/hooks'
import { DURATION, Question, QUESTIONS } from '../configuration'

type QuizContext = {
  startedAt: number | null,
  endsAt: number | null,
  startQuiz: () => void,

  currentQuestionIndex: number,
  currentQuestion: Question,
  questionsQuantity: number
  goToNextQuestion: () => void,
  goToPreviousQuestion: () => void,
  setCurrentQuestionIndex: (index: number) => void,
}

const quizContext = React.createContext<QuizContext | undefined>(undefined)

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [startedAt, setStartedAt] = useLocalStorageState<number | null>('startedAt', null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useLocalStorageState<number>('currentQuestionId', 0)

  const context: QuizContext = {
    startedAt,
    endsAt: startedAt && startedAt + DURATION * 1000,
    startQuiz: () => {
      setCurrentQuestionIndex(0)
      setStartedAt(Date.now())
    },

    currentQuestionIndex,
    currentQuestion: QUESTIONS[currentQuestionIndex],
    questionsQuantity: QUESTIONS.length,
    setCurrentQuestionIndex,
    goToNextQuestion: () => setCurrentQuestionIndex(i => i + 1),
    goToPreviousQuestion: () => setCurrentQuestionIndex(i => i - 1),
  }

  return <quizContext.Provider value={context}>{children}</quizContext.Provider>
}

export const useQuiz = () => useAndAssertContext(quizContext)
