import React from 'react'
import SignInForm from '../component/SignInForm'
import SignOutButton from '../component/SignOutButton'
import { useDispatch, useSelector } from 'react-redux'
import { getApi } from '../api'
import { ApplicationState } from '../store'
import ajax from '../ajax-loader.gif'
import { Token } from '../domain'

const TestPage: React.FC<{}> = () => {
  const api = getApi(useDispatch())
  const token = useSelector<ApplicationState, string>(state => state.token)
  const fetching = useSelector<ApplicationState, boolean>(state => state.fetching)
  const errors = useSelector<ApplicationState, string[]>(state => state.errors)
  return (
    <div>
      <div>Token:&nbsp;{token}</div>
      <div>Fetching:&nbsp;{fetching && <img src={ajax} alt="ajax" />}</div>
      <div>Errors: {errors.map(error => {return <span key={error} className='error'>&nbsp;{error}</span>})}</div>
      <SignInForm onCompleted={() => console.log("Sign-in form completed")}/>
      <SignOutButton />
      <br />
      <button onClick={() => api.perpetual()}>Test</button>
      <br/>
      <button onClick={() => api.error()}>Error</button>
    </div>
  )
}

export default TestPage