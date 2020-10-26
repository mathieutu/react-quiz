import React, { ChangeEvent } from 'react'
import type { Question as QuestionType } from '../configuration'

type QuestionProps = {
  question: QuestionType,
  onAnswersChange: (setFunction: (userAnswers: string[]) => string[]) => void,
}

export const Question = ({ question, onAnswersChange }: QuestionProps) => {
  const handleResponseChange = ({ target: { value, checked } }: ChangeEvent<HTMLInputElement>) => {
    onAnswersChange(answers => {
      const uniqueAnswers = new Set(answers)

      if (checked) uniqueAnswers.add(value)
      else uniqueAnswers.delete(value)

      return [...uniqueAnswers]
    })
  }

  return (
    <div>
      <div className="text-xl">{question.title}</div>
      <hr className="my-2" />
      {question.possibleAnswers.map(({ key, label }) => (
        <div key={key} className="my-4 flex text-lg ml-4">
          <label className="ml-2 cursor-pointer">
            <input
              type="checkbox"
              defaultChecked={false}
              className="cursor-pointer my-auto"
              value={key}
              onChange={handleResponseChange}
            />
            {label}
          </label>
        </div>
      ))}
    </div>
  )
}
