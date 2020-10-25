import React from 'react'
import ReactDOM from 'react-dom'
import './assets/css/index.output.css'
import { App } from './App'
import AppSessionProvider from './context/SessionContext'
import { ApolloProvider } from './context/Apollo'
import { BrowserRouter } from 'react-router-dom'

const root = (
  <React.StrictMode>
    <AppSessionProvider>
      <ApolloProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ApolloProvider>
    </AppSessionProvider>
  </React.StrictMode>
)

ReactDOM.render(root, document.getElementById('root'))
