import React, { useState } from 'react'
import { Question } from '../component/Question'
import { RiPushpin2Fill } from 'react-icons/all'
import { useMutation } from '@apollo/client'
import { NEW_ANSWER_QUERY } from '../utils/queries'
import Error from '../component/Error'
import { ProgressTimer } from '../component/ProgressTimer'
import { useUser } from '../context/UserContext'
import { useQuiz } from '../context/QuizContext'

export const FormPage = () => {
  const [error, setError] = useState<string | null>(null)
  const [addAnswer, { loading }] = useMutation(NEW_ANSWER_QUERY)

  const { user } = useUser()
  const { currentQuestion, currentQuestionIndex, goToNextQuestion, questions } = useQuiz()

  const handleNext = (userAnswers: string[]) => {
    addAnswer({
      variables: {
        answer: JSON.stringify(userAnswers),
        questionId: currentQuestion.id,
        userId: user!.id,
      },
    })
      .then(goToNextQuestion)
      .catch((e) => {
        console.error(e)
        setError(e.message)
      })
  }

  return (
    <div className="m-10 w-full">
      <ProgressTimer />
      <div className="text-right italic text-lg flex justify-end">
        <div className='my-auto'>Question {currentQuestionIndex + 1}/{questions.length}</div>
        <RiPushpin2Fill className="my-auto ml-2" />
      </div>
      <Question key={currentQuestion.id} question={currentQuestion} loading={loading} onNext={handleNext} />
      {error ? <Error text={error} /> : null}
    </div>
  )
}
