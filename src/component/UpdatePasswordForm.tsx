import React from 'react'
import { useDispatch } from 'react-redux'
import { getApi } from '../api'

interface FormData {
  newPassword: string,
  newPasswordConfirmation: string,
}

const defaultFormData: FormData = {
  newPassword: '',
  newPasswordConfirmation: ''
}

const UpdatePasswordForm: React.FC<{}> = () => {
  const api = getApi(useDispatch())
  const [formData, setFormData] = React.useState<FormData>(defaultFormData)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, [e.target.name]: e.target.value })
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    // api.updatePassword(formData.newPassword, formData.newPasswordConfirmation)
  }

  return (
    <form noValidate onSubmit={handleSubmit}>
      <h1>Update password</h1>
      <label>New password
            <input name="newPassword" type="password" value={formData.newPassword} onChange={handleChange} />
      </label>
      <br />
      <label>New password confirmation
            <input name="newPasswordConfirmation" type="password" value={formData.newPasswordConfirmation} onChange={handleChange} />
      </label>
      <br />
      <button type="submit">Update password</button>
    </form>
  )
}

export default UpdatePasswordForm