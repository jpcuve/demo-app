import React from 'react'
import Outline from './Outline'
import { PageProps } from '..'
import { useSelector, useDispatch } from 'react-redux'
import { ApplicationState } from '../store'
import { Instruction, Perpetual } from '../domain'


const HomePage: React.FC<PageProps> = props => {
	const count = useSelector<ApplicationState, number>(state => state.counter)
  const perpetual = useSelector<ApplicationState, Perpetual>(state => state.perpetual)
	const instructions = useSelector<ApplicationState, Instruction[]>(state => state.instructions)
	const dispatch = useDispatch()
	return (
		<Outline {...props}>
			<div>Home page...</div>
			<div>Count: {count}</div>
			<button onClick={() => dispatch({ type: 'increment-counter' })}>Increment</button>
			{perpetual.profile.identified && instructions.map(instruction => {
				return (
				<div key={instruction.id}>{JSON.stringify(instruction)}</div>
				)
			})}
		</Outline>
	);
}

export default HomePage