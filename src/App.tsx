import React from 'react'
import './assets/css/App.css'
import Header from './component/Header'
import { Route, Switch } from 'react-router-dom'
import HomePage from './page/HomePage'
import FormPage from './page/FormPage'
import ErrorPage from './page/ErrorPage/ErrorPage'
import { useSession } from './context/SessionContext'
import LoginPage from './page/LoginPage'


export const App = () => {
  const { state } = useSession()

  if (!state.user) {
    return <LoginPage />
  }

  return (
    <>
      <Header />
      <div className="container shadow-lg flex mx-auto bg-white h-full">
        <Switch>
          <Route exact path="/"><HomePage /></Route>
          <Route exact path="/form"><FormPage /></Route>
          <Route><ErrorPage code={404} message="Not Found" /></Route>
        </Switch>
      </div>
    </>
  )
}
