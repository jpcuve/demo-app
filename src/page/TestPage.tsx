import React from 'react'
import SignInForm from '../component/SignInForm'
import SignOutButton from '../component/SignOutButton'
import { useDispatch, useSelector } from 'react-redux'
import { getApi } from '../api'
import { ApplicationState } from '../store'
import ajax from '../ajax-loader.gif'
import { Token } from '../domain'
import { PageProps } from '..'
import Outline from './Outline'

const TestPage: React.FC<PageProps> = props => {
  const api = getApi(useDispatch())
  return (
    <Outline {...props}>
      <button onClick={() => api.perpetual()}>Test</button>
      <br/>
      <button onClick={() => api.error()}>Error</button>
    </Outline>
  )
}

export default TestPage