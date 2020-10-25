import React, { useEffect, useState } from 'react'
import { QCM, QCM_TIME } from '../Data'
import DisplayQuestion from '../component/DisplayQuestion'
import { UserAnswer } from '../type/UserAnswer'
import { useSession } from '../context/SessionContext'
import EndPage from './EndPage'
import { RiPushpin2Fill } from 'react-icons/all'
import { useMutation } from '@apollo/client'
import { NEW_ANSWER_QUERY } from '../utils/queries'
import ErrorDiv from '../component/ErrorDiv'
import ProgressTimer from '../component/ProgressTimer'

export enum FORM_STATE {
  NOT_STARTED,
  PROCESSING,
  ENDED,
  TIMED_OUT
}

export default function FormPage() {
  const session = useSession()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(session.state.formStep ? session.state.formStep : 0)
  const [formState, setFormState] = useState<number>(session.state.formState > FORM_STATE.PROCESSING ? session.state.formState : FORM_STATE.PROCESSING)
  const [error, setError] = useState<string | null>(null)
  const [addAnswer, { loading }] = useMutation(NEW_ANSWER_QUERY)

  const handleNext = (userAnswer: UserAnswer) => {
    addAnswer({
      variables: {
        answer: JSON.stringify(userAnswer.answers),
        questionId: userAnswer.questionId,
        userId: session.state.user!.id,
      },
    }).then(({ data }) => {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }).catch((e) => {
      console.log(e)
      setError(e.message)
    })
  }

  const checkCurrentTimer = (timer: number) => {
    if (timer >= QCM_TIME && session.state.formState === FORM_STATE.PROCESSING) {
      setFormState(FORM_STATE.TIMED_OUT)
      setCurrentQuestionIndex(QCM.length + 1)
    }
  }

  useEffect(() => {
    session.update((prevState => {
      return { ...prevState, formStep: currentQuestionIndex }
    }))
    if (currentQuestionIndex === QCM.length) {
      setFormState(FORM_STATE.ENDED)
    }
  }, [currentQuestionIndex])

  useEffect(() => {
    session.update((prevState => {
      return { ...prevState, formState }
    }))
  }, [formState])

  return (
    <div className="m-10 w-full">
      {(formState !== FORM_STATE.ENDED && formState !== FORM_STATE.TIMED_OUT) && QCM[currentQuestionIndex] !== undefined ? (
        <>
          <ProgressTimer checkTimer={checkCurrentTimer} />
          <div className="text-right italic text-lg flex justify-end">
            <div className='my-auto'>Question {currentQuestionIndex + 1}/{QCM.length}</div>
            <RiPushpin2Fill className="my-auto ml-2" />
          </div>
          <DisplayQuestion question={QCM[currentQuestionIndex]} loading={loading} onNext={handleNext} />
          {error ? <ErrorDiv text={error} /> : null}
        </>
      ) : (
        <EndPage />
      )}
    </div>
  )
}
