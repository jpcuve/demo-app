import React from 'react'
import Outline from './Outline'
import ResetPasswordForm from '../component/ResetPasswordForm'
import { RouteComponentProps } from 'react-router'

const ResetPasswordPage: React.FC<RouteComponentProps> = props => {
    return (
      <Outline {...props}>
          <ResetPasswordForm onCompleted={() => undefined}/>
      </Outline>
    )
}

export default ResetPasswordPage