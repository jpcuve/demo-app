import React from 'react'
import { PageProps } from '..'
import Outline from './Outline'
import { getApi } from '../api'
import { useDispatch } from 'react-redux'
import SignUpForm from '../component/SignUpForm'

const SignUpPage: React.FC<PageProps> = props => {
    const api = getApi(useDispatch())
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