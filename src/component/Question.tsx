import React, { ChangeEvent } from 'react'
import type { Question as QuestionType } from '../configuration'

type QuestionProps = {
  question: QuestionType,
  onAnswersChange: (setFunction: (answers: string[]) => string[]) => void,
  answers: string[],
}

export const Question = ({ question, onAnswersChange, answers }: QuestionProps) => {
  const handleResponseChange = ({ target: { value, checked } }: ChangeEvent<HTMLInputElement>) => {
    onAnswersChange(oldAnswers => {
      const uniqueAnswers = new Set(oldAnswers)

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
              checked={answers.includes(key)}
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
