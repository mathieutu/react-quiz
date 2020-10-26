import React, { useEffect, useState } from 'react'
import { useLazyQuery, useMutation } from '@apollo/client'
import { Question } from '../component/Question'
import { ErrorAlert } from '../component/ErrorAlert'
import { useUser } from '../context/UserContext'
import { useQuiz } from '../context/QuizContext'
import { ANSWER_QUERY, NEW_ANSWER_MUTATION } from '../utils/queries'
import { FormHeader } from '../component/FormHeader'

export const FormPage = () => {
  const { user } = useUser()
  const { currentQuestion, goToNextQuestion, goToPreviousQuestion } = useQuiz()

  const [error, setError] = useState<string | null>(null)
  const [userAnswers, setUserAnswers] = useState<string[]>([])

  const [fetchAnswers, { data }] = useLazyQuery(ANSWER_QUERY, { fetchPolicy: 'network-only' })

  useEffect(() => {
    fetchAnswers({
      variables: {
        questionId: currentQuestion.id,
        userId: user!.id,
      },
    })
  }, [currentQuestion.id, fetchAnswers, user])

  useEffect(() => {
    setUserAnswers(data?.answers[0].answer ? JSON.parse(data.answers[0].answer) : [])
  }, [data?.answers])

  const [addAnswer, { loading }] = useMutation(NEW_ANSWER_MUTATION)

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
              <Question key={currentQuestion.id} question={currentQuestion} onAnswersChange={setUserAnswers} answers={userAnswers} />
              <ErrorAlert>{error}</ErrorAlert>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
