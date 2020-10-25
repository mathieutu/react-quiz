import React from 'react'
import './assets/css/App.css'
import Header from './component/Header'
import { HomePage } from './page/HomePage'
import { FormPage } from './page/FormPage'
import { LoginPage } from './page/LoginPage'
import { useUser } from './context/UserContext'
import { useQuiz } from './context/QuizContext'
import EndPage from './page/EndPage'

const AppContent = () => {
  const { startedAt } = useQuiz()

  if (!startedAt) {
    return <HomePage />
  }

  // TODO à faire !
  if (false) {
    return <EndPage />
  }

  return <FormPage />
}

export const App = () => {
  const { user } = useUser()

  if (!user) {
    return <LoginPage />
  }

  return (
    <>
      <Header />
      <div className="container shadow-lg flex mx-auto bg-white h-full">
        <AppContent />
      </div>
    </>
  )
}
