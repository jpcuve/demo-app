import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomePage from './page/HomePage';
import TestPage from './page/TestPage';
import SignInPage from './page/SignInPage';
import SignUpPage from './page/SignUpPage';
import UpdatePasswordPage from './page/UpdatePasswordPage';
import ResetPasswordPage from './page/ResetPasswordPage';
import FirebasePage from './page/FirebasePage';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/home" component={HomePage} />
        <Route path="/sign-in" component={SignInPage} />
        <Route path="/sign-up" component={SignUpPage} />
        <Route path="/update-password" component={UpdatePasswordPage}/>
        <Route path="/reset-password" component={ResetPasswordPage}/>
        <Route path="/firebase" component={FirebasePage}/>
        <Route path="/test" component={TestPage} />
        <Route render={() => (<div>No match</div>)} />
      </Switch>
    </BrowserRouter>
  );
}

export default App
