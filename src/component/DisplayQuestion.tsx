import React, { ChangeEvent, useEffect, useState } from 'react'
import { Question } from '../type/Question'
import { removeFromArray } from '../functions'
import { UserAnswer } from '../type/UserAnswer'

type Props = {
  question: Question,
  onNext(userAnswer: UserAnswer): void,
  loading: boolean
}

export default function DisplayQuestion(props: Props) {
  const [userAnswer, setUserAnswer] = useState<Array<string>>([])

  useEffect(() => {
    setUserAnswer([])
  }, [props.question])

  const handleResponseChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value: string = e.currentTarget.value
    let newUserAnswer = userAnswer
    if (!newUserAnswer.includes(value)) {
      newUserAnswer.push(value)
    } else {
      newUserAnswer = removeFromArray(value, newUserAnswer)
    }
    setUserAnswer(newUserAnswer)
  }

  const answers = (
    <>
      {props.question.possibleAnswers.map((possibleAnswer) => {
        return (
          <div key={props.question.id + '-' + possibleAnswer.key} className="my-4 flex text-lg ml-4">
            <input type="checkbox" defaultChecked={false} className="cursor-pointer my-auto"
                   id={'response-' + props.question.id + '-' + possibleAnswer.key} value={possibleAnswer.key}
                   onChange={handleResponseChange} />
            <label className="ml-2 cursor-pointer"
                   htmlFor={'response-' + props.question.id + '-' + possibleAnswer.key}>{possibleAnswer.text}</label>
          </div>
        )
      })}
    </>
  )

  return (
    <div>
      <div className="text-xl">{props.question.content}</div>
      <hr className="my-2" />
      {answers}
      <div className="flex mt-6">
        {props.loading ? (
          <div
            className="text-white border bg-gray-700 px-3 py-1 mx-2 cursor-pointer select-none rounded opacity-50">Traitement
            ...</div>
        ) : (
          <div onClick={() => {
            props.onNext({ questionId: props.question.id, answers: userAnswer })
          }}
               className="my-btn-anim hover:bg-white hover:text-blue-600 text-white border border-blue-400 bg-blue-400 px-3 py-1 mx-2 cursor-pointer select-none rounded transition duration-150">Suivant</div>
        )}
      </div>
    </div>
  )
}
