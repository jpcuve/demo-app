import React from 'react'
import Outline from './Outline'
import { User, defaultUser } from '../domain'
import GoogleSignInButton from '../component/GoogleSignInButton'
import { RouteComponentProps } from 'react-router'
import { useDispatch } from 'react-redux'
import SignOutButton from '../component/SignOutButton'
import ResetPasswordForm from '../component/ResetPasswordForm'
import SignInForm from '../component/SignInForm'
import SignUpForm from '../component/SignUpForm'
import UpdatePasswordForm from '../component/UpdatePasswordForm'
declare const gapi: any

enum Choice {
  SignIn,
  SignUp,
  ResetPassword,
}

const AuthPage: React.FC<RouteComponentProps> = props => {
  const { location: { search } } = props
  const token = search.length ? search.substring(1) : ''
  const [fetching, setFetching] = React.useState<boolean>(false)
  const [errors, setErrors] = React.useState<string[]>([])
  const [choice, setChoice] = React.useState<Choice>(Choice.SignIn)
  const user = defaultUser
  const dispatch = useDispatch()
  const updateUser = (user: User) => dispatch({ type: 'update-user', user })
  return (
    <Outline fetching={fetching} errors={errors} user={user} {...props}>
      {user.id !== 0 && token === '' && <SignOutButton />}
      {user.id === 0 && choice === Choice.ResetPassword && token === '' &&
        <>
          <ResetPasswordForm />
          <button onClick={() => setChoice(Choice.SignIn)}>Sign-in</button>
          &nbsp;
          <button onClick={() => setChoice(Choice.SignUp)}>Sign-up</button>
        </>
      }
      {user.id === 0 && choice === Choice.SignIn && token === '' &&
        <>
          <SignInForm />
          <button onClick={() => setChoice(Choice.SignUp)}>Sign-up</button>
          &nbsp;
          <button onClick={() => setChoice(Choice.ResetPassword)}>Reset password</button>
          <br />
          <GoogleSignInButton scope="profile email" onSignIn={user => updateUser(user)} onFailure={e => setErrors([JSON.stringify(e)])} />
        </>
      }
      {user.id === 0 && choice === Choice.SignUp && token === '' &&
        <>
          <SignUpForm />
          <button onClick={() => setChoice(Choice.SignIn)}>Sign-in</button>
          &nbsp;
          <button onClick={() => setChoice(Choice.ResetPassword)}>Reset password</button>
        </>
      }
      {token !== '' && <UpdatePasswordForm />}
    </Outline>
  )
}

export default AuthPage
