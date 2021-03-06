import React from 'react'
import ReactDOM from 'react-dom'
import './assets/css/tailwind.css'
import { App } from './App'
import { ApolloProvider } from './context/Apollo'
import { UserProvider } from './context/UserContext'
import { QuizProvider } from './context/QuizContext'

const root = (
  <React.StrictMode>
    <UserProvider>
      <QuizProvider>
        <ApolloProvider>
          <App />
        </ApolloProvider>
      </QuizProvider>
    </UserProvider>
  </React.StrictMode>
)

ReactDOM.render(root, document.getElementById('root'))
