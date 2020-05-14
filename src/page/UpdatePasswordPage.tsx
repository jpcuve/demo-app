import React from 'react'
import Outline from './Outline'
import UpdatePasswordForm from '../component/UpdatePasswordForm'
import { getApi } from '../api'
import { useDispatch } from 'react-redux'
import { RouteComponentProps } from 'react-router'

const UpdatePasswordPage: React.FC<RouteComponentProps> = props => {
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