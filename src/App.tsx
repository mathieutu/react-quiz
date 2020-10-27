import React from 'react'
import './assets/css/App.css'
import { Header } from './components/Header'
import { HomePage } from './components/HomePage'
import { QuizPage } from './components/QuizPage'
import { LoginPage } from './components/LoginPage'
import { useUser } from './context/UserContext'
import { useQuiz } from './context/QuizContext'
import { EndPage } from './components/EndPage'

const AppContent = () => {
  const { startedAt, currentQuestion } = useQuiz()

  if (!startedAt) {
    return <HomePage />
  }

  if (!currentQuestion) {
    return <EndPage />
  }

  return <QuizPage />
}

export const App = () => {
  const { user } = useUser()

  if (!user) {
    return <LoginPage />
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="py-10">
        <AppContent />
      </div>
    </div>
  )
}
