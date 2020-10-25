import React from 'react'
import ReactDOM from 'react-dom'
import './assets/css/index.output.css'
import App from './App'
import AppSessionProvider from './context/SessionContext'

ReactDOM.render(
  <React.StrictMode>
    <AppSessionProvider>
      <App />
    </AppSessionProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)
