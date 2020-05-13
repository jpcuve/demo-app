import React from 'react'
import { getApi } from '../api'
import { useDispatch, useSelector } from 'react-redux'
import { ApplicationState } from '../store'
import { FormProps } from '..'
declare const gapi: any

const SocialSignInPanel: React.FC<FormProps> = props => {
  const api = getApi(useDispatch())
  const token = useSelector<ApplicationState, string>(state => state.token)
  const onSignIn = async (googleUser: any) => {
    const identity = googleUser.getAuthResponse().id_token
    console.log(`Google user token: ${identity}`)
    await api.socialSignIn('google', identity)
    props.onCompleted()
  }
  React.useEffect(() => {
    if (!token){
      console.log(`Setting-up google sign-in button`)
      gapi.signin2.render('google-sign-in', {
        'scope': 'profile email',
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': onSignIn,
        // 'onfailure': props.onFailure
      })
    }
  }, [token])
  return (
    <div>
      {!token && <div id="google-sign-in"></div>}
    </div>
  )
}

export default SocialSignInPanel