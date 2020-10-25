import React from 'react';
import './assets/css/App.css';
import Header from "./component/Header";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import HomePage from "./page/HomePage";
import FormPage from "./page/FormPage";
import ErrorPage from "./page/ErrorPage/ErrorPage";
import {useSession} from "./context/SessionContext";
import LoginPage from "./page/LoginPage";
import { ApolloProvider } from './context/Apollo'



function App() {
    const { state } = useSession();
    return (
        <ApolloProvider>
            <BrowserRouter>
                {state.user === null ? (
                    <LoginPage/>
                ) : (
                    <>
                        <Header/>
                        <div className="container shadow-lg flex mx-auto bg-white h-full">
                            <Switch>
                                <Route exact path="/"><HomePage/></Route>
                                <Route exact path="/form"><FormPage/></Route>
                                <Route><ErrorPage code={ 404 } message="Not Found"/></Route>
                            </Switch>
                        </div>
                    </>
                )}
            </BrowserRouter>
        </ApolloProvider>
    );
}

export default App;
