import React from 'react'
import { useDispatch } from 'react-redux'
import { getApi } from '../api'

interface FormData {
  email: string,
  password: string,
  name: string,
}

const defaultFormData: FormData = {
  email: '',
  password: '',
  name: '',
}

const SignUpForm: React.FC<{}> = () => {
  const api = getApi(useDispatch())
  const [formData, setFormData] = React.useState<FormData>(defaultFormData)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, [e.target.name]: e.target.value })
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    // api.signUp(formData.email, formData.password, formData.name)
  }

  return (
    <form noValidate onSubmit={handleSubmit}>
      <h1>Sign-up</h1>
      <label>Username
            <input name="email" value={formData.email} onChange={handleChange} />
      </label>
      <br />
      <label>Password
            <input name="password" value={formData.password} type="password" onChange={handleChange} />
      </label>
      <br />
      <label>Name
            <input name="name" value={formData.name} onChange={handleChange} />
      </label>
      <br />
      <button type="submit">Sign-up</button>
    </form>
  )
}

export default SignUpForm