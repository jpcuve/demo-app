import React from 'react'
import Outline from './Outline'
import SignUpForm from '../component/SignUpForm'
import { RouteComponentProps } from 'react-router'

const SignUpPage: React.FC<RouteComponentProps> = props => {
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