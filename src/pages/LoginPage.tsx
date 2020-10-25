import React, { ChangeEvent, FormEvent, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import Button from '../component/Button'
import { useMutation } from '@apollo/client'
import { CgSpinnerTwoAlt } from 'react-icons/all'
import { NEW_USER_QUERY } from '../utils/queries'
import Error from '../component/Error'
import { useUser } from '../context/UserContext'

export const LoginPage = () => {
  const [formState, setFormState] = useState({ name: '', email: '' })
  const [formError, setFormError] = useState<string>()

  const [addUser, { loading }] = useMutation(NEW_USER_QUERY)

  const { setUser } = useUser()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormState(state => ({
      ...state,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    addUser({ variables: formState })
      .then(({ data }) => setUser(data.addUser))
      .catch((e) => setFormError(e.message))
  }


  return (
    <div className="text-lg flex h-screen bg-white w-screen">
      <form onSubmit={handleSubmit} className="m-auto w-100 shadow-lg bg-gray-300 flex flex-col p-6">
        <Error text={formError} />
        <div className="my-4 w-full">
          <label className="mb-2">
            Email <span className="text-red-800">*</span>
            <input
              type="email" required
              name="email" onChange={handleChange}
              className="w-full focus:shadow-lg p-2 px-3 rounded"
            />
          </label>
        </div>
        <div className="my-4 w-full">
          <label className="mb-2">
            Nom et Prénom <span className="text-red-800">*</span>
            <input
              type="text" required
              name="name" onChange={handleChange}
              className="w-full focus:shadow-lg p-2 px-3 rounded"
            />
          </label>
        </div>
        <div className="mt-8 flex">
          <Button
            text="Commencer"
            disabled={loading}
            icon={
              loading
                ? <CgSpinnerTwoAlt className="ml-2 animate-spin" />
                : <FontAwesomeIcon className="ml-2 transition duration-150" icon={faArrowRight} />
            }
          />
        </div>
      </form>
    </div>
  )
}
