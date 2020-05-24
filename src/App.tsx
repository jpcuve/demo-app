import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomePage from './page/HomePage';
import TestPage from './page/TestPage';
import SignInPage from './page/SignInPage';
import SignUpPage from './page/SignUpPage';
import UpdatePasswordPage from './page/UpdatePasswordPage';
import ResetPasswordPage from './page/ResetPasswordPage';
import StatementPage from './page/StatementPage';
import FirebasePage from './page/FirebasePage';
import firebase from 'firebase'
import AuthPage from './page/AuthPage';
import { store } from './store';
import { getApi } from './api';
import { useDispatch } from 'react-redux';

function App() {
  const api = getApi(useDispatch())
  React.useEffect(() => {
    const unregister = firebase.auth().onAuthStateChanged((user: any) => {
      // user is authenticated here and can be safely transmitted to background server
      // to get a token in return
      if (user){
        console.log(`User signed in: ${JSON.stringify(user)}, anonymous: ${user.isAnonymous}, id: ${user.uid}`)
        api.firebaseSignIn(user)
      } else {
        console.log('User signed out')
      }
    })
    return () => unregister()
  }, [api])
  try{
    firebase.auth().signInAnonymously()
  } catch(e){
    console.log(`Anonymous sign-in error: ${e.code} ${e.message}`)
  }

  return (
    <BrowserRouter basename='/dummy'>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/home" component={HomePage} />
        <Route path="/auth" component={AuthPage} />
        <Route path="/sign-in" component={SignInPage} />
        <Route path="/sign-up" component={SignUpPage} />
        <Route path="/update-password" component={UpdatePasswordPage}/>
        <Route path="/reset-password" component={ResetPasswordPage}/>
        <Route path="/firebase" component={FirebasePage}/>
        <Route path="/statement" component={StatementPage}/>
        <Route path="/test" component={TestPage} />
        <Route render={() => (<div>No match</div>)} />
      </Switch>
    </BrowserRouter>
  );
}

export default App
