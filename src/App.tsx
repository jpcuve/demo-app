import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomePage from './page/HomePage';
import AuthPage from './page/AuthPage';
import TestPage from './page/TestPage';
import SignInPage from './page/SignInPage';
import SignUpPage from './page/SignUpPage';
import UpdatePasswordPage from './page/UpdatePasswordPage';
import ResetPasswordPage from './page/ResetPasswordPage';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={AuthPage} />
        <Route path="/sign-in" component={SignInPage} />
        <Route path="/sign-up" component={SignUpPage} />
        <Route path="/update-password" component={UpdatePasswordPage}/>
        <Route path="/reset-password" component={ResetPasswordPage}/>
        <Route path="/home" component={HomePage} />
        <Route path="/test" component={TestPage} />
        <Route render={() => (<div>No match</div>)} />
      </Switch>
    </BrowserRouter>
  );
}

export default App
