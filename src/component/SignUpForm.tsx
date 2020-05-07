import React from 'react'
import { useDispatch } from 'react-redux'
import { getApi } from '../api'
import { FormProps } from '..'

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

const SignUpForm: React.FC<FormProps> = props => {
  const api = getApi(useDispatch())
  const [formData, setFormData] = React.useState<FormData>(defaultFormData)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, [e.target.name]: e.target.value })
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    await api.signUp(formData.email, formData.password, formData.name)
    api.flash(`An email has been sent to ${formData.email}`)
    props.onCompleted()
  }

  return (
    <form noValidate onSubmit={handleSubmit}>
      <h1>Sign-up</h1>
      <p>
        <label>Username<br/>
          <input name="email" value={formData.email} onChange={handleChange} />
        </label>
      </p>
      <p>
        <label>Password<br/>
          <input name="password" value={formData.password} type="password" onChange={handleChange} />
        </label>
      </p>
      <p>
        <label>Name<br/>
          <input name="name" value={formData.name} onChange={handleChange} />
        </label>
      </p>
      <button type="submit">Sign-up</button>
    </form>
  )
}

export default SignUpForm