import React from 'react'
import './assets/css/App.css'
import Header from './component/Header'
import { HomePage } from './pages/HomePage'
import { FormPage } from './pages/FormPage'
import { LoginPage } from './pages/LoginPage'
import { useUser } from './context/UserContext'
import { useQuiz } from './context/QuizContext'
import { EndPage } from './pages/EndPage'

const AppContent = () => {
  const { startedAt, currentQuestion } = useQuiz()

  if (!startedAt) {
    return <HomePage />
  }

  if (!currentQuestion) {
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
