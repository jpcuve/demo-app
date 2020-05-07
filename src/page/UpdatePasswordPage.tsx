import React from 'react'
import { PageProps } from '..'
import Outline from './Outline'
import UpdatePasswordForm from '../component/UpdatePasswordForm'

const UpdatePasswordPage: React.FC<PageProps> = props => {
    return (
      <Outline {...props}>
          <UpdatePasswordForm onCompleted={() => undefined}/>
      </Outline>
    )
}

export default UpdatePasswordPage