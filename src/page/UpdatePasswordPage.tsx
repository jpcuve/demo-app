import React from 'react'
import { PageProps } from '..'
import Outline from './Outline'
import UpdatePasswordForm from '../component/UpdatePasswordForm'
import { getApi } from '../api'
import { useDispatch } from 'react-redux'

const UpdatePasswordPage: React.FC<PageProps> = props => {
  const {history, location: {search}} = props;
  const token = search.length ? search.substring(1) : '';
  const api = getApi(useDispatch())
  const updatePasswordCompleted = async () => {
    console.log(`Update password completed`)
    api.flash("Update password is successful")
    history.push('/home')
  }
  return (
    <Outline {...props}>
        <UpdatePasswordForm token={token} onCompleted={updatePasswordCompleted}/>
    </Outline>
  )
}

export default UpdatePasswordPage