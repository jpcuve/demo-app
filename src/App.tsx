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
import { getApi } from './api';
import { useDispatch } from 'react-redux';

function App() {
  const api = getApi(useDispatch())
  React.useEffect(() => {
    const unregister = firebase.auth().onAuthStateChanged(async (user: any) => {
      // user is authenticated here and can be safely transmitted to background server
      // to get a token in return
      if (user){
        console.log(`User signed in: ${user.uid} ${user.email}, anonymous: ${user.isAnonymous}, id: ${user.uid}`)
        await api.firebaseSignIn(user)
        await api.perpetual()
      } else {
        console.log('User signed out')
        // if no user already signed in, perform anonymous sign in
        try{
          await console.log('Attempting anonymous sign-in (allow in firebase console)')
          await firebase.auth().signInAnonymously()
        } catch(e){
          console.log(`Anonymous sign-in error: ${e.code} ${e.message}`)
        }
      }
    })
    return () => {
      unregister()
    }
  }, [api])

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
