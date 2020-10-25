import React, { ChangeEvent, useState } from 'react'
import { Question as QuestionType } from '../context/QuizContext'

type QuestionProps = {
  question: QuestionType,
  onNext: (userAnswers: string[]) => void,
  loading: boolean
}

export const Question = ({ question, onNext, loading }: QuestionProps) => {
  const [userAnswers, setUserAnswers] = useState<string[]>([])

  const handleResponseChange = ({ target: { value, checked } }: ChangeEvent<HTMLInputElement>) => {
    setUserAnswers(answers => {
      const uniqueAnswers = new Set(answers)

      checked ? uniqueAnswers.add(value) : uniqueAnswers.delete(value)

      return [...uniqueAnswers]
    })
  }

  const answers = question.possibleAnswers.map(({ key, label }) => (
    <div key={key} className="my-4 flex text-lg ml-4">
      <label className="ml-2 cursor-pointer">
        <input
          type="checkbox" defaultChecked={false} className="cursor-pointer my-auto"
          value={key}
          onChange={handleResponseChange}
        /> {label}
      </label>
    </div>
  ))

  return (
    <div>
      <div className="text-xl">{question.title}</div>
      <hr className="my-2" />
      {answers}
      <div className="flex mt-6">
        {loading ? (
          <div
            className="text-white border bg-gray-700 px-3 py-1 mx-2 cursor-pointer select-none rounded opacity-50">
            Traitement ...
          </div>
        ) : (
          <button
            className="my-btn-anim hover:bg-white hover:text-blue-600 text-white border border-blue-400 bg-blue-400 px-3 py-1 mx-2 cursor-pointer select-none rounded transition duration-150"
            onClick={() => onNext(userAnswers)}
          >
            Suivant
          </button>
        )}
      </div>
    </div>
  )
}
