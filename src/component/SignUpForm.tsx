import React from 'react'
import { useDispatch } from 'react-redux'
import { getApi } from '../api'

interface SignUp {
  email: string,
  password: string,
  name: string,
}

const defaultSignUp: SignUp = {
  email: '',
  password: '',
  name: '',
}

const SignUpForm: React.FC<{}> = () => {
  const api = getApi(useDispatch())
  const [signUp, setSignUp] = React.useState<SignUp>(defaultSignUp)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setSignUp({ ...signUp, [e.target.name]: e.target.value })
  const handleSubmit = async (e: React.SyntheticEvent) => {
      e.preventDefault()
      api.signUp(signUp.email, signUp.password, signUp.name)
  }

  return (
    <form noValidate onSubmit={handleSubmit}>
          <h1>Sign-up</h1>
          <label>Username
            <input name="email" value={signUp.email} onChange={handleChange}/>
          </label>
          <br/>
          <label>Password
            <input name="password" value={signUp.password} type="password" onChange={handleChange} />
          </label>
          <br/>
          <label>Name
            <input name="name" value={signUp.name} onChange={handleChange} />
          </label>
          <br/>
          <button type="submit">Sign-up</button>
    </form>
  )
}

export default SignUpForm