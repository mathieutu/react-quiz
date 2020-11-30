import React, { ReactNode } from 'react'
import { useAndAssertContext, useLocalStorageState } from '../utils/hooks'
import { DURATION, Question, QUESTIONS } from '../configuration'
import { sortRandom } from '../utils/misc'

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
  const [currentQuestionIndex, setCurrentQuestionIndex] = useLocalStorageState('currentQuestionId', 0)
  const [isDev] = useLocalStorageState('dev', process.env.NODE_ENV !== 'production')
  const [questionsOrder] = useLocalStorageState('questions', () => {
    const ids = QUESTIONS.map(({ id }) => id)

    return isDev ? ids : sortRandom(ids)
  })

  const currentQuestionId = questionsOrder[currentQuestionIndex]
  const currentQuestion = QUESTIONS.find(({ id }) => id === currentQuestionId)!

  const context: QuizContext = {
    startedAt,
    endsAt: startedAt && startedAt + DURATION * 1000,
    startQuiz: () => {
      setCurrentQuestionIndex(0)
      setStartedAt(Date.now())
    },

    currentQuestionIndex,
    currentQuestion,
    questionsQuantity: QUESTIONS.length,
    setCurrentQuestionIndex,
    goToNextQuestion: () => setCurrentQuestionIndex(i => i + 1),
    goToPreviousQuestion: () => setCurrentQuestionIndex(i => i - 1),
  }

  return <quizContext.Provider value={context}>{children}</quizContext.Provider>
}

export const useQuiz = () => useAndAssertContext(quizContext)
