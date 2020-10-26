import React, { useState } from 'react'
import { Question } from '../component/Question'
import { ErrorAlert } from '../component/ErrorAlert'
import { useQuiz } from '../context/QuizContext'
import { FormHeader } from '../component/FormHeader'
import { useCurrentAnswers } from '../graphql'

export const FormPage = () => {
  const { currentQuestion, goToNextQuestion, goToPreviousQuestion } = useQuiz()

  const [error, setError] = useState<string | null>(null)

  const { answers, setAnswers, submitAnswers, submitLoading } = useCurrentAnswers()

  const handleNext = () => submitAnswers().catch(e => setError(e.message)).then(goToNextQuestion)
  const handlePrevious = () => submitAnswers().catch(e => setError(e.message)).then(goToPreviousQuestion)

  return (
    <>
      <FormHeader loading={submitLoading} onNext={handleNext} onPrevious={handlePrevious} />
      <main>
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-8">
          <div className="bg-white overflow-hidden shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-8">
              <Question key={currentQuestion.id} question={currentQuestion} onAnswersChange={setAnswers} answers={answers} />
              <ErrorAlert>{error}</ErrorAlert>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
