import React, { ChangeEvent, FormEvent, useState } from 'react'
import { ErrorAlert } from '../component/ErrorAlert'
import { useUser } from '../context/UserContext'
import { Logo, TITLE } from '../configuration'
import { LoadingIcon } from '../component/LoadingIcon'
import { useInsertUser } from '../graphql'

export const LoginPage = () => {
  const [userInput, setUserInput] = useState({ name: '', email: '' })
  const [formError, setFormError] = useState<string>('')
  const { insertUser, loading } = useInsertUser()
  const { setUser } = useUser()

  const handleChange = ({ target: { name, value } }: ChangeEvent<HTMLInputElement>) => {
    setUserInput(state => ({
      ...state,
      [name]: value,
    }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    insertUser(userInput)
      .then(({ data }) => setUser(data?.user!))
      .catch(({ message }) => setFormError(message))
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Logo className="mx-auto h-24 w-auto" />
        <h1 className="mt-6 text-center text-3xl uppercase leading-9 font-extrabold text-gray-900">
          {TITLE}
        </h1>
        <p className="mt-2 text-center text-sm leading-5 text-gray-600 max-w">
          Mathieu TUDISCO
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <ErrorAlert>{formError}</ErrorAlert>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-5 text-gray-700">
                Email <span className="text-red-800">*</span>
              </label>
              <div className="mt-1 rounded-md shadow-sm">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>
            </div>

            <div className="mt-6">
              <label htmlFor="name" className="block text-sm font-medium leading-5 text-gray-700">
                Prénom NOM <span className="text-red-800">*</span>
              </label>
              <div className="mt-1 rounded-md shadow-sm">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>
            </div>

            <div className="mt-6">
              <span className="block w-full rounded-md shadow-sm">
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                  disabled={loading}
                >
                  Se connecter
                  <LoadingIcon loading={loading} className="ml-2 -mr-1 h-5 w-5">
                    <svg className="ml-2 -mr-1 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                  </LoadingIcon>
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
