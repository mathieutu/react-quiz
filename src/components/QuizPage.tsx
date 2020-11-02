import React, { useEffect, useState } from 'react'
import { Question } from './quiz/Question'
import { ErrorAlert } from './ErrorAlert'
import { useQuiz } from '../context/QuizContext'
import { FormHeader } from './quiz/FormHeader'
import { useCurrentAnswers } from '../graphql'

export const QuizPage = () => {
  const { currentQuestion, goToNextQuestion, goToPreviousQuestion } = useQuiz()

  const [error, setError] = useState<string | null>(null)

  const { answers, setAnswers, submitAnswers, submitLoading, fetchLoading } = useCurrentAnswers()

  const handleNext = () => submitAnswers().catch(e => {
    // eslint-disable-next-line no-console
    console.error(e)
    setError(e.message)
  }).then(goToNextQuestion)
  const handlePrevious = () => submitAnswers().catch(e => {
    // eslint-disable-next-line no-console
    console.error(e)
    setError(e.message)
  }).then(goToPreviousQuestion)

  useEffect(() => {
    if (submitLoading || fetchLoading) {
      setError(null)
    }
  }, [fetchLoading, submitLoading])

  return (
    <>
      <FormHeader loading={submitLoading} onNext={handleNext} onPrevious={handlePrevious} />
      <main className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-8">
        <ErrorAlert>{error}</ErrorAlert>
        <div className="bg-white overflow-hidden shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-8">
            <Question key={currentQuestion.id} question={currentQuestion} onAnswersChange={setAnswers} answers={answers} />
          </div>
        </div>
      </main>
    </>
  )
}
