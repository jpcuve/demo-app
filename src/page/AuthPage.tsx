import React from 'react'
import Outline from './Outline'
import { User } from '../domain'
import GoogleSignInButton from '../component/GoogleSignInButton'
import { RouteComponentProps } from 'react-router'
import client from '../remote'
import { useDispatch, useSelector } from 'react-redux'
import { ApplicationState } from '..'
declare const gapi: any

interface ResetPassword {
  email: string,
}

interface SignIn extends ResetPassword {
  password: string,
}

interface SignUp extends SignIn {
  name: string,
}

interface UpdatePassword {
  newPassword: string,
  newPasswordConfirmation: string,
  token: string,
}

const defaultResetPassword: ResetPassword = {
  email: '',
}

const defaultSignIn: SignIn = {
  email: '',
  password: '',
}

const defaultSignUp: SignUp = {
  email: '',
  password: '',
  name: ''
}

const defaultUpdatePassword: UpdatePassword = {
  newPassword: '',
  newPasswordConfirmation: '',
  token: '',
}

enum Choice {
  SignIn,
  SignUp,
  ResetPassword,
}

const AUTH_BASE = '/auth'

const AuthPage: React.FC<RouteComponentProps> = props => {
  const { location: { search } } = props
  const token = search.length ? search.substring(1) : ''
  const [fetching, setFetching] = React.useState<boolean>(false)
  const [errors, setErrors] = React.useState<string[]>([])
  const [choice, setChoice] = React.useState<Choice>(Choice.SignIn)
  const [resetPassword, setResetPassword] = React.useState<ResetPassword>(defaultResetPassword)
  const [signIn, setSignIn] = React.useState<SignIn>(defaultSignIn)
  const [signUp, setSignUp] = React.useState<SignUp>(defaultSignUp)
  const [updatePassword, setUpdatePassword] = React.useState<UpdatePassword>(defaultUpdatePassword)
  const user = useSelector<ApplicationState, User>(state => state.user)
  const dispatch = useDispatch()
  const updateUser = (user: User) => dispatch({type: 'update-user', user})
  const handleResetPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setResetPassword({ ...resetPassword, [e.target.name]: e.target.value })
  const handleResetPasswordSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    setErrors([])
    setFetching(true)
    try {
      await client.post(`${AUTH_BASE}/reset-password`, resetPassword)
    } catch (e) {
      setErrors([String(e)])
    } finally {
      setFetching(false)
    }
  }
  const handleSignInChange = (e: React.ChangeEvent<HTMLInputElement>) => setSignIn({ ...signIn, [e.target.name]: e.target.value })
  const handleSignInSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    setErrors([])
    setFetching(true)
    try {
      const user: User = await client.post(`${AUTH_BASE}/sign-in`, signIn)
      updateUser(user)
      props.history.push('/home')
    } catch (e) {
      setErrors([String(e)])
      setFetching(false)
    }
  }
  const handleSignOut = async () => {
    setErrors([])
    setFetching(true)
    try {
      await gapi.auth2.getAuthInstance().signOut();
      const user: User = await client.get(`${AUTH_BASE}/sign-out`)
      updateUser(user)
    } catch (e) {
      setErrors([String(e)])
    } finally {
      setFetching(false)
    }
  }
  const handleSignUpChange = (e: React.ChangeEvent<HTMLInputElement>) => setSignUp({ ...signUp, [e.target.name]: e.target.value })
  const handleSignUpSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    setErrors([])
    setFetching(true)
    try {
      const user: User = await client.post(`${AUTH_BASE}/sign-up`, signUp)
      updateUser(user)
      props.history.push('/home')
    } catch (e) {
      setErrors([String(e)])
      setFetching(false)
    }
  }
  const handleUpdatePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setUpdatePassword({ ...updatePassword, [e.target.name]: e.target.value })
  const handleUpdatePasswordSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    setUpdatePassword({ ...updatePassword, token })
    setErrors([])
    setFetching(true)
    try {
      await client.post(`${AUTH_BASE}/update-password`, updatePassword)
    } catch (e) {
      setErrors([String(e)])
    } finally {
      setFetching(false)
    }
  }
  return (
    <Outline fetching={fetching} errors={errors} user={user} {...props}>
      {user.id !== 0 && token === '' &&
        <button onClick={handleSignOut}>Sign-out</button>
      }
      {user.id === 0 && choice === Choice.ResetPassword && token === '' &&
        <form noValidate onSubmit={handleResetPasswordSubmit}>
          <h1>Reset password</h1>
          <br/>
          <label>Email
            <input name="email" value={resetPassword.email} onChange={handleResetPasswordChange}/>
          </label> 
          <br/>
          <button disabled={fetching} type="submit">Reset password</button>
          <br/>
          <button onClick={() => setChoice(Choice.SignIn)}>Sign-in</button>
          &nbsp;
          <button onClick={() => setChoice(Choice.SignUp)}>Sign-up</button>
        </form>
      }
      {user.id === 0 && choice === Choice.SignIn && token === '' &&
        <form noValidate onSubmit={handleSignInSubmit}>
          <h1>Sign-in</h1>
          <label>Username
            <input name="email" value={signIn.email} onChange={handleSignInChange}/>
          </label>
          <br/>
          <label>Password
            <input name="password" value={signIn.password} type="password" onChange={handleSignInChange} />
          </label>
          <br/>
          <button disabled={fetching} type="submit">Sign-in</button>
          <br/>
          <button onClick={() => setChoice(Choice.SignUp)}>Sign-up</button>
          &nbsp;
          <button onClick={() => setChoice(Choice.ResetPassword)}>Reset password</button>
          <br/>
          <GoogleSignInButton scope="profile email" onSignIn={user => updateUser(user)} onFailure={e => setErrors([JSON.stringify(e)])}/>
        </form>
      }
      {user.id === 0 && choice === Choice.SignUp && token === '' &&
        <form noValidate onSubmit={handleSignUpSubmit}>
          <h1>Sign-up</h1>
          <label>Username
            <input name="email" value={signUp.email} onChange={handleSignUpChange}/>
          </label>
          <br/>
          <label>Password
            <input name="password" value={signUp.password} type="password" onChange={handleSignUpChange} />
          </label>
          <br/>
          <label>Name
            <input name="name" value={signUp.name} onChange={handleSignUpChange} />
          </label>
          <br/>
          <button disabled={fetching} type="submit">Sign-up</button>
          <br/>
          <button onClick={() => setChoice(Choice.SignIn)}>Sign-in</button>
          &nbsp;
          <button onClick={() => setChoice(Choice.ResetPassword)}>Reset password</button>
        </form>
      }
      {token !== '' &&
        <form noValidate onSubmit={handleUpdatePasswordSubmit}>
          <h1>Update password</h1>
          <label>New password
            <input name="newPassword" type="password" value={updatePassword.newPassword} onChange={handleUpdatePasswordChange} />
          </label>
          <br/>
          <label>New password confirmation
            <input name="newPasswordConfirmation" type="password" value={updatePassword.newPasswordConfirmation} onChange={handleUpdatePasswordChange} />
          </label>
          <br/>
          <button disabled={fetching} type="submit">Update password</button>
        </form>
      }
    </Outline>
  );
}

export default AuthPage
