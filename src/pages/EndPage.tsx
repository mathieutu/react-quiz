import React from 'react'
import Button from '../component/Button'
import { useQuiz } from '../context/QuizContext'


const Message = () => {
  const { startedAt, duration } = useQuiz()

  if (Date.now() >= startedAt! + duration * 1000) {
    return <>Le temps est écoulé, les réponses envoyées ont bien été enregistrées.</>
  }

  return <>Merci, les réponses ont été enregistrées.</>
}
export const EndPage = () => {

  const handleQuit = () => {
    localStorage.clear()
    window.location.reload()
  }

  return (
    <div className="mx-auto my-10 text-lg flex flex-col items-center justify-center">
      <div className="text-2xl text-center">
        <Message />
      </div>
      <div className="mt-10 text-lg text-center">
        <Button onClick={handleQuit} text='Bye bye' />
      </div>
    </div>
  )
}
