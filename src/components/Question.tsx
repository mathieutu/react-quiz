import React, { ChangeEvent } from 'react'
import type { Question as QuestionType } from '../configuration'

type QuestionProps = {
  question: QuestionType,
  onAnswersChange: (setFunction: (answers: string[]) => string[]) => void,
  answers: string[],
}

type InputCheckboxProps = {
  checked: boolean,
  value: string,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void,
  label: string,
}

const InputCheckbox = ({ checked, label, onChange, value }: InputCheckboxProps) => {
  const className = checked
    ? 'text-white bg-indigo-600 hover:bg-indigo-500 focus:border-indigo-700 active:text-indigo-900 active:bg-indigo-300'
    : 'text-indigo-900 bg-indigo-200 hover:bg-indigo-300 focus:border-indigo-600 active:bg-indigo-500 active:text-white'

  return (
    <label className={`${className} cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md focus:outline-none  focus:shadow-outline-indigo transition ease-in-out duration-150`}>
      <input type="checkbox" checked={checked} className="form-checkbox border-indigo-400 bg-indigo-300 h-4 w-4 -ml-1 mr-2 text-indigo-800 transition duration-150 ease-in-out" value={value} onChange={onChange} />
      {label}
    </label>
  )
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
      <div className="flex gap-3 justify-center flex-wrap">
        {question.possibleAnswers.map(({ key, label }) => (
          <div key={key} className="my-4 flex text-lg ml-4">
            <InputCheckbox checked={answers.includes(key)} value={key} onChange={handleResponseChange} label={label} />
          </div>
        ))}
      </div>
    </div>
  )
}
