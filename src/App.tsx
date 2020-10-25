import React from 'react'
import './assets/css/App.css'
import Header from './component/Header'
import { Route, Switch } from 'react-router-dom'
import HomePage from './page/HomePage'
import FormPage from './page/FormPage'
import ErrorPage from './page/ErrorPage/ErrorPage'
import { LoginPage } from './page/LoginPage'
import { useUser } from './context/UserContext'


export const App = () => {
  const { user } = useUser()

  if (!user) {
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
