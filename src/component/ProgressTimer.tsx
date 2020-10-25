import React, { useEffect } from 'react'
import { ProgressBar } from './ProgressBar'
import { useQuiz } from '../context/QuizContext'
import { useReRenderComponent } from '../utils/hooks'

export const ProgressTimer = () => {

  const { duration, startedAt } = useQuiz()

  const reRender = useReRenderComponent()

  useEffect(() => {
    const timeInterval = setInterval(reRender, 1000)

    return () => clearInterval(timeInterval)
  }, [reRender])

  const quantityOfSecondSinceStart = Math.trunc((Date.now() - startedAt!) / 1000)

  return (
    <ProgressBar max={duration} currentValue={quantityOfSecondSinceStart} />
  )
}
