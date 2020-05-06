import React from 'react'
import { PageProps } from '..'
import Outline from './Outline'
import { getApi } from '../api'
import { useDispatch } from 'react-redux'
import { store } from '../store'
import UpdatePasswordForm from '../component/UpdatePasswordForm'

const UpdatePasswordPage: React.FC<PageProps> = props => {
    const api = getApi(useDispatch())
    const signUpCompleted = async () => {
    }
    return (
      <Outline {...props}>
          <UpdatePasswordForm/>
      </Outline>
    )
}

export default UpdatePasswordPage