import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getApi } from '../api'
import { ApplicationState } from '../store'
import { PageProps } from '..'
import Outline from './Outline'

const TestPage: React.FC<PageProps> = props => {
  const api = getApi(useDispatch())
	const count = useSelector<ApplicationState, number>(state => state.counter)
	const dispatch = useDispatch()
  return (
    <Outline {...props}>
			<div>Count: {count}</div>
			<button onClick={() => dispatch({ type: 'increment-counter' })}>Increment</button>
      <br/>
      <button onClick={() => api.perpetual()}>Test</button>
      <br/>
      <button onClick={() => api.error()}>Error</button>
    </Outline>
  )
}

export default TestPage