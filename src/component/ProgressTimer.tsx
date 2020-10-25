import React, { useEffect } from 'react'
import { ProgressBar } from './ProgressBar'
import { useQuiz } from '../context/QuizContext'
import { useReRenderComponent } from '../utils/hooks'

export const ProgressTimer = () => {
  const { endsAt, startedAt, setCurrentQuestionIndex, questionsQuantity } = useQuiz()

  const reRender = useReRenderComponent()

  useEffect(() => {
    const timeInterval = setInterval(reRender, 1000)

    return () => clearInterval(timeInterval)
  }, [reRender])

  const hasTimedOut = Date.now() >= endsAt!

  useEffect(() => {
    if (hasTimedOut) {
      setCurrentQuestionIndex(questionsQuantity)
    }
  }, [hasTimedOut, questionsQuantity, setCurrentQuestionIndex])

  return (
    <ProgressBar min={startedAt!} max={endsAt!} currentValue={Date.now()} />
  )
}
