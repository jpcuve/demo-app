import React from 'react'
import { useDispatch } from 'react-redux'
import { getApi } from '../api'
import { FormProps } from '.'

interface FormData {
  email: string,
  password: string,
}

const defaultFormData: FormData = {
  email: '',
  password: ''
}

const ResetPasswordForm: React.FC<FormProps> = props => {
  const api = getApi(useDispatch())
  const [formData, setFormData] = React.useState<FormData>(defaultFormData)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, [e.target.name]: e.target.value })
  const handleSubmit = async (e: React.SyntheticEvent) => {
      e.preventDefault()
      api.resetPassword(formData.email)
      props.onCompleted()
  }

  return (
    <form noValidate onSubmit={handleSubmit}>
          <h1>Reset password</h1>
          <p>
            <label>Email<br/>
              <input name="email" value={formData.email} onChange={handleChange}/>
            </label> 
          </p>
          <button type="submit">Reset password</button>
    </form>
  )
}

export default ResetPasswordForm