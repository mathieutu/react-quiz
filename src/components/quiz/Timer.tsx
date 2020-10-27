import React, { useEffect } from 'react'
import { useQuiz } from '../../context/QuizContext'
import { useReRenderComponent } from '../../utils/hooks'
import { formatIntervalForHuman } from '../../utils/dates'

export const Timer = () => {
  const { endsAt, setCurrentQuestionIndex, questionsQuantity } = useQuiz()

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

  return <span className="tabular-nums">{formatIntervalForHuman(Date.now(), endsAt!)} restantes</span>
}
