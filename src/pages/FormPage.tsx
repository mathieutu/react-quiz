import React, { useState } from 'react'
import { RiPushpin2Fill } from 'react-icons/all'
import { useMutation } from '@apollo/client'
import { Question } from '../component/Question'
import { NEW_ANSWER_QUERY } from '../utils/queries'
import { ErrorAlert } from '../component/ErrorAlert'
import { ProgressTimer } from '../component/ProgressTimer'
import { useUser } from '../context/UserContext'
import { useQuiz } from '../context/QuizContext'

export const FormPage = () => {
  const [error, setError] = useState<string | null>(null)
  const [addAnswer, { loading }] = useMutation(NEW_ANSWER_QUERY)

  const { user } = useUser()
  const { currentQuestion, currentQuestionIndex, goToNextQuestion, questionsQuantity } = useQuiz()

  const handleNext = (userAnswers: string[]) => {
    addAnswer({
      variables: {
        answer: JSON.stringify(userAnswers),
        questionId: currentQuestion.id,
        userId: user!.id,
      },
    })
      .then(goToNextQuestion)
      .catch(e => setError(e.message))
  }

  return (
    <div className="m-10 w-full">
      <ProgressTimer />
      <div className="text-right italic text-lg flex justify-end">
        <div className="my-auto">
          Question {currentQuestionIndex + 1}/{questionsQuantity}
        </div>
        <RiPushpin2Fill className="my-auto ml-2" />
      </div>
      <Question key={currentQuestion.id} question={currentQuestion} loading={loading} onNext={handleNext} />
      <ErrorAlert>{error}</ErrorAlert>
    </div>
  )
}
