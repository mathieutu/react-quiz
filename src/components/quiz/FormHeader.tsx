import React, { useEffect, useState } from 'react'
import { Timer } from './Timer'
import { LoadingIcon } from '../LoadingIcon'
import { useQuiz } from '../../context/QuizContext'

type FormHeaderProps = {
  onPrevious: () => void,
  onNext: () => void
  loading: boolean,
}

const useShouldLoad = (loading: boolean, onClick: () => void) => {
  const [hasClicked, setHasClicked] = useState(false)

  useEffect(() => {
    if (!loading) {
      setHasClicked(false)
    }
  }, [loading])

  const shouldLoad = hasClicked && loading
  const handleClick = () => {
    setHasClicked(true)
    onClick()
  }

  return { shouldLoad, handleClick }
}
function PreviousButton({ loading, onClick }: { onClick: () => void, loading: boolean }) {
  const { currentQuestionIndex } = useQuiz()
  const { handleClick, shouldLoad } = useShouldLoad(loading, onClick)

  if (!currentQuestionIndex) {
    return null
  }

  return (
    <span className="shadow-sm rounded-md">
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className="inline-flex items-center px-4 py-2 border border-gray-300 text-xs sm:text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 transition duration-150 ease-in-out"
      >
        <LoadingIcon loading={shouldLoad} className="-ml-1 mr-2 h-5 w-5 text-gray-500">
          <svg className="-ml-1 mr-2 h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
          </svg>
        </LoadingIcon>
        Question précédente
      </button>
    </span>
  )
}

type NextButtonProps = { onClick: () => void, loading: boolean, isLastQuestion: boolean }

const NextButton = ({ loading, onClick, isLastQuestion }: NextButtonProps) => {
  const { handleClick, shouldLoad } = useShouldLoad(loading, onClick)

  return (
    <span className="shadow-sm rounded-md">
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className="inline-flex items-center px-4 py-2 border border-transparent text-xs sm:text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700 active:bg-indigo-700 transition duration-150 ease-in-out"
      >
        {isLastQuestion ? 'Terminer' : 'Question suivante'}
        <LoadingIcon loading={shouldLoad} className="-mr-1 ml-2 h-5 w-5">
          <svg className="-mr-1 ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </LoadingIcon>
      </button>
    </span>
  )
}

export const FormHeader = ({ loading, onPrevious, onNext }: FormHeaderProps) => {
  const { currentQuestionIndex, questionsQuantity } = useQuiz()

  const questionsLeftQuantity = questionsQuantity - currentQuestionIndex

  return (
    <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 md:flex md:items-center md:justify-between">
      <div className="flex-1 min-w-0">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:leading-9 sm:truncate">
          Question n° {currentQuestionIndex + 1}
        </h2>
        <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap">
          <div className="mt-2 flex items-center text-sm leading-5 text-gray-500 sm:mr-6">
            <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
            </svg>
            {questionsLeftQuantity > 1 ? `${questionsLeftQuantity} questions restantes` : 'Dernière question !'}
          </div>
          <div className="mt-2 flex items-center text-sm leading-5 text-gray-500 sm:mr-6">
            <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <Timer />
          </div>
        </div>
      </div>
      <div className="mt-5 flex flex-wrap gap-3 lg:mt-0 lg:ml-4">
        <PreviousButton onClick={onPrevious} loading={loading} />
        <NextButton onClick={onNext} loading={loading} isLastQuestion={questionsLeftQuantity === 1} />
      </div>
    </header>
  )
}
