import React from 'react'
import { useQuiz } from '../context/QuizContext'
import slow from '../assets/slow.gif'
import victory from '../assets/victory.gif'

const Message = () => {
  const { endsAt } = useQuiz()

  if (Date.now() >= endsAt!) {
    return (
      <div>
        Désolé, le temps est écoulé, mais les réponses envoyées ont bien été enregistrées.
        <img className="rounded-md w-full h-auto mt-5" src={slow} alt="" />
      </div>
    )
  }

  return (
    <div>Les réponses ont bien été enregistrées !
      <img className="rounded-md w-full h-auto mt-5" src={victory} alt="" />
    </div>
  )
}

const Icon = () => {
  const { endsAt } = useQuiz()

  if (Date.now() >= endsAt!) {
    return (
      <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-orange-100">
        <svg className="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
    )
  }

  return (
    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
      <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    </div>
  )
}

export const EndPage = () => {
  const handleQuit = () => {
    localStorage.clear()
    window.location.reload()
  }

  return (
    <div className="w-full flex justify-center">
      <div className="bg-white rounded-lg px-4 pt-5 pb-4 shadow-xl sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
        <div>
          <Icon />
          <div className="mt-3 text-center sm:mt-5">
            <h2 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
              C'est fini !
            </h2>
            <div className="mt-2">
              <p className="text-sm leading-5 text-gray-500">
                <Message />
              </p>
            </div>
          </div>
        </div>
        <div className="mt-5 sm:mt-6">
          <span className="flex w-full rounded-md shadow-sm">
            <button type="button" onClick={handleQuit} className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-indigo-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:ring-indigo transition ease-in-out duration-150 sm:text-sm sm:leading-5">
              Déconnexion
              <svg className="ml-2 -mr-1 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </span>
        </div>
      </div>
    </div>
  )
}
