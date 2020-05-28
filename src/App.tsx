import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomePage from './page/HomePage';
import TestPage from './page/TestPage';
import StatementPage from './page/StatementPage';
import AuthPage from './page/AuthPage';
import { getApi } from './api';
import { useDispatch } from 'react-redux';
import auth from './firebase-auth';
import messaging from './firebase-messaging';

function App() {
  const dispatch = useDispatch()
  React.useEffect(() => {
    const unregister = auth.onAuthStateChanged(async (user: any) => {
      // user is authenticated here and can be safely transmitted to background server
      // to get a token in return
      const api = getApi(dispatch)
      if (user){
        console.log(`User signed in: ${user.uid} ${user.email}, anonymous: ${user.isAnonymous}, id: ${user.uid}`)
        await api.firebaseSignIn(user)
      } else {
        console.log('User signed out')
        // if no user already signed in, perform anonymous sign in
        try{
          await console.log('Attempting anonymous sign-in (allow in firebase console)')
          await auth.signInAnonymously()
        } catch(e){
          console.log(`Anonymous sign-in error: ${e.code} ${e.message}`)
        }
      }
    })
    return () => {
      unregister()
    }
  }, [dispatch])
  
  const initMessaging = async () => {
    try {
      const currentToken = await messaging.getToken()
      if (currentToken){
        console.log(`Sending token to server: ${currentToken}`)
        console.log(`Updating UI for push enabled`)
      } else {
        console.log(`Asking for permission to generate app instance id token`)
        console.log(`Updating UI for push permission required`)
      }
      dispatch({type: 'update-messaging-token', messagingToken: currentToken})
    } catch(err) {
      console.log(`Error while retrieving token: ${err}`)
    }
  }
  initMessaging()
  messaging.onTokenRefresh(() => initMessaging())

  return (
    <BrowserRouter basename=''>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/home" component={HomePage} />
        <Route path="/auth" component={AuthPage} />
        <Route path="/statement" component={StatementPage}/>
        <Route path="/test" component={TestPage} />
        <Route render={() => (<div>No match</div>)} />
      </Switch>
    </BrowserRouter>
  );
}

export default App
