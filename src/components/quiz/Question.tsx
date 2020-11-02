import React, { ChangeEvent, useMemo } from 'react'
import type { Question as QuestionType } from '../../configuration'
import { sortRandom } from '../../utils/misc'

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
  disabled: boolean,
}

const InputCheckbox = ({ checked, label, onChange, value, disabled }: InputCheckboxProps) => {
  const className = checked
    ? 'text-white bg-indigo-500 hover:bg-indigo-400 focus:border-indigo-700 active:text-indigo-900 active:bg-indigo-200'
    : `text-indigo-700 bg-indigo-100 ${disabled ? '' : 'hover:bg-indigo-200 focus:border-indigo-600 active:bg-indigo-400 active:text-white'}`

  return (
    <label className={`${className} ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'} inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md focus:outline-none  focus:shadow-outline-indigo`}>
      <input
        disabled={disabled}
        type="checkbox"
        checked={checked}
        value={value}
        onChange={onChange}
        className="form-checkbox border-indigo-700 bg-indigo-200 h-4 w-4 -ml-1 mr-2 text-indigo-800 transition duration-150 ease-in-out"
      />
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

      return [...uniqueAnswers].sort()
    })
  }

  const sortedAnswers = useMemo(() => sortRandom(question.possibleAnswers), [question.possibleAnswers])

  return (
    <div className="ml-4">
      <div>{question.title}</div>
      <div className="flex gap-3 flex-wrap mt-10">
        {sortedAnswers.map(({ key, label, disabled = false }) => (
          <div key={key} className="flex text-lg">
            <InputCheckbox disabled={disabled} checked={answers.includes(key)} value={key} onChange={handleResponseChange} label={label} />
          </div>
        ))}
      </div>
    </div>
  )
}
