import React from 'react'
import SignInForm from '../component/SignInForm'
import Outline from './Outline'
import { getApi } from '../api'
import { useDispatch } from 'react-redux'
import { store } from '../store'
import SocialSignInPanel from '../component/SocialSignInPanel'
import { RouteComponentProps } from 'react-router'

const SignInPage: React.FC<RouteComponentProps> = props => {
  const api = getApi(useDispatch())
  const signInCompleted = async () => {
    console.log(`Sign in completed, token: ${store.getState().token}`)
    if (store.getState().token) {
      await api.perpetual()
      api.flash("Sign-in is successful")
      props.history.push('/home')
    }
  }
  return (
    <Outline {...props}>
      <SignInForm onCompleted={signInCompleted} />
      <div>Or</div>
      <SocialSignInPanel onCompleted={signInCompleted} />
    </Outline>
  )
}

export default SignInPage