import React, { useEffect } from 'react'
import { ProgressBar } from './ProgressBar'
import { useQuiz } from '../context/QuizContext'
import { useReRenderComponent } from '../utils/hooks'

export const ProgressTimer = () => {
  const { duration, startedAt, setCurrentQuestionIndex, questions } = useQuiz()

  const reRender = useReRenderComponent()

  useEffect(() => {
    const timeInterval = setInterval(reRender, 1000)

    return () => clearInterval(timeInterval)
  }, [reRender])

  const quantityOfSecondSinceStart = Math.trunc((Date.now() - startedAt!) / 1000)

  useEffect(() => {
    if (quantityOfSecondSinceStart >= duration) {
      setCurrentQuestionIndex(questions.length)
    }
  }, [quantityOfSecondSinceStart, duration, questions.length, setCurrentQuestionIndex])

  return (
    <ProgressBar max={duration} currentValue={quantityOfSecondSinceStart} />
  )
}
