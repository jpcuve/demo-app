import React from 'react'
import Outline from './Outline'
import { RouteComponentProps } from 'react-router'
import SignOutButton from '../component/SignOutButton'
import ResetPasswordForm from '../component/ResetPasswordForm'
import SignInForm from '../component/SignInForm'
import SignUpForm from '../component/SignUpForm'
import UpdatePasswordForm from '../component/UpdatePasswordForm'
import { useSelector } from 'react-redux'
import { ApplicationState } from '../store'
import { Profile } from '../domain'
declare const gapi: any

enum Choice {
  SignIn,
  SignUp,
  ResetPassword,
}

const AuthPage: React.FC<RouteComponentProps> = props => {
  const { location: { search } } = props
  const token = search.length ? search.substring(1) : ''
  const [choice, setChoice] = React.useState<Choice>(Choice.SignIn)
	const profile = useSelector<ApplicationState, Profile>(state => state.profile)
  return (
    <Outline {...props}>
      {profile.identified && token === '' && <SignOutButton />}
      {!profile.identified && choice === Choice.ResetPassword && token === '' &&
        <>
          <ResetPasswordForm />
          <button onClick={() => setChoice(Choice.SignIn)}>Sign-in</button>
          &nbsp;
          <button onClick={() => setChoice(Choice.SignUp)}>Sign-up</button>
        </>
      }
      {!profile.identified && choice === Choice.SignIn && token === '' &&
        <>
          <SignInForm />
          <button onClick={() => setChoice(Choice.SignUp)}>Sign-up</button>
          &nbsp;
          <button onClick={() => setChoice(Choice.ResetPassword)}>Reset password</button>
          <br />
        </>
      }
      {!profile.identified && choice === Choice.SignUp && token === '' &&
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
