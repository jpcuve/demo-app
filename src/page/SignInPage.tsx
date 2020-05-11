import React from 'react'
import { PageProps } from '..'
import SignInForm from '../component/SignInForm'
import Outline from './Outline'
import { getApi } from '../api'
import { useDispatch } from 'react-redux'
import { store } from '../store'
import SocialSignInPanel from '../component/SocialSignInPanel'

const SignInPage: React.FC<PageProps> = props => {
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
      Or
      <SocialSignInPanel onCompleted={signInCompleted} />
    </Outline>
  )
}

export default SignInPage