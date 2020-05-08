import React from 'react'
import { getApi } from '../api'
import { useDispatch, useSelector } from 'react-redux'
import { ApplicationState } from '../store'
import { Perpetual } from '../domain'
declare const gapi: any

const SocialSignInPanel: React.FC<{}> = () => {
  const api = getApi(useDispatch())
  const perpetual = useSelector<ApplicationState, Perpetual>(state => state.perpetual)
  const onSignIn = async (googleUser: any) => {
    const profile = googleUser.getBasicProfile()
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    const identity = googleUser.getAuthResponse().id_token
    console.log(`Google user token: ${identity}`)
    await api.socialSignIn('google', identity)
  }
  const signOut = async () => {
    const auth2 = gapi.auth2.getAuthInstance()
    await auth2.signOut()
    console.log('User signed out.')
  }
  React.useEffect(() => {
    if (!perpetual.profile.identified){
      console.log(`Setting-up google sign-in button`)
      gapi.signin2.render('google-sign-in', {
        'scope': 'profile email',
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': onSignIn,
        // 'onfailure': props.onFailure
      })
    }  
  }, [perpetual])
  return (
    <div>
      <div id="google-sign-in"></div>
      <button onClick={signOut}>Sign-out</button>
    </div>
  )
}

export default SocialSignInPanel