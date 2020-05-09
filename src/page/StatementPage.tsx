import React from 'react'
import Outline from './Outline'
import { PageProps } from '..'
import { getApi } from '../api'
import { useDispatch, useSelector } from 'react-redux'
import { ApplicationState } from '../store'
import { Perpetual, Instruction } from '../domain'
import StatementTable from '../component/StatementTable'

const StatementPage: React.FC<PageProps> = props => {
	const api = getApi(useDispatch())
  const perpetual = useSelector<ApplicationState, Perpetual>(state => state.perpetual)
	const instructions = useSelector<ApplicationState, Instruction[]>(state => state.instructions)
	// eslint-disable-next-line
	React.useEffect(() => { api.statement() }, [])
	return (
		<Outline {...props}>
			<h1>Account statement</h1>
			{perpetual.profile.identified && instructions.map(instruction => {
				return (
				<div key={instruction.id}>{JSON.stringify(instruction)}</div>
				)
			})}
			<p>
				<StatementTable currencies={perpetual.currencies} instructions={instructions}/>
			</p>
		</Outline>
	);
}

export default StatementPage