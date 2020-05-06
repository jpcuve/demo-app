import React from 'react'
import { PageProps } from '..'
import Outline from './Outline'
import { getApi } from '../api'
import { useDispatch } from 'react-redux'
import { store } from '../store'
import ResetPasswordForm from '../component/ResetPasswordForm'

const ResetPasswordPage: React.FC<PageProps> = props => {
    const api = getApi(useDispatch())
    const signUpCompleted = async () => {
    }
    return (
      <Outline {...props}>
          <ResetPasswordForm/>
      </Outline>
    )
}

export default ResetPasswordPage