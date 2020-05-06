import React from 'react'
import Outline from './Outline'
import { RouteComponentProps } from 'react-router'
import SignOutButton from '../component/SignOutButton'
import ResetPasswordForm from '../component/ResetPasswordForm'
import SignInForm from '../component/SignInForm'
import SignUpForm from '../component/SignUpForm'
import UpdatePasswordForm from '../component/UpdatePasswordForm'
import { useDispatch, useSelector } from 'react-redux'
import { getApi } from '../api'
import { ApplicationState } from '../store'
import { Token, Perpetual } from '../domain'
declare const gapi: any

enum Choice {
  SignIn,
  SignUp,
  ResetPassword,
}

const AuthPage: React.FC<RouteComponentProps> = props => {
  const { location: { search } } = props
  const api = getApi(useDispatch())
  const [choice, setChoice] = React.useState<Choice>(Choice.SignIn)
  const token = useSelector<ApplicationState, string>(state => state.token)
  const signInSubmitted = async (token: Token|undefined) => {
    console.log(`Token: ${JSON.stringify(token)}`)
    if (token?.token){
      await api.perpetual()
      props.history.push('/home')
    }
  }
  return (
    <Outline {...props}>
      {token && <SignOutButton />}
      {!token && choice === Choice.ResetPassword &&
        <>
          <ResetPasswordForm />
          <button onClick={() => setChoice(Choice.SignIn)}>Sign-in</button>
          &nbsp;
          <button onClick={() => setChoice(Choice.SignUp)}>Sign-up</button>
        </>
      }
      {!token && choice === Choice.SignIn &&
        <>
          <SignInForm onSignIn={signInSubmitted}/>
          <button onClick={() => setChoice(Choice.SignUp)}>Sign-up</button>
          &nbsp;
          <button onClick={() => setChoice(Choice.ResetPassword)}>Reset password</button>
          <br />
        </>
      }
      {!token && choice === Choice.SignUp &&
        <>
          <SignUpForm />
          <button onClick={() => setChoice(Choice.SignIn)}>Sign-in</button>
          &nbsp;
          <button onClick={() => setChoice(Choice.ResetPassword)}>Reset password</button>
        </>
      }
      {token && <UpdatePasswordForm />}
    </Outline>
  )
}

export default AuthPage
