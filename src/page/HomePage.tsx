import React from 'react'
import Outline from './Outline'
import { PageProps } from '..'
import { useSelector, useDispatch } from 'react-redux'
import { ApplicationState } from '../store'
import { Profile } from '../domain'


const HomePage: React.FC<PageProps> = props => {
	const count = useSelector<ApplicationState, number>(state => state.counter)
	const profile = useSelector<ApplicationState, Profile>(state => state.profile)
	const dispatch = useDispatch()
	return (
		<Outline {...props}>
			<div>Home page...</div>
			<div>Count: {count}</div>
			<button onClick={() => dispatch({ type: 'increment-counter' })}>Increment</button>
		</Outline>
	);
}

export default HomePage