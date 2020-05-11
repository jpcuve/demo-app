import React from 'react'
import { useDispatch } from 'react-redux'
import { getApi } from '../api'
import { FormProps } from '..'

interface FormData {
  newPassword: string,
  newPasswordConfirmation: string,
  token: string,
}

const defaultFormData: FormData = {
  newPassword: '',
  newPasswordConfirmation: '',
  token: '',
}

interface UpdatePasswordFormProps extends FormProps {
  token :string,
}

const UpdatePasswordForm: React.FC<UpdatePasswordFormProps> = props => {
  const api = getApi(useDispatch())
  const [formData, setFormData] = React.useState<FormData>(defaultFormData)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, [e.target.name]: e.target.value })
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    api.updatePassword(formData.newPassword, formData.newPasswordConfirmation, props.token)
    props.onCompleted()
  }

  return (
    <form noValidate onSubmit={handleSubmit}>
      <h1>Update password</h1>
      <p>
        <label>New password<br/>
          <input name="newPassword" type="password" value={formData.newPassword} onChange={handleChange} />
        </label>
      </p>
      <p>
        <label>New password confirmation<br/>
          <input name="newPasswordConfirmation" type="password" value={formData.newPasswordConfirmation} onChange={handleChange} />
        </label>
      </p>
      <button type="submit">Update password</button>
    </form>
  )
}

export default UpdatePasswordForm