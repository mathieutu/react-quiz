import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { Question } from '../component/Question'
import { ErrorAlert } from '../component/ErrorAlert'
import { useUser } from '../context/UserContext'
import { useQuiz } from '../context/QuizContext'
import { NEW_ANSWER_MUTATION } from '../utils/queries'
import { FormHeader } from '../component/FormHeader'

export const FormPage = () => {
  const [error, setError] = useState<string | null>(null)
  const [addAnswer, { loading }] = useMutation(NEW_ANSWER_MUTATION)

  const { user } = useUser()
  const { currentQuestion, goToNextQuestion, goToPreviousQuestion } = useQuiz()
  const [userAnswers, setUserAnswers] = useState<string[]>([])

  const submitAnswers = () => (
    addAnswer({
      variables: {
        answer: JSON.stringify(userAnswers),
        questionId: currentQuestion.id,
        userId: user!.id,
      },
    }).catch(e => setError(e.message))
  )

  const handleNext = () => submitAnswers().then(goToNextQuestion)
  const handlePrevious = () => submitAnswers().then(goToPreviousQuestion)

  return (
    <>
      <FormHeader onPrevious={handlePrevious} loading={loading} onNext={handleNext} />
      <main>
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-8">
          <div className="bg-white overflow-hidden shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-8">
              <Question key={currentQuestion.id} question={currentQuestion} onAnswersChange={setUserAnswers} />
              <ErrorAlert>{error}</ErrorAlert>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
