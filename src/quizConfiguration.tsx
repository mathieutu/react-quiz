import React from 'react'
import { Question } from './context/QuizContext'

export const DURATION = 600

export const QUESTIONS: Question[] = [
  {
    id: 'question-1',
    title: <>Quel est la capitale de la Roumanie ?</>,
    possibleAnswers: [
      { key: 'a', label: 'Paris' },
      { key: 'b', label: 'Budapest' },
      { key: 'c', label: 'Bucarest' },
      { key: 'd', label: 'Berlin' },
    ],
  },
  {
    id: 'question-2',
    title: <>Quel est le numéro du département Haute-Savoie ?</>,
    possibleAnswers: [
      { key: 'a', label: '74' },
      { key: 'b', label: '71' },
      { key: 'c', label: '53' },
      { key: 'd', label: '65' },
    ],
  },
  {
    id: 'question-3',
    title: <>ouais re ?</>,
    possibleAnswers: [
      { key: 'a', label: 'oui' },
      { key: 'b', label: 'tg' },
      { key: 'c', label: 'non' },
      { key: 'd', label: 'azy' },
    ],
  },
]
