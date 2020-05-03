import React from 'react'
import { useDispatch } from 'react-redux'
import { getApi } from '../api'

interface SignIn {
  email: string,
  password: string,
}

const defaultSignIn: SignIn = {
  email: '',
  password: ''
}

const SignInForm: React.FC<{}> = () => {
  const api = getApi(useDispatch())
  const [signIn, setSignIn] = React.useState<SignIn>(defaultSignIn)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setSignIn({ ...signIn, [e.target.name]: e.target.value })
  const handleSubmit = async (e: React.SyntheticEvent) => {
      e.preventDefault()
      api.signIn(signIn.email, signIn.password)
  }

  return (
    <form noValidate onSubmit={handleSubmit}>
        <h1>Sign-in</h1>
        <label>Username<br/>
          <input name="email" value={signIn.email} onChange={handleChange} />
        </label>
        <br />
        <label>Password<br/>
          <input name="password" value={signIn.password} type="password" onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Sign-in</button>
    </form>
  )
}

export default SignInForm