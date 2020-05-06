import React from 'react'
import { useDispatch } from 'react-redux'
import { getApi } from '../api'
import { FormProps } from '..'

interface FormData {
  email: string,
  password: string,
}

const defaultFormData: FormData = {
  email: '',
  password: ''
}

const SignInForm: React.FC<FormProps> = props => {
  const api = getApi(useDispatch())
  const [formData, setFormData] = React.useState<FormData>(defaultFormData)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, [e.target.name]: e.target.value })
  const handleSubmit = async (e: React.SyntheticEvent) => {
      e.preventDefault()
      const token = await api.signIn(formData.email, formData.password)
      console.debug(`Logged in as: ${token}`)
      props.onCompleted()
  }

  return (
    <form noValidate onSubmit={handleSubmit}>
        <h1>Sign-in</h1>
        <label>Username<br/>
          <input name="email" value={formData.email} onChange={handleChange} />
        </label>
        <br />
        <label>Password<br/>
          <input name="password" value={formData.password} type="password" onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Sign-in</button>
    </form>
  )
}

export default SignInForm