import React from 'react'
import { useDispatch } from 'react-redux'
import { getApi } from '../api'
import { FormProps } from '..'
declare const gapi: any

const SignOutButton: React.FC<FormProps> = props => {
  const api = getApi(useDispatch())
  const handleClick = async () => {
    api.signOut()
    if (gapi.auth2){
      const auth2 = gapi.auth2.getAuthInstance()
      await auth2.signOut()
    } 
    console.log('User signed out.')
    props.onCompleted()
  }
  return (
    <button onClick={handleClick}>Sign-out</button>
  )
}

export default SignOutButton