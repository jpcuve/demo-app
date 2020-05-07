import React from 'react'
import { PageProps } from '..'
import Outline from './Outline'
import ResetPasswordForm from '../component/ResetPasswordForm'

const ResetPasswordPage: React.FC<PageProps> = props => {
    return (
      <Outline {...props}>
          <ResetPasswordForm onCompleted={() => undefined}/>
      </Outline>
    )
}

export default ResetPasswordPage