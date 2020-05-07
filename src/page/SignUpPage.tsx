import React from 'react'
import { PageProps } from '..'
import Outline from './Outline'
import SignUpForm from '../component/SignUpForm'

const SignUpPage: React.FC<PageProps> = props => {
  const signUpCompleted = async () => {
    props.history.push('/home')
  }
  return (
    <Outline {...props}>
        <SignUpForm onCompleted={signUpCompleted}/>
    </Outline>
  )
}

export default SignUpPage